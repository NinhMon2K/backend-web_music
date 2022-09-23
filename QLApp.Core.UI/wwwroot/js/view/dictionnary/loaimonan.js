class loaimonan {
    constructor() {
        this.init();
    }
    init() {
        this.setImage();
        this.loadALLLoaiMA();
        this.addForm();
        this.saveTypeFood();
        this.deleteTypeFood();
        this.searchTypeFood();
        
    }
    callApi(nameAPI) {
        return AppUtil.getURLApi('Dictionary', nameAPI);
    }
    setImage() {
        let me = this;

        $('#img_type_desh').on('change', function (e) {
            me.file = this.files && this.files[0];
        });
    }
    searchTypeFood() {
        let me = this;
       
        $('.header__search__bar__input').off('change', '#txt_search').on('change', '#txt_search', () => {
            if ($('#txt_search').val() == '') {
                    me.loadALLLoaiMA()
                } else {
                    let DS = me.DSMA;
                let r = DS.filter(data => data.tenloai == $('#txt_search').val());
                    let listDS = $('.container_list_product_type-dish');
                listDS.html('');

                if (r.length == 0) {

                    listDS.html('Không có dữ liệu.Mời nhập lại!');
                }
                else {
                    r.forEach((item, i) => {
                        let product = $('<div>', {
                            class: 'item_product_type-dish',
                            data: {
                                ID: item.idloaimonan
                            }
                        }).appendTo(listDS);
                        let box_img = $('<div>', {
                            class: 'img_type-dish'
                        }).appendTo(product);
                        let box_name = $('<div>', {
                            class: 'name_type_dish'
                        }).appendTo(product);
                        let box_delete = $('<div>', {
                            class: 'box_delete_type_dish',
                            data: {
                                ID: item.idloaimonan
                            }
                        }).appendTo(product);

                        let img = $('<img>', {
                            src: item.anh
                        }).appendTo(box_img);

                        let p = $('<p>', {
                            text: item.tenloai
                        }).appendTo(box_name);

                        let iDelete = $('<i>', {
                            class: 'ti-trash'
                        }).appendTo(box_delete);
                    });
                }
                }
        });
    }
    resetForm() {
        $('#name_type_desh').val('');
        $('.img-back').removeAttr('src');
        $('#txt_search').val('');
    }
    addForm() {
        let me = this;
        let dialog = $("#dialog-form").dialog({
            autoOpen: false,
            height: 740,
            width: 700,
            modal: true,

        });
        $('.container_list_product_type-dish').on('dblclick', '.item_product_type-dish', (e) => {
            dialog.dialog("open");
            let id = $(e.currentTarget).data('ID');
            AppAjax.Ajax(me.callApi('LoadLoaiMonAnIDs'), {}, { id }, function (data) {
                console.log(data);
                data.forEach((item, i) => {
                    $('#name_type_desh').val(item.tenloai);
                    $('#blah').attr('src', item.anh);
                });
            });

            me.Mode = 3;
            me.Id = id;
        });
        $("#btn_add").button().on("click", function () {
            dialog.dialog("open");
            me.Mode = 1;
            me.Id = null;
            me.resetForm();
        });

        $('.btn_left').on('click', '#btn_close', (e) => {

            me.resetForm();
            $('#dialog-form').dialog('close');
        });
        me.changeFileToImage('img_type_desh', '#blah');
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
    saveTypeFood() {

        var me = this;
        Validator({
            form: '#form-1',
            formGroupSelector: '.box_right',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequired('#name_type_desh', 'Vui lòng nhập tên!'),
            ],
            onSubmit: function (data) {
                console.log(data);
            }
        });
       
       
        $('.right-footer').on('click', '#btn_luu', () => {
            me.callAjaxUploadFile().then(() => {
                let tenloai = $('#name_type_desh').val();


                let typefood = {
                    idloaimonan: me.Id,
                    tenloai: tenloai,
                    anh: me.anh
                }
                let typefoodAdd = {           
                    tenloai: tenloai,
                    anh: me.anh
                }

                switch (me.Mode) {
                    case 1: {
                        let data = {
                            Mode: 1,
                            Formdata: JSON.stringify(typefoodAdd)
                        }

                        AppAjax.Ajax(me.callApi('SaveTypeFood'), { type: 'POST' }, JSON.stringify(data), function (data) {

                            if (data) {

                                toastr.success('Thêm mới thành công');
                                $('#name_type_desh').val('');
                              
                                me.loadALLLoaiMA();
                                $('#dialog-form').dialog('close');


                            } else {
                                toastr.error('Thêm mới thất bại');
                             
                            }
                        })
                        me.resetForm();
                        break;
                    }
                    case 3: {


                        let data = {
                            Mode: 3,
                            Formdata: JSON.stringify(typefood)
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
                                    let r = this;
                                    AppAjax.Ajax(me.callApi('SaveTypeFood'), { type: 'POST' }, JSON.stringify(data), function (data) {

                                        if (data) {
                                            $('#name_type_desh').val('');
                                            toastr.success('Sửa dữ liệu thành công!', { positionClass: 'toast-top-center' })
                                            me.loadALLLoaiMA();
                                            $('#dialog-form').dialog('close');
                                        } else {
                                            toastr.error('Sửa dữ liệu thất bại!', { positionClass: 'toast-top-center' });

                                        }

                                    })
                                    me.resetForm();
                                    $(r).dialog('close');
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
    deleteTypeFood() {
        let me = this;
        $('.item_product_type-dish').on('click', '.box_delete_type_dish', (e) => {
            let id = $(e.currentTarget).data('ID');



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
                        AppAjax.Ajax(me.callApi('DeleteTypeFood'), {}, { id }, function (data) {
                            if (data) {
                                toastr.success('Xóa dữ liệu thành công', { positionClass: 'toast-top-center' });
                             
                                $('#dialog-form').dialog('close');
                                me.loadALLLoaiMA();


                            } else {
                                toastr.error('Xóa dữ liệu thất bại', { positionClass: 'toast-top-center' });
                            }
                            $(ele).dialog('close');
                            me.loadALLLoaiMA();
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
        })
    }
    loadALLLoaiMA() {
        let me = this;
        $('.item_QLMA').addClass('actives');
        AppAjax.Ajax(me.callApi('LoadLoaiMonAn'), {}, {}, function (data) {
            me.DSMA = data;
            let listDS = $('.container_list_product_type-dish');
            listDS.html('');
            data.forEach((item, i) => {
                let product = $('<div>', {
                    class: 'item_product_type-dish',
                    data: {
                        ID: item.idloaimonan
                    }
                }).appendTo(listDS);
                let box_img = $('<div>', {
                    class: 'img_type-dish'
                }).appendTo(product);
                let box_name = $('<div>', {
                    class: 'name_type_dish'
                }).appendTo(product);
                let box_delete = $('<div>', {
                    class: 'box_delete_type_dish',
                    data: {
                        ID: item.idloaimonan
                    }
                }).appendTo(product);

                let img = $('<img>', {
                    src: item.anh
                }).appendTo(box_img);

                let p = $('<p>', {
                    text: item.tenloai
                }).appendTo(box_name);

                let iDelete = $('<i>', {
                    class: 'ti-trash'
                }).appendTo(box_delete);
            });
        });
    }
}
var loaimonans = new loaimonan();