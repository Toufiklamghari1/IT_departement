class List<T> {
    private items: Array<T>;

    constructor() {
        this.items = [];
    }
    public size(): number {
        return this.items.length;
    }
    public add(value: T): void {
        this.items.push(value);
    }
    public delete(index:number):void{
        this.items.splice(index,1);
    }
    public update(item:T,index:number):boolean{
        this.items[index] = item;
        return true;
    }
    public get(index: number): T {
        return this.items[index];
    }
}
interface ManageData{
    initUpdateForm():void;
    initRemoveModal():void;
    initAffecterModal():void;
    initDetailsModal():void;
    ajouter():void;
    ajouterHTML():void;
    update():void;
    updateHTML():void;
    destroy():void;
    destroyHTML():void;
    affecter():void;
    affecterHTML():void;
    archiver():void;
}
var lock:boolean=true;
abstract class Person implements ManageData {
    protected nom:string;
    protected prenom:string;
    protected mail:string;
    protected personID:string;
    protected static form:string="add";
    constructor(nom:string,prenom:string,mail:string,personID:string) {
        this.personID = personID;
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
    }
    initDetailsModal(): void {
        throw new Error("Method not implemented.");
    }
    archiver(): void {
        throw new Error("Method not implemented.");
    }
    destroy(): void {
        throw new Error("Method not implemented.");
    }
    destroyHTML(): void {
        throw new Error("Method not implemented.");
    }
    public show() {
        console.log("nom : "+this.nom)
        console.log("prenom :" + this.prenom);
        console.log("mail :" + this.mail);
    }
    public abstract initUpdateForm(): void;
    public abstract initRemoveModal(): void;
    public abstract initAffecterModal(): void;
    public abstract ajouter(): void;
    public abstract ajouterHTML(): void;
    public abstract update(): void;
    public abstract updateHTML(): void;
    public abstract affecter(): void;
    public abstract affecterHTML(): void;
    public abstract test(form: string): boolean;
    protected abstract DBinsert():boolean;
    protected abstract DBdelete():boolean;
    protected abstract DBupdate():boolean;
    protected abstract DBarchiver():boolean;
    protected abstract DBaffecter():boolean;
    public static unlock(){
        lock = false;
    }
    public static lock(){
        lock = true;
    }
}
export class Enseignant extends Person {
    private static list:List<Enseignant> = new List<Enseignant>();
    private static item:number;
    private static row:HTMLElement;
    private static table:any;
    private static gradeTab = ["PESA","PH","PES"]
    private dateRecrut:Date;
    private grade:string;
    constructor(nom:string,prenom:string,mail:string,dateRecrut:string,grade:string,personID="") {
        super(nom,prenom, mail,personID);
        this.dateRecrut = new Date(dateRecrut);
        this.grade = grade;
    }
    public show() {
        super.show();
        console.log("dateRecut : " + this.getDateRecut());
        console.log("garede : " + this.grade);
    }
    public getDateRecut(): string {
        var date: string = "";
        var y: number, m: number, d: number;
        y = this.dateRecrut.getFullYear();
        m = this.dateRecrut.getMonth() + 1;
        d = this.dateRecrut.getDate();
        date += y + "-";
        if (m <= 9) date += "0" + m + "-";
        else date += m + "-";
        if (d <= 9) date += "0" + d;
        else date += d;
        return date;
    }
    public static init(){
        Enseignant.initInputs();
    }
    public static initInputs(){
        $($("template.grade").parent()).append($("template.grade").html())
        $($("template.date-recrutement").parent()).append($("template.date-recrutement").html())
    }
    public static initList(Person:any){
        Person.forEach((b: {personID:string; Email: string;Nom:string; Prenom: string; Grade: string; DateRecrutement:string;}) => {
            Enseignant.list.add(new Enseignant(b.Nom,b.Prenom,b.Email,b.DateRecrutement,b.Grade,b.personID));
        });
    }
    public static setTable(table:any){
        Enseignant.table = table;
    }
    public static setItem(b:number){
        Enseignant.item = b;
    }
    public static getItem():Enseignant{
        return Enseignant.list.get(Enseignant.item);
    }
    public static setRow(r:HTMLElement){
        Enseignant.row = r;
    }
    public initUpdateForm(): void {
        $("#updateForm").trigger('reset')
        //selectUpdateOption(index,Enseignant.designationList.get(index).getReferenceIndex(this.ref));
        var tab = $("#updateForm input");
        $("#updateForm label").addClass('active')
        $(tab[0]).attr('value',this.nom);
        $(tab[1]).attr('value',this.prenom);
        $(tab[2]).attr('value',this.mail);
        $(tab[3]).attr('value',this.getDateRecut());
    }
    public initRemoveModal(): void {
        $("#person-name").text(this.nom+" "+this.prenom)
    }
    public initAffecterModal(): void {
        //MaterielAffectaion.uncheck();
        //$("span.Person-info").text(this.getDesignationText()+" "+this.getReferenceText())
    }
    public ajouter(): void {
        Person.unlock()
        if(this.test()){
            this.DBinsert()
            Enseignant.list.add(this)
            this.ajouterHTML()
        }
    }
    public ajouterHTML(): void {
        Enseignant.table.row.add([
            $("template#details-btn").html(),
            this.nom,
            this.prenom,
            this.getDateRecut()+"",
            $("template#row-btns").html()
        ]).node().id = (Enseignant.list.size()-1+"");
        Enseignant.table.draw();
        var cols = $("tr#"+(Enseignant.list.size()-1)+" td");
        for(var i=1;i<4;i++)
            $(cols[i]).addClass('pt-3-half');
        displayMsg("add",0);
        resetForm("addForm");
        closeModal('modalAdd')
    }
    public update(): void {
        this.show()
        Person.unlock()
        displayMsg(Enseignant.form,1)
        if(this.test()){
            this.DBupdate();
            if(Enseignant.list.update(this,Enseignant.item))
                this.updateHTML();
        }
        else
            displayMsg(Enseignant.form,2)
    }
    public updateHTML(): void {
        var tab = $("table#enseignant tr#"+Enseignant.item+" .pt-3-half");
        $(tab[0]).text(this.nom);
        $(tab[1]).text(this.prenom);
        $(tab[2]).text(this.getDateRecut());
        displayMsg(Enseignant.form,0)
        closeModal('modalupdate')
    }
    public static destroy(): void {
        displayMsg("remove",1)
        try{Enseignant.list.get(Enseignant.item).DBdelete()}
        catch(error){
            console.error("error")
            return  
        }
        Enseignant.list.get(Enseignant.item).mail = "";
        Enseignant.destroyHTML();
    }
    public static destroyHTML(): void {
        /* destroyHTML */
        Enseignant.row.remove()
        Enseignant.table.row(Enseignant.row).remove().draw();
        displayMsg("remove",0)
        closeModal('modalRemove')
    }
    public static archiver(): void {
        Enseignant.list.get(Enseignant.item).DBarchiver()
        Enseignant.list.get(Enseignant.item).mail = "";
        Enseignant.destroyHTML();
    }
    public static getGrade(index:number):string{
        return this.gradeTab[index];
    }
    public static setForm(form:string){
        Enseignant.form = form;
    }
    public static getForm():string{
        return Enseignant.form
    }
    public affecter(): void {
        throw new Error("Method not implemented.");
    }
    public affecterHTML(): void {
        throw new Error("Method not implemented.");
    }
    public getPersonID():string{
        return this.personID;
    }
    public test():boolean{
        if(lock)
            return true;
        var tab = $("form#"+Enseignant.form+"Form input");
        var select = $("form#"+Enseignant.form+"Form select")
        var verify:boolean = true;
        if(this.grade == ""){
            $(select[1]).css("border-color","#f44336")
            verify = false;
        }else{
            $(select[1]).css("border-color","#fff")
        }
        if(this.nom == ""){
            $(tab[0]).removeClass('valid').addClass('invalid');
            verify = false;
        }else{
            $(tab[0]).removeClass('invalid').addClass('valid');
        }
        if(this.prenom == ""){
            $(tab[1]).removeClass('valid').addClass('invalid');
            verify = false;
        }else{
            $(tab[1]).removeClass('invalid').addClass('valid');
        }
        if(this.mail == ""){
            $(tab[2]).removeClass('valid').addClass('invalid');
            verify = false;
        }else{
            $(tab[2]).removeClass('invalid').addClass('valid');
        }
        if(!(this.dateRecrut instanceof Date && this.getDateRecut() != "NaN-NaN-NaN")){
            $(tab[3]).removeClass('valid').addClass('invalid');
            verify = false;
        }else{
            $(tab[3]).removeClass('invalid').addClass('valid');
        }
        return verify;
    }
    protected getData():object{
        return {option:1,grade:this.grade,nom:this.nom,prenom:this.prenom,dateRecrut:this.getDateRecut(),mail:this.mail}
    }
    protected DBinsert():boolean{
        var ens:Enseignant=this;
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
            data:obj,
            success: function(result) {
                console.log(result)
                ens.personID = result;
                return true;
            },
            error: function() {
                return false;
            }
        });
        return false;
    }
    protected DBdelete():boolean{
        var ens:Enseignant=this;
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "enseignant/1@"+ens.personID,
            type: "DELETE",
            success: function(result) {
                return true;
            },
            error: function() {
                return false;
            }
        });
        return false;
    }
    protected DBupdate():boolean{
        var ens:Enseignant=this;
        var obj = this.getData();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "enseignant/"+ens.personID,
            type: "PUT",
            data:obj,
            success: function(result) {
                return true;
            },
            error: function() {
                return false;
            }
        });
        return false;
    }
    protected DBarchiver(){
        var ens:Enseignant=this;
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "archiver/1@"+ens.personID,
            type: "PUT",
            success: function(result) {
                return true;
            },
            error: function() {
                return false;
            }
        });
        return false;
    }
    protected DBaffecter():boolean{
        //MaterielAffectaion.getEns()
        return false;
    }
}
function getIndex(row: HTMLElement) {
    return $(row)
        .parent()
        .parent()
        .attr("id");
}
function displayMsg(form: string, msg: number = -1) {
    switch (msg) {
        case 0: {
            Person.lock()
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
function closeModal(modal: string) {
    $("#" + modal).toggle("fast");
    $(".modal").trigger("click");
    $(".modal-backdrop").remove();
    Person.lock();
}
function resetForm(form: string) {
    $("#" + form).trigger("reset");
    $(".validate").removeClass("invalid");
    $("#" + form + " label").removeClass("active");
}
function getFormData(form: string): Person {
    var type:number = 1;
    var grade:number = parseInt($('#'+form+'Form select.grade  option:selected').val()+"",10)
    var tab = $("#" + form + "Form input");
    switch(type){
        case 1 :{
                var perID:string = "";
                if(form == "update")
                    perID = Enseignant.getItem().getPersonID();
                return new Enseignant(
                    $(tab[0]).val() + "",
                    $(tab[1]).val() + "",
                    $(tab[2]).val() + "",
                    $(tab[3]).val() + "",
                    Enseignant.getGrade(grade),
                    perID
                );
        }
        case 2 :{
            return new Enseignant(
                "nom",
                "prenom",
                "mail",
                "NaN",
                Enseignant.getGrade(0)
            );
            
        }
        default:{
            return new Enseignant(
                "",
                "",
                "",
                "",
                ""
            );
        }
    }
}
function initList(){
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        dataType: "JSON"
    });
    $.ajax({
        url: "getListesEns",
        type: "GET",
        success: function(result) {
            Enseignant.initList(result.enseignant);
        },
        error: function() {
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
