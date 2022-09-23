

/* global Chart:false */
class home {
    constructor() {
        this.init();
    }
    init() {
        this.loadThongKe();
        this.listMenu();
        this.loadDanhGia();
    }
    listMenu() {
        let me = this;
        $('.item_TQ').addClass('actives');
        let arr = [{
            indexTotal: '0',
            name: 'Món ăn',
            iconItem: 'ti-home',
            link: '/Dictionary/monan'
        },

        {
            indexTotal: '0',
            name: 'Tài khoản',
            iconItem: 'ti-user',
            link: '/Dictionary/taikhoan'
        },
        {
            indexTotal: '0',
            name: 'Báo lỗi',
            iconItem: 'ti-alert',
            link: '/Dictionary/baoloi'
        },
        {
            indexTotal: '0',
            name: 'Câu hỏi',
            iconItem: 'ti-help-alt',
            link: '/Dictionary/cauhoi'
        },


        ];
        let list = $('.menu-group').html('');
        let i = 0;
        arr.forEach((x, i) => {
            let $item = $('<a>', {
                id: i,
                class: 'item-navbar item-navbar_'+i,
                href: x.link,
                data: {
                    index: i
                }

            }).data('data', x).appendTo(list);

            let $navbarLeft = $('<div>', {
                class: 'navbar-left'
            }).appendTo($item);
            let $navbarRight = $('<div>', {
                class: 'navbar-right'
            }).appendTo($item);

            let $total = $('<div>', {
                class: 'total',
                text: x.indexTotal
            }).appendTo($navbarLeft);
            let $nametotal = $('<div>', {
                class: 'name-total',
                text: x.name
            }).appendTo($navbarLeft);


            let $icon = $('<div>', {
                class: 'icon-navbar'
            }).appendTo($navbarRight);
            let $ic = $('<i>', {
                class: x.iconItem
            }).appendTo($icon);
        }



        )

        AppAjax.Ajax(me.callApi('LoadItemMenu'), {}, {}, function (data) {
            data.forEach((item, i) => {
                $('#0 .total').text(item.MonAn)
                $('#1 .total').text(item.TaiKhoan)
                $('#2 .total').text(item.BaoLoi)
                $('#3 .total').text(item.CauHoi)
            });
        })


    }
    callApi(nameAPI) {
        return AppUtil.getURLApi('Dictionary', nameAPI);
    }
    loadThongKe() {
        let me = this;
        let Dem = [];
        let tenMon = [];    
        setInterval(() => { }, 2000);
        AppAjax.Ajax(me.callApi('LoadThongKe'), {}, {}, function (data) {

            Dem = data.map((x) => x.Dem);
            tenMon = data.map((x) => x.tenmonan);
            data.forEach((item, i) => {
                $('.text-lg').text(item.Tong);
            });
        })
       

        let ticksStyle = {
            fontColor: '#495057',
            fontStyle: 'bold'
        }

        let mode = 'index'
        let intersect = true

        let $salesChart = $('#sales-chart');
        // eslint-disable-next-line no-unused-vars
        let salesChart = new Chart($salesChart, {
            type: 'bar',
            data: {
                labels: tenMon,


                datasets: [{
                    backgroundColor: '#007bff',
                    borderColor: '#007bff',
                    data: Dem,

                    fill: false
                }

                ]
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    mode: mode,
                    intersect: intersect
                },
                hover: {
                    mode: mode,
                    intersect: intersect
                },
                legend: {
                    display: false
                },
                sscales: {
                    yAxes: [{
                        // display: false,
                        gridLines: {
                            display: true,
                            lineWidth: '4px',
                            color: 'rgba(0, 0, 0, .2)',
                            zeroLineColor: 'transparent'
                        },
                        ticks: $.extend({
                            beginAtZero: true,
                            suggestedMax: 6
                        }, ticksStyle)
                    }],
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false
                        },
                        ticks: ticksStyle
                    }]
                }
            }
        });

        

    }

    loadDanhGia() {
        let me = this;
      
        let DemDG = [];
        let tenMonDG = [];
        AppAjax.Ajax(me.callApi('LoadCountDanhGia'), {}, {}, function (data) {

            DemDG = data.map((x) => x.Dem);
            tenMonDG = data.map((x) => x.tenmonan);
            data.forEach((item, i) => {
                $('.text-Tong').text(item.Tong);
            });
        });
        let ticksStyle = {
            fontColor: '#38D8E4',
            fontStyle: 'bold'
        }

        let mode = 'index'
        let intersect = true
        let salesCharts = new Chart($('#sales-chart_danhgia'), {
            type: 'bar',
            data: {
                labels: tenMonDG,


                datasets: [{
                    backgroundColor: '#0080ff',
                    borderColor: '#0080ff',
                    data: DemDG,

                    fill: false
                }

                ]
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    mode: mode,
                    intersect: intersect
                },
                hover: {
                    mode: mode,
                    intersect: intersect
                },
                legend: {
                    display: false
                },
                sscales: {
                    yAxes: [{
                        // display: false,
                        gridLines: {
                            display: true,
                            lineWidth: '4px',
                            color: 'rgba(0, 0, 0, .2)',
                            zeroLineColor: 'transparent'
                        },
                        ticks: $.extend({
                            beginAtZero: true,
                            suggestedMax: 6
                        }, ticksStyle)
                    }],
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false
                        },
                        ticks: ticksStyle
                    }]
                }
            }
        });

    }
}
var homeo = new home();
