// Validation helper methods for various attributes.
const { validate } = require("uuid");
const { dateFormat, parseDate } = require("./dateUtils");

// Validate the name by checking if it's not empty
// @params {String} name - The name to validate
const validateName = (name) => {
  if (!name || name.trim() === "") {
    return { valid: false, message: "Name cannot be empty" };
  }
  return { valid: true };
};

// Validate that the employee's ID matches the 'UIXXXXXXX' format
// @params {String} id - The employee's ID to validate.
const validateEmployeeId = (id) => {
  const regex = /^UI[A-Z0-9]{7}$/;
  if (!regex.test(id)) {
    return { valid: false, message: "Invalid Employee ID format, must match UIXXXXXXX" };
  }
  return { valid: true };
};

// Validate the cafe's ID format
// @params {String} id - The cafe's ID to validate.
const validateCafeId = (id) => {
  if (!validate(id)) {
    return { valid: false, message: "Invalid Cafe ID format" };
  }
  return { valid: true };
};

// Validate that the email address is in the correct format and not empty
// @params {String} email - The email address to validate.
const validateEmail = (email) => {
  if (!email || email.trim() === "") {
    return { valid: false, message: "Email cannot be empty" };
  }
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    return { valid: false, message: "Email does not fit the required format" };
  }
  return { valid: true };
};

// Validate that the phone number is in the correct format and not empty
// @params {String} phone_number - The phone number to validate.
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
// @params {String} gender - The gender types to validate.
const validateGender = (gender) => {
  if (!gender || gender.trim() === "") {
    return { valid: false, message: "Gender cannot be empty" };
  }
  if (!["male", "female"].includes(gender.toLowerCase())) {
    return { valid: false, message: "Gender must be either Male or Female" };
  }
  return { valid: true };
};

// Validate the date syntax
// @params {String} date - The date to validate.
const validateDate = (date) => {
  const parsedDate = parseDate(date);
  if (!parsedDate.isValid()) {
    return { valid: false, message: `Invalid date format, it must be in the format ${dateFormat}` };
  }
  return { valid: true };
};

// Validate the description by checking if it's not empty
// @params {String} description - The description to validate.
const validateDescription = (description) => {
  if (!description || description.trim() === "") {
    return { valid: false, message: "Description cannot be empty" };
  }
  return { valid: true };
};

// Validate the location by checking if it's not empty
// @params {String} location - The location to validate.
const validateLocation = (location) => {
  if (!location || location.trim() === "") {
    return { valid: false, message: "Location cannot be empty" };
  }
  return { valid: true };
};

module.exports = {
  validateName,
  validateEmployeeId,
  validateCafeId,
  validateEmail,
  validatePhoneNumber,
  validateGender,
  validateDate,
  validateDescription,
  validateLocation,
};
