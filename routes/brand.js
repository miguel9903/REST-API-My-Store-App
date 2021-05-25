const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateFields,
        validateJWT,
        hasAdminRole } = require('../middlewares');

// Helpers
const { existBrandId,
        existBrandName } = require('../helpers/db-validators');

const router = Router();
const brandCtrl = require('../controllers/brand');

/**
 * Method: Get all brands
 * Type: Public route
 * Restrictions: None
 */
router.get('/', brandCtrl.getBrands);

/**
 * Method: Get a single brand
 * Type: Public route
 * Restrictions: None
 */
router.get('/:id', [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existBrandId(id)),
    validateFields
], brandCtrl.getBrand);

/**
 * Method: Create brand
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.post('/', [
    validateJWT,
    hasAdminRole,
    check('name', 'Name is required').not().isEmpty(),
    check('name').custom(name => existBrandName(name)),
    validateFields
], brandCtrl.createBrand);

/**
 * Method: Update brand
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.put('/:id', [
    validateJWT,
    hasAdminRole,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existBrandId(id)),
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], brandCtrl.updateBrand);

/**
 * Method: Delete brand
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.delete('/:id', [
    validateJWT,
    hasAdminRole,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existBrandId(id)),
    validateFields
], brandCtrl.deleteBrand);

module.exports = router;
