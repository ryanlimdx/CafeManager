const Employee = require("../models/Employee");
const { formatDate, daysDiff, today } = require("../utils/dateHelper");
const { v4: uuidv4 } = require("uuid");

// GET: Get all employees
const getEmployees = async (req, res) => {
  const { cafe } = req.query;

  if (cafe) {
    if (!uuidv4.validate(cafe)) {
      return res.status(400).json({ message: "Invalid cafe ID" });
    }
  }

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
  // Validate the employee
  const validation = validateEmployee(req.body);
  if (!validation.valid) {
    return res
      .status(400)
      .json({ message: "Invalid Employee Data", errors: validation.errors });
  }

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
      .status(400)
      .json({ message: "Error creating employee", error: error.message });
  }
};

// PUT: Update an employee by ID
const updateEmployee = async (req, res) => {
  // Validate ID parameter
  const { id } = req.params;
  if (!validateEmployeeUUID(id)) {
    return res.status(400).json({ message: "Invalid employee ID" });
  }

  // Validate the employee details
  const validation = validateEmployee(req.body);
  if (!validation.valid) {
    return res
      .status(400)
      .json({ message: "Invalid Employee Data", errors: validation.errors });
  }

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

// Validate that the ID matches the 'UIXXXXXXX' format
const validateEmployeeUUID = (id) => {
  const regex = /^UI[A-Z0-9]{7}$/;
  return regex.test(id);
};

// Validate that the email address is in the correct format and not empty
const validateEmail = (email) => {
  if (!email || email.trim() === "") {
    return { valid: false, message: "Email cannot be empty" };
  }
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!re.test(String(email).toLowerCase())) {
    return { valid: false, message: "Email does not fit the required format" };
  }
  return { valid: true };
};

// Validate that the phone number is in the correct format and not empty
const validatePhoneNumber = (phone_number) => {
  if (!phone_number || phone_number.trim() === "") {
    return { valid: false, message: "Phone number cannot be empty" };
  }
  const regex = /^[89]\d{7}$/; // Starts with 8 or 9, and 8 digits long
  if (!regex.test(phone_number)) {
    return {
      valid: false,
      message: "Phone number must start with 8 or 9 and be 8 digits long",
    };
  }
  return { valid: true };
};

// Validate the gender and check if it's not empty
const validateGender = (gender) => {
  if (!gender || gender.trim() === "") {
    return { valid: false, message: "Gender cannot be empty" };
  }
  if (!["Male", "Female"].includes(gender)) {
    return { valid: false, message: "Gender must be either Male or Female" };
  }
  return { valid: true };
};

// Validate the employee
const validateEmployee = (employee) => {
  const { email_address, phone_number, gender } = employee;

  const emailValidation = validateEmail(email_address);
  const phoneValidation = validatePhoneNumber(phone_number);
  const genderValidation = validateGender(gender);

  const errors = [];

  if (!emailValidation.valid) errors.push(emailValidation.message);
  if (!phoneValidation.valid) errors.push(phoneValidation.message);
  if (!genderValidation.valid) errors.push(genderValidation.message);

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true };
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
};
