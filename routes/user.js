const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateFields,
        validateJWT, 
        hasAdminRole, 
        hasValidRole } = require('../middlewares');

// Helpers
const { existUserId,
        existUserEmail,
        existUserRole } = require('../helpers/db-validators');

const router = Router();
const userCtrl = require('../controllers/user');

/**
 * Method: Get all users
 * Type: Private route
 * Restrictions: only accessible to authenticated users who have 
 * an administrator role
 */
router.get('/', [
    validateJWT,
    hasAdminRole
], userCtrl.getUsers);

/**
 * Method: Get a single user
 * Type: Private route
 * Restrictions: only accessible to authenticated users
 */
router.get('/:id', [
    validateJWT,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existUserId(id)),
    validateFields
], userCtrl.getUser);

/**
 * Method: Create user
 * Type: Private route
 * Restrictions: only accessible to authenticated users who have 
 * an administrator role
 */
router.post('/', [
    validateJWT,
    hasAdminRole,
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
 * Restrictions: only accessible to authenticated users
 */
router.put('/:id', [
    validateJWT,
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
 * Restrictions: only accessible to authenticated users who have 
 * an administrator or sales role
 */
router.delete('/:id', [
    validateJWT,
    hasValidRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(id => existUserId(id)),
    validateFields
], userCtrl.deleteUser);

module.exports = router;