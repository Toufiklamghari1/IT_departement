"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var List = (function () {
    function List() {
        this.items = [];
    }
    List.prototype.size = function () {
        return this.items.length;
    };
    List.prototype.add = function (value) {
        this.items.push(value);
    };
    List.prototype.delete = function (index) {
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
var Reference = (function () {
    function Reference(refID, ref) {
        this.id = refID;
        this.text = ref;
    }
    Reference.prototype.getText = function () {
        return this.text;
    };
    Reference.prototype.setReference = function (text) {
        this.text = text;
    };
    Reference.prototype.getID = function () {
        return this.id;
    };
    Reference.prototype.show = function () {
        console.log("Reference(Id : " + this.id + " , text : " + this.text + " )");
    };
    Reference.prototype.getData = function (designationID) {
        return { option: 0, isRef: 0, designationID: designationID, tag: this.text };
    };
    Reference.prototype.store = function (designationID) {
        return __awaiter(this, void 0, void 0, function () {
            var ref, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ref = this;
                        if (!!this.isEmpty()) return [3, 2];
                        obj = this.getData(designationID);
                        $.ajaxSetup({
                            headers: {
                                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                            },
                            dataType: "JSON"
                        });
                        return [4, $.ajax({
                                url: "materiel",
                                type: "POST",
                                data: obj,
                                success: function (result) {
                                    ref.id = result;
                                },
                                error: function () {
                                    ref.text = "";
                                    console.error("Store reference Error");
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2, ref];
                }
            });
        });
    };
    Reference.prototype.isEmpty = function () {
        if (this.text == "")
            return true;
        return false;
    };
    Reference.prototype.setEmpty = function () {
        this.text = "";
        this.id = -1;
    };
    return Reference;
}());
var Designation = (function () {
    function Designation(designationID, designation) {
        this.list = new List();
        this.designationID = designationID;
        this.designation = designation;
    }
    Designation.prototype.show = function () {
        console.log("designation(designationID: " + this.designationID + " , designation: " + this.designation);
    };
    Designation.prototype.showList = function () {
        console.error("Designation.showList()");
        for (var i = 0; i < this.list.size(); i++)
            this.list.get(i).show();
    };
    Designation.prototype.initList = function () {
        var desig = this;
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "json"
        });
        $.ajax({
            url: "/getReferences/" + this.designationID,
            type: "GET",
            success: function (result) {
                result.references.forEach(function (b) {
                    desig.list.add(new Reference(b.refID, b.ref));
                });
            },
            error: function () {
                console.error("Reference Database Error");
            }
        });
    };
    Designation.prototype.getDesignationID = function () {
        return this.designationID;
    };
    Designation.prototype.getDesignation = function () {
        return this.designation;
    };
    Designation.prototype.setDesignation = function (designation) {
        this.designation = designation;
    };
    Designation.prototype.designationSelected = function (form, index) {
        if (index === void 0) { index = -1; }
        $('#' + form + 'Form select.reference').empty();
        var newOption = new Option("", "", false, false);
        var selected = false;
        $('#' + form + 'Form select.reference')
            .append(newOption)
            .trigger("change");
        for (var i = 0; i < this.list.size(); i++) {
            if (index == i) {
                selected = true;
            }
            var newOption = new Option(this.list.get(i).getText(), i + "", selected, selected);
            $('#' + form + 'Form select.reference')
                .append(newOption)
                .trigger("change");
            selected = false;
        }
    };
    Designation.prototype.getData = function (type) {
        return { option: 0, isRef: 1, type: type, tag: this.designation };
    };
    Designation.prototype.store = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var designation, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        designation = this;
                        if (!!this.isEmpty()) return [3, 2];
                        obj = this.getData(type);
                        $.ajaxSetup({
                            headers: {
                                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                            },
                            dataType: "JSON"
                        });
                        return [4, $.ajax({
                                url: "materiel",
                                type: "POST",
                                data: obj,
                                success: function (result) {
                                    designation.designationID = result;
                                },
                                error: function () {
                                    console.error("Store designation Error");
                                    designation.designation = "";
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2, designation];
                }
            });
        });
    };
    Designation.prototype.getReferenceIndex = function (referenceID) {
        for (var i = 0; i < this.list.size(); i++) {
            if (referenceID == this.list.get(i).getID())
                return i;
        }
        return -1;
    };
    Designation.prototype.getReference = function (index) {
        return this.list.get(index);
    };
    Designation.prototype.addReference = function (reference) {
        this.list.add(reference);
        var o = $("<option/>", { value: this.list.size(), text: reference.getText() });
        $('select.reference').append(o);
        $('select.reference').trigger('change');
    };
    Designation.prototype.isEmpty = function () {
        if (this.designation == "")
            return true;
        return false;
    };
    Designation.prototype.setEmpty = function () {
        this.designation = "";
        this.designationID = -1;
    };
    return Designation;
}());
var lock = true;
var Materiel = (function () {
    function Materiel(matID, designation, dateAcqui) {
        this.matId = matID;
        this.designation = designation;
        this.dateAcqui = new Date(dateAcqui);
    }
    Materiel.prototype.show = function () {
        console.log("matID : " + this.matId);
        console.log("designation :" + this.designation);
        console.log("dateAcqui :" + this.getDateAcqui());
    };
    Materiel.prototype.getDateAcqui = function () {
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
    Materiel.setTable = function (table) {
        Materiel.table = table;
    };
    Materiel.getDignationID = function () { return -1; };
    ;
    Materiel.unlock = function () {
        lock = false;
    };
    Materiel.lock = function () {
        lock = true;
    };
    Materiel.setDesignation = function (designaton) {
        Materiel.newDesignation.setDesignation(designaton);
    };
    Materiel.setReference = function (reference) {
        Materiel.newReference.setReference(reference);
    };
    Materiel.setNewDesignationEmpty = function () {
        this.newDesignation = new Designation(-1, "");
    };
    Materiel.setNewReferenceEmpty = function () {
        this.newReference = new Reference(-1, "");
    };
    Materiel.storeDesignationRef = function (materiel, designation) {
        var designation;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!Materiel.newDesignation.isEmpty()) return [3, 3];
                        return [4, Materiel.newDesignation.store(materiel.getType())];
                    case 1:
                        designation = _a.sent();
                        materiel.designation = designation.getDesignationID();
                        materiel.addDesignation(designation);
                        return [4, this.storeReference(materiel, designation)];
                    case 2:
                        _a.sent();
                        Materiel.setNewDesignationEmpty();
                        return [2];
                    case 3: return [4, this.storeReference(materiel, designation)];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Materiel.storeReference = function (materiel, designation) {
        return __awaiter(this, void 0, void 0, function () {
            var reference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(designation != undefined && !designation.isEmpty() && designation.getDesignationID() != undefined && !Materiel.newReference.isEmpty())) return [3, 2];
                        return [4, Materiel.newReference.store(designation.getDesignationID())];
                    case 1:
                        reference = _a.sent();
                        materiel.setRefID(reference.getID());
                        designation.addReference(reference);
                        Materiel.setNewReferenceEmpty();
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    Materiel.newDesignation = new Designation(-1, "");
    Materiel.newReference = new Reference(-1, "");
    return Materiel;
}());
function getIndex(row) {
    return $(row)
        .parent()
        .parent()
        .attr("id");
}
function displayMsg(form, msg) {
    if (msg === void 0) { msg = -1; }
    switch (msg) {
        case 0: {
            $("#" + form)
                .empty()
                .append($("#actionSuccess").html());
            break;
        }
        case 1: {
            $("#" + form)
                .empty()
                .append($("#at-ork").html());
            break;
        }
        case 2: {
            $("#" + form)
                .empty()
                .append($("#error").html());
            break;
        }
        default: {
            $("#" + form).empty();
        }
    }
}
function closeModal(modal) {
    $("#" + modal).toggle("fast");
    $(".modal").trigger("click");
    $(".modal-backdrop").remove();
    Materiel.lock();
}
function resetForm(form) {
    $("#" + form).trigger("reset");
    $(".validate").removeClass("invalid");
    $("#" + form + " label").removeClass("active");
}
var MaterielInfo = (function (_super) {
    __extends(MaterielInfo, _super);
    function MaterielInfo(designation, ref, comment, num, dateAcqui, matID) {
        if (matID === void 0) { matID = ""; }
        var _this = _super.call(this, matID, designation, dateAcqui) || this;
        _this.num = num;
        _this.comment = comment;
        _this.ref = ref;
        return _this;
    }
    MaterielInfo.prototype.show = function () {
        _super.prototype.show.call(this);
        console.log("num : " + this.num);
        console.log("comment : " + this.comment);
        console.log("ref : " + this.ref);
    };
    MaterielInfo.showDesiList = function () {
        console.error("MaterielInfo.showDesiList()");
        for (var i = 0; i < MaterielInfo.designationList.size(); i++)
            console.log(MaterielInfo.designationList.get(i));
    };
    MaterielInfo.init = function () {
        console.log("hello this is init");
        MaterielInfo.initInputs();
        MaterielInfo.initDesignationsList();
    };
    MaterielInfo.initInputs = function () {
        $($("template.reference").parent()).append($("template.reference").html());
        $($("template.commentaire").parent()).append($("template.commentaire").html());
        $($("template.num-inventaire").parent()).append($("template.num-inventaire").html());
        $($("#updateForm template.date-aqui").parent()).append($("#updateForm template.date-aqui").html());
        $($("#addForm template.date-aqui").parent()).append($("#addForm template.date-aqui").html());
    };
    MaterielInfo.initList = function (materiel) {
        materiel.forEach(function (b) {
            MaterielInfo.list.add(new MaterielInfo(parseInt(b.designation + "", 10), parseInt(b.ref + "", 10), b.comment, parseInt(b.num + "", 10), b.dateAcquisition, b.matID));
        });
    };
    MaterielInfo.initDesignationsList = function () {
        MaterielInfo.designationList = new List();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "json"
        });
        $.ajax({
            url: "/getDesignations/" + MaterielInfo.type,
            type: "GET",
            success: function (result) {
                result.designations.forEach(function (b) {
                    var desig = new Designation(b.designationID, b.designation);
                    desig.initList();
                    MaterielInfo.designationList.add(desig);
                });
                MaterielInfo.initDesignationsSelect();
            },
            error: function () {
                console.log("designation Database Error");
            }
        });
    };
    MaterielInfo.initDesignationsSelect = function (index) {
        if (index === void 0) { index = -1; }
        $("#" + MaterielInfo.form + "Form select.designation").empty();
        $("#" + MaterielInfo.form + "Form select.designation")
            .append(new Option("", "", false, false))
            .trigger("change");
        var selected = false;
        for (var i = 0; i < MaterielInfo.designationList.size(); i++) {
            if (index == i)
                selected = true;
            var newOption = new Option(MaterielInfo.designationList.get(i).getDesignation(), i + "", selected, selected);
            $("#" + MaterielInfo.form + "Form select.designation")
                .append(newOption)
                .trigger("change");
            selected = false;
        }
    };
    MaterielInfo.designationSelected = function (index, refIndex) {
        if (refIndex === void 0) { refIndex = -1; }
        if (index >= 0)
            MaterielInfo.designationList
                .get(index)
                .designationSelected(MaterielInfo.form, refIndex);
    };
    MaterielInfo.setItem = function (b) {
        MaterielInfo.item = b;
    };
    MaterielInfo.getItem = function () {
        return MaterielInfo.list.get(MaterielInfo.item);
    };
    MaterielInfo.setRow = function (r) {
        MaterielInfo.row = r;
    };
    MaterielInfo.destroy = function () {
        displayMsg("remove", 1);
        try {
            MaterielInfo.list.get(MaterielInfo.item).DBdelete();
        }
        catch (error) {
            console.error("error");
            return;
        }
        MaterielInfo.list.get(MaterielInfo.item).matId = "";
        MaterielInfo.list.get(MaterielInfo.item).num = NaN;
        MaterielInfo.destroyHTML();
    };
    MaterielInfo.destroyHTML = function () {
        MaterielInfo.row.remove();
        MaterielInfo.table.row(MaterielInfo.row).remove().draw();
        displayMsg("remove", 0);
        closeModal('modalRemove');
    };
    MaterielInfo.archiver = function () {
        MaterielInfo.list.get(MaterielInfo.item).DBarchiver();
        MaterielInfo.list.get(MaterielInfo.item).matId = "";
        MaterielInfo.list.get(MaterielInfo.item).num = NaN;
        MaterielInfo.destroyHTML();
    };
    MaterielInfo.getDesignation = function (index) {
        if (!isNaN(index) && index >= 0)
            return MaterielInfo.designationList.get(index).getDesignationID();
        return -1;
    };
    MaterielInfo.getReference = function (index, refIndex) {
        if (!isNaN(index) && !isNaN(refIndex) && refIndex >= 0 && index >= 0)
            return MaterielInfo.designationList.get(index).getReference(refIndex).getID();
        return -1;
    };
    MaterielInfo.setForm = function (form) {
        MaterielInfo.form = form;
    };
    MaterielInfo.getForm = function () {
        return MaterielInfo.form;
    };
    MaterielInfo.getListLenght = function () {
        return this.list.size();
    };
    MaterielInfo.prototype.addDesignation = function (designation) {
        MaterielInfo.designationList.add(designation);
        var o = $("<option/>", { value: MaterielInfo.designationList.size(), text: designation.getDesignation() });
        $('.designation').append(o);
        $('.designation').trigger('change');
    };
    MaterielInfo.prototype.initUpdateForm = function () {
        $("#updateForm").trigger('reset');
        var index = this.getDesignationIndex();
        selectUpdateOption(index, MaterielInfo.designationList.get(index).getReferenceIndex(this.ref));
        var tab = $("#updateForm input");
        $("#updateForm label").addClass('active');
        $(tab[0]).attr('value', this.comment);
        $(tab[1]).attr('value', this.num);
        $(tab[2]).attr('value', this.getDateAcqui());
    };
    MaterielInfo.prototype.initRemoveModal = function () {
        $("#materiel-name").text(this.getDesignationText() + " " + this.getReferenceText());
    };
    MaterielInfo.prototype.initAffecterModal = function () {
        MaterielAffectaion.uncheck();
        $("span.materiel-info").text(this.getDesignationText() + " " + this.getReferenceText());
    };
    MaterielInfo.prototype.initDetailsModal = function () {
        throw new Error("Method not implemented.");
    };
    MaterielInfo.prototype.getType = function () {
        return MaterielInfo.type;
    };
    MaterielInfo.prototype.ajouter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Materiel.unlock();
                        return [4, Materiel.storeDesignationRef(this, MaterielInfo.designationList.get(this.getDesignationIndex()))];
                    case 1:
                        _a.sent();
                        if (this.test()) {
                            this.DBinsert();
                            MaterielInfo.list.add(this);
                            this.ajouterHTML();
                        }
                        return [2];
                }
            });
        });
    };
    MaterielInfo.prototype.ajouterHTML = function () {
        MaterielInfo.table.row.add([
            this.getDesignationText(),
            this.getReferenceText(),
            this.num,
            this.getDateAcqui() + "",
            $("template#row-btns").html()
        ]).node().id = (MaterielInfo.list.size() - 1 + "");
        MaterielInfo.table.draw();
        var cols = $("tr#" + (MaterielInfo.list.size() - 1) + " td");
        for (var i = 0; i < 4; i++)
            $(cols[i]).addClass('pt-3-half');
        displayMsg("add", 0);
        resetForm("addForm");
        Materiel.lock();
    };
    MaterielInfo.prototype.update = function () {
        Materiel.unlock();
        displayMsg(MaterielInfo.form, 1);
        if (this.test()) {
            this.DBupdate();
            if (MaterielInfo.list.update(this, MaterielInfo.item))
                this.updateHTML();
        }
        else
            displayMsg(MaterielInfo.form, 2);
    };
    MaterielInfo.prototype.updateHTML = function () {
        var tab = $("table#materiel-info tr#" + MaterielInfo.item + " .pt-3-half");
        $(tab[0]).text(this.getDesignationText());
        $(tab[1]).text(this.getReferenceText());
        $(tab[2]).text(this.num);
        $(tab[3]).text(this.getDateAcqui());
        displayMsg(MaterielInfo.form, 0);
        closeModal('modalupdate');
    };
    MaterielInfo.prototype.affecter = function () {
        throw new Error("Method not implemented.");
    };
    MaterielInfo.prototype.affecterHTML = function () {
        throw new Error("Method not implemented.");
    };
    MaterielInfo.prototype.destroy = function () {
        throw new Error("Method not implemented.");
    };
    MaterielInfo.prototype.destroyHTML = function () {
        throw new Error("Method not implemented.");
    };
    MaterielInfo.prototype.archiver = function () {
        throw new Error("Method not implemented.");
    };
    MaterielInfo.prototype.getDesignationIndex = function () {
        for (var i = 0; i < MaterielInfo.designationList.size(); i++) {
            if (this.designation == MaterielInfo.designationList.get(i).getDesignationID())
                return i;
        }
        return -1;
    };
    MaterielInfo.prototype.getDesignationText = function () {
        return MaterielInfo.designationList.get(this.getDesignationIndex()).getDesignation();
    };
    MaterielInfo.prototype.getDesignationID = function () {
        return MaterielInfo.designationList.get(this.getDesignationIndex()).getDesignationID();
    };
    MaterielInfo.prototype.getReferenceText = function () {
        var designation = MaterielInfo.designationList.get(this.getDesignationIndex());
        return designation.getReference(designation.getReferenceIndex(this.ref)).getText();
    };
    MaterielInfo.prototype.getMatID = function () {
        return this.matId;
    };
    MaterielInfo.prototype.getData = function () {
        return { option: 1, designation: this.designation, ref: this.ref, num: this.num, comment: this.comment, date: this.getDateAcqui() };
    };
    MaterielInfo.prototype.setMatID = function (id) {
        this.matId = id;
    };
    MaterielInfo.prototype.setRefID = function (refID) {
        this.ref = refID;
    };
    MaterielInfo.prototype.test = function () {
        if (lock)
            return true;
        var tab = $("form#" + MaterielInfo.form + "Form input");
        var select = $("form#" + MaterielInfo.form + "Form span.select2-container--default .select2-selection--single");
        var verify = true;
        if (this.designation == -1 || isNaN(this.designation)) {
            $(select[1]).css("border-color", "#f44336");
            verify = false;
        }
        else {
            $(select[1]).css("border-color", "#fff");
        }
        if (this.ref == -1 || isNaN(this.ref)) {
            $(select[2]).css("border-color", "#f44336");
            verify = false;
        }
        else {
            $(select[2]).css("border-color", "#fff");
        }
        if (this.comment == "") {
            $(tab[0]).removeClass('valid').addClass('invalid');
            verify = false;
        }
        else {
            $(tab[0]).removeClass('invalid').addClass('valid');
        }
        if (isNaN(this.num) || this.num == -1) {
            $(tab[1]).removeClass('valid').addClass('invalid');
            verify = false;
        }
        else {
            var i;
            for (i = 0; i < MaterielInfo.list.size(); i++) {
                if (MaterielInfo.list.get(i).num == this.num && MaterielInfo.list.get(i).matId != this.matId) {
                    $(tab[1]).removeClass('valid').addClass('invalid');
                    verify = false;
                    break;
                }
            }
            if (i == MaterielInfo.list.size())
                $(tab[1]).removeClass('invalid').addClass('valid');
        }
        if (!(this.dateAcqui instanceof Date && this.getDateAcqui() != "NaN-NaN-NaN")) {
            $(tab[2]).removeClass('valid').addClass('invalid');
            verify = false;
        }
        else {
            $(tab[2]).removeClass('invalid').addClass('valid');
        }
        return verify;
    };
    MaterielInfo.prototype.DBinsert = function () {
        var mat = this;
        var obj = this.getData();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "materiel",
            type: "POST",
            data: obj,
            success: function (result) {
                mat.setMatID(result);
                return true;
            },
            error: function () {
                return false;
            }
        });
        return false;
    };
    MaterielInfo.prototype.DBdelete = function () {
        var mat = this;
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "materiel/1@" + mat.matId,
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
    MaterielInfo.prototype.DBupdate = function () {
        var mat = this;
        var obj = this.getData();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "materiel/" + mat.matId,
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
    MaterielInfo.prototype.DBarchiver = function () {
        var mat = this;
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "archiver/1@" + mat.matId,
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
    MaterielInfo.prototype.DBaffecter = function () {
        MaterielAffectaion.getEns();
        return false;
    };
    MaterielInfo.type = 1;
    MaterielInfo.list = new List();
    MaterielInfo.form = "add";
    return MaterielInfo;
}(Materiel));
function getFormData(form) {
    var type = parseInt($('#' + form + 'Form .materiel-type  option:selected').attr('value') + "", 10);
    var designation = parseInt($('#' + form + 'Form select.designation  option:selected').attr('value') + "", 10);
    var reference = parseInt($('#' + form + 'Form select.reference  option:selected').attr('value') + "", 10);
    var tab = $("#" + form + "Form input");
    switch (type) {
        case 1: {
            var matID = "";
            if (form == "update")
                matID = MaterielInfo.getItem().getMatID();
            return new MaterielInfo(MaterielInfo.getDesignation(designation), MaterielInfo.getReference(designation, reference), $(tab[0]).val() + "", parseInt($(tab[1]).val() + "", 10), new Date($(tab[2]).val() + ""), matID);
        }
        case 2: {
            return new MaterielInfo(designation, reference, $(tab[0]).val() + "", parseInt($(tab[1]).val() + "", 10), new Date($(tab[3]).val() + ""));
        }
        case 3: {
            return new MaterielInfo(designation, reference, $(tab[0]).val() + "", parseInt($(tab[1]).val() + "", 10), new Date($(tab[3]).val() + ""));
        }
        case 4: {
            return new MaterielInfo(designation, reference, $(tab[0]).val() + "", parseInt($(tab[1]).val() + "", 10), new Date($(tab[3]).val() + ""));
        }
        default: {
            return new MaterielInfo(-1, -1, "", -1, new Date(""));
        }
    }
}
function initList() {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        dataType: "json"
    });
    $.ajax({
        url: "getListes",
        type: "GET",
        success: function (result) {
            MaterielInfo.initList(result.materielInfo);
            MaterielAffectaion.initList(result.enseignant);
        },
        error: function () {
            console.log("initList Database Error");
        }
    });
}
function selectUpdateOption(designation, ref) {
    MaterielInfo.initDesignationsSelect(designation);
    MaterielInfo.designationSelected(designation, ref);
}
var MaterielAffectaion = (function () {
    function MaterielAffectaion() {
    }
    MaterielAffectaion.setMat = function (mat) {
        this.mat = mat;
    };
    MaterielAffectaion.setRow = function (row) {
        this.row = row;
    };
    MaterielAffectaion.setInput = function (input) {
        this.input = input;
        this.setRow(($(input).parent().parent()));
    };
    MaterielAffectaion.enableCheck = function (element) {
        var link = $($($(this.row).children().get(-1)).find('a'));
        link.empty();
        link.html($("template#is-not-checked").html());
        $(".check-cell input").prop("disabled", false);
        $($($(element).parent().parent().children().get(-1)).find('a')).attr("disabled", 'false');
    };
    MaterielAffectaion.disableCheck = function (element) {
        $(".check-cell input").prop("disabled", true);
        $(this.input).prop("disabled", false);
        $($($(this.row).children().get(-1)).find('a')).removeAttr('disabled');
    };
    MaterielAffectaion.isShared = function (element) {
        if ($(element).attr('disabled') == "disabled")
            return;
        var link = $($($(this.row).children().get(-1)).find('a'));
        if ($(link.find('i')).hasClass("fa-circle")) {
            link.empty();
            link.html($("template#is-checked").html());
        }
        else {
            link.empty();
            link.html($("template#is-not-checked").html());
        }
    };
    MaterielAffectaion.uncheck = function () {
        $(".check-cell input").prop("checked", false);
        $('.is-shared').empty();
        $('.is-shared').html($("template#is-not-checked").html());
        $(".check-cell input").prop("disabled", false);
    };
    MaterielAffectaion.getEns = function () {
    };
    MaterielAffectaion.initList = function (enseignants) {
        enseignants.forEach(function (b) {
            MaterielAffectaion.List.push(b.personID);
            console.log(b);
        });
    };
    MaterielAffectaion.List = new Array();
    return MaterielAffectaion;
}());
initList();
