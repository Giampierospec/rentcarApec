var express = require('express');

var router = express.Router();
var vehiculoCtrl = require('../controllers/VehiculosController');
var tipoVehiculoCtrl = require('../controllers/tipoVehiculoControlller');
var marcasCtrl = require('../controllers/marcaController');

var empleadoCtrl = require('../controllers/EmpleadoController');

var UserCtrl = require('../controllers/UsersController');

var authCtrl = require("../../controllers/authController");

var modeloCtrl = require('../controllers/modeloController');

var tipoCombustibleCtrl = require('../controllers/TipoCombustibleController');

var clientesCtrl = require('../controllers/ClienteController');

var inspCtrl = require('../controllers/InspeccionController');
//User
router.route('/Users')
      .get(UserCtrl.getUsers)
      .post(UserCtrl.insertUser);
      
//Empleados

router.route('/Empleado')
      .get(empleadoCtrl.getAllEmpleados);

router.route('/insertEmpleado')
      .get(empleadoCtrl.getEstados)
      .post(empleadoCtrl.insertNewEmpleado);

router.route('/editEmpleado/:empleadoId')
      .get(empleadoCtrl.getEditEmpleado)
      .put(empleadoCtrl.editEmpleado);

//Clientes
router.route('/Clientes')
      .get(clientesCtrl.getClientes);

router.route('/insertClientes')
      .get(clientesCtrl.getInsertClientes)
      .post(clientesCtrl.insertClientes);

router.route('/editClientes/:clienteId')
      .get(clientesCtrl.getEditClientes)
      .put(clientesCtrl.editClientes);

//Vehiculos
router.route('/Vehiculos')
      .get(vehiculoCtrl.getAllVehiculos);
router.route('/insertVehiculos')
      .get(vehiculoCtrl.insertVehiculos)
      .post(vehiculoCtrl.insertNewVehiculo);
router.route('/editVehiculo/:idVehiculo')
      .get(vehiculoCtrl.getEditVehiculos)
      .post(vehiculoCtrl.editVehiculos);
//Tipo vehiculos
router.route('/getAllTipoVehiculos')
      .get(tipoVehiculoCtrl.getAllTipoVehiculos);
router.route('/InsertTipoVehiculo')
      .get(tipoVehiculoCtrl.getInsertTipoVehiculo)
      .post(tipoVehiculoCtrl.insertNewTipoVehiculo);

router.route('/editTipoVehiculo/:tipoVehiculoId')
      .get(tipoVehiculoCtrl.getEditTipoVehiculo)
      .put(tipoVehiculoCtrl.editTipoVehiculo);

//Marca vehiculos

router.route('/marcas')
      .get(marcasCtrl.getMarcasActivas);

router.route('/InsertMarca')
      .get(marcasCtrl.getInsertMarca)
      .post(marcasCtrl.insertMarca);

router.route('/editMarca/:marcaId')
      .get(marcasCtrl.getEditMarca)
      .put(marcasCtrl.editMarca);

//Modelos
router.route('/modelos')
      .get(modeloCtrl.getModelos);

router.route('/insertModelo')
      .get(modeloCtrl.getInsertModelo)
      .post(modeloCtrl.insertModelo);

router.route('/editModelo/:modeloId')
      .get(modeloCtrl.getEditModelo)
      .put(modeloCtrl.editModelo);

//tipo Combustible
router.route('/tipoCombustible')
      .get(tipoCombustibleCtrl.getTipoCombustibles);

router.route('/insertTipoCombustible')
      .get(tipoCombustibleCtrl.getInsertTipoCombustible)
      .post(tipoCombustibleCtrl.insertTipoCombustible);

router.route('/editTC/:tcId')
      .get(tipoCombustibleCtrl.getEditTipoCombustible)
      .put(tipoCombustibleCtrl.editTipoCombustible);

//Inspeccion

router.route('/setEstadoVehiculo')
      .post(inspCtrl.changeEstadoVehiculo);

router.route('/vehiculosInspeccion')
      .get(inspCtrl.showVehiculosWithEstadoInspeccion);

router.route('/insertInspeccion/:vehiculoDesc')
      .get(inspCtrl.getInsertInspeccion)
      .post(inspCtrl.insertInspeccion);
router.route('/getInspeccionClientes/:userEmail')
      .get(inspCtrl.getInspeccionClientes);

module.exports = router;