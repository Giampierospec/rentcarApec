(function(){
    var url = window.location.href.split('/');
    $.get('/api/editVehiculo/'+url[4],function(dep){
        new Vue({
            el: '#app',
            data: {
                marca: {},
                modelo:{},
                dependencies: dep
            },
        });
    });
    
})();