const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateFields,
        validateJWT,
        hasAdminRole } = require('../middlewares');

// Helpers
const { existColorId,
        existColorName } = require('../helpers/db-validators');

const router = Router();
const colorCtrl = require('../controllers/color');

/**
 * Method: Get all colors
 * Type: Public route
 * Restrictions: None
 */
router.get('/', colorCtrl.getColors);

/**
 * Method: Get a single color
 * Type: Public route
 * Restrictions: None
 */
router.get('/:id', [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existColorId(id)),
    validateFields
], colorCtrl.getColor);

/**
 * Method: Create color
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.post('/', [
    validateJWT,
    hasAdminRole,
    check('name', 'Name is required').not().isEmpty(),
    check('name').custom(name => existColorName(name)),
    validateFields
], colorCtrl.createColor);

/**
 * Method: Update color
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.put('/:id', [
    validateJWT,
    hasAdminRole,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existColorId(id)),
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], colorCtrl.updateColor);

/**
 * Method: Delete color
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.delete('/:id', [
    validateJWT,
    hasAdminRole,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existColorId(id)),
    validateFields
], colorCtrl.deleteColor);

module.exports = router;
