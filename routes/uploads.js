const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateFields,
        validateJWT,
        hasValidRole,
        validateFile } = require('../middlewares');

// Helpers
const { validateAllowedCollections } = require('../helpers');

const router = Router();
const uploadsCtrl = require('../controllers/uploads');

/**
 * Method: Get image
 * Type: Public route
 * Restrictions: None
 */
router.get('/:collection/:id', uploadsCtrl.getImage);

/**
 * Method: Upload file
 * Type: Private route
 * Restrictions: Only accessible to authenticated users
 */
router.post('/', uploadsCtrl.uploadFiles);

/**
 * Method: Update image
 * Type: Private route
 * Restrictions: Only accessible to authenticated users
 */
router.put('/:collection/:id', [
    validateFile,
    check('id', 'Invalid id').isMongoId(),
    check('collection').custom(collection => validateAllowedCollections(collection, ['users', 'products'])),
    validateFields
], uploadsCtrl.updateImageCloudinary);

module.exports = router;
