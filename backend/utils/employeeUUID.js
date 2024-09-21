const { v4: uuidv4 } = require("uuid");

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

module.exports = {
  generateEmployeeUUID,
  validateEmployeeUUID,
};
