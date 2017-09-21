(function(){
    $.get('/api/InsertTipoVehiculo', function(dep){
        console.log(dep);
        new Vue({
            el:'#app',
            data:{
                dependencies: dep
            }
        });
    });
})();