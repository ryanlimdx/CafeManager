const Employee = require("../models/Employee");
const {
  generateEmployeeUUID,
  validateEmployeeUUID,
} = require("../utils/employeeUUID");

// GET: Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
};

// POST: Create a new employee
const createEmployee = async (req, res) => {
  const { name, email_address, phone_number, gender, start_date, cafe } =
    req.body;

  const id = generateEmployeeUUID();

  try {
    const newEmployee = new Employee({
      id,
      name,
      email_address,
      phone_number,
      gender,
      start_date,
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


module.exports = {
  getEmployees,
  createEmployee,
};
