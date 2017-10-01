(function () {
    var url = window.location.href.split('/');
    $.get('/api/insertInspeccion/'+url[5], function (dep) {
        new Vue({
            el: '#app',
            data: {
                dependencies: dep
            },
            methods:{
                limitGalons: function(e){
                    var combustible = document.getElementById('combustible');
                    var span = document.getElementById('combustibleLimit');
                    var maxAmount = parseInt(combustible.value);
                    if(maxAmount >= 100){
                        e.preventDefault();
                        span.innerHTML = "Ha excedido la cantidad maxima de 100 galones";
                        combustible.value = "";
                    }
                },
                eraseSpan: function(){
                    var combustible = document.getElementById('combustible');
                    var span = document.getElementById('combustibleLimit');
                    var maxAmount = parseInt(combustible.value);
                    if (maxAmount < 100) {
                        span.innerHTML = "";
                    }
                }
            }
        });
    });
})();