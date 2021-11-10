"use strict";
exports.__esModule = true;
exports.Bureau = void 0;
var List = /** @class */ (function () {
    function List() {
        this.items = [];
    }
    List.prototype.size = function () {
        return this.items.length;
    };
    List.prototype.add = function (value) {
        this.items.push(value);
    };
    List.prototype["delete"] = function (index) {
        this.items.splice(index, 1);
    };
    List.prototype.update = function (item, index) {
        this.items[index] = item;
        return true;
    };
    List.prototype.get = function (index) {
        return this.items[index];
    };
    return List;
}());
var bureauTable;
var lock = true;
var Bureau = /** @class */ (function () {
    function Bureau(numero, capacite, dateAcqui, nbrEns) {
        if (nbrEns === void 0) { nbrEns = 0; }
        this.capacite = capacite;
        this.numero = numero;
        this.nbrEns = nbrEns;
        this.dateAcqui = new Date(dateAcqui);
    }
    Bureau.prototype.show = function () {
        console.log("numero :" + this.numero);
        console.log("capacite :" + this.capacite);
        console.log("nbrEns : " + this.nbrEns);
        console.log("dateAcqui :" + this.getDateAcqui());
    };
    ;
    Bureau.showList = function () {
        for (var i = 0; i < Bureau.list.size(); i++) {
            Bureau.list.get(i).show();
        }
    };
    Bureau.prototype.getCapacite = function () {
        return this.capacite;
    };
    Bureau.prototype.getNumber = function () {
        return this.numero;
    };
    Bureau.prototype.getDateAcqui = function () {
        var date = "";
        var y, m, d;
        y = this.dateAcqui.getFullYear();
        m = this.dateAcqui.getMonth() + 1;
        d = this.dateAcqui.getDate();
        date += y + "-";
        if (m <= 9)
            date += "0" + m + "-";
        else
            date += m + "-";
        if (d <= 9)
            date += "0" + d;
        else
            date += d;
        return date;
    };
    Bureau.prototype.initUpdateForm = function () {
        $("#updateForm").trigger('reset');
        var tab = $("#updateForm input");
        $("#updateForm label").addClass('active');
        $(tab[0]).attr('value', this.getNumber());
        $(tab[1]).attr('value', this.getCapacite());
        $(tab[2]).attr('value', this.getDateAcqui());
    };
    Bureau.prototype.initRemoveModal = function () {
        $("#bureau-name").text(this.numero);
    };
    Bureau.prototype.initAffecterModal = function () {
        $("#numBureau").text(this.getNumber());
        $('#nbr-select').text(0);
        BureauAffectation.setBureau(this);
    };
    Bureau.prototype.initDetailsModal = function () {
        var tab = $(".bureau-info");
        $(tab[0]).text(this.getNumber());
        $(tab[1]).text(this.getCapacite());
        $(tab[2]).text(this.getDateAcqui());
    };
    Bureau.prototype.ajouter = function () {
        lock = false;
        displayMsg("add", 1);
        if (this.test('addForm')) {
            this.DBinsert();
            Bureau.list.add(this);
            this.ajouterHTML();
        }
        else
            displayMsg("add", 2);
    };
    Bureau.prototype.ajouterHTML = function () {
        /** ajouterHtml */
        bureauTable.row.add([
            $("template#details-btn").html(),
            this.numero + "",
            this.capacite + "",
            '0',
            this.getDateAcqui() + "",
            $("template#row-btns").html()
        ]).node().id = (Bureau.list.size() - 1 + "");
        bureauTable.draw();
        var cols = $("tr#" + (Bureau.list.size() - 1) + " td");
        for (var i = 1; i < 5; i++)
            $(cols[i]).addClass('pt-3-half');
        displayMsg("add", 0);
        resetForm("addForm");
        closeModal('modalAdd');
    };
    Bureau.prototype.update = function () {
        displayMsg("update", 1);
        if (this.test("updateForm")) {
            this.nbrEns = Bureau.list.get(Bureau.item).nbrEns;
            this.DBupdate();
            Bureau.list.update(this, Bureau.item);
            this.updateHTML();
        }
        else
            displayMsg("update", 2);
    };
    Bureau.prototype.updateHTML = function () {
        if (this.nbrEns == this.capacite)
            BureauAffectation.disableBtn(Bureau.item);
        else
            BureauAffectation.enableBtn(Bureau.item);
        var tab = $("#bureauTable tr#" + Bureau.item + " .pt-3-half");
        $(tab[0]).text(this.numero);
        $(tab[1]).text(this.capacite);
        $(tab[2]).text(this.nbrEns);
        $(tab[3]).text(this.getDateAcqui());
        displayMsg("update", 0);
        closeModal('modalupdate');
    };
    Bureau.prototype.destroy = function () {
        if (this.nbrEns != 0) {
            displayMsg("remove", 2);
            return;
        }
        displayMsg("remove", 1);
        if (this.DBdelete())
            console.log("this is return");
        Bureau.list.get(Bureau.item).numero = "";
        this.destroyHTML();
    };
    Bureau.prototype.destroyHTML = function () {
        Bureau.row.remove();
        bureauTable.row(Bureau.row).remove().draw();
        displayMsg("remove", 0);
        closeModal('modalRemove');
    };
    Bureau.prototype.archiver = function () {
        this.destroy();
    };
    Bureau.prototype.affecter = function () {
    };
    Bureau.prototype.affecterHTML = function () {
        closeModal('modalAffecter');
    };
    Bureau.prototype.updateNbrSelect = function (a) {
        var nbr = $("#nbr-select");
        if ((this.getCapacite() - this.nbrEns) == parseInt(nbr.text(), 10) && a < 0) {
            $("input.check-box").removeAttr("disabled");
        }
        nbr.text(parseInt(nbr.text(), 10) + a);
        if ((this.getCapacite() - this.nbrEns) <= parseInt(nbr.text(), 10)) {
            var tab = $("input.check-box");
            for (var i = 0; i < tab.length; i++) {
                if (!$(tab[i]).prop("checked")) {
                    $(tab[i]).attr("disabled", 'true');
                }
            }
        }
    };
    Bureau.prototype.test = function (form) {
        if (form == 'addForm' && lock == true)
            return true;
        var tab = $("form#" + form + " input");
        var verify = true;
        if (this.numero == "") {
            $(tab[0]).removeClass('valid').addClass('invalid');
            verify = false;
        }
        else {
            var i;
            for (i = 0; i < Bureau.list.size(); i++) {
                if (Bureau.list.get(i).numero.toLowerCase() == this.numero.toLowerCase() && Bureau.item != i) {
                    $(tab[0]).removeClass('valid').addClass('invalid');
                    verify = false;
                    break;
                }
            }
            if (i == Bureau.list.size())
                $(tab[0]).removeClass('invalid').addClass('valid');
        }
        if (this.capacite == 0) {
            $(tab[1]).removeClass('valid').addClass('invalid');
            verify = false;
        }
        else {
            if (form == "updateForm") {
                if (Bureau.getItem().nbrEns > this.capacite) {
                    $(tab[1]).removeClass('valid').addClass('invalid');
                    verify = false;
                }
            }
            else
                $(tab[1]).removeClass('invalid').addClass('valid');
        }
        if (!(this.dateAcqui instanceof Date && this.getDateAcqui() != "NaN-NaN-NaN")) {
            $(tab[2]).removeClass('valid').addClass('invalid');
            verify = false;
        }
        else
            $(tab[2]).removeClass('invalid').addClass('valid');
        return verify;
    };
    Bureau.initList = function () {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json"
        });
        $.ajax({
            url: "initList",
            type: 'GET',
            success: function (result) {
                result.bureaux.forEach(function (b) {
                    Bureau.list.add(new Bureau(b.num, parseInt(b.capacite), b.dateAcquisition, b.EnseignantNumber));
                    if (parseInt(b.capacite, 10) == b.EnseignantNumber) {
                        BureauAffectation.disableBtn(Bureau.list.size() - 1);
                    }
                });
            },
            error: function () {
                console.error("Database Error");
            }
        });
    };
    Bureau.getListItem = function (index) {
        return Bureau.list.get(index);
    };
    Bureau.setItem = function (b) {
        Bureau.item = b;
    };
    Bureau.getItem = function () {
        return Bureau.list.get(Bureau.item);
    };
    Bureau.setRow = function (r) {
        Bureau.row = r;
    };
    Bureau.prototype.getData = function () {
        return { option: 1, capacite: this.capacite, dateAcquisition: this.getDateAcqui(), num: this.numero };
    };
    Bureau.prototype.DBinsert = function () {
        var obj = this.getData();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "bureau",
            type: "POST",
            data: obj,
            success: function (result) {
                return true;
            },
            error: function () {
                return false;
            }
        });
        return false;
    };
    Bureau.prototype.DBdelete = function () {
        var bureau = this;
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "bureau/" + bureau.numero,
            type: "DELETE",
            success: function (result) {
                return true;
            },
            error: function () {
                return false;
            }
        });
        return false;
    };
    Bureau.prototype.DBupdate = function () {
        var bureau = this;
        var obj = this.getData();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "bureau/" + Bureau.getItem().numero,
            type: "PUT",
            data: obj,
            success: function (result) {
                return true;
            },
            error: function () {
                return false;
            }
        });
        return false;
    };
    Bureau.prototype.DBarchiver = function () {
        var bureau = this;
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "archiver/" + bureau.numero,
            type: "PUT",
            success: function (result) {
                return true;
            },
            error: function () {
                return false;
            }
        });
        return false;
    };
    Bureau.prototype.DBaffecter = function () {
        BureauAffectation.getEns();
        return false;
    };
    Bureau.list = new List();
    return Bureau;
}());
exports.Bureau = Bureau;
var BureauAffectation = /** @class */ (function () {
    function BureauAffectation() {
    }
    BureauAffectation.setBureau = function (b) {
        this.b = b;
    };
    BureauAffectation.setRow = function (row) {
        this.row = row;
    };
    BureauAffectation.setInput = function (input) {
        this.input = input;
        this.setRow(($(input).parent().parent()));
    };
    BureauAffectation.enableCheck = function () {
        $(".check-cell input").prop("disabled", false);
    };
    BureauAffectation.disableCheck = function () {
        $(".check-cell input").prop("disabled", true);
        $(this.input).prop("disabled", false);
    };
    BureauAffectation.uncheck = function () {
        $(".check-cell input").prop("checked", false);
        $(".check-cell input").prop("disabled", false);
    };
    BureauAffectation.getEns = function () {
    };
    BureauAffectation.initList = function (enseignants) {
        enseignants.forEach(function (b) {
            BureauAffectation.List.push(b.personID);
        });
    };
    BureauAffectation.disableBtn = function (index) {
        $(".bureauTable tr#" + index + " td span .btn-info").prop("disabled", true);
    };
    BureauAffectation.enableBtn = function (index) {
        $(".bureauTable tr#" + index + " td span .btn-info").removeAttr("disabled");
    };
    BureauAffectation.List = new Array();
    return BureauAffectation;
}());
function getFormData(id) {
    var tab = $("#" + id + " input");
    return new Bureau($(tab[0]).val() + "", Number($(tab[1]).val()), new Date($(tab[2]).val() + ""));
}
function getIndex(row) {
    return $(row).parent().parent().attr('id');
}
function displayMsg(form, msg) {
    if (msg === void 0) { msg = -1; }
    switch (msg) {
        case 0: {
            $("#" + form).empty()
                .append($('#actionSuccess').html());
            break;
        }
        case 1: {
            $("#" + form).empty()
                .append($('#at-ork').html());
            break;
        }
        case 2: {
            $("#" + form).empty()
                .append($('#error').html());
            break;
        }
        default: {
            $("#" + form).empty();
        }
    }
}
function closeModal(modal) {
    $("#" + modal).toggle('fast');
    $(".modal").trigger('click');
    $('.modal-backdrop').remove();
    lock = true;
}
function resetForm(form) {
    $('#' + form).trigger('reset');
    $('.validate').removeClass('invalid');
    $('#' + form + ' label').removeClass('active');
}
