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
                    sessionStorage.setItem("empleadoVal", this.empleado);
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
                },
                searchByFecha: function () {
                    var input, table, tr, td, filter;
                    input = document.getElementById('searchFecha');
                    filter = input.value.toLowerCase();
                    table = document.getElementById('empleadoTable');
                    tr = table.getElementsByTagName("tr");
                    for (var i = 0; i < tr.length; i++) {
                        td = tr[i].getElementsByTagName("td")[8];
                        if (td) {
                            if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
                                tr[i].style.display = "";
                            }
                            else {
                                tr[i].style.display = "none";
                            }
                        }
                    }
                },
                searchByVehiculo: function () {
                    var input, table, tr, td, filter;
                    input = document.getElementById('searchVehiculo');
                    filter = input.value.toLowerCase();
                    table = document.getElementById('empleadoTable');
                    tr = table.getElementsByTagName("tr");
                    for (var i = 0; i < tr.length; i++) {
                        td = tr[i].getElementsByTagName("td")[0];
                        if (td) {
                            if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
                                tr[i].style.display = "";
                            }
                            else {
                                tr[i].style.display = "none";
                            }
                        }
                    }
                },
                searchByEmpleado: function () {
                    var input, table, tr, td, filter;
                    input = document.getElementById('searchEmpleado');
                    filter = input.value.toLowerCase();
                    table = document.getElementById('empleadoTable');
                    tr = table.getElementsByTagName("tr");
                    for (var i = 0; i < tr.length; i++) {
                        td = tr[i].getElementsByTagName("td")[1];
                        if (td) {
                            if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
                                tr[i].style.display = "";
                            }
                            else {
                                tr[i].style.display = "none";
                            }
                        }
                    }
                }
            }
        });
    });
})();