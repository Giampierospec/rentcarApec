(function(){
    $.get('/api/insertClientes', function(dep){
        console.log(dep);
        new Vue({
            el:"#app",
            data:{
                dependencies: dep
            }
        });
    });
})();