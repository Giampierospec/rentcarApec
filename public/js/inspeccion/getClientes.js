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
                }
            }
        });
    });
})();