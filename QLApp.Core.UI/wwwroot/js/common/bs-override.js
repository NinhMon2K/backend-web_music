////(function (t, e) {
////    "object" == typeof exports && "undefined" != typeof module ? e(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], e) : e((t = t || self).jQuery)
////}(this, (function (t) {
////    "use strict";
////    t.extend(t.fn.bootstrapTable.defaults, {
////        addNew: !1,
////        assignData: [],
////        cellCustoms: [],
////        convertToFunction: ["group-by-formatter"],
////        configColumnToFunction: ["autocomplete-config"],
////        dataField: "Data",
////        deleteRows: [],
////        escape: !1,
////        fixedAllWidthColumns: !1,
////        fixedColumns: !1,
////        fixedNumber: 1,
////        getBootstrap: {},
////        mobileResponsive: !0,
////        newRowEmpty: !0,
////        onFormulas: [],
////        pageList: [30, 50, 100],
////        pageSize: 30,
////        pagination: !1,
////        refreshBodyEvent: !1,
////        refreshView: !1,
////        searchOnEnterKey: !1,
////        sidePagination: "server",
////        smartDisplay: !1,
////        totalField: "RecordsTotal",
////        undefinedText: "",
////        afterCellEdit: function (t, e, n, i, r, o, a, s, l) {
////            return !1
////        },
////        afterCellUpdate: function (t, e, n, i, r, o, a, l, c, u) {
////            s.call(this.getBootstrap, t, e, n, i, r, o, a, l, c, u)
////        },
////        afterClickCell: function (t, e, n, i, r, o, a) {
////            return !0
////        },
////        afterInitBody: function (t, e, n) { },
////        afterRenderGrid: function (t) { },
////        beforeClickCell: function (t, e, n, i, r, o) {
////            return !0
////        },
////        beforeInit: function (t) { },
////        beforeLoad: function (t, e) { },
////        customDataBefore: function (t, e) {
////            return !1
////        },
////        customDataAfterLoad: function (t, e) {
////            return !1
////        },
////        deleteRow: function (t, e, n, i, r, o) {
////            return !0
////        },
////        getDefaultNewRow: function (t, e, n) {
////            return {}
////        },
////        getDefaultValueHideNewRow: function (t, e, n) {
////            return {}
////        },
////        mergeCell: function (t, e, n) {
////            return []
////        },
////        notSortGroupBy: function () {
////            return !1
////        },
////        onGridTreeAfterLoadSuccess: function () {
////            return !1
////        },
////        onGridTreeBeforeLoad: function (t) { },
////        operationRows: function (t, e) {
////            return !1
////        },
////        responseHandler: function (e, n, i) {
////            var r = this;
////            if (e) {
////                let n = function (e) {
////                    null != i && t.each(e, (function (t, e) {
////                        e._stt = t + 1 + (i || 0)
////                    }
////                    ))
////                };
////                Array.isArray(e) ? n(e) : r.dataField && e[r.dataField] && e[r.dataField].length > 0 && n(e[r.dataField])
////            } else
////                !(e = {})[r.dataField] && (e[r.dataField] = []);
////            return e
////        },
////        validateDeleteRow: function (t, e, n, i, r, o) {
////            return !0
////        },
////        validateUpdate: function (t, e, n, i, r, o, a, s, l, c) {
////            return !0
////        }
////    });
////    var e = t.fn.bootstrapTable.defaults.ajaxOptions.error;
////    t.extend(t.fn.bootstrapTable.defaults.ajaxOptions, {
////        error: function (t) {
////            "function" == typeof e && e.apply(this, t),
////                !silent && MISAUtil && "function" == typeof MISAUtil.hideShimmerLoading && MISAUtil.hideShimmerLoading(this.$tableBody)
////        }
////    });
////    var n = function () {
////        let e = this;
////        if (this.options.addNew) {
////            this.options.data = this.options.data.filter((t => 0 != t.InvalidRow));
////            let n = this.options.data
////                , i = n[0]
////                , r = i && i.hasOwnProperty("_stt")
////                , o = MISAUtil.getDefaultValueObject(this.columns);
////            r && (o._stt = n.length + 1),
////                o.InvalidRow = !1;
////            let a = this.options.getDefaultValueHideNewRow.call(this.scope, this, this.$el, o);
////            t.extend(o, a),
////                this.options.data.push(o),
////                this.data.push(o);
////            let s = t(document.createDocumentFragment())
////                , l = e.initRow(o, n.length - 1, n, s, !0)
////                , c = t(l).addClass("m-new-row").attr("title", "Bấm vào đây để thêm dòng mới...");
////            this.$body.find("tr.no-records-found").remove(),
////                this.$body.append(c),
////                this.$container.find('[data-toggle="tooltip"]').tooltip(),
////                this.options.refreshBodyEvent = !0,
////                this.options.refreshView = !0
////        }
////    }
////        , i = function () {
////            if (this.options.addNewButton) {
////                let e = t("<tr>", {
////                    class: "tr-add",
////                    height: 40
////                });
////                e[0].style.setProperty("border-bottom", "none", "important");
////                let n = t("<td>", {
////                    class: "td-add",
////                    colspan: 99999999,
////                    height: 40
////                }).attr("title", "Bấm vào đây để thêm dòng mới...").css({
////                    border: "none"
////                }).appendTo(e);
////                t("<div>", {
////                    html: '<div class="misa-icon report report ic-round-extend"></div>Thêm dòng'
////                }).css({
////                    display: "flex",
////                    "font-style": "italic",
////                    color: "#3ba9f1"
////                }).appendTo(n);
////                this.$body.append(e)
////            }
////        }
////        , r = function () {
////            if (this.options.summaryRow) {
////                let e = t("<tr>", {
////                    class: "tr-summary",
////                    height: 40
////                });
////                this.columns.filter((t => t.visible)).forEach((function (n, i, r) {
////                    let o = ""
////                        , a = n.field;
////                    n.summaryTitle && (o = "Tổng số",
////                        n.summaryTitleText && (o = n.summaryTitleText));
////                    let s = t("<td>", {
////                        class: "td-" + a,
////                        height: 40,
////                        html: o
////                    }).css({
////                        color: "#212121",
////                        "font-family": "Roboto-Medium",
////                        "font-weight": "100"
////                    }).attr("title", o);
////                    n.summaryCol && s.css({
////                        "text-align": "right"
////                    }),
////                        s.appendTo(e)
////                }
////                )),
////                    this.$body.prepend(e)
////            }
////        }
////        , o = function () {
////            let e = this;
////            if (this.options.addNewButton && this.options.newRowEmpty) {
////                this.options.data = this.options.data.filter((t => !t.InvalidRow)),
////                    this.data = this.data.filter((t => !t.InvalidRow));
////                let n = this.options.data
////                    , i = n[0]
////                    , r = i && i.hasOwnProperty("_stt")
////                    , o = MISAUtil.getDefaultValueObject(this.columns);
////                r && (o._stt = n.length + 1),
////                    o.InvalidRow = !0;
////                let a = this.options.getDefaultValueHideNewRow.call(this.scope, this, this.$el, o);
////                t.extend(o, a),
////                    this.options.data.push(o),
////                    this.data.push(o);
////                let s = t(document.createDocumentFragment())
////                    , l = e.initRow(o, n.length - 1, n, s, !0)
////                    , c = t(l);
////                this.$body.find("tr.no-records-found").remove();
////                let u = this.$body.find("tr.tr-add");
////                u.length > 0 ? c.insertBefore(u) : this.$body.append(c),
////                    this.$container.find('[data-toggle="tooltip"]').tooltip(),
////                    this.options.refreshBodyEvent = !0,
////                    this.options.refreshView = !0
////            }
////            this.options.newRowEmpty = !0
////        }
////        , a = function (e) {
////            let n = this;
////            if (this.options.addNewButton) {
////                this.options.data = this.options.data.filter((t => 0 != t.InvalidRow));
////                let i = this.options.data
////                    , r = i[0]
////                    , o = r && r.hasOwnProperty("_stt")
////                    , a = _.cloneDeep(e);
////                o && (a._stt = i.length + 1),
////                    this.options.data.push(a),
////                    this.data.push(a);
////                let s = t(document.createDocumentFragment())
////                    , l = n.initRow(a, i.length - 1, i, s, !0)
////                    , c = t(l);
////                this.$body.find("tr.no-records-found").remove();
////                let h = this.$body.find("tr.tr-add");
////                h.length > 0 ? c.insertBefore(h) : this.$body.append(c),
////                    this.$container.find('[data-toggle="tooltip"]').tooltip(),
////                    this.options.refreshBodyEvent = !0,
////                    this.options.refreshView = !0,
////                    u.call(this)
////            }
////        }
////        , s = function (e, i, r, o, a, s, c, u, h, d) {
////            if (a.hasClass("m-new-row") && u && null != c && null != c) {
////                a.removeClass("m-new-row"),
////                    delete u.InvalidRow;
////                let e = this.options.getDefaultNewRow.call(this.scope, this, this.$el, u)
////                    , i = this.getVisibleColumns();
////                Object.keys(e).forEach((n => {
////                    let r = i.find((t => t.field == n));
////                    if (r) {
////                        let i = r.fieldIndex;
////                        t(a.find("td")[i]).trigger("update", e[n])
////                    }
////                }
////                )),
////                    a.find(".editable-control").blur(),
////                    t.extend(u, e),
////                    n.call(this),
////                    this.options.refreshView && this.resetView(),
////                    this.options.refreshBodyEvent && this.initBodyEvent()
////            }
////            if (this.options.addNewButton && u && null != c && null != c) {
////                delete u.InvalidRow;
////                let e = this.options.getDefaultNewRow.call(this.scope, this, this.$el, u)
////                    , n = this.getVisibleColumns();
////                if (Object.keys(e).forEach((i => {
////                    let r = n.find((t => t.field == i));
////                    if (r) {
////                        let n = r.fieldIndex;
////                        t(a.find("td")[n]).trigger("update", e[i])
////                    }
////                }
////                )),
////                    a.find(".editable-control").blur(),
////                    t.extend(u, e),
////                    this.options.refreshView && this.resetView(),
////                    this.options.refreshBodyEvent && this.initBodyEvent(),
////                    this.options.summaryRow && this.options.columns[this.options.columns.length - 1].find((t => t.field == o))?.summaryCol)
////                    for (let t = 0; t < d.length; t++)
////                        l.call(this, d[t].col)
////            }
////        }
////        , l = function (t) {
////            if (this.options.summaryRow) {
////                this.$body.find(".td-" + t);
////                let e = this.data.reduce(((e, n) => e + n[t] || 0), 0);
////                this.$body.find(".td-" + t).text(MISAUtil.numberFormatGrid(e))
////            }
////        }
////        , c = function (t) {
////            if (this.options.summaryRow) {
////                this.$body.find(".td-" + t);
////                let e = this.data.reduce(((e, n) => e + n[t] || 0), 0);
////                this.$body.find(".td-" + t).text(MISAUtil.numberFormatGrid(e))
////            }
////        }
////        , u = function (t) {
////            let e = this;
////            this.options.summaryRow && this.options.column.forEach((function (t, n, i) {
////                e.options.columns[e.options.columns.length - 1].find((e => e.field == t.name))?.summaryCol && c.call(e, t.name)
////            }
////            ))
////        }
////        , h = function (e) {
////            let n = e || {}
////                , i = this.options.scope
////                , r = this.options.params
////                , o = i && r && i[r];
////            return "function" == typeof o && t.extend(n, o.call(i, this.$el), e),
////                n
////        }
////        , d = function () {
////            this.$body.off("mouseover", "td").on("mouseover", "td", (function (e) {
////                let n = t(e.currentTarget)
////                    , i = n.text();
////                MISAUtil.checkIsTruncate(n) ? n.attr("title") != i && n.attr("title", i) : n.removeAttr("title")
////            }
////            )),
////                this.$body.find("> tr[data-index] > td").off("dblclick", "button[data-command], [data-single-command]").on("dblclick", "button[data-command], [data-single-command]", (function (e) {
////                    t(e.currentTarget).trigger("click"),
////                        e.preventDefault(),
////                        e.stopPropagation()
////                }
////                )),
////                this.$body.off("updateValue", "tr[data-index] td").on("updateValue", "tr[data-index] td", (function (e, n) {
////                    let i = t(e.currentTarget)
////                        , r = MISAUtil.getInfoGridByCell(i)
////                        , o = r.$column.data(MISA.Constants.FormDefault.Type)
////                        , a = ""
////                        , s = r.dataRow
////                        , l = r.field;
////                    if (s && l) {
////                        switch (i.data("old-value", n),
////                        s[l] = n,
////                        o) {
////                            case MISA.Constants.DataType.Quantity:
////                            case MISA.Constants.DataType.Currency:
////                                a = MISAUtil.numberFormatGrid(n, MISA.Constants.DataType.Currency);
////                                break;
////                            case MISA.Constants.DataType.Enum:
////                            case MISA.Constants.DataType.AutoComplete:
////                                let e = r.$column
////                                    , o = r.$row
////                                    , c = r.option.column
////                                    , u = e.data(MISA.Constants.FormDefault.ControlConfig)
////                                    , h = u.data[MISA.Constants.FormDefault.DisplayField]
////                                    , d = u.data.map
////                                    , p = i.data(MISA.Constants.FormDefault.Select);
////                                a = p && p[h] || "",
////                                    p && Object.keys(d).filter((e => {
////                                        if (s.hasOwnProperty(e) && e != l) {
////                                            let n = c.findIndex((t => t.name == e));
////                                            n > -1 ? t(o.find("td")[n]).trigger("updateValue", p[d[e]]) : s[e] = p[d[e]]
////                                        }
////                                    }
////                                    ));
////                                break;
////                            default:
////                                a = n
////                        }
////                        i.text(a)
////                    }
////                }
////                ))
////        }
////        , p = function () {
////            let t = this.options.scope;
////            if ("object" == typeof t) {
////                let e = [...this.options.configColumnToFunction];
////                if (e.length) {
////                    let n = this.options.column.map((t => t.th));
////                    e.forEach((e => {
////                        n.filter((n => {
////                            let i = n.data(e);
////                            i && "string" == typeof i && n.data(e, t[i])
////                        }
////                        ))
////                    }
////                    ))
////                }
////            }
////        }
////        , f = function () {
////            let t = this.options.scope;
////            if ("object" == typeof t) {
////                [...this.options.convertToFunction].forEach((e => {
////                    let n = this.$el.data(e);
////                    n && "string" == typeof n && (this.$el.data(e, t[n].bind(t, this)),
////                        this.options[MISAUtil.formatIDToOption(e)] = t[n].bind(t, this))
////                }
////                ))
////            }
////        }
////        , m = function () {
////            let e = this;
////            this.$body.off("delete", "tr[data-index]").on("delete", "tr[data-index]", (function (n) {
////                let i = t(n.currentTarget)
////                    , r = e.options.data
////                    , o = i.data(MISA.Constants.FormDefault.Index)
////                    , a = r[o]
////                    , s = (e.$body,
////                        e.options.onFormulas);
////                if (s) {
////                    let t = s.formulas.filter((t => t.Type == MISA.Enumeration.CalculateGridType.Column)) || []
////                        , n = t.filter((e => t.every((t => t.ItemSum != e.Operand)))).map((t => t.Operand))
////                        , i = [];
////                    n.forEach((t => {
////                        let e = s.key;
////                        if (a[t] && a[e]) {
////                            let n = MISAUtil.caculateDataByFomulas(e, a[e], t, -a[t], r, s.formulas);
////                            i = MISAUtil.distinctKey(i.concat(n.Cells))
////                        }
////                    }
////                    )),
////                        i.filter((t => t.Index != o)).forEach((t => {
////                            let n = MISAControl.getCellByFieldRow(e.$el, t.Col, t.Index, e);
////                            n && n.trigger("update", [r[t.Index][t.Col], null, !0])
////                        }
////                        ))
////                }
////                e.options.validateDeleteRow(e, i, o, e.$el, r, a) && (i.trigger("deleteRow"),
////                    e.options.deleteRow(e, i, o, e.$el, r, a))
////            }
////            )),
////                this.$body.off("deleteRow", "tr[data-index]").on("deleteRow", "tr[data-index]", (function (n) {
////                    let i = t(n.currentTarget)
////                        , r = e.options.data
////                        , o = i.data(MISA.Constants.FormDefault.Index)
////                        , a = r[o]
////                        , s = e.$body
////                        , l = s.find("tr[data-index]");
////                    s.find(`tr[data-index=${o}]`).remove();
////                    let c = [...l].filter((e => t(e).data(MISA.Constants.FormDefault.Index) > o));
////                    c.forEach((e => {
////                        let n = t(e).data(MISA.Constants.FormDefault.Index);
////                        t(e).data(MISA.Constants.FormDefault.Index, n - 1).attr("data-index", n - 1)
////                    }
////                    )),
////                        r.splice(o, 1);
////                    let h = e.data.findIndex((t => _.isEqual(t, a)));
////                    if (h > -1 && e.data.splice(h, 1),
////                        e.options.deleteRows.push(a),
////                        e.header.fields.some((t => "_stt" == t))) {
////                        let n = e.fieldsColumnsIndex._stt;
////                        c.forEach((e => {
////                            t(t(e).find("td")[n]).trigger("updateValue", r[t(e).data(MISA.Constants.FormDefault.Index)]._stt - 1)
////                        }
////                        ))
////                    }
////                    u.call(e)
////                }
////                )),
////                this.$body.off("click", "tr.tr-add").on("click", "tr.tr-add", (function (t) {
////                    o.apply(e),
////                        e.initBodyEvent()
////                }
////                )),
////                this.$body.off("dupplicate", "tr").on("dupplicate", "tr", (function (t, n) {
////                    a.apply(e, [n]),
////                        e.initBodyEvent()
////                }
////                ))
////        }
////        , g = function (...e) {
////            let n = this
////                , i = n.options
////                , r = 0
////                , o = this.$toolbar.find(".search input:not([data-command])")
////                , a = function (e) {
////                    let i = n.$toolbar.find("input[data-command]")
////                        , r = this.options.data;
////                    return i.each((function (n, i) {
////                        let o = t(i);
////                        if (e[0] != o[0]) {
////                            (o.data(MISA.Constants.FormDefault.SearchField) || o.data(MISA.Constants.FormDefault.ValueField) || "").split(",");
////                            let t = o.data(MISA.Constants.FormDefault.Command)
////                                , e = o.data(MISA.Constants.FormDefault.ControlType);
////                            switch (t) {
////                                case MISA.Constants.Command.Search:
////                                    let t = MISAControl.getSubmitDataForm(o.parent(), "input");
////                                    _.isEmpty(t) || void 0 === MISAUtil.firstValue(t) || "" === MISAUtil.firstValue(t) || (r = r.filter((function (e, n, i) {
////                                        return Object.keys(t).some((n => null != e[n] && null != t[n] && e[n].toString().toLocaleLowerCase().contains(t[n].toString().toLocaleLowerCase())))
////                                    }
////                                    )));
////                                    break;
////                                case MISA.Constants.Command.Filter:
////                                    let n = MISAControl.getSubmitDataForm(o.parent(), "input");
////                                    switch (e) {
////                                        case MISA.Constants.ControlType.Checkbox:
////                                            let t = o.data(MISA.Constants.FormDefault.DefaultValue) || !1;
////                                            o.prop("checked") == t && (n = {});
////                                            break;
////                                        case MISA.Constants.ControlType.AutoComplete:
////                                            let e = [MISAUtil.getResourceByConstant(MISA.Constants.LoadType, MISA.Constants.LoadType.All)];
////                                            Object.keys(n).filter((t => e.some((e => e == n[t])))).forEach((t => delete n[t]));
////                                            break;
////                                        case MISA.Constants.ControlType.MultipleSelect:
////                                            let i = [MISAUtil.getResourceByConstant(MISA.Constants.LoadType, MISA.Constants.LoadType.All)];
////                                            Object.keys(n).filter((t => !n[t].length || i.some((e => n[t].contains(e))))).forEach((t => delete n[t]))
////                                    }
////                                    _.isEmpty(n) || void 0 === MISAUtil.firstValue(n) || "" === MISAUtil.firstValue(n) || (r = r.filter((function (t) {
////                                        return Object.keys(n).some((e => {
////                                            let i = t[e]
////                                                , r = n[e]
////                                                , o = !1;
////                                            return null != i && null != r && (Array.isArray(r) ? ("string" == typeof i && (i = JSON.parse(i)),
////                                                i = i || [],
////                                                o = i.some((t => r.toString().toLocaleLowerCase().contains(t.toString().toLocaleLowerCase())))) : o = i.toString().toLocaleLowerCase() == r.toString().toLocaleLowerCase()),
////                                                o
////                                        }
////                                        ))
////                                    }
////                                    )))
////                            }
////                        }
////                    }
////                    )),
////                        r
////                };
////            this.$toolbar.find("input[data-command]").each((function (e, o) {
////                let s = t(o)
////                    , l = s.data(MISA.Constants.FormDefault.ControlType)
////                    , c = s.data(MISA.Constants.FormDefault.SearchField) || s.data(MISA.Constants.FormDefault.ValueField) || ""
////                    , u = c.split(",");
////                s.data(MISA.Constants.FormDefault.Key, c);
////                let h = function (t) {
////                    if (!s.attr("placeholder")) {
////                        let e = n.options.column.filter((t => u.contains(t.name))).map((t => t.th.text().trim()));
////                        s.attr("placeholder", t + " " + e.join(", "))
////                    }
////                };
////                s.on("keydown", (function (t) {
////                    t.target instanceof HTMLInputElement && 13 == t.keyCode && t.preventDefault()
////                }
////                ));
////                let d = s.data(MISA.Constants.FormDefault.Command);
////                switch (l) {
////                    case MISA.Constants.ControlType.AutoComplete:
////                        h("Tìm theo");
////                        let e = s.data(MISA.Constants.FormDefault.Select);
////                        e = e || s[0].id + MISA.Constants.Command.Search,
////                            s.data(MISA.Constants.FormDefault.Select, e),
////                            s.on("autocompleteselect", (function (t, e) {
////                                let i = s.autocomplete(MISA.Constants.ControlOption.GetValueField) || ""
////                                    , r = [...n.options.data]
////                                    , o = (n.getAllSelections(),
////                                        n.options.maintainMetaData);
////                                n.options.maintainMetaData = !0;
////                                let l = {};
////                                u.forEach((function (t, n) {
////                                    null != e.item[i] && e.item[i] != MISAUtil.getResourceByConstant(MISA.Constants.LoadType, MISA.Constants.LoadType.All) && (l[t] = e.item[i])
////                                }
////                                )),
////                                    n.filterColumns = l,
////                                    n.options.data = a.call(n, s),
////                                    n.onSearch({
////                                        currentTarget: t.currentTarget
////                                    }),
////                                    n.options.maintainMetaData = o,
////                                    n.filterColumns = {},
////                                    n.options.data = r
////                            }
////                            )),
////                            s.data("afterBlur", (function () {
////                                if (!this.selectedItem && !s.autocomplete(MISA.Constants.ControlOption.GetValue)) {
////                                    let t = [...n.options.data]
////                                        , e = n.options.maintainMetaData;
////                                    n.options.maintainMetaData = !0,
////                                        a.call(n, s),
////                                        n.data = n.options.data,
////                                        n.updatePagination(),
////                                        n.options.maintainMetaData = e,
////                                        n.options.data = t,
////                                        n.filterColumns = {}
////                                }
////                            }
////                            ));
////                        break;
////                    case MISA.Constants.ControlType.MultipleSelect:
////                        h("Tìm theo");
////                        let o = s.data(MISA.Constants.FormDefault.Change);
////                        o = o || s[0].id + MISA.Constants.Command.Filter,
////                            s.data(MISA.Constants.FormDefault.Change, o),
////                            s.on("change", (function (e) {
////                                let i = MISAControl.getSelectedItemCombo(s)
////                                    , r = s.data(MISA.Constants.FormDefault.ValueField);
////                                i = i.map((t => t[r]));
////                                let o = [...n.options.data]
////                                    , l = (n.getAllSelections(),
////                                        n.options.maintainMetaData);
////                                n.options.maintainMetaData = !0;
////                                let c = {};
////                                i.contains(MISA.Constants.ValueField.All) || u.forEach((t => {
////                                    i.forEach((e => {
////                                        null != e && e != MISA.Constants.ValueField.All && (c[t] = (c[t] || []).concat([e]))
////                                    }
////                                    ))
////                                }
////                                )),
////                                    n.filterColumns = c,
////                                    n.options.data = a.call(n, t("<div>")),
////                                    n.data = n.options.data,
////                                    n.initSort(),
////                                    n.updatePagination(),
////                                    n.trigger("search", c),
////                                    n.options.maintainMetaData = l,
////                                    n.filterColumns = {},
////                                    n.options.data = o
////                            }
////                            ));
////                        break;
////                    case MISA.Constants.ControlType.Checkbox:
////                        s.off("change").on("change", (function (e) {
////                            let i = s.data(MISA.Constants.FormDefault.DefaultValue) || !1
////                                , r = (s.data(MISA.Constants.FormDefault.SearchField),
////                                    t(e.currentTarget),
////                                    s.prop("checked"))
////                                , o = [...n.options.data]
////                                , l = n.options.maintainMetaData;
////                            if (n.options.maintainMetaData = !0,
////                                r == i)
////                                n.filterColumns = {};
////                            else {
////                                let t = {};
////                                u.forEach((function (e, n) {
////                                    t[e] = r
////                                }
////                                )),
////                                    n.filterColumns = t
////                            }
////                            n.options.data = a.call(n, s),
////                                n.onSearch({
////                                    currentTarget: event.currentTarget
////                                }),
////                                n.options.maintainMetaData = l,
////                                n.filterColumns = {},
////                                n.options.data = o
////                        }
////                        ));
////                        break;
////                    case MISA.Constants.ControlType.Text:
////                    default:
////                        if (d === MISA.Constants.Command.Search) {
////                            h("Tìm kiếm");
////                            var p = "keyup drop blur ".concat(W.isIEBrowser() ? "mouseup" : "");
////                            s.off(p).on(p, (function (t) {
////                                i.searchOnEnterKey && 13 !== t.keyCode && t.currentTarget.value || [37, 38, 39, 40].includes(t.keyCode) || (clearTimeout(r),
////                                    r = setTimeout((function () {
////                                        let t = [...n.options.data];
////                                        n.options.data = a.call(n, s),
////                                            n.header.fields.forEach((function (t, e) {
////                                                n.header.searchables[e] = u.contains(t)
////                                            }
////                                            ));
////                                        let e = n.options.maintainMetaData;
////                                        n.options.maintainMetaData = !0,
////                                            n.onSearch({
////                                                currentTarget: s[0]
////                                            }),
////                                            n.options.maintainMetaData = e,
////                                            n.options.data = t
////                                    }
////                                    ), i.searchTimeOut))
////                            }
////                            ))
////                        }
////                }
////            }
////            )),
////                !i.searchOnEnterKey && i.pagination || function () {
////                    let t = "keyup drop blur ".concat(W.isIEBrowser() ? "mouseup" : "");
////                    o.off(t).on(t, (function (t) {
////                        i.searchOnEnterKey && 13 !== t.keyCode && t.currentTarget.value || [37, 38, 39, 40].includes(t.keyCode) || (clearTimeout(r),
////                            r = setTimeout((function () {
////                                n.options.originalData = n.options.originalData || [],
////                                    n.onSearch({
////                                        currentTarget: t.currentTarget
////                                    }),
////                                    n.options.treeEnable && n.options.initEventGridTree(n, n.$el)
////                            }
////                            ), i.searchTimeOut))
////                    }
////                    ))
////                }()
////        }
////        , v = function () {
////            let e = this;
////            if (this.options.summary) {
////                this.options.summaryByField && "SummaryField" != this.options.summaryByField || (this.options.summaryByField = "SummaryField",
////                    this.data = this.data.map((t => (t.SummaryField = 1,
////                        t))));
////                let n = function (t, e) {
////                    var n = {};
////                    return t.forEach((function (t) {
////                        var i = e(t);
////                        n[i] = n[i] || [],
////                            n[i].push(t)
////                    }
////                    )),
////                        n
////                }
////                    , i = n(e.data, (function (t) {
////                        return [t[e.options.summaryByField]]
////                    }
////                    ))
////                    , r = 0
////                    , o = [];
////                t.each(i, (function (t, e) {
////                    o.push({
////                        id: r,
////                        name: t,
////                        data: e
////                    }),
////                        e.forEach((function (t) {
////                            !t._data && (t._data = {}),
////                                t._data["summary-index"] = r
////                        }
////                        )),
////                        r++
////                }
////                )),
////                    this.options.summaryTableGroups = o
////            }
////        }
////        , y = function (...t) {
////            let e = this.options.mergeCell(this, this.$el, this.options.data, ...t);
////            this.mergeCell(e)
////        }
////        , b = function (...e) {
////            this.options.url = this.$el.data(MISA.Constants.FormDefault.Url),
////                this.options.queryParams = h.call(this, ...e);
////            let n = this.$toolbar.find("[data-command]");
////            t.each(n, ((e, n) => {
////                let i = t(n);
////                if (i.data(MISA.Constants.FormDefault.ControlType) === MISA.Constants.ControlType.Checkbox)
////                    i[0].checked = i.data(MISA.Constants.FormDefault.DefaultValue);
////                else
////                    i.val("")
////            }
////            ))
////        }
////        , S = function () {
////            let t = this.columns;
////            t.some((t => t.editable)) && t.forEach((t => {
////                t.class = t.class || "",
////                    t.class += t.editable ? " m-editable-col" : " m-not-editable-col"
////            }
////            )),
////                t.filter((t => t.type == MISA.Constants.DataType.Currency)).forEach((t => {
////                    !t.width && (!t.class || !t.class.contains(MISA.Constants.ClassDefault.ExpandCol)) && (t.width = MISA.Enumeration.FormatType.MaxWidthNumberCol)
////                }
////                ))
////        }
////        , C = function () {
////            let t = this.columns
////                , e = t.every((t => t.visible && t.width && (!t.class || t.class && !t.class.contains("m-expand-col"))));
////            if (e) {
////                this.$tableContainer.addClass("fixed-fit-content");
////                let e = t.reduce(((t, e) => t + e.width), 0);
////                this.$el.css("min-width", e)
////            } else {
////                let n = t.filter((t => t.visible && t.class && t.class.contains("m-expand-col")));
////                if (n.length) {
////                    let i = n.map((t => t.colspanIndex))
////                        , r = t.filter(((t, e) => !i.some((t => t == e))));
////                    if (e = r.every((t => t.visible && t.width)),
////                        e) {
////                        let t = r.reduce(((t, e) => t + e.width), 0);
////                        n.forEach((e => {
////                            let n = e.minWidth;
////                            if (!n) {
////                                n = this.$el.find(`[data-field=${e.field}]`).css("min-width"),
////                                    n = parseInt(n && n.replace("px", "")),
////                                    isNaN(n) || (t += n)
////                            }
////                        }
////                        )),
////                            this.$el.css("min-width", t)
////                    }
////                }
////            }
////        }
////        , w = function () {
////            var e = this;
////            if (this.options.summary) {
////                let n = this.options.summaryTableGroups;
////                if (n && n.length) {
////                    let i = [];
////                    this.columns.forEach((function (t) {
////                        t.checkbox ? !0 : t.visible && 1,
////                            null == t.summaryable && (t.summaryable = !0),
////                            t.type == MISA.Constants.DataType.Currency && t.summaryable && i.push({
////                                field: t.field,
////                                fieldIndex: t.fieldIndex
////                            })
////                    }
////                    )),
////                        this.options.detailView && !this.options.cardView && 1,
////                        n.forEach((function (n, r) {
////                            let o = t("<tr>", {
////                                class: "summary-row",
////                                "summary-index": r
////                            })
////                                , a = e.columns.summaryType || MISA.Constants.SummaryType.Sum;
////                            if (i.length) {
////                                let l = i.reduce(((t, e) => (t[e.field] = 0,
////                                    t)), {});
////                                switch (a) {
////                                    case MISA.Constants.SummaryType.Sum:
////                                        l = n.data.reduce((function (t, e) {
////                                            return i.forEach((n => t[n.field] += e[n.field] || 0)),
////                                                t
////                                        }
////                                        ), l);
////                                        break;
////                                    case MISA.Constants.SummaryType.Count:
////                                        l = i.reduce(((t, e) => (t[e.field] = n.data,
////                                            t)), l)
////                                }
////                                var s;
////                                l.isSummaryRow = !0,
////                                    o = t(T.prototype.initRow.call(e, l, -1, n.data));
////                                let c = e.options.scope[e.options.summaryByFormatter];
////                                if ("function" == typeof c && (s = c.call(e, e, e.$el, l, o, n.name, n.id, n.data)),
////                                    o.addClass("summary-row").attr("summary-index", r).removeAttr("data-index").data(MISA.Constants.FormDefault.Data, l),
////                                    e.options.mergeSummaryColumn && !s) {
////                                    let e = o.find("td")
////                                        , n = i[0].fieldIndex;
////                                    e[0].colSpan = n,
////                                        i.forEach((function (n, i) {
////                                            t(e[n.fieldIndex]).data(MISA.Constants.FormDefault.Field, n.field)
////                                        }
////                                        )),
////                                        t.each(e, (function (e, i) {
////                                            e && e < n && t(i).remove()
////                                        }
////                                        ))
////                                }
////                                e.options.summaryAfter ? e.$body.find("tr[data-summary-index=".concat(n.id, "]:last")).after(o) : e.$body.find("tr[data-summary-index=".concat(n.id, "]:first")).before(o)
////                            }
////                        }
////                        ))
////                }
////            }
////        }
////        , x = function () {
////            let e = this;
////            if (e.options.treeEnable && e.searchText) {
////                let n = e.data || []
////                    , i = []
////                    , r = e.options.treeIdField
////                    , o = e.options.data
////                    , a = e.options.parentIdField;
////                t.each(n, (function (t, e) {
////                    if (!i.some((t => t[r] == e[r]))) {
////                        let t = MISAUtil.findParentNode(o, e, r, a, !0)
////                            , n = MISAUtil.findChildNode(o, e, r, a, !1);
////                        i = i.concat(t).concat(n).distinctkey(r)
////                    }
////                }
////                )),
////                    e.data = i
////            }
////        }
////        , A = function (t) {
////            let e = this
////                , n = e.options.data.map(((t, n) => ({
////                    Index: n,
////                    Data: t,
////                    Row: e.$tableBody.find(`[data-index=${n}]`)
////                })))
////                , i = t.Key
////                , r = t.Data || []
////                , o = n.filter((t => r.some((e => e.KeyValue == t.Data[i]))))
////                , a = e.fieldsColumnsIndex;
////            r.forEach((t => {
////                let e = o.filter((e => e.Data[i] == t.KeyValue))
////                    , n = t.Value || {}
////                    , r = t.Operation || {};
////                Object.keys(r).map((t => {
////                    let n = r[t]
////                        , i = n.Operation || "+"
////                        , o = n.OperationValue || 0;
////                    o = "+" == i ? o : -o;
////                    let s = a[t];
////                    e.forEach((e => {
////                        let n = e.Data[t] + o;
////                        e.Row.find("td").eq(s).trigger("update", n)
////                    }
////                    ))
////                }
////                )),
////                    Object.keys(n).forEach((t => {
////                        let i = a[t];
////                        e.forEach((e => {
////                            e.Row.find("td").eq(i).trigger("update", n[t])
////                        }
////                        ))
////                    }
////                    ))
////            }
////            ))
////        };
////    t.fn.bootstrapTable.theme = t.fn.bootstrapTable.theme.concat(" misa-table"),
////        t.extend(t.fn.bootstrapTable.events, {
////            "misa-grid-after-load-tree-success.bs.table": "onGridTreeAfterLoadSuccess"
////        }),
////        [MISA.Constants.ControlOption.GetDeleteRows, MISA.Constants.ControlOption.GetBootstrap, MISA.Constants.ControlOption.RejectData, MISA.Constants.ControlOption.SaveChangeData, MISA.Constants.ControlOption.UpdateCellsByData, MISA.Constants.ControlOption.LoadDictionary, MISA.Constants.ControlOption.SetOption].forEach((e => {
////            t.fn.bootstrapTable.methods.push(e)
////        }
////        ));
////    var T = t.fn.bootstrapTable.Constructor
////        , I = T.prototype
////        , D = t.BootstrapTable.prototype.changeView
////        , M = I.fitHeader
////        , E = I.getData
////        , k = (I.getOptions,
////            I.init)
////        , P = I.initBody
////        , F = I.initBodyEvent
////        , O = I.initContainer
////        , N = I.initData
////        , R = I.initHeader
////        , L = (I.initRow,
////            I.initSearch)
////        , $ = I.initSort
////        , B = I.initToolbar
////        , j = I.load
////        , H = (I._toggleCheck,
////            I._toggleCheckAll,
////            I.refresh)
////        , V = I.refreshOptions
////        , z = (I.resetHeader,
////            I.resetView)
////        , U = (I.trigger,
////            I.setStyleColumns)
////        , W = t.fn.bootstrapTable.utils;
////    t.extend(T.prototype, {
////        fitHeader: function (...t) {
////            this.$tableBody.find(".grid-loading-container").css("top", 0),
////                M.apply(this, Array.prototype.slice.apply(t));
////            var e = this.$tableBody.get(0)
////                , n = e.scrollHeight > e.clientHeight ? W.getScrollBarWidth() : 0;
////            this.$tableHeader.css("margin-right", n),
////                this.$tableHeader.find("table").css("min-width", this.$el.css("min-width"))
////        },
////        getData: function (...t) {
////            let e = E.apply(this, Array.prototype.slice.apply(t))
////                , n = this.$el.find(".m-new-row");
////            if (n.length) {
////                let t = n.data(MISA.Constants.FormDefault.Index)
////                    , i = this.options.data[t];
////                i && i.hasOwnProperty("InvalidRow") && !i.InvalidRow && (e = e.filter(((e, n) => n != t && 0 != e.InvalidRow)))
////            }
////            return e
////        },
////        getDeleteRows: function (t) {
////            return this.options.deleteRows
////        },
////        getBootstrap: function () {
////            return this
////        },
////        init: function (...t) {
////            this.options.beforeInit.apply(this, Array.prototype.slice.apply([this, ...t])),
////                f.apply(this, Array.prototype.slice.apply(t)),
////                this.options.getBootstrap = this,
////                k.apply(this, Array.prototype.slice.apply(t))
////        },
////        initBody: function (...t) {
////            this.options.isResize || (this.options.refreshBodyEvent = !1,
////                (this.options.addNewButton || this.options.addNew) && (this.options.data = this.options.data.filter((t => !t.InvalidRow)),
////                    this.data = this.data.filter((t => !t.InvalidRow))),
////                P.apply(this, Array.prototype.slice.apply(t)),
////                w.apply(this, Array.prototype.slice.apply(t)),
////                n.apply(this, Array.prototype.slice.apply(t)),
////                this.options.addNewButton && (r.apply(this, Array.prototype.slice.apply(t)),
////                    o.apply(this, Array.prototype.slice.apply(t)),
////                    i.apply(this, Array.prototype.slice.apply(t)),
////                    u.apply(this)),
////                y.apply(this, Array.prototype.slice.apply(t)),
////                this.$container.find('[data-toggle="tooltip"]').tooltip(),
////                this.options.refreshBodyEvent && this.initBodyEvent(),
////                this.options.afterInitBody.apply(this, [this, this.$el, this.data]))
////        },
////        initBodyEvent: function (...t) {
////            F.apply(this, t),
////                d.apply(this, t),
////                m.apply(this, t)
////        },
////        initContainer: function (...t) {
////            O.apply(this, Array.prototype.slice.apply(t)),
////                this.options.pagination || this.$pagination.hide()
////        },
////        initData: function (...t) {
////            this.$el.data(MISA.Constants.ControlOption.GetChangeValueRows, []),
////                this.options.deleteRows = [],
////                this.options.assignData = _.cloneDeep(this.options.data),
////                this.options.customDataBefore(this, t[0] || [], ...t.splice(1, t.length || 1)),
////                this.dictionary = this.$el.data("dictionary") || {},
////                N.apply(this, Array.prototype.slice.apply(t));
////            let e = this.options.customDataAfterLoad(this, this.options.data, ...t);
////            if (this.data = this.options.data,
////                !e && this.header.fields.find((t => "_stt" == t))) {
////                let t = this.options.data || [];
////                for (var n = 0; n < t.length; n++)
////                    t[n]._stt = n + 1
////            }
////            v.call(this, ...t)
////        },
////        initHeader: function (...t) {
////            if (this.options.isResize) {
////                var e = this.$tableBody.get(0)
////                    , n = e.scrollWidth > e.clientWidth && e.scrollHeight > e.clientHeight + this.$header.outerHeight() ? W.getScrollBarWidth() : 0;
////                this.$tableHeader.css("margin-right", n)
////            } else
////                S.apply(this, Array.prototype.slice.apply(t)),
////                    R.apply(this, Array.prototype.slice.apply(t)),
////                    p.apply(this, Array.prototype.slice.apply(t)),
////                    C.apply(this, Array.prototype.slice.apply(t))
////        },
////        initSearch: function (...t) {
////            this.options.processSearch = !0,
////                L.apply(this, Array.prototype.slice.apply(t)),
////                x.call(this, ...t),
////                this.options.processSearch = !1
////        },
////        initSort: function (...t) {
////            if (this.options.addNew && !this.options.processSearch) {
////                let t = this.options.data.filter((t => !t.hasOwnProperty("InvalidRow")));
////                this.options.data = t,
////                    this.data = t
////            }
////            $.apply(this, Array.prototype.slice.apply(t))
////        },
////        initToolbar: function (...t) {
////            let e, n = this.options.toolbar, i = this.$el.closest("[data-js], [data-detail-object], [data-js-object]");
////            i.length && (e = i.find(n)),
////                e && e.length && (this.options.toolbar = e),
////                B.apply(this, Array.prototype.slice.apply(t)),
////                g.call(this, ...t)
////        },
////        load: function (...t) {
////            t[0] && t[0].ReportConfig && this.$el.data("onFormulas", t[0] && t[0].ReportConfig && t[0].ReportConfig.Formulas || []),
////                this.options.beforeLoad.apply(this, Array.prototype.slice.apply([this, ...t])),
////                j.apply(this, Array.prototype.slice.apply(t))
////        },
////        mergeCell: function (t) {
////            let e = this;
////            var n = e.$body.find("tr[data-index]");
////            let i = this.getVisibleFields();
////            t.forEach((t => {
////                t.rowspan = t.rowspan || 1,
////                    t.colspan = t.colspan || 1,
////                    t.content = t.content || t.field
////            }
////            )),
////                t.forEach((t => {
////                    let r = i.indexOf(t.field)
////                        , o = i.indexOf(t.content)
////                        , a = n.eq(t.index).find("td").eq(o);
////                    if (!(t.index < 0 || r < 0 || t.index >= e.data.length)) {
////                        for (var s = t.index; s < t.index + t.rowspan; s++)
////                            for (var l = r; l < r + t.colspan; l++)
////                                n.eq(s).find("td").eq(l).hide();
////                        a.addClass("m-merge-cell").attr("rowspan", t.rowspan).attr("colspan", t.colspan).show()
////                    }
////                }
////                ))
////        },
////        refreshOptions: function (...t) {
////            t[0] = t[0] || {};
////            let e = t[0] && t[0].queryParams || {};
////            e = h.call(this, e),
////                t[0].queryParams = e,
////                V.apply(this, Array.prototype.slice.apply(t))
////        },
////        refresh: function (...t) {
////            b.apply(this, Array.prototype.slice.apply(t)),
////                H.apply(this, Array.prototype.slice.apply(t))
////        },
////        rejectData: function (t) {
////            t = t || _.cloneDeep(this.options.assignData),
////                this.options.data = t,
////                this.load(t)
////        },
////        resetView: function (...t) {
////            this.$container.is(":visible") && (this.options.isResize = this.options.isResize || !!event && "resize" == event.type,
////                this.options.refreshView = !1,
////                z.apply(this, Array.prototype.slice.apply(t)),
////                this.options.isResize = !1,
////                this.$container.hasClass("fullscreen") || this.options.heightAuto && this.$tableContainer.addClass("fixed-height-auto").attr("style", ""))
////        },
////        saveChangeData: function () {
////            this.options.deleteRows = [],
////                this.options.assignData = _.cloneDeep(this.options.data),
////                this.options.getChangeValueRows = [],
////                this.$el.data(MISA.Constants.ControlOption.GetChangeValueRows, [])
////        },
////        setStyleColumns: function (t, e, n, i, r, o) {
////            if (t.class = t.class || "",
////                r <= 0)
////                t.class += " m-expand-col";
////            else if (!r) {
////                if (t.type === MISA.Constants.DataType.Currency)
////                    i = `: ${MISA.Enumeration.FormatType.MaxWidthNumberCol}px;`;
////                n.style += isNaN(r) ? "" : "width" + i
////            }
////            t.minWidth && (n.style += ` min-width: ${t.minWidth}px;`),
////                t.maxWidth && (n.style += ` max-width: ${t.maxWidth}px;`),
////                U.apply(this, [t, e, n, i, r, o])
////        },
////        updateCellsByData: function (...t) {
////            A.call(this, ...t)
////        },
////        loadDictionary: function (...t) {
////            this.dictionary = t[0] || {}
////        },
////        setOption: function (e) {
////            t.extend(this.options, e)
////        }
////    }),
////        t.extend(t.BootstrapTable.prototype, {
////            changeView: function (...t) {
////                this.$container.is(":visible") && (this.options.isResize = !0,
////                    D.apply(this, Array.prototype.slice.apply(t)),
////                    this.options.isResize = !1)
////            }
////        })
////})($);