(function () {
    var url = window.location.href.split('/');
    $.get('/api/EditTipoVehiculo/'+url[5], function (dep) {
        console.log(dep);
        new Vue({
            el: '#app',
            data: {
                dependencies: dep
            }
        });
    });
})();