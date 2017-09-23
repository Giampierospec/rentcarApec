var express = require('express');
var router = express.Router();
var vehiculosCtrl = require('../controllers/vehiculosCtrl');
var authCtrl = require('../controllers/authController');
/**
 * Gets landing page
 */
router.get('/',authCtrl.preventEntering ,function(req, res, next) {
  res.render('landing', { title: 'Bienvenido a ' });
});


router.route('/vehiculos')
      .get(authCtrl.ensureIsAuthenticated,vehiculosCtrl.getVehiculos);

router.route('/insertVehiculos')
      .get(authCtrl.ensureIsAuthenticated,vehiculosCtrl.renderInsertVehiculo)
      .post(vehiculosCtrl.insertNewVehiculo);
router.route('/editVehiculo/:idVehiculo')
      .get(authCtrl.ensureIsAuthenticated,vehiculosCtrl.renderEditVehiculo)
      .post(vehiculosCtrl.editVehiculo);

module.exports = router;
