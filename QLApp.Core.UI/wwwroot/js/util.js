

var AppUtil = {

    getURLApi: function (controller, action) {
        return ['https://localhost:44336/api', controller, action].join('/')
    },

    ee: function (url, data = {}) {
        var params = new URLSearchParams();
        Object.keys(data).forEach(key => {
            params.append(key, data[key]);
            

        });
        location = [url, '?', params.toString()].join('');


    },
    getParam: function () {
        let data = {};
        let param = new URLSearchParams(location.search);
        for (let pr of param) {
            data[pr[0]] = pr[1];
        }
        return data;
    }

}