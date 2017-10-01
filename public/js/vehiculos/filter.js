(function(){
    /**
     * Para buscar vehiculos
     */
    $("#searchVehiculo").keyup(function () {
        var table, input, filter, tr, td;
        table = document.getElementById('vehiculoTable');
        input = document.getElementById('searchVehiculo');
        filter = input.value.toLowerCase();
        tr = table.getElementsByTagName('tr');
        for (var i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = 'none';
                }
            }
        }
    });
})();