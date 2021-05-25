const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateFields,
        validateJWT,
        hasAdminRole } = require('../middlewares');

// Helpers
const { existProductId } = require('../helpers/db-validators');

const router = Router();
const productCtrl = require('../controllers/product');

/**
 * Method: Get all products
 * Type: Public route
 * Restrictions: None
 */
router.get('/', productCtrl.getProducts);

/**
 * Method: Get a single product
 * Type: Public route
 * Restrictions: None
 */
router.get('/:id', [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existProductId(id)),
    validateFields
], productCtrl.getProduct);

/**
 * Method: Create product
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.post('/', [
    validateJWT,
    hasAdminRole,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('brand', 'Brand is required').not().isEmpty(),
    check('gender', 'Gender is required').not().isEmpty(),
    check('color', 'Color is required').not().isEmpty(),
    check('subcategory', 'Subcategory is required').not().isEmpty(),
    validateFields
], productCtrl.createProduct);

/**
 * Method: Update product
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.put('/:id', [
    validateJWT,
    hasAdminRole,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existProductId(id)),
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('brand', 'Brand is required').not().isEmpty(),
    check('gender', 'Gender is required').not().isEmpty(),
    check('color', 'Color is required').not().isEmpty(),
    check('subcategory', 'Subcategory is required').not().isEmpty(),
    validateFields
], productCtrl.updateProduct);

/**
 * Method: Delete product
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.delete('/:id', [
    validateJWT,
    hasAdminRole,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existProductId(id)),
    validateFields
], productCtrl.deleteProduct);

module.exports = router;
