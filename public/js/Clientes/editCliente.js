(function(){
    var url = window.location.href.split('/');
    $.get('/api/editClientes/'+url[5],function(dep){
        new Vue({
            el:'#app',
            data:{
                dependencies: dep
            }
        });
    });
})();