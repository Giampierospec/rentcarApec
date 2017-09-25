(function(){
    $.get('/api/insertEmpleado', function(dep){
        console.log(dep);
        new Vue({
            el:"#app",
            data:{
                dependencies: dep
            }
        });
    });
})();