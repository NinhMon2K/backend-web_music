class taikhoan {
    constructor() {

        this.init();
    }
    init() {
        this.loadTaiKhoan();
        this.addForm();
        this.setImage();
        this.ChildPassword();
        this.saveTK();
        this.deleteTK();
    }
    callApi(nameAPI) {
        return AppUtil.getURLApi('Dictionary', nameAPI);
    }
    setImage() {
        let me = this;

        $('#hinhanh_tk').on('change', function (e) {
            me.file = this.files && this.files[0];
        });

    }
    deleteTK() {
        let me = this;
        $('.btn-left').on('click', '.btn_delete', e => {
            let ID = [];

            ID = $.map($('#table_id').bootstrapTable('getSelections'), function (row) {

                return row.tentaikhoan;
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
                        ID.forEach((data) => {
                            let tentaikhoan = '';
                            tentaikhoan = data;
                            AppAjax.Ajax(me.callApi('DeleteTaiKhoan'), {}, { tentaikhoan }, function (data) {

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
                            $(this).dialog('close');

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
    resetForm() {
        $('#taikhoan').val('');
        $('#password_tk').val('');
        $('#lt_type_dish_filter').val('');
        $('#fullname').val('');
        $('#sdt').val('');
        $('#email').val('');
        $('#ngaysinh').val('');
        $('#email').prop('disabled', false);
        $('#taikhoan').prop('disabled', false);
    }
    saveTK() {
        let me = this;
        $('.form-group').off('change', '#taikhoan').on('change', '#taikhoan', () => {
            let username = $('#taikhoan').val();
            let wa = $('.box_taikhoan .box_right').find('span');
            if (username == '') {
                wa.css('color', 'red');
                var a = Validator({
                    form: '#form-1',
                    formGroupSelector: '.box_right',
                    errorSelector: '.form-message',
                    rules: [
                        Validator.isRequired('#taikhoan', 'Vui lòng nhập tên tài khoản!'),


                    ],
                    onsubmit: function (data) {
                        // Call API

                    }
                });
                console.log(a);

            } else {

                setTimeout((e) => {


                    AppAjax.Ajax(AppUtil.getURLApi('Login', 'CheckUser'), {}, {
                        UserName: username
                    }, function (data) {
                        if (data) {
                            wa.css('color', 'red');
                            wa.text('Tài khoản đã được dùng.Vui lòng nhập tài khoản khác!');
                        } else {
                            wa.css('color', '#FF9900');
                            wa.text('Tài khoản hợp lệ!');
                        }


                    })
                    //console.log($('#taikhoan').val());

                }, 1000);
            }
        });

        $('.right-footer').on('click', '#btn_luu', () => {

            Validator({
                form: '#form-1',
                formGroupSelector: '.box_right',
                errorSelector: '.form-message',
                rules: [
                    Validator.isRequired('#taikhoan', 'Vui lòng nhập tên tài khoản!'),
                    Validator.isRequired('#password_tk', 'Vui lòng nhập mật khẩu!'),
                    Validator.isRequired('#fullname', 'Vui lòng nhập tên người dùng!'),
                    Validator.isRequired('#sdt', 'Vui lòng nhập số điện thoại!'),
                    Validator.isRequired('#ngaysinh', 'Vui lòng nhập ngày sinh!'),
                    Validator.isEmail('#email', 'Vui lòng nhập email!')

                ],
                onSubmit: function (data) {
                    // Call API
                    console.log(data);
                }
            });
          



            me.callAjaxUploadFile().then(() => {
                let anh = '';
                anh = me.anh;

                let taikhoan = $('#taikhoan').val();

                let password = $('#password_tk').val();
                let pq = $('#lt_type_dish_filter').val();
                let name = $('#fullname').val();
                let sdt = $('#sdt').val();
                let email = $('#email').val();
                let gioitinh = $('input[type="radio"][name="sex"]:checked').val();
                let ngaysinh = $('#ngaysinh').val();
                let nguoidung = {
                    tentaikhoan: taikhoan,
                    matkhau: password,
                    quyen: parseInt(pq),
                    tendaydu: name,
                    anhdaidien: anh,
                    ngaysinh: ngaysinh,
                    email: email,
                    gioitinh: parseInt(gioitinh),
                    sdt: sdt,
                }

                switch (me.Mode) {
                    case 1: {
                        let data = {
                            Mode: 1,
                            Formdata: JSON.stringify(nguoidung)
                        }

                        AppAjax.Ajax(me.callApi('SaveTaiKhoan'), { type: 'POST' }, JSON.stringify(data), function (data) {

                            if (data) {

                                toastr.success('Thêm mới thành công');

                                $('#dialog-form').dialog('close');
                                me.resetForm();
                                let a = setTimeout(() => {
                                    $('#table_id').bootstrapTable('refresh');
                                }, 200);

                            } else {
                                toastr.error('Thêm mới thất bại');
                                $('#dialog-form').dialog('close');
                                me.resetForm();
                            }
                        })

                        break;
                    }
                    case 3: {


                        let data = {
                            Mode: 3,
                            Formdata: JSON.stringify(nguoidung)
                        }

                        $('<div>', {
                            text: 'Bạn thực sự muốn sửa !'
                        }).dialog({
                            title: 'Cảnh báo!',
                            modal: true,

                            buttons: [{
                                text: 'Sửa',
                                class: 'btn_kt',
                                id: 'btnCheckSua',
                                click: function () {
                                    AppAjax.Ajax(me.callApi('SaveTaiKhoan'), { type: 'POST' }, JSON.stringify(data), function (data) {

                                        if (data) {

                                            toastr.success('Sửa dữ liệu thành công!', { positionClass: 'toast-top-center' })
                                            $('#dialog-form').dialog('close');

                                            let a = setTimeout(() => {
                                                me.resetForm();
                                                $('#table_id').bootstrapTable('refresh');
                                            }, 200);

                                        } else {
                                            toastr.error('Sửa dữ liệu thất bại!', { positionClass: 'toast-top-center' });
                                            me.resetForm();
                                        }

                                    })
                                    $(this).dialog('close');
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


                        break;
                    }
                }
            });
        });

    }
    ChildPassword() {
        let iput = $('.child-password');
        let password = $('#password_tk');
        iput.on('click', () => {
            if (password.attr('type') == 'password') {

                password.attr('type', 'text');

            }
            else {
                password.attr('type', 'password');
            }
        });
    }
    loadForm(step) {
        let me = this;


        switch (step) {
            case 1: {
                $('.page_row-' + step).hide();
                $('.page_row-' + (parseInt(step) + 1)).show();
                $('#btn_trove').show();
                $('#btn_close').hide();
                $('#btn_tieptheo').hide();
                $('#btn_luu').show();
                break;
            }

            case 2: {

                $('.page_row-' + step).hide();
                $('.page_row-' + (parseInt(step) - 1)).show();
                $('#btn_trove').hide();
                $('#btn_close').show();
                $('#btn_tieptheo').show();
                $('#btn_luu').hide();
                break;
            }

        }



    }
    addForm() {
        let me = this;
        let dialog = $("#dialog-form").dialog({
            autoOpen: false,
            height: 740,
            width: 760,
            modal: true,

        });
        $("#btn_add").button().on("click", function () {
            dialog.dialog("open");
            me.resetForm();
            me.loadForm(2);
            me.Mode = 1;
        });
        $('.right-footer').on("click", '#btn_tieptheo', function () {
            dialog.dialog("close");
            me.loadForm(1);
            dialog.dialog("open");

        });
        $('.left-footer').on("click", '#btn_trove', function () {
            dialog.dialog("close");
            me.loadForm(2);
            dialog.dialog("open");

        });

        $('.btn_left').on('click', '#btn_close', (e) => {

            $('#dialog-form').dialog('close');
            me.resetForm();
            me.loadForm(2);
        });
        me.changeFileToImage('hinhanh_tk', '#blah');

    }
    changeFileToImage(idFile, idImage) {
        document.getElementById(idFile).onchange = function () {


            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $(idImage).attr('src', e.target.result);
                }
                reader.readAsDataURL(this.files[0]);
            }
        };
    }
    loadTaiKhoan() {
        let me = this;
        $('.item_TK').addClass('actives');
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
                    let tentaikhoan = item.tentaikhoan;
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
                                AppAjax.Ajax(me.callApi('DeleteTaiKhoan'), {}, { tentaikhoan }, function (data) {

                                    if (data) {

                                        toastr.success('Xóa dữ liệu thành công', { positionClass: 'toast-top-center' });
                                        me.resetForm();
                                        let a = setTimeout(() => {
                                            $('#dialog-form').dialog('close');
                                            let a = setTimeout(() => {
                                                $('#dialog-form').dialog('close');
                                                $('#table_id').bootstrapTable('refresh');

                                            }, 200);

                                        }, 200);


                                    } else {
                                        toastr.error('Xóa dữ liệu thất bại', { positionClass: 'toast-top-center' });
                                        me.resetForm();
                                    }
                                    $(ele).dialog('close');
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



                bs.$body.off('click', '.btnUpdate').on('click', '.btnUpdate', (e) => {
                    //$('#taikhoan').removeEventListener("change", function () {

                    //});
                    let index = $(e.currentTarget).closest('tr').data('index');
                    let item = data[index];
                    let tentaikhoan = item.tentaikhoan;
                    AppAjax.Ajax(me.callApi('GetTaiKhoanID'), {}, { tentaikhoan }, function (data) {

                        if (data) {
                            data.forEach((item, i) => {

                                $('#email').prop('disabled', true);
                                $('#taikhoan').prop('disabled', true);
                                $('#taikhoan').val(item.tentaikhoan);
                                $('#password_tk').val(item.matkhau);
                                $('#blah').attr('src', item.anhdaidien);
                                let pq = '';
                                if (item.quyen == '1') {
                                    pq = 'Admin';
                                } else {
                                    pq = 'Người dùng'
                                }
                                $('#lt_type_dish_filter').value = pq;
                                $('#fullname').val(item.tendaydu);
                                $('#sdt').val(item.sdt);
                                $('#email').val(item.email);
                                let dates = item.ngaysinh.substring(0, 10);
                                $('#ngaysinh').val(dates);
                                if (item.gioitinh == '1') {
                                    $("#rdonam").prop("checked", true);
                                }
                                else {
                                    $("#rdonu").prop("checked", true);
                                }


                            });



                        } else {
                            toastr.error('Không có dữ liêu.Thất bại!', { positionClass: 'toast-top-center' });
                            me.resetForm();
                        }

                    })
                    me.Mode = 3;

                    dialog.dialog("open");
                });




            }

        };

        $('#table_id').bootstrapTable(option);

    }
    callAjaxUploadFile() {

        return new Promise((i, r) => {

            let me = this;

            let formdata = new FormData();
            let config = {
                type: 'POST',
                data: formdata,
                contentType: false,
                cache: false,
                enctype: "multipart/form-data",
                processData: false,
            }
            formdata.append('file', me.file);

            AppAjax.Ajax(me.callApi('SaveImage'), config, {}, function (data) {

                me.anh = data;
                if (data) {

                    i();

                } else {
                    toastr.error('Thêm mới thất bại');

                }
            })
        });
    }
    onFormatUpdate() {
        return `<div class='btnUpdate'><i class='ti-file'></i></div>`;
    }
    onFormatDelete() {
        return `<div class='btnDelete'> <i class='ti-trash'></i> </div>`;
    }
    onFormatDecentralization(val) {
        let pq = '';
        if (val == '2') {
            pq = 'Người dùng'
        }
        else {
            pq = 'Admin'
        }
        return pq;
    }
    onFormatDate(val) {
        return
        val.split(' ')[0].split('-').reverse().join('-');
    }
    onFormatPassword(val) {
        let pw = '';
        for (let i = 0; i < val.length; i++) {
            pw = pw + '*';
        }
        return pw;
    }
}
var taikhoano = new taikhoan();