const Cafe = require("../models/Cafe");
const { v4: uuidv4 } = require("uuid");

// GET: Get relevant cafes
const getCafes = async (req, res) => {
  const { location } = req.query;

  try {
    let cafes;

    // Fetch relevant cafes
    if (location) {
      cafes = await Cafe.find({ location });
    } else {
      cafes = await Cafe.find({});
    }

    if (cafes.length === 0) {
      return res.status(200).json([]);
    }

    // Process relevant cafes data
    cafes = cafes.map((cafe) => {
      return {
        id: cafe.id,
        name: cafe.name,
        description: cafe.description,
        employees: cafe.employees.length,
        logo: cafe.logo,
        location: cafe.location,
      };
    });
    cafes.sort((a, b) => b.employees - a.employees);

    res.status(200).json(cafes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cafés", error: error.message });
  }
};

// POST: Create a new cafe
const createCafe = async (req, res) => {
  const { name, description, logo, location } = req.body;
  const id = uuidv4();

  try {
    // Prevent duplicate cafes
    const existingCafe = await Cafe.findOne(getCafeDuplicateFields(req.body));
    if (existingCafe) {
      return res.status(400).json({ message: "Cafe already exists" });
    }

    const cafe = new Cafe({
      id,
      name,
      description,
      logo,
      location,
    });

    await cafe.save();

    res.status(201).json(cafe);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating cafe", error: error.message });
  }
};

// PUT: Update a cafe by ID
const updateCafe = async (req, res) => {
  const { id } = req.params;

  // Retrieve new cafe data
  const updatedData = req.body;

  // Update the cafe
  try {
    const existingCafe = await Cafe.findOne(getCafeDuplicateFields(req.body));
    if (existingCafe) {
      return res.status(400).json({ message: "Cafe already exists" });
    }

    const updatedCafe = await Cafe.findOneAndUpdate({ id }, updatedData, {
      new: true,
    });

    if (!updatedCafe) {
      return res.status(404).json({ message: "Cafe not found" });
    }

    res.status(200).json(updatedCafe);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cafe", error: error.message });
  }
};

// DELETE: Delete a cafe by ID
const deleteCafe = async (req, res) => {
  const { id } = req.params;

  // Delete the cafe
  try {
    const deletedCafe = await Cafe.findOneAndDelete({ id });

    if (!deletedCafe) {
      return res.status(404).json({ message: "Cafe not found" });
    }

    res
      .status(200)
      .json({ message: `Cafe ${deletedCafe.name} deleted successfully` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting cafe", error: error.message });
  }
};

// Retrieves the fields that can be used to check for duplicate employees
const getCafeDuplicateFields = (body) => {
  return {
    name: body.name,
    location: body.location,
  };
};

module.exports = {
  getCafes,
  createCafe,
  updateCafe,
  deleteCafe,
};
