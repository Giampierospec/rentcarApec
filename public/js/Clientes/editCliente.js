(function(){
    var url = window.location.href.split('/');
    $.get('/api/editClientes/'+url[5],function(dep){
        new Vue({
            el:'#app',
            data:{
                dependencies: dep
            },
            methods: {
                limitCedula: function (e) {
                    var span = document.getElementById('cedulaLimit');
                    var cedula = document.getElementById('cedula');
                    var len = cedula.value.toString().length;
                    if (len >= 11) {
                        e.preventDefault();
                        span.innerHTML = "Ha alcanzado la cantidad de 11 digitos permitidos";
                    }
                },
                eraseCedulaSpan: function () {
                    var span = document.getElementById('cedulaLimit');
                    var cedula = document.getElementById('cedula');
                    var len = cedula.value.toString().length;
                    if (len >= 2 && len < 11) {
                        span.innerHTML = "";
                    }
                },
                limitCreditCard: function (e) {
                    var tarjeta = document.getElementById('creditCard');
                    var span = document.getElementById('tarjetaLimit');
                    var len = tarjeta.value.toString().length;
                    if (len >= 13) {
                        e.preventDefault();
                        span.innerHTML = "Ha alcanzado la cantidad de 13 digitos permitidos";
                    }
                },
                eraseTarjetaSpan: function () {
                    var span = document.getElementById('tarjetaLimit');
                    var tarjeta = document.getElementById('creditCard');
                    var len = tarjeta.value.toString().length;
                    if (len >= 2 && len < 13) {
                        span.innerHTML = "";
                    }
                },
                creditoLimit: function (e) {
                    var span = document.getElementById('creditoLimit');
                    var credito = document.getElementById('limit');
                    var maxAmount = parseInt(credito.value);
                    if (maxAmount >= 10000) {
                        e.preventDefault();
                        credito.value = "";
                        span.innerHTML = "Ha alcanzado la cantidad maxima de $10,000";
                    }

                },
                eraseLimitSpan: function () {
                    var span = document.getElementById('creditoLimit');
                    var credito = document.getElementById('limit');
                    var maxAmount = parseInt(credito.value);
                    if (maxAmount < 10000 && credito.value.toString().length >= 2) {
                        span.innerHTML = "";
                    }
                }


            }
        });
    });
})();