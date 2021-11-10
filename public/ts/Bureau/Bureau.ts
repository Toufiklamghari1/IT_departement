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
var bureauTable:any;
var lock:boolean = true;
export class Bureau implements ManageData{
    private static list:List<Bureau> = new List<Bureau>();
    private static item:number;
    private static row:HTMLElement;
    private numero : string;
    private capacite : number;
    private nbrEns:number;
    private dateAcqui : Date;
    constructor(numero:string , capacite:number ,  dateAcqui:Date , nbrEns:number = 0){
        this.capacite = capacite;
        this.numero = numero;
        this.nbrEns = nbrEns;
        this.dateAcqui = new Date(dateAcqui);
    }
    public show(){
        console.log("numero :"+this.numero);
        console.log("capacite :"+this.capacite);
        console.log("nbrEns : "+this.nbrEns);
        console.log("dateAcqui :"+this.getDateAcqui());
    };
    public static showList(){
        for(var i:number=0;i<Bureau.list.size();i++){
            Bureau.list.get(i).show();
        }
    }
    public getCapacite():number {
        return this.capacite;
    }
    public getNumber():string {
        return this.numero;
    }
    public getDateAcqui():string {
        var date:string="";
        var y:number,m:number,d:number;
        y = this.dateAcqui.getFullYear();
        m = this.dateAcqui.getMonth()+1;
        d = this.dateAcqui.getDate();
        date+=y+"-";
        if(m<=9)
            date += "0"+m+"-";
        else    
            date += m+"-";
        if(d<=9)
            date += "0"+d;
        else    
            date += d;
        return date
    }
    public initUpdateForm(){
        $("#updateForm").trigger('reset')
        var tab = $("#updateForm input");
        $("#updateForm label").addClass('active')
        $(tab[0]).attr('value',this.getNumber());
        $(tab[1]).attr('value',this.getCapacite());
        $(tab[2]).attr('value',this.getDateAcqui());
    }
    public initRemoveModal(){
        $("#bureau-name").text(this.numero);
    }
    public initAffecterModal(){
        $("#numBureau").text(this.getNumber())
        $('#nbr-select').text(0);
        BureauAffectation.setBureau(this)
    }
    public initDetailsModal(){
        var tab = $(".bureau-info");
        $(tab[0]).text(this.getNumber())
        $(tab[1]).text(this.getCapacite())
        $(tab[2]).text(this.getDateAcqui())
    }
    public ajouter(){
        lock = false;
        displayMsg("add",1);
        if(this.test('addForm')){
            this.DBinsert();
            Bureau.list.add(this);
            this.ajouterHTML();
        }
        else
            displayMsg("add",2);
    }
    public ajouterHTML(): void {
        /** ajouterHtml */
        bureauTable.row.add([
            $("template#details-btn").html(),
            this.numero+"",
            this.capacite+"",
            '0',
            this.getDateAcqui()+"",
            $("template#row-btns").html()
        ]).node().id = (Bureau.list.size()-1+"");
        bureauTable.draw();
        var cols = $("tr#"+(Bureau.list.size()-1)+" td");
        for(var i=1;i<5;i++)
            $(cols[i]).addClass('pt-3-half');
        displayMsg("add",0);
        resetForm("addForm");
        closeModal('modalAdd')
    }
    public update(){
        displayMsg("update",1)
        if(this.test("updateForm")){
            this.nbrEns = Bureau.list.get(Bureau.item).nbrEns;
            this.DBupdate();
            Bureau.list.update(this,Bureau.item);
            this.updateHTML();
        }
        else
            displayMsg("update",2)
    }
    public updateHTML(): void {
        if(this.nbrEns == this.capacite)
            BureauAffectation.disableBtn(Bureau.item)
        else    
            BureauAffectation.enableBtn(Bureau.item)
        var tab = $("#bureauTable tr#"+Bureau.item+" .pt-3-half");
        $(tab[0]).text(this.numero);
        $(tab[1]).text(this.capacite);
        $(tab[2]).text(this.nbrEns);
        $(tab[3]).text(this.getDateAcqui());
        displayMsg("update",0)
        closeModal('modalupdate')
    }
    public destroy(){
        if(this.nbrEns != 0){
            displayMsg("remove",2)
            return;
        }
        displayMsg("remove",1)
        if(this.DBdelete())
            console.log("this is return")
        Bureau.list.get(Bureau.item).numero = "";
        this.destroyHTML();
    }
    public destroyHTML(): void {
        Bureau.row.remove()
        bureauTable.row(Bureau.row).remove().draw();
        displayMsg("remove",0)
        closeModal('modalRemove')
    }
    public archiver(){
        this.destroy();
    }
    public affecter(){

    }
    public affecterHTML(){
        closeModal('modalAffecter')
    }
    public updateNbrSelect(a:number){
        var nbr = $("#nbr-select");
        if((this.getCapacite()-this.nbrEns) == parseInt(nbr.text(),10) && a<0){
            $("input.check-box").removeAttr("disabled");
        }
        nbr.text(parseInt(nbr.text(),10)+a)
        if((this.getCapacite()-this.nbrEns) <= parseInt(nbr.text(),10)){
            var tab = $("input.check-box");
            for(var i:number=0;i<tab.length;i++){
                if(!$(tab[i]).prop("checked")){
                    $(tab[i]).attr("disabled",'true')
                }
            }
        }
    }
    public test(form:string):boolean{
        if(form == 'addForm' && lock == true)
            return true;
        var tab = $("form#"+form+" input");
        var verify:boolean = true;
        if(this.numero == ""){
            $(tab[0]).removeClass('valid').addClass('invalid');
            verify = false;
        }
        else{
            var i
            for(i=0;i<Bureau.list.size();i++){
                if(Bureau.list.get(i).numero.toLowerCase( ) == this.numero.toLowerCase() && Bureau.item != i){
                    $(tab[0]).removeClass('valid').addClass('invalid');
                    verify = false;
                    break;
                }
            }
            if( i == Bureau.list.size() )
                $(tab[0]).removeClass('invalid').addClass('valid');
        }
        if(this.capacite == 0){
            $(tab[1]).removeClass('valid').addClass('invalid');
            verify = false;
        }
        else{
            if(form == "updateForm"){
                if(Bureau.getItem().nbrEns > this.capacite){
                    $(tab[1]).removeClass('valid').addClass('invalid');
                    verify = false;
                }
            }
            else
                $(tab[1]).removeClass('invalid').addClass('valid');
        }
        if(!(this.dateAcqui instanceof Date && this.getDateAcqui() != "NaN-NaN-NaN")){
            $(tab[2]).removeClass('valid').addClass('invalid');
            verify = false;
        }
        else
            $(tab[2]).removeClass('invalid').addClass('valid');
        return verify;
    }
    public static initList(){
        $.ajaxSetup({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType:"json"
        });
        $.ajax({
            url: "initList",
            type: 'GET',
            success: function(result) {
                result.bureaux.forEach((b: { num: string; capacite: string; dateAcquisition: Date; EnseignantNumber: number | undefined; }) => {
                    Bureau.list.add(new Bureau(b.num,parseInt(b.capacite),b.dateAcquisition,b.EnseignantNumber))
                    if(parseInt(b.capacite,10) == b.EnseignantNumber){
                        BureauAffectation.disableBtn(Bureau.list.size()-1)
                    }
                });
            },
            error:function(){
                console.error("Database Error")
            }
            });
    }
    public static getListItem(index:number):Bureau{
        return Bureau.list.get(index);
    }
    public static setItem(b:number){
        Bureau.item = b;
    }
    public static getItem():Bureau{
        return Bureau.list.get(Bureau.item);
    }
    public static setRow(r:HTMLElement){
        Bureau.row = r;
    }
    private getData():object{
        return {option:1,capacite:this.capacite,dateAcquisition:this.getDateAcqui(),num:this.numero}
    }
    private  DBinsert():boolean{
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
    private  DBdelete():boolean{
        var bureau:Bureau=this;
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "bureau/"+bureau.numero,
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
    private  DBupdate():boolean{
        var bureau:Bureau=this;
        var obj = this.getData();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "bureau/"+Bureau.getItem().numero,
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
    private  DBarchiver(){
        var bureau:Bureau=this;
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "archiver/"+bureau.numero,
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
    private  DBaffecter():boolean{
        BureauAffectation.getEns()
        return false;
    }
}
class BureauAffectation{
    private static List:Array<number> = new Array<number>();
    private static b:Bureau;
    private static row:HTMLTableRowElement;
    private static input:HTMLElement;
    public static setBureau(b:Bureau){
        this.b = b;
    }
    public static setRow(row:HTMLTableRowElement){
        this.row = row;
    }
    public static setInput(input:HTMLElement){
        this.input = input;
        this.setRow(<HTMLTableRowElement><any>($(input).parent().parent()))
    }
    public static enableCheck(){
        $(".check-cell input").prop("disabled",false)
    }
    public static disableCheck(){
        $(".check-cell input").prop("disabled",true)
        $(this.input).prop("disabled",false)
    }
    public static uncheck(){
        $(".check-cell input").prop("checked",false);
        $(".check-cell input").prop("disabled",false)
    }
    public static getEns(){

    }
    public static initList(enseignants:any){
        enseignants.forEach((b: {personID:number; nom:string; prenom: string;}) => {
            BureauAffectation.List.push(b.personID);
        });
    }
    public static disableBtn(index:number){
        $( ".bureauTable tr#"+index+" td span .btn-info").prop("disabled",true)
    }
    public static enableBtn(index:number){
        $( ".bureauTable tr#"+index+" td span .btn-info").removeAttr("disabled")
    }
}
function getFormData(id:string):Bureau {
    var tab = $("#"+id+" input");
    return new Bureau($(tab[0]).val()+"",Number($(tab[1]).val()),new Date($(tab[2]).val()+""))
}
function getIndex(row:HTMLElement){
    return $(row).parent().parent().attr('id');
}
function displayMsg(form:string,msg:number = -1){
    switch (msg){
        case 0:{
            $("#"+form).empty()
            .append($('#actionSuccess').html())
            break;
        }
        case 1:{
            $("#"+form).empty()
            .append($('#at-ork').html())
            break;
        }
        case 2:{
            $("#"+form).empty()
            .append($('#error').html())
            break;
        }
        default:{
            $("#"+form).empty();
        }
    }
}
function closeModal(modal:string){
  $("#"+modal).toggle('fast')
  $(".modal").trigger('click')
  $('.modal-backdrop').remove()
  lock = true;
}
function resetForm(form:string){
    $('#'+form).trigger('reset')
    $('.validate').removeClass('invalid')
    $('#'+form+' label').removeClass('active')
}