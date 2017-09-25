var express = require('express');

var router = express.Router();
var authCtrl = require('../controllers/authController');
var clientesCtrl = require('../controllers/clienteCtrl');

router.route('/')
        .get(authCtrl.ensureIsAuthenticated, authCtrl.checkAdmin, clientesCtrl.renderClientes);
router.route('/Insertar')
      .get(authCtrl.ensureIsAuthenticated, authCtrl.checkAdmin,clientesCtrl.renderInsertClientes)
      .post(clientesCtrl.insertClientes);

router.route('/Editar/:clienteId')
        .get(authCtrl.ensureIsAuthenticated, authCtrl.checkAdmin, clientesCtrl.renderEditClientes)
        .post(clientesCtrl.editClientes);
module.exports = router;