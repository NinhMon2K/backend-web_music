

class login {
    constructor() {
        this.init();
    }
    init() {
        this.setImage();
        this.ChildPassword();
        this.addForm();
        this.loadUser();
        this.AddUser();
    }
    callApi(nameAPI) {
        return AppUtil.getURLApi('Login', nameAPI);
    }
    callApiUser(nameAPI) {
        return AppUtil.getURLApi('Dictionary', nameAPI);
    }


    setImage() {
        let me = this;

        $('#hinhanh_tk').on('change', function (e) {
            me.file = this.files && this.files[0];
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

    ChildPassword() {
        let iput = $('.child-password');
        let password = $('.text-password');
        iput.on('click', () => {
            if (password.attr('type') == 'password') {

                password.attr('type', 'text');

            }
            else {
                password.attr('type', 'password');
            }
        });
    }
    addForm() {

        let me = this;
        let dialog = $("#dialog-form").dialog({
            autoOpen: false,
            height: 740,
            width: 760,
            modal: true,

        });
        $("#registration-user").button().on("click", function () {
            dialog.dialog("open");
            me.resetForm();
            me.loadForm(2);
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
    loadUser() {
        let me = this;
        let btnLogin = $('#btn-login');
        btnLogin.on('click', () => {
            let username = $('#username').val();

            let password = $('#password').val();

            let user = {
                UserName: username,
                Password: password
            }
            AppAjax.Ajax(me.callApi('Login'), {}, {
                UserName: username,
                Password: password
            }, function (data) {
                if (data) {
                    localStorage.setItem('taikhoan', JSON.stringify(data));
                    let url = '/Dictionary/Home';
                    window.location.href = url;


                } else {
                    toastr.warning('Tài khoản hoặc mật khẩu không đúng, bạn không có quyền đăng nhập', { positionClass: 'toast-top-center' });

                }


            })

        });

    }

    AddUser() {
        let me = this;
        Validator({
            form: '#form-1',
            formGroupSelector: '.box_right',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequired('#taikhoan', 'Vui lòng nhập tên tài khoản!'),
                Validator.isR('#password_tk', 'Vui lòng nhập mật khẩu!'),
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
        $('.form-group').off('change', '#taikhoan').on('change', '#taikhoan', () => {
            let username = $('#taikhoan').val();
            let wa = $('.box_taikhoan .box_right').find('span');
            if (username == '') {
                wa.css('color', 'red');
                Validator({
                    form: '#form-1',
                    formGroupSelector: '.box_right',
                    errorSelector: '.form-message',
                    rules: [
                        Validator.isRequired('#taikhoan', 'Vui lòng nhập tên tài khoản!'),
                    ],
                    onSubmit: function (data) {
                        // Call API
                    }
                });


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
                 
                }, 1000);
            }
        });

        $('.right-footer').on('click', '#btn_luu', () => {


            me.callAjaxUploadFile().then(() => {
                let anh = '';
                anh = me.anh;

                let taikhoan = $('#taikhoan').val();

                let password = $('#password_tk').val();
                let pq = '1';
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


                let data = {
                    Mode: 1,
                    Formdata: JSON.stringify(nguoidung)
                }

                AppAjax.Ajax(me.callApiUser('SaveTaiKhoan'), { type: 'POST' }, JSON.stringify(data), function (data) {

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

            });
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
    lo
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

}
var ologin = new login(); 0