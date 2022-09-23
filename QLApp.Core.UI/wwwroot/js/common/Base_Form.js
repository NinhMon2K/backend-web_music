////class BaseForm {
////    constructor(n) {
////        super(n);
////        let t = this
////    }
////    getUploadFileSuccess() {
////        return this.file.filter(n => n.Status == MISA.Enumeration.FileStatus.Success)
////    }
////    getUploadFileFail() {
////        return this.file.filter(n => n.Status == MISA.Enumeration.FileStatus.Fail)
////    }
////    addFileSuccess(n) {
////        n && (n.Status = MISA.Enumeration.FileStatus.Success,
////            this.file.unshift(n))
////    }
////    addFileFail(n) {
////        n && (n.Status = MISA.Enumeration.FileStatus.Fail,
////            this.file.push(n))
////    }
////    deleteFileItem(n) {
////        let t = n && n.FileID || "";
////        this.file = this.file.filter(n => n.FileID != t)
////    }
////    getUploadFileActive() {
////        return this.findElement("[data-control-type=UploadFile].active")
////    }

////    initUploadFileInput() {
////        let n = this
////            , t = n.findElement("[data-control-type=UploadFile]");
////        $.each(t, (t, i) => {
////            let r = $(i)
////                , u = r.find(".drag-box")
////                , f = t => {
////                    if (n.findElement("[data-control-type=UploadFile].active").removeClass("active"),
////                        r.addClass("active"),
////                        !r.data(n.getUploadFileSuccess().length > 0) {

////                        return
////                    }

////                }
////                ;
////            u.ondrop = function (n) {
////                n.preventDefault();
////                f(event.dataTransfer.files)
////            }
////                ;
////            u.change(function (n) {
////                n.preventDefault();
////                f(n.currentTarget.files)
////            })
////        }
////        );

////    }
////    execImport(n) {
////        let t = this
////            , i = Object.values(n).map(n => t.handleUploadFile(n));
////        return Promise.all(i)
////    }
////    handleUploadFile(n) {
////        let t = this;
////        return new Promise((i, r) => {
////            let u = t.getUploadFileActive();
////            u.find(".drag-box").val("");
////            var reader = new FileReader();
////            me.file = [n];
////            reader.onload = function (e) {
////                u.find('img').data('load', true).attr('src', e.target.result);
////            };

////            reader.readAsDataURL(e.target.files[0]);
////        }
////        )
////    }

////}
