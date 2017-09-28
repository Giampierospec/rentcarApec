(function(){
  $('#insp').click(function(e, btn){
      e.preventDefault();
      var url = this.href.split('/');
      var vehiculoId = url[3];
      $.post('/api/setEstadoVehiculo',{vehiculoId: vehiculoId})
        .done(function(data){
            alert('El estado de vehiculo ha pasado ha ser de Inspeccion');
            location.reload();
        });
  });
})();