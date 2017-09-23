var express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/authController');
router.route('/login')
        .get(authCtrl.preventEntering,authCtrl.renderLogin)
        .post(authCtrl.passportRedirect);
router.route('/signup')
        .get(authCtrl.preventEntering,
        authCtrl.renderSignup)
        .post(authCtrl.signup,authCtrl.passportRedirect);
router.route('/logout')
        .get(authCtrl.logout);
module.exports = router;
