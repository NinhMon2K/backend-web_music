var AppAjax = {

    Ajax: function (url, config, param, success, fail) {
        let configDef = {};
        configDef.url = url;
        configDef.type = 'GET';
        configDef.async = false;
        configDef.dataType = "json";
        configDef.dataType = "json";
        configDef.contentType = "application/json; charset=utf-8";
        configDef.data = param;

        $.extend(configDef, config)

        $.ajax(configDef).done(function (res) {
            success && success(res.Data)
        }).fail(function (data) {
            fail && fail(data)
        })

    }

}