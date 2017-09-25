(function(){
    $.get('/api/insertTipoCombustible', function(dep){
        console.log(dep);
        new Vue({
            el:'#app',
            data:{
                dependencies: dep
            }
        });
    });
})();