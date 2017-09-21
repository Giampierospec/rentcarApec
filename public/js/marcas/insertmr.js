(function(){
    $.get('/api/InsertMarca',function(dep){
        new Vue({
            el:'#app',
            data:{
                dependencies: dep
            }
        });
    });
})();