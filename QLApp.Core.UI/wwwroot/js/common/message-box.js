
const timeToastr = 2500;
const posToastr = 'toast-top-center';

const configDef = {
    resizable: false,
    height: 'auto',
    width: 420,
    modal: true,
    showIcon: true,
    classes: {},

}

var MessageBox = {

    info: function (message, config = {}, callback) {

        let $form;
        let custom = {
            icon: 'multi ic-info-message',
            title: App.Resource.Message.Notice,
            buttons: [
                {
                    text: App.Resource.Message.Close,
                    class: 'app-btn btn-app float-right btn-yes',
                    click: function () {
                        $(this).dialog('close');

                        typeof callback == "function" && callback(App.Constant.Choose.Yes, $form);
                    }
                }
            ],
        }

        let conf = $.extend({}, configDef, custom, config);
        conf.classes['ui-dialog'] += ' m-dialog d-message d-info';
        let $container = $('<div>', { class: 'message-container' });
        $container.append($('<div>', { class: 'app-icon' + (conf.showIcon ? ` ${conf.icon}` : '') }));
        $container.append($('<div>', { class: 'message-text', html: message }));

        $.when($container.dialog(conf)).then(dialog => {
            $form = dialog;
            conf.event && conf.event(dialog);
        });
    },

    confirm: function (message, config = {}, callback) {
        let $form;
        let custom = {
            icon: 'multi ic-question-message',
            title: App.Resource.Message.Confirm,
            buttons: [
                $.extend({
                    text: App.Resource.Message.Yes,
                    class: 'app-btn btn-app float-right btn-yes',
                    click: function () {
                        $(this).dialog('close');

                        typeof callback == "function" && callback(App.Constant.Choose.Yes, $form);
                    }
                }, config.yes),

                $.extend({
                    text: App.Resource.Message.No,
                    class: 'app-btn btn-outline-app float-right btn-no',
                    click: function () {
                        $(this).dialog('close');

                        typeof callback == "function" && callback(App.Constant.Choose.No, $form);
                    }
                }, config.no),
            ],
        }

        let conf = $.extend({}, configDef, custom, config);
        conf.classes['ui-dialog'] += ' m-dialog d-message d-confirm';
        let $container = $('<div>', { class: 'message-container' });
        $container.append($('<div>', { class: 'app-icon' + (conf.showIcon ? ` ${conf.icon}` : '') }));
        $container.append($('<div>', { class: 'message-text', html: message }));

        $.when($container.dialog(conf)).then(dialog => {
            $form = dialog;
            conf.event && conf.event(dialog);
        });
    },

    toastrSuccess: function (message) {
        $.toast({
            text: message,
            position: 'top-center',
            icon: 'success'
        });
    },

    toastrWarning: function (message) {
        $.toast({
            text: message,
            position: 'top-center',
            icon: 'warning'
        });
    },

    toastrError: function (message) {
        $.toast({
            text: message,
            position: 'top-center',
            icon: 'error'
        });
    },

    toastrInfo: function (message) {
        $.toast({
            text: message,
            position: 'top-center',
            icon: 'info'
        });
    },
    toastrWarning: function (n, t) {
        let i = $.toastr.message;
        (i != n || $(".toastr-container:visible").length == 0) && ($.toastr.message = n,
            $.toastr.warning(n, $.extend({
                position: positionToastr,
                time: timeToastr
            }, t || {})))
    },
}