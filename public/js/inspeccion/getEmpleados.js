(function(){
    
    $.get('/api/Empleado', function(dep){
        new Vue({
            el: '#app',
            data: {
                dependencies: dep,
                empleado: sessionStorage.getItem('empleadoVal')
            },
            methods: {
                triggerSubmit: function(){
                    sessionStorage.setItem("empleadoVal",this.empleado);
                    var empleadoForm = document.getElementById('empleadoForm');
                    empleadoForm.submit();
                },
                printContent: function () {
                    var printElements = document.getElementById("title").innerHTML + document.getElementById('printContent').innerHTML;
                    var originalContents = document.body.innerHTML;

                    document.body.innerHTML = printElements;
                    window.print();
                    document.body.innerHTML = originalContents;
                    location.reload();
                }
            }
        });
    });
})();