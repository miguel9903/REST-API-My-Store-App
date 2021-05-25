const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateFields,
        validateJWT,
        hasAdminRole } = require('../middlewares');

// Helpers
const { existGenderId,
        existGenderName } = require('../helpers/db-validators');

const router = Router();
const genderCtrl = require('../controllers/gender');

/**
 * Method: Get all genders
 * Type: Public route
 * Restrictions: None
 */
router.get('/', genderCtrl.getGenders);

/**
 * Method: Get a single gender
 * Type: Public route
 * Restrictions: None
 */
router.get('/:id', [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existGenderId(id)),
    validateFields
], genderCtrl.getGender);

/**
 * Method: Create gender
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.post('/', [
    validateJWT,
    hasAdminRole,
    check('name', 'Name is required').not().isEmpty(),
    check('name').custom(name => existGenderName(name)),
    validateFields
], genderCtrl.createGender);

/**
 * Method: Update gender
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.put('/:id', [
    validateJWT,
    hasAdminRole,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existGenderId(id)),
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], genderCtrl.updateGender);

/**
 * Method: Delete gender
 * Type: Private route
 * Restrictions: Only accessible to authenticated users who have 
 * an administrator role
 */
router.delete('/:id', [
    validateJWT,
    hasAdminRole,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existGenderId(id)),
    validateFields
], genderCtrl.deleteGender);

module.exports = router;
