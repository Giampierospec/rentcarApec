var express = require('express');
var router = express.Router();
var tpCtrl = require('../controllers/tipoVehiculoCtr');
router.route('/')
    .get(tpCtrl.getTipoVehiculos);

router.route('/Insertar')
        .get(tpCtrl.renderInsertTipoVehiculos)
        .post(tpCtrl.insertTipoVehiculo);
module.exports = router;