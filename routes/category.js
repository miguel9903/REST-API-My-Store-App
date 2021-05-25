const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateFields,
        validateJWT,
        hasAdminRole } = require('../middlewares');

// Helpers
const { existCategoryId,
        existCategoryName } = require('../helpers/db-validators');

const router = Router();
const categoryCtrl = require('../controllers/category');

/**
 * Method: Get all categories
 * Type: Public route
 * Restrictions: None
 */
router.get('/', categoryCtrl.getCategories);

/**
 * Method: Get a single category
 * Type: Public route
 * Restrictions: None
 */
router.get('/:id', [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existCategoryId(id)),
    validateFields
], categoryCtrl.getCategory);

/**
 * Method: Create category
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.post('/', [
    validateJWT,
    hasAdminRole,
    check('name', 'Name is required').not().isEmpty(),
    check('name').custom(name => existCategoryName(name)),
    validateFields
], categoryCtrl.createCategory);

/**
 * Method: Update category
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.put('/:id', [
    validateJWT,
    hasAdminRole,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existCategoryId(id)),
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], categoryCtrl.updateCategory);

/**
 * Method: Delete category
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.delete('/:id', [
    validateJWT,
    hasAdminRole,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existCategoryId(id)),
    validateFields
], categoryCtrl.deleteCategory);

module.exports = router;
