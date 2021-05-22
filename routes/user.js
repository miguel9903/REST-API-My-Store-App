const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateFields } = require('../middlewares/validate-fields');

// Helpers
const { existUserId,
        existUserEmail,
        existUserRole } = require('../helpers/db-validators');

const router = Router();
const userCtrl = require('../controllers/user');

/**
 * Method: Get all users
 * Type: Public route
 * Restrictions: None
 */
router.get('/', userCtrl.getUsers);

/**
 * Method: Get a single users
 * Type: Public route
 * Restrictions: None
 */
router.get('/:id', [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existUserId(id)),
    validateFields
], userCtrl.getUser);

/**
 * Method: Create user
 * Type: Private route
 * Restrictions: Only accessible to authenticated users (who have a valid token) 
 * and have an ADMIN_ROLE role 
 */
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('email').custom(email => existUserEmail(email)),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('role').custom(role => existUserRole(role)),
    validateFields
], userCtrl.createUser);

/**
 * Method: Update user
 * Type: Private route
 * Restrictions: Only accessible to authenticated users (who have a valid token)
 */
router.put('/:id', [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existUserId(id)),
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('role').custom(role => existUserRole(role)),
    validateFields
], userCtrl.updateUser);

/**
 * Method: Delete user
 * Type: Private route
 * Restrictions: Only accessible to authenticated users (who have a valid token) 
 * and have an ADMIN_ROLE role 
 */
router.delete('/:id', [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existUserId(id)),
    validateFields
], userCtrl.deleteUser);

module.exports = router;