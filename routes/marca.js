var express = require('express');

var router = express.Router();
var marcaCtrl = require('../controllers/marcaCtrl');
router.route('/')
      .get(marcaCtrl.getAllMarcas);
router.route('/Insertar')
        .get(marcaCtrl.renderInsertMarca)
        .post(marcaCtrl.insertMarca);

router.route('/Editar/:marcaId')
        .get(marcaCtrl.renderEditMarca)
        .post(marcaCtrl.editMarca);
module.exports = router;