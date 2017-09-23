(function(){
    $.get('/api/users', function(dep){
        new Vue({
            el:"#app",
            data:{
                dependencies: dep
            }
        });
    });
})();