(function(){
    $.get('/api/insertEmpleado', function(dep){
        console.log(dep);
        new Vue({
            el:"#app",
            data:{
                dependencies: dep
            },
            methods:{
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
                }
            }
        });
    });
})();