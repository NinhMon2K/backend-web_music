
class monan {
    constructor() {
        this.init();

    }
    init() {
        this.loadDanhSachMonAn();
        this.addForm();
        this.setImage();
        this.SaveFood();
        this.addCombobox();


    }

    execImport(n) {
        let t = this
            , i = Object.values(n).map(n => t.handleUploadFile(n));
        return Promise.all(i)
    }

    callApi(nameAPI) {
        return AppUtil.getURLApi('Dictionary', nameAPI);
    }
    setImage() {
        let me = this;

        $('#hinhanh_ma').on('change', function (e) {
            me.file = this.files && this.files[0];
        });


    }
    addCombobox() {
        let me = this;
        let sel = $('#lt_type_dish_filter');
        AppAjax.Ajax(me.callApi('LoadLoaiMonAn'), {}, {}, function (data) {

            me.formdata = data;
            data.forEach((item, i) => {
                let opp = $('<option>', {
                    value: item.idloaimonan,
                    text: item.tenloai,
                    class: 'cboLoai_ma'
                }).appendTo(sel);
            });
        })
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

            $('#dialog-form').dialog('close');
        });

        me.changeFileToImage('hinhanh_ma', '#blah');

    }
    SaveFood() {
        var me = this;
        Validator({
            form: '#form-1',
            formGroupSelector: '.box_right',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequired('#name_ma', 'Vui lòng nhập tên món ăn!'),


                Validator.isRequired('#noiban_ma', 'Vui lòng nhập nơi bán món ăn!'),
                Validator.isRequired('#mota_ma'),

            ],
            onSubmit: function (data) {
                // Call API

            }
        });
        $('.right-footer').on('click', '#btn_luu', () => {


            me.callAjaxUploadFile().then(() => {
                let anh = '';
                anh = me.anh;


                let tenmonan = $('#name_ma').val();

                let mota = $('#mota_ma').val();
                let loaimon = $('#lt_type_dish_filter').val();
                let cachlam = $('#cachlam_ma').val();
                let noiban = $('#noiban_ma').val();
                let us = {
                    id: me.id,
                    tenmonan: tenmonan,
                    anh: anh,    
                    mota: mota,
                    idloaimonan: parseInt(loaimon),
                    cachlam: cachlam,
                    noiban: noiban,
                }

                switch (me.Mode) {
                    case 1: {
                        let data = {
                            Mode: 1,
                            Formdata: JSON.stringify(us)
                        }

                        AppAjax.Ajax(me.callApi('SaveFood'), { type: 'POST' }, JSON.stringify(data), function (data) {

                            if (data) {

                                toastr.success('Thêm mới thành công');
                                $('#name_ma').val('');
                                $('#cachlam_ma').val('');
                                $('#hinhanh_ma').val('')
                                $('#noiban_ma').val('');
                                $('#mota_ma').val('');

                                let a = setTimeout(() => {
                                    $('#dialog-form').dialog('close');
                                    $('#table_id').bootstrapTable('refresh');
                                }, 200);

                            } else {
                                toastr.error('Thêm mới thất bại');

                            }
                        })

                        break;
                    }
                    case 3: {


                        let data = {
                            Mode: 3,
                            Formdata: JSON.stringify(us)
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
                                    AppAjax.Ajax(me.callApi('SaveFood'), { type: 'POST' }, JSON.stringify(data), function (data) {

                                        if (data) {
                                            $('#name_ma').val('');
                                            $('#cachlam_ma').val('');
                                            $('#hinhanh_ma').val('');
                                            $('#noiban_ma').val('');
                                            $('#mota_ma').val('');
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

            const file = document.querySelector('#hinhanh_ma');
            file.value = '';
            $('#noiban_ma').val('');
            $('#mota_ma').val('');
            $('#dialog-form').dialog('close');
        });

    }
    loadDanhSachMonAn() {
        let me = this;
        $('.item_QLMA').addClass('actives');
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
            pageList: [5, 7, 8, 9, 10],
            pageSize: 5,
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

            filterColumn: ['tenmonan'],

            onPostBody(data, bs) {

                bs.$body.off('click', '.btnDelete').on('click', '.btnDelete', (e) => {
                    let index = $(e.currentTarget).closest('tr').data('index');
                    let item = data[index];
                    let idMonan = parseInt(item.id);
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

                                AppAjax.Ajax(me.callApi('DeleteMonAn'), {}, { idMonan }, function (data) {

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

                    let index = $(e.currentTarget).closest('tr').data('index');
                    let item = data[index];
                    let id = parseInt(item.id);
                    AppAjax.Ajax(me.callApi('LoadMonAnID'), {}, { id }, function (data) {
                        console.log(data);
                        if (data) {
                            data.forEach((item, i) => {
                                $('#name_ma').val(item.tenmonan);
                                $('#cachlam_ma').val(item.cachlam);
                                $('#video_ma').val(item.video);
                                $('#noiban_ma').val(item.noiban);
                                $('#mota_ma').val(item.mota);
                                $('#blah').attr('src', item.anh);

                            });



                        } else {
                            toastr.error('Không có dữ liêu.Thất bại!', { positionClass: 'toast-top-center' });

                        }

                    })
                    me.Mode = 3;
                    me.id = id;
                    dialog.dialog("open");
                });
              

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
                        ID.forEach((idMonan) => {
                            AppAjax.Ajax(me.callApi('DeleteMonAn'), {}, { idMonan }, function (data) {

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

    callAjaxUploadFile() {

        let me = this;
        let valid = true;

        if (this.file) {
            let name = me.file.name;
            let short = name.substring(name.lastIndexOf("."), name.length);

            valid = ['.png'].some(x => x == short);
            valid = ['.jpg'].some(x => x == short);
        }

        return new Promise((i, r) => {

            if (valid) {
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
            } else {
                i()
                me.anh = '';

            }


        });
    }

    onFormatIng(val) {
        return `<img src='${val}'></img>`;
    }
    onFormatChecked(val) {
        return `<input type='checkbox' data-checkbox ='true' true, class='check_item' data-id=${val}>`;
    }
    onFormatVideo() {
        return `<i class='ti-video-camera'></i>`;
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


}
var monanr = new monan();