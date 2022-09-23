class sideBar {

    constructor() {
        this.init();
    }

    init() {
        this.initMenu();
        this.initUser();
        this.initToolTip();
        this.setUserInfo();
        this.LogoutUser();
        this.loadThongBao();
       
    }
    callApi(nameAPI) {
        return AppUtil.getURLApi('Dictionary', nameAPI);
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
    
    setUserInfo() {
        let taikhoan = JSON.parse(localStorage.getItem('taikhoan')) ;
        $('.user-name').text(taikhoan.tentaikhoan);
        $('.img_userinfo').attr("src", taikhoan.anhdaidien);

    }
    LogoutUser() {
        $('#btnLogout').on('click', () => {
            localStorage.removeItem('taikhoan');

        });

    }
    initMenu() {
        var arrow = $(".arrow");
        for (var i = 0; i < arrow.length; i++) {
            arrow[i].addEventListener("click", (e) => {
                let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
                arrowParent.classList.toggle("showMenu");
            });
        }
        let sidebar = document.querySelector(".sidebar");
        let sidebarBtn = document.querySelector(".bx-menu");
        sidebarBtn.addEventListener("click", () => {
            sidebar.classList.toggle("close");
        });

    }

    initUser() {

        let contentUser = $('.user');
        let user_info = $('.user-info');
       
        contentUser.on('click', function () {
            user_info.css('display', 'flex');
            setTimeout(function () {
                user_info.css('display', 'none');
            }, 8000);
        });
        contentUser.on('dblclick', function () { 
                user_info.css('display', 'none');
        });

        
       
    }

    initToolTip() {

        $(document).tooltip({
            position: {
                my: "center bottom-15",
                at: "center top",
                using: function (position, feedback) {
                    $(this).css(position);
                    $("<div>")
                        .addClass("arrows")
                        .addClass(feedback.vertical)
                        .addClass(feedback.horizontal)
                        .appendTo(this);
                }
            }
        });
    }
}
var osideBar = new sideBar();






