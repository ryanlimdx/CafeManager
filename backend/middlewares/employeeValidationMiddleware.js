// Contains validation methods for employee data
const { validateEmployeeId, validateCafeId, validateName, validateEmail, validatePhoneNumber, validateGender, validateDate } = require("../utils/validationUtils");

// Validate that the ID matches the required format
const validateId = (req, res, next) => {
  const { id } = req.params;
  const idValidation = validateEmployeeId(id);

  if (!idValidation.valid) {
    return res
      .status(400)
      .json({ message: "Invalid employee ID format, must match UIXXXXXXX" });
  }

  next();
};

// Validate the employee
const validateEmployee = (req, res, next) => {
  const { name, email_address, phone_number, gender, start_date, cafe } = req.body;

  const nameValidation = validateName(name);
  const emailValidation = validateEmail(email_address);
  const phoneValidation = validatePhoneNumber(phone_number);
  const genderValidation = validateGender(gender);
  let startDateValidation;
  if (start_date) {
    startDateValidation = validateDate(start_date);
  }
  let cafeValidation;
  if (cafe) {
    cafeValidation = validateCafeId(cafe);
  }

  const errors = [];

  if (!nameValidation.valid) errors.push(nameValidation.message);
  if (!emailValidation.valid) errors.push(emailValidation.message);
  if (!phoneValidation.valid) errors.push(phoneValidation.message);
  if (!genderValidation.valid) errors.push(genderValidation.message);
  if (start_date && !startDateValidation.valid) errors.push(startDateValidation.message);
  if (cafe && !cafeValidation.valid) errors.push(cafeValidation.message);

  if (errors.length > 0) {
    return res.status(400).json({ message: "Invalid employee data", errors });
  }

  next();
};

module.exports = {
  validateId,
  validateEmployee,
};
