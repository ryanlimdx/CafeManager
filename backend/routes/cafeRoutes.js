const express = require('express');
const { getCafes, createCafe, updateCafe, deleteCafe } = require('../controllers/cafeController');
const cafeValidation = require('../middlewares/cafeValidationMiddleware');

const router = express.Router();

router.get('/', getCafes);
router.post('/', cafeValidation.validateCafe, createCafe);
router.put('/:id', cafeValidation.validateId, cafeValidation.validateCafe, updateCafe);
router.delete('/:id', cafeValidation.validateId, deleteCafe);

module.exports = router;