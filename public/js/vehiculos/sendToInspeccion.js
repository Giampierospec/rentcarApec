(function(){
  $(document).on('click','.insp',function(e){
      e.preventDefault();
      var url = this.href.split('/');
      var vehiculoId = url[3];
      $.post('/api/setEstadoVehiculo',{vehiculoId: vehiculoId})
        .done(function(data){
            alert('El estado de vehiculo ha pasado a ser de Inspeccion');
            location.reload();
        });
  });
})();