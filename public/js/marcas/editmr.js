(function () {
    var url = window.location.href.split('/');
    $.get('/api/editMarca/'+url[5], function (dep) {
        new Vue({
            el: '#app',
            data: {
                dependencies: dep
            }
        });
    });
})();