const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateFields } = require('../middlewares/validate-fields');

// Helpers

const router = Router();
const authCtrl = require('../controllers/auth');

/**
 * Method: Login
 * Type: Public route
 * Restrictions: None
 */
router.post('/login', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], authCtrl.login);

/**
 * Method: Login with Google
 * Type: Public route
 * Restrictions: None
 */
router.post('/google', [
    check('id_token', 'id_token is required').not().isEmpty(),
    validateFields
], authCtrl.googleSignIn);

module.exports = router;