const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const searchCtrl = require('../controllers/search');

/**
 * Method: Search
 * Type: Public route
 * Restrictions: None
 */
router.get('/:collection/:term', searchCtrl.search);

module.exports = router;