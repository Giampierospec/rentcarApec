(function(){
    
    $.get('/api/Clientes', function(dep){
        new Vue({
            el: '#app',
            data: {
                dependencies: dep,
                cliente: sessionStorage.getItem('clienteVal')
            },
            methods: {
                triggerSubmit: function(){
                    sessionStorage.setItem("clienteVal",this.cliente);
                    var clienteForm = document.getElementById('clienteForm');
                    clienteForm.submit();
                },
                printContent: function(){
                    var printElements = document.getElementById("title").innerHTML+document.getElementById('printContent').innerHTML;
                    var originalContents = document.body.innerHTML;

                    document.body.innerHTML = printElements;
                    window.print();
                    document.body.innerHTML = originalContents;
                    location.reload();
                },
                searchByFecha: function(){
                    var input,table,tr,td, filter;
                 input = document.getElementById('searchFecha');
                 filter = input.value.toLowerCase();
                 table = document.getElementById('clienteTable');
                 tr = table.getElementsByTagName("tr");
                 for(var i=0; i < tr.length; i++){
                     td = tr[i].getElementsByTagName("td")[8];
                    if(td){
                        if(td.innerHTML.toLowerCase().indexOf(filter) > -1){
                            tr[i].style.display = "";
                        }
                        else{
                            tr[i].style.display = "none";
                        }
                    }
                 }
                },
                searchByVehiculo: function () {
                    var input, table, tr, td, filter;
                    input = document.getElementById('searchVehiculo');
                    filter = input.value.toLowerCase();
                    table = document.getElementById('clienteTable');
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
                searchByCliente: function () {
                    var input, table, tr, td, filter;
                    input = document.getElementById('searchCliente');
                    filter = input.value.toLowerCase();
                    table = document.getElementById('clienteTable');
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