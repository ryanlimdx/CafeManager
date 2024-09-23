const mongoose = require("mongoose");
const Employee = require("../models/Employee");
const Cafe = require("../models/Cafe");
const { formatDate, daysDiff, today } = require("../utils/dateUtils");
const { v4: uuidv4 } = require("uuid");
const { getCafeMongoId } = require("./cafeController");

// GET: Get relevant employees
const getEmployees = async (req, res) => {
  const { cafe } = req.query;
  // Validate the cafe ID
  if (cafe) {
    if (!uuidv4.validate(cafe)) {
      return res.status(400).json({ message: "Invalid cafe ID" });
    }
  }

  // Fetch and process all relevant employees from the database
  try {
    // Fetch relevant employees from the database
    let employees;
    if (cafe) {
      const cafeId = await getCafeMongoId(cafe);
      employees = await Employee.find({ cafe: cafeId });
    } else {
      employees = await Employee.find({});
    }

    if (employees.length === 0) {
      return res.status(200).json(employees);
    }

    // Process relevant employees data
    employees = employees.map((employee) => {
      const daysWorked = daysDiff(employee.start_date);
      return {
        id: employee.id,
        name: employee.name,
        email_address: employee.email_address,
        phone_number: employee.phone_number,
        days_worked: daysWorked,
        cafe: employee.cafe,
      };
    });

    employees.sort((a, b) => b.days_worked - a.days_worked);

    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
};

// POST: Create a new employee
const createEmployee = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  // Create the employee
  try {
    // Retrieve and clean employee data
    const { name, email_address, phone_number, gender, start_date, cafe } =
      req.body;
    const id = generateEmployeeUUID();
    const date = start_date ? formatDate(start_date) : today();

    // Prevent duplicate employees
    const existingEmployee = await Employee.findOne(
      getEmployeeDuplicateFields(req.body)
    ).session(session);
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    // Process cafe
    let cafeId;
    if (cafe) {
      cafeId = await getCafeMongoId(cafe, session);
      if (!cafeId) {
        return res.status(404).json({ message: "Cafe not found" });
      }
    }

    // Create the new employee
    const newEmployee = new Employee({
      id,
      name,
      email_address,
      phone_number,
      gender,
      start_date: date,
      cafe: cafeId,
    });
    await newEmployee.save({ session });

    // Add to the cafe's employees list
    if (cafe) {
      await Cafe.findOneAndUpdate(
        { id: cafe },
        { $addToSet: { employees: newEmployee._id } },
        { session }
      );
    }

    await session.commitTransaction();

    res.status(201).json(newEmployee);
  } catch (error) {
    await session.abortTransaction();
    res
      .status(500)
      .json({ message: "Error creating employee", error: error.message });
  } finally {
    session.endSession();
  }
};

// PUT: Update an employee by ID
const updateEmployee = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  // Update Employee
  try {
    const { id } = req.params;
    // Retrieve and clean new employee data
    const { name, email_address, phone_number, gender, start_date, cafe } =
      req.body;
    const date = start_date ? formatDate(start_date) : today();

    // Check if the employee to be updated exists
    const employee = await Employee.findOne({ id })
      .select("_id cafe")
      .session(session);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // New employee info; Prevent duplicate employees
    const existingEmployee = await Employee.findOne({
      ...getEmployeeDuplicateFields(req.body),
      _id: { $ne: employee._id },
    }).session(session);
    if (existingEmployee) {
      return res.status(400).json({
        message: "New information matches an employee that already exists",
      });
    }

    // Remove the employee from the old cafe's employees list
    if (employee.cafe) {
      const updatedOldCafe = await Cafe.findOneAndUpdate(
        { _id: employee.cafe },
        { $pull: { employees: employee._id } },
        { session }
      );
      if (!updatedOldCafe) {
        return res.status(404).json({ message: "Previous cafe not found" });
      }
    }

    // Process new cafe's ID
    let cafeJson, cafeId;
    if (cafe) {
      cafeId = await getCafeMongoId(cafe, session);
      if (!cafeId) {
        return res.status(404).json({ message: "New cafe not found" });
      }
      cafeJson = { cafe: cafeId };
    } else {
      cafeJson = {$unset: { cafe: "" }};
    }

    // Update the employee details
    const updatedEmployee = await Employee.findOneAndUpdate(
      { id },
      {
        name,
        email_address,
        phone_number,
        gender,
        start_date: date,
        ...cafeJson,
      },
      { new: true, session }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Add the employee to the new cafe's employees list
    if (cafe) {
      await Cafe.findOneAndUpdate(
        { _id: cafeId },
        { $addToSet: { employees: updatedEmployee._id } },
        { session }
      );
    }

    await session.commitTransaction();

    res.status(200).json(updatedEmployee);
  } catch (error) {
    await session.abortTransaction();
    res
      .status(500)
      .json({ message: "Error updating employee", error: error.message });
  } finally {
    session.endSession();
  }
};

// DELETE: Delete an employee by ID
const deleteEmployee = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  // Delete the employee
  try {
    const { id } = req.params; // Extract the employee ID from the URL parameters

    // Find the employee by ID and delete them
    const deletedEmployee = await Employee.findOneAndDelete({ id }).session(
      session
    );
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Remove the employee from the cafe's employees list
    if (deletedEmployee.cafe) {
      await Cafe.findOneAndUpdate(
        { _id: deletedEmployee.cafe },
        { $pull: { employees: deletedEmployee._id } },
        { session }
      );
    }

    await session.commitTransaction();

    res.status(200).json({
      message: `Employee ${deletedEmployee.name} deleted successfully`,
    });
  } catch (error) {
    await session.abortTransaction();

    res
      .status(500)
      .json({ message: "Error deleting employee", error: error.message });
  } finally {
    session.endSession();
  }
};

// Retrieves the fields that can be used to check for duplicate employees
const getEmployeeDuplicateFields = (body) => {
  return {
    name: body.name,
    email_address: body.email_address,
    phone_number: body.phone_number,
    gender: body.gender,
  };
};

// Generates a custom UUID for employees in 'UIXXXXXXX' format
const generateEmployeeUUID = () => {
  const uuid = uuidv4().replace(/-/g, "");
  const alphanumeric = uuid.slice(0, 7);
  return `UI${alphanumeric.toUpperCase()}`;
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
