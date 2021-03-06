var express = require('express');

var router = express.Router();
var marcaCtrl = require('../controllers/marcaCtrl');
var authCtrl = require('../controllers/authController');
router.route('/')
      .get(authCtrl.ensureIsAuthenticated,marcaCtrl.getAllMarcas);
router.route('/Insertar')
        .get(authCtrl.ensureIsAuthenticated,authCtrl.checkUserEmpleadoAdmin ,marcaCtrl.renderInsertMarca)
        .post(marcaCtrl.insertMarca);

router.route('/Editar/:marcaId')
        .get(authCtrl.ensureIsAuthenticated,authCtrl.checkUserEmpleadoAdmin ,marcaCtrl.renderEditMarca)
        .post(marcaCtrl.editMarca);


module.exports = router;