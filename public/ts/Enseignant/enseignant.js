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
exports.__esModule = true;
exports.Enseignant = void 0;
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
var lock = true;
var Person = /** @class */ (function () {
    function Person(nom, prenom, mail, personID) {
        this.personID = personID;
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
    }
    Person.prototype.initDetailsModal = function () {
        throw new Error("Method not implemented.");
    };
    Person.prototype.archiver = function () {
        throw new Error("Method not implemented.");
    };
    Person.prototype.destroy = function () {
        throw new Error("Method not implemented.");
    };
    Person.prototype.destroyHTML = function () {
        throw new Error("Method not implemented.");
    };
    Person.prototype.show = function () {
        console.log("nom : " + this.nom);
        console.log("prenom :" + this.prenom);
        console.log("mail :" + this.mail);
    };
    Person.unlock = function () {
        lock = false;
    };
    Person.lock = function () {
        lock = true;
    };
    Person.form = "add";
    return Person;
}());
var Enseignant = /** @class */ (function (_super) {
    __extends(Enseignant, _super);
    function Enseignant(nom, prenom, mail, dateRecrut, grade, personID) {
        if (personID === void 0) { personID = ""; }
        var _this = _super.call(this, nom, prenom, mail, personID) || this;
        _this.dateRecrut = new Date(dateRecrut);
        _this.grade = grade;
        return _this;
    }
    Enseignant.prototype.show = function () {
        _super.prototype.show.call(this);
        console.log("dateRecut : " + this.getDateRecut());
        console.log("garede : " + this.grade);
    };
    Enseignant.prototype.getDateRecut = function () {
        var date = "";
        var y, m, d;
        y = this.dateRecrut.getFullYear();
        m = this.dateRecrut.getMonth() + 1;
        d = this.dateRecrut.getDate();
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
    Enseignant.init = function () {
        Enseignant.initInputs();
    };
    Enseignant.initInputs = function () {
        $($("template.grade").parent()).append($("template.grade").html());
        $($("template.date-recrutement").parent()).append($("template.date-recrutement").html());
    };
    Enseignant.initList = function (Person) {
        Person.forEach(function (b) {
            Enseignant.list.add(new Enseignant(b.Nom, b.Prenom, b.Email, b.DateRecrutement, b.Grade, b.personID));
        });
    };
    Enseignant.setTable = function (table) {
        Enseignant.table = table;
    };
    Enseignant.setItem = function (b) {
        Enseignant.item = b;
    };
    Enseignant.getItem = function () {
        return Enseignant.list.get(Enseignant.item);
    };
    Enseignant.setRow = function (r) {
        Enseignant.row = r;
    };
    Enseignant.prototype.initUpdateForm = function () {
        $("#updateForm").trigger('reset');
        //selectUpdateOption(index,Enseignant.designationList.get(index).getReferenceIndex(this.ref));
        var tab = $("#updateForm input");
        $("#updateForm label").addClass('active');
        $(tab[0]).attr('value', this.nom);
        $(tab[1]).attr('value', this.prenom);
        $(tab[2]).attr('value', this.mail);
        $(tab[3]).attr('value', this.getDateRecut());
    };
    Enseignant.prototype.initRemoveModal = function () {
        $("#person-name").text(this.nom + " " + this.prenom);
    };
    Enseignant.prototype.initAffecterModal = function () {
        //MaterielAffectaion.uncheck();
        //$("span.Person-info").text(this.getDesignationText()+" "+this.getReferenceText())
    };
    Enseignant.prototype.ajouter = function () {
        Person.unlock();
        if (this.test()) {
            this.DBinsert();
            Enseignant.list.add(this);
            this.ajouterHTML();
        }
    };
    Enseignant.prototype.ajouterHTML = function () {
        Enseignant.table.row.add([
            $("template#details-btn").html(),
            this.nom,
            this.prenom,
            this.getDateRecut() + "",
            $("template#row-btns").html()
        ]).node().id = (Enseignant.list.size() - 1 + "");
        Enseignant.table.draw();
        var cols = $("tr#" + (Enseignant.list.size() - 1) + " td");
        for (var i = 1; i < 4; i++)
            $(cols[i]).addClass('pt-3-half');
        displayMsg("add", 0);
        resetForm("addForm");
        closeModal('modalAdd');
    };
    Enseignant.prototype.update = function () {
        this.show();
        Person.unlock();
        displayMsg(Enseignant.form, 1);
        if (this.test()) {
            this.DBupdate();
            if (Enseignant.list.update(this, Enseignant.item))
                this.updateHTML();
        }
        else
            displayMsg(Enseignant.form, 2);
    };
    Enseignant.prototype.updateHTML = function () {
        var tab = $("table#enseignant tr#" + Enseignant.item + " .pt-3-half");
        $(tab[0]).text(this.nom);
        $(tab[1]).text(this.prenom);
        $(tab[2]).text(this.getDateRecut());
        displayMsg(Enseignant.form, 0);
        closeModal('modalupdate');
    };
    Enseignant.destroy = function () {
        displayMsg("remove", 1);
        try {
            Enseignant.list.get(Enseignant.item).DBdelete();
        }
        catch (error) {
            console.error("error");
            return;
        }
        Enseignant.list.get(Enseignant.item).mail = "";
        Enseignant.destroyHTML();
    };
    Enseignant.destroyHTML = function () {
        /* destroyHTML */
        Enseignant.row.remove();
        Enseignant.table.row(Enseignant.row).remove().draw();
        displayMsg("remove", 0);
        closeModal('modalRemove');
    };
    Enseignant.archiver = function () {
        Enseignant.list.get(Enseignant.item).DBarchiver();
        Enseignant.list.get(Enseignant.item).mail = "";
        Enseignant.destroyHTML();
    };
    Enseignant.getGrade = function (index) {
        return this.gradeTab[index];
    };
    Enseignant.setForm = function (form) {
        Enseignant.form = form;
    };
    Enseignant.getForm = function () {
        return Enseignant.form;
    };
    Enseignant.prototype.affecter = function () {
        throw new Error("Method not implemented.");
    };
    Enseignant.prototype.affecterHTML = function () {
        throw new Error("Method not implemented.");
    };
    Enseignant.prototype.getPersonID = function () {
        return this.personID;
    };
    Enseignant.prototype.test = function () {
        if (lock)
            return true;
        var tab = $("form#" + Enseignant.form + "Form input");
        var select = $("form#" + Enseignant.form + "Form select");
        var verify = true;
        if (this.grade == "") {
            $(select[1]).css("border-color", "#f44336");
            verify = false;
        }
        else {
            $(select[1]).css("border-color", "#fff");
        }
        if (this.nom == "") {
            $(tab[0]).removeClass('valid').addClass('invalid');
            verify = false;
        }
        else {
            $(tab[0]).removeClass('invalid').addClass('valid');
        }
        if (this.prenom == "") {
            $(tab[1]).removeClass('valid').addClass('invalid');
            verify = false;
        }
        else {
            $(tab[1]).removeClass('invalid').addClass('valid');
        }
        if (this.mail == "") {
            $(tab[2]).removeClass('valid').addClass('invalid');
            verify = false;
        }
        else {
            $(tab[2]).removeClass('invalid').addClass('valid');
        }
        if (!(this.dateRecrut instanceof Date && this.getDateRecut() != "NaN-NaN-NaN")) {
            $(tab[3]).removeClass('valid').addClass('invalid');
            verify = false;
        }
        else {
            $(tab[3]).removeClass('invalid').addClass('valid');
        }
        return verify;
    };
    Enseignant.prototype.getData = function () {
        return { option: 1, grade: this.grade, nom: this.nom, prenom: this.prenom, dateRecrut: this.getDateRecut(), mail: this.mail };
    };
    Enseignant.prototype.DBinsert = function () {
        var ens = this;
        var obj = this.getData();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "enseignant",
            type: "POST",
            data: obj,
            success: function (result) {
                console.log(result);
                ens.personID = result;
                return true;
            },
            error: function () {
                return false;
            }
        });
        return false;
    };
    Enseignant.prototype.DBdelete = function () {
        var ens = this;
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "enseignant/1@" + ens.personID,
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
    Enseignant.prototype.DBupdate = function () {
        var ens = this;
        var obj = this.getData();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "enseignant/" + ens.personID,
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
    Enseignant.prototype.DBarchiver = function () {
        var ens = this;
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "archiver/1@" + ens.personID,
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
    Enseignant.prototype.DBaffecter = function () {
        //MaterielAffectaion.getEns()
        return false;
    };
    Enseignant.list = new List();
    Enseignant.gradeTab = ["PESA", "PH", "PES"];
    return Enseignant;
}(Person));
exports.Enseignant = Enseignant;
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
            Person.lock();
            $("#" + form)
                .empty()
                .append($("template#actionSuccess").html());
            break;
        }
        case 1: {
            $("#" + form)
                .empty()
                .append($("template#at-work").html());
            break;
        }
        case 2: {
            $("#" + form)
                .empty()
                .append($("template#error").html());
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
    Person.lock();
}
function resetForm(form) {
    $("#" + form).trigger("reset");
    $(".validate").removeClass("invalid");
    $("#" + form + " label").removeClass("active");
}
function getFormData(form) {
    var type = 1;
    var grade = parseInt($('#' + form + 'Form select.grade  option:selected').val() + "", 10);
    var tab = $("#" + form + "Form input");
    switch (type) {
        case 1: {
            var perID = "";
            if (form == "update")
                perID = Enseignant.getItem().getPersonID();
            return new Enseignant($(tab[0]).val() + "", $(tab[1]).val() + "", $(tab[2]).val() + "", $(tab[3]).val() + "", Enseignant.getGrade(grade), perID);
        }
        case 2: {
            return new Enseignant("nom", "prenom", "mail", "NaN", Enseignant.getGrade(0));
        }
        default: {
            return new Enseignant("", "", "", "", "");
        }
    }
}
function initList() {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        dataType: "JSON"
    });
    $.ajax({
        url: "getListesEns",
        type: "GET",
        success: function (result) {
            Enseignant.initList(result.enseignant);
        },
        error: function () {
            console.log("initList Database Error");
        }
    });
}
/*
class MaterielAffectaion{
    private static List:Array<number> = new Array<number>();
    private static ens:Person;
    private static row:HTMLTableRowElement;
    private static input:HTMLElement;
    public static setMat(ens:Person){
        this.ens = ens;
    }
    public static setRow(row:HTMLTableRowElement){
        this.row = row;
    }
    public static setInput(input:HTMLElement){
        this.input = input;
        this.setRow(<HTMLTableRowElement><any>($(input).parent().parent()))
    }
    public static enableCheck(element:any){
        var link:any = $($($(this.row).children().get(-1)).find('a'));
        link.empty()
        link.html($("template#is-not-checked").html())
        $(".check-cell input").prop("disabled",false)
        $($($(element).parent().parent().children().get(-1)).find('a')).attr("disabled",'false')
    }
    public static disableCheck(element:any){
        $(".check-cell input").prop("disabled",true)
        $(this.input).prop("disabled",false)
        $($($(this.row).children().get(-1)).find('a')).removeAttr('disabled')
    }
    public static isShared(element:HTMLLinkElement){
        if($(element).attr('disabled') == "disabled" )
            return;
        var link:any = $($($(this.row).children().get(-1)).find('a'));
        if($(link.find('i')).hasClass("fa-circle")){
            link.empty()
            link.html($("template#is-checked").html())
        }
        else{
            link.empty()
            link.html($("template#is-not-checked").html())
        }
    }
    public static uncheck(){
        $(".check-cell input").prop("checked",false);
        $('.is-shared').empty();
        $('.is-shared').html($("template#is-not-checked").html())
        $(".check-cell input").prop("disabled",false)
    }
    public static getEns(){

    }
    public static initList(enseignants:any){
        enseignants.forEach((b: {personID:number; nom:string; prenom: string;}) => {
            MaterielAffectaion.List.push(b.personID);
            console.log(b)
        });
    }

}
class EnseignantVacataire extends Person{
    private ref:string;
    private num:number;
    constructor (grade:string  , ref:string, num:number , dateAcqui:Date){
        super(grade,dateAcqui);
        this.num = num ;
        this.ref = ref ;
    }
}*/
initList();
