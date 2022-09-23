

class nguoidung {
    constructor() {
        this.init();

    }
    init() {
        this.loadNguoiDung();
        this.addForm();
        this.setImage();
        this.SaveNguoiDung();
    //    this.addCombobox();


    }


    callApi(nameAPI) {
        return AppUtil.getURLApi('Dictionary', nameAPI);
    }
    setImage() {
        let me = this;

        $('#hinhanh_nd').on('change', function (e) {
            me.file = this.files && this.files[0];
        });

    }
   
    addForm() {
        let me = this;
        let dialog = $("#dialog-form").dialog({
            autoOpen: false,
            height: 740,
            width: 1030,
            modal: true,

        });
        $("#btn_add").button().on("click", function () {
            dialog.dialog("open");
            me.Mode = 1;
            me.Id = null;
        });

        $('.btn_left').on('click', '#btn_close', (e) => {
            $('.img-back').removeAttr('src');
            $('#dialog-form').dialog('close');
        });
        me.changeFileToImage('hinhanh_nd', '#blah');


    }
    SaveNguoiDung() {
        var me = this;
        Validator({
            form: '#form-1',
            formGroupSelector: '.box_right',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequired('#fullname_nd', 'Vui lòng nhập tên!'),
                Validator.isRequired('#hinhanh_nd', 'Vui lòng chọn ảnh!'),
                Validator.isRequired('#ngaysinh', 'Vui lòng nhập ngày sinh!'),
                Validator.isEmail('#email', 'Vui lòng nhập email!'),
                Validator.isRequired('#sdt', 'Vui lòng nhập số điện thoại!'),         
            ],
            onSubmit: function (data) {
                // Call API

            }
        });
        $('.right-footer').on('click', '#btn_luu', () => {


            me.callAjaxUploadFile().then(() => {
                let anh = '';
                anh = me.anh;

                let tendaydu = $('#fullname_nd').val();
                //let mota = $('#hinhanh_nd').val();
                let ngaysinh = $('#ngaysinh').val();
                let email = $('#email').val();
                let sdt = $('#sdt').val();
                let gioitinh = $('input[type="radio"][name="sex"]:checked').val();
                let nguoidung = {
                    id: me.id,
                    tendaydu: tendaydu,
                    anhdaidien: anh,
                    ngaysinh: ngaysinh,
                    email: email,
                    gioitinh: parseInt(gioitinh),
                    sdt: sdt,
                }

                switch (me.Mode) {
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
                                    AppAjax.Ajax(me.callApi('SaveNguoiDung'), { type: 'POST' }, JSON.stringify(data), function (data) {

                                        if (data) {
                                        
                                            toastr.success('Sửa dữ liệu thành công!', { positionClass: 'toast-top-center' })
                                            $('#dialog-form').dialog('close');

                                            let a = setTimeout(() => {
                                                $('#table_id').bootstrapTable('refresh');
                                            }, 200);

                                        } else {
                                            toastr.error('Sửa dữ liệu thất bại!', { positionClass: 'toast-top-center' });

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

        $('.btn_left').on('click', '#btn_close', (e) => {
            $('#name_ma').val('');
            $('#cachlam_ma').val('');
            $('#noiban_ma').val('');
            $('#mota_ma').val('');
            $('#dialog-form').dialog('close');
        });

    }
    loadNguoiDung() {
        let me = this;
        $('.item_ND').addClass('actives');
        let dialog = $("#dialog-form").dialog({
            autoOpen: false,
            height: 740,
            width: 600,
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
                    let id = parseInt(item.id);
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
                                AppAjax.Ajax(me.callApi('DeleteND'), {}, { id }, function (data) {

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

                bs.$body.off('click', '.btnUpdate').on('click', '.btnUpdate', (e) => {

                    let index = $(e.currentTarget).closest('tr').data('index');
                    let item = data[index];
                    let id = parseInt(item.id);
                    dialog.dialog("open");
                    AppAjax.Ajax(me.callApi('LoadNguoiDungID'), {}, { id }, function (data) {

                        if (data) {
                            data.forEach((item, i) => {
                                $('#fullname_nd').val(item.tendaydu);
                            //    $('#hinhanh_nd').val(item.anhdaidien);
                                let dates = item.ngaysinh.substring(0, 10);
                                $('#ngaysinh').val(dates);
                                $('#email').val(item.email);
                                $('#sdt').val(item.sdt);
                                $('#blah').attr('src', item.anhdaidien);
                                if (item.gioitinh == '1') {
                                    $("#rdonam").prop("checked", true);
                                }
                                else {
                                    $("#rdonu").prop("checked", true);
                                }
                            });



                        } else {
                            toastr.error('Không có dữ liêu.Thất bại!', { positionClass: 'toast-top-center' });

                        }

                    })
                    me.Mode = 3;
                    me.id = id;
                    
                });
                $('.container-table').on('click', '.btnUpdate', (e) => {

                })

            }

        };

        $('#table_id').bootstrapTable(option);

        $('.btn-left').on('click', '.btn_delete', e => {
            let ID = [];

            ID = $.map($('#table_id').bootstrapTable('getSelections'), function (row) {

                return row.id
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
                        ID.forEach((id) => {
                            AppAjax.Ajax(me.callApi('DeleteND'), {}, { id }, function (data) {

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
    onFormatIng(val) {
        return `<img src='${val}'></img>`;
    }
    onFormatChecked(val) {
        return `<input type='checkbox' data-checkbox ='true' true, class='check_item' data-id=${val}>`;
    }

    onFormatUpdate() {
        return `<div class='btnUpdate'><i class='ti-file'></i></div>`;
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
    onFormatDate(val) {
        let dates = val.substring(0,10);
        return `${dates.split(' ')[0].split('-').reverse().join('-')}`;
    }
    onFormatGT(val) {
        let pq = '';
        if (val == '0') {
            pq = 'Nữ'
        }
        else {
            pq = 'Nam'
        }
        return pq;
    }
    
}

var nd = new nguoidung();