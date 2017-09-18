var express = require('express');
var router = express.Router();
var vehiculosCtrl = require('../controllers/vehiculosCtrl');
/**
 * Gets landing page
 */
router.get('/', function(req, res, next) {
  res.render('landing', { title: 'Bienvenido a ' });
});
router.route('/vehiculos')
      .get(vehiculosCtrl.getVehiculos);

router.route('/insertVehiculos')
      .get();

module.exports = router;
