(function(){
    $.get('/api/insertModelo', function(dep){
        console.log(dep);
        new Vue({
            el:'#app',
            data:{
                dependencies: dep
            }
        });
    });
})();