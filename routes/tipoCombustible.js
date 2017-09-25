var express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/authController');
var tipoCombustibleCtrl = require('../controllers/tipoCombustibleCtrl');

router.route('/')
        .get(authCtrl.ensureIsAuthenticated,tipoCombustibleCtrl.renderTipoCombustible);

router.route('/Insertar')
        .get(authCtrl.ensureIsAuthenticated, authCtrl.checkUserEmpleadoAdmin, tipoCombustibleCtrl.renderInsertCombustible)
        .post(tipoCombustibleCtrl.insertTipoCombustible);
router.route('/Editar/:tcId')
        .get(authCtrl.ensureIsAuthenticated, authCtrl.checkUserEmpleadoAdmin, tipoCombustibleCtrl.renderEditCombustible)
        .post(tipoCombustibleCtrl.editTipoCombustible);
module.exports = router;