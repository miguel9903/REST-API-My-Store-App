const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateFields,
        validateJWT,
        hasAdminRole } = require('../middlewares');

// Helpers
const { existSubcategoryId,
        existSubcategoryName } = require('../helpers/db-validators');

const router = Router();
const subcategoryCtrl = require('../controllers/subcategory');

/**
 * Method: Get all subcategories
 * Type: Public route
 * Restrictions: None
 */
router.get('/', subcategoryCtrl.getSubcategories);

/**
 * Method: Get a single subcategory
 * Type: Public route
 * Restrictions: None
 */
router.get('/:id', [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existSubcategoryId(id)),
    validateFields
], subcategoryCtrl.getSubcategory);

/**
 * Method: Create subcategory
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.post('/', [
    validateJWT,
    hasAdminRole,
    check('name', 'Name is required').not().isEmpty(),
    check('name').custom(name => existSubcategoryName(name)),
    validateFields
], subcategoryCtrl.createSubcategory);

/**
 * Method: Update subcategory
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.put('/:id', [
    validateJWT,
    hasAdminRole,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existSubcategoryId(id)),
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], subcategoryCtrl.updateSubcategory);

/**
 * Method: Delete subcategory
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.delete('/:id', [
    validateJWT,
    hasAdminRole,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existSubcategoryId(id)),
    validateFields
], subcategoryCtrl.deleteSubcategory);

module.exports = router;