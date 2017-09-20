(function(){
    $.get('/api/insertVehiculos',function(dep){
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