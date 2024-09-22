const Employee = require("../models/Employee");
const { formatDate, daysDiff, today } = require("../utils/dateUtils");
const { v4: uuidv4 } = require("uuid");

// GET: Get all employees
const getEmployees = async (req, res) => {
  const { cafe } = req.query;
  // validate the cafe ID
  if (cafe) {
    if (!uuidv4.validate(cafe)) {
      return res.status(400).json({ message: "Invalid cafe ID" });
    }
  }
  // validate if the cafe exists

  // Fetch all relevant employees from the database
  try {
    let employees;
    if (cafe) {
      employees = await Employee.find({ cafe });
    } else {
      employees = await Employee.find({});
    }

    if (employees.length === 0) {
      return res.status(200).json([]);
    }

    employees = employees.map((employee) => {
      const daysWorked = daysDiff(employee.start_date);
      return { ...employee._doc, days_worked: daysWorked };
    });

    employees.sort((a, b) => a.days_worked - b.days_worked);

    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
};

// POST: Create a new employee
const createEmployee = async (req, res) => {
  // Retrieve and clean employee data
  const { name, email_address, phone_number, gender, start_date, cafe } =
    req.body;
  const id = generateEmployeeUUID();
  const date = start_date ? formatDate(start_date) : today();

  // Create the employee
  try {
    // Prevent duplicate employees
    const existingEmployee = await Employee.findOne(
      getEmployeeDuplicateFields(req.body)
    );
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    // Create the new employee
    const newEmployee = new Employee({
      id,
      name,
      email_address,
      phone_number,
      gender,
      date,
      cafe,
    });
    await newEmployee.save();

    res.status(201).json(newEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating employee", error: error.message });
  }
};

// PUT: Update an employee by ID
const updateEmployee = async (req, res) => {
  const { id } = req.params;

  // Retrieve and clean new employee data
  const updatedData = req.body;
  updatedData.start_date = updatedData.start_date
    ? formatDate(updatedData.start_date)
    : today();

  // Update Employee
  try {
    // Prevent duplicate employees
    const existingEmployee = await Employee.findOne(
      getEmployeeDuplicateFields(updatedData)
    );

    if (existingEmployee) {
      return res.status(400).json({
        message: "New information matches an employee that already exists",
      });
    }

    // Update the employee
    const updatedEmployee = await Employee.findOneAndUpdate(
      { id },
      updatedData,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating employee", error: error.message });
  }
};

// DELETE: Delete an employee by ID
const deleteEmployee = async (req, res) => {
  const { id } = req.params; // Extract the employee ID from the URL parameters

  try {
    // Find the employee by ID and delete them
    const deletedEmployee = await Employee.findOneAndDelete({ id });

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Return a success message if the employee was deleted
    res.status(200).json({
      message: `Employee ${deletedEmployee.name} deleted successfully`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting employee", error: error.message });
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
