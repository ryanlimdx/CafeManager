// This file contains validation methods for various attributes.

// Validate that the ID matches the 'UIXXXXXXX' format
const validateEmployeeId = (id) => {
  const regex = /^UI[A-Z0-9]{7}$/;
  if (!regex.test(id)) {
    return { valid: false, message: "Invalid Employee ID format, must match UIXXXXXXX" };
  }
  return { valid: true };
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

module.exports = {
  validateEmployeeId,
  validateEmail,
  validatePhoneNumber,
  validateGender,
};
