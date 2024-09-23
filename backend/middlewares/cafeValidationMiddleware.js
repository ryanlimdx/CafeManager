const { validate } = require("uuid");
const { validateName, validateDescription, validateLocation } = require("../utils/validationUtils");

// Validate that the ID matches the required format
const validateId = (req, res, next) => {
  const { id } = req.params;
  const idValidation = validate(id);

  if (!idValidation) {
    return res
      .status(400)
      .json({ message: "Invalid cafe UUID format" });
  }

  next();
};

// Validate the cafe
const validateCafe = (req, res, next) => {
  const { name, description, location } = req.body;

  const nameValidation = validateName(name);
  const descriptionValidation = validateDescription(description);
  const locationValidation = validateLocation(location);

  const errors = [];

  if (!nameValidation.valid) {
    errors.push(nameValidation.message);
  }

  if (!locationValidation.valid) {
    errors.push(locationValidation.message);
  }

  if (!descriptionValidation.valid) {
    errors.push(descriptionValidation.message);
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Invalid cafe data", errors });
  }

  next();
};

module.exports = {
    validateId,
    validateCafe,
};
