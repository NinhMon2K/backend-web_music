
class baoloi {
    constructor() {
        this.init();

    }
    init() {
        this.setItem();       
        this.loadLoi();
        this.Done();
        this.confirm();
        this.totalItemMenu();
      
       
    }
  

    callApi(nameAPI) {
        return AppUtil.getURLApi('Dictionary', nameAPI);
    }
    setItem() {
        let me = this;
        me.formdata = AppUtil.getParam()
    }
    totalItemMenu() {
        let me = this;
        AppAjax.Ajax(me.callApi('LoadItemBaoLoi'), {}, {}, function (data) {
            data.forEach((item, i) => {

                $('.total_tong').text(item.Tong);
                $('.total_chuaxuly').text(item.chuaxuly);
                $('.total_daxuly').text(item.daxuly);
            });
        })

    }
    Done() {
        $('.btn_left').on('click', '#btn_close', (e) => {
            $('#dialog-form').dialog('close');
        });

    }
    loadLoi() {
        let me = this;
        $('.item_BL').addClass('actives');
        let dialog = $("#dialog-form").dialog({
            autoOpen: false,
            height: 740,
            width: 1030,
            modal: true,

        });

        let option = {
            responseHandler: function (res) {
                let data = res.Data || [];
                data.forEach((x, i) => { x.stt = i + 1 });
                return data;
            },


            totalField: "RecordsTotal",
            pageList: [5, 7, 8, 10],
            pageSize: 8,
            sidePagination: "client",
            undefinedText: "",
            silent: true,
            onCheck: function () {
                $('.btn_delete').prop('disabled', false);
            },

            queryParams: function () {
                $('.item-navbar').removeClass('active');
                if (me.formdata.status == '2') {

                    $('.item-navbar_3').addClass('active');
                } else if (me.formdata.status == '0') {
                    $('.item-navbar_2').addClass('active');
                } else {
                    $('.item-navbar_0').addClass('active');
                }
                return {

                    status: me.formdata.status,
                }

            },

            onUncheck: function () {
                $('.btn_delete').prop('disabled', true);
            },
            onCheckAll() {

                $('.btn_delete').prop('disabled', false);

            },

            onUncheckAll() {
                $('.btn_delete').prop('disabled', true);
            },

            onPostBody(data, bs) {
                bs.$body.off('click', '.btnDelete').on('click', '.btnDelete', (e) => {
                    let index = $(e.currentTarget).closest('tr').data('index');
                    let item = data[index];
                    let keyRPs = parseInt(item.keyRP);
                    $('<div>', {
                        text: 'Bạn thực sự muốn xóa !'
                    }).dialog({
                        title: 'Cảnh báo!',
                        modal: true,

                        buttons: [{
                            text: 'Xóa',
                            class: 'btn_kt',
                            id: 'btnCheckXoa',
                            click: function () {
                                let r = this;
                                AppAjax.Ajax(me.callApi('DeleteReport'), {}, { keyRPs }, function (data) {

                                    if (data) {

                                        toastr.success('Xóa dữ liệu thành công', { positionClass: 'toast-top-center' });

                                        let a = setTimeout(() => {
                                            $('#dialog-form').dialog('close');
                                            let a = setTimeout(() => {
                                                $('#dialog-form').dialog('close');
                                                $('#table_id').bootstrapTable('refresh');

                                            }, 200);

                                        }, 200);


                                    } else {
                                        toastr.error('Xóa dữ liệu thất bại', { positionClass: 'toast-top-center' });

                                    }
                                    $(r).dialog('close');
                                })

                            }
                        },
                        {
                            text: 'Không',
                            class: 'btn_kt',
                            id: 'btnCheckKhong',
                            click: function (e) {
                                $(this).dialog('close');

                            }
                        }
                        ]
                    })


                });
            }

        };

        $('#table_id').bootstrapTable(option);



        $('.btn-left').on('click', '.btn_delete', e => {
            let ID = [];

            ID = $.map($('#table_id').bootstrapTable('getSelections'), function (row) {

                return row.keyRP
            });

            let u = $('.check-box-index input:checked');
            $('<div>', {
                text: 'Bạn thực sự muốn xóa !'


            }).dialog({
                title: 'Cảnh báo!',
                modal: true,

                buttons: [{
                    text: 'Xóa',
                    class: 'btn_kt',
                    id: 'btnCheckXoa',
                    click: function () {
                        let ele = this;
                        ID.forEach((keyRPs) => {
                            AppAjax.Ajax(me.callApi('DeleteReport'), {}, { keyRPs }, function (data) {

                                if (data) {
                                    let a = setTimeout(() => {
                                        $('#dialog-form').dialog('close');
                                        let a = setTimeout(() => {
                                            $('#dialog-form').dialog('close');
                                            $('#table_id').bootstrapTable('refresh');

                                        }, 200);

                                    }, 200);


                                } else {
                                    toastr.error('Xóa dữ liệu thất bại', { positionClass: 'toast-top-center' });

                                }
                            })
                            $(ele).dialog('close');

                        });

                        toastr.success('Xóa dữ liệu thành công', { positionClass: 'toast-top-center' });
                    }

                },
                {
                    text: 'Không',
                    class: 'btn_kt',
                    id: 'btnCheckKhong',
                    click: function (e) {
                        $(this).dialog('close');

                    }
                }
                ]
            })

        });

    }
    loadThongBao() {
        let me = this;
        let p = $('.bell_item').find('p');

        AppAjax.Ajax(me.callApi('LoadThongBao'), {}, {}, function (data) {


            data.forEach((item, i) => {
                if (item.TongLoi == '0') {
                    $('.bell_item').hide();
                } else {

                    p.text(item.TongLoi);
                }
            });
        })
    }
    confirm() {
        let me = this;
        let ID = [];
        
        $('.btn-right').on('click', '#btn_check', (e) => {
            ID = $.map($('#table_id').bootstrapTable('getSelections'), function (row) {

                return row.keyRP;
            });
            ID.forEach((keyRP) => {
                AppAjax.Ajax(me.callApi('UpdateReport'), { }, { keyRP }, function (data) {

                    if (data) {
                        toastr.success('Xử lý dữ liệu thành công', { positionClass: 'toast-top-center' });
                        me.loadThongBao();
                        me.totalItemMenu();
                        let a = setTimeout(() => {
                            let a = setTimeout(() => {
                                $('#table_id').bootstrapTable('refresh');

                            }, 200);

                        }, 200);


                    } else {
                        toastr.error('Xử lý dữ liệu thất bại', { positionClass: 'toast-top-center' });

                    }
                })

            });
        });
    }

    getParam() {
        return {
            status: this.formdata.status || 1
        }
    }
    onFormatIng(val) {
        if (val == null) {
            return '';
        }
        else {
            return `<img src='${'../../../KTPM/Images/' + val}'></img>`;
        }
      
    }
    onFormatDelete() {
        return `<div class='btnDelete'> <i class='ti-trash'></i> </div>`;
    }
    getIdSelections() {
        return $('#table_id').map($('#table_id').bootstrapTable('getSelections'), function (row) {
            console.log(row.id);
            return `<i data-ID= '${row.id}' class='ti-trash'></i>`
        })
    }
    onFormatStatus(val) {
        let pq = '';
        if (val == '1') {
            pq = 'Đã xử lý'
        }
        else {
            pq = 'Chưa xử lý'
        }
        return pq;
    }
}
var bl = new baoloi();