const express = require('express');
const { getEmployees, createEmployee, updateEmployee } = require('../controllers/employeeController');
const employeeValidation = require('../middlewares/employeeValidationMiddleware');

const router = express.Router();

router.get('/', getEmployees);
router.post('/', employeeValidation.validateEmployee, createEmployee);
router.put('/:id', employeeValidation.validateID, employeeValidation.validateEmployee, updateEmployee);

module.exports = router;
