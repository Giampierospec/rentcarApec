(function () {
    var url = window.location.href.split('/');
    $.get('/api/EditModelo/'+url[5], function (dep) {
        new Vue({
            el: '#app',
            data: {
                dependencies: dep
            }
        });
    });
})();