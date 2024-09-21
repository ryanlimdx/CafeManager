const express = require('express');
const { getEmployees, createEmployee, updateEmployee } = require('../controllers/employeeController');

const router = express.Router();

router.get('/', getEmployees);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);

module.exports = router;
