// import  { List}  from "../list";
// import  { ManageData }  from "../manageData";
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
class Reference {
    private id: number;
    private text: string;
    constructor(refID: number, ref: string) {
        this.id = refID;
        this.text = ref;
    }
    public getText(): string {
        return this.text;
    }
    public setReference(text:string){
        this.text = text;
    }
    public getID(): number {
        return this.id;
    }
    public show() {
        console.log("Reference(Id : " + this.id + " , text : " + this.text+" )");
    }
    private getData(designationID:number):object{
        return {option:0,isRef:0,designationID:designationID,tag:this.text}
    }
    public async store(designationID:number){
        var ref:Reference = this;
        if(!this.isEmpty()){
            var obj = this.getData(designationID);
            $.ajaxSetup({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                dataType: "JSON"
            });
            await $.ajax({
                url: "materiel",
                type: "POST",
                data:obj,
                success: function(result) {
                    ref.id = result;
                },
                error: function() {
                    ref.text ="";
                    console.error("Store reference Error")
                }
            });
        }
        return ref;
    }
    public isEmpty():boolean{
        if(this.text == "")
            return true;
        return false;
    }
    public setEmpty(){
        this.text = "";
        this.id = -1;
    }
}
class Designation {
    private list: List<Reference> = new List<Reference>();
    private designationID: number;
    private designation: string;
    constructor(designationID: number, designation: string) {
        this.designationID = designationID;
        this.designation = designation;
    }
    public show(){
        console.log("designation(designationID: "+this.designationID+" , designation: "+this.designation)
    }
    public showList(){
        console.error("Designation.showList()")
        for(var i:number=0;i<this.list.size();i++)
            this.list.get(i).show()
    }
    public initList() {
        var desig: Designation = this;
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "json"
        });
        $.ajax({
            url: "/getReferences/"+ this.designationID,
            type: "GET",
            success: function(result) {
                result.references.forEach(
                    (b: { refID: number; ref: string }) => {
                        desig.list.add(new Reference(b.refID, b.ref));
                    }
                );
            },
            error: function() {
                console.error("Reference Database Error");
            }
        });
    }
    public getDesignationID(): number {
        return this.designationID;
    }
    public getDesignation(): string {
        return this.designation;
    }
    public setDesignation(designation:string){
        this.designation = designation;
    }
    public designationSelected(form:string,index:number=-1){
        $('#'+form+'Form select.reference').empty()
        var newOption = new Option(
            "",
            "",
            false,
            false
        );
        var selected:boolean=false;
        $('#'+form+'Form select.reference')
            .append(newOption)
            .trigger("change");
        for (var i: number = 0; i < this.list.size(); i++) {
            if(index == i){
                selected = true
            }
            var newOption = new Option(
                this.list.get(i).getText(),
                i+ "",
                selected,
                selected
            );
            $('#'+form+'Form select.reference')
                .append(newOption)
                .trigger("change");
            selected = false;
        }
    }
    private getData(type:number):object{
        return {option:0,isRef:1,type:type,tag:this.designation}
    }
    public async store(type:number){
        var designation :Designation = this;
        if(!this.isEmpty()){
            var obj = this.getData(type);
            $.ajaxSetup({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                dataType: "JSON"
            });
            await $.ajax({
                url: "materiel",
                type: "POST",
                data:obj,
                success: function(result) {
                    designation.designationID = result;
                },
                error: function() {
                    console.error("Store designation Error")
                    designation.designation = "";
                }
            });
        }
        return designation;
    }
    public getReferenceIndex(referenceID:number):number{
        for(var i=0;i<this.list.size();i++){
            if(referenceID == this.list.get(i).getID())
                return i;
        }
        return -1;
    }
    public getReference(index:number):Reference{
        return this.list.get(index);
    }
    public addReference(reference: Reference) {
        this.list.add(reference);
        var o = $("<option/>", {value: this.list.size(), text: reference.getText()});
        $('select.reference').append(o);
        $('select.reference').trigger('change')
        
    }
    public isEmpty():boolean{
        if(this.designation == "")
            return true;
        return false;
    }
    public setEmpty(){
        this.designation = "";
        this.designationID = -1;
    }
}
var lock:boolean=true;
abstract class Materiel implements ManageData {
    protected static table: any;
    protected designation: number;
    protected dateAcqui: Date;
    protected matId:string;
    private static newDesignation:Designation = new Designation(-1,"");
    private static newReference:Reference = new Reference(-1,"");
    constructor(matID:string,designation: number, dateAcqui: Date) {
        this.matId = matID;
        this.designation = designation;
        this.dateAcqui = new Date(dateAcqui);
    }
    public show() {
        console.log("matID : "+this.matId)
        console.log("designation :" + this.designation);
        console.log("dateAcqui :" + this.getDateAcqui());
    }
    public getDateAcqui(): string {
        var date: string = "";
        var y: number, m: number, d: number;
        y = this.dateAcqui.getFullYear();
        m = this.dateAcqui.getMonth() + 1;
        d = this.dateAcqui.getDate();
        date += y + "-";
        if (m <= 9) date += "0" + m + "-";
        else date += m + "-";
        if (d <= 9) date += "0" + d;
        else date += d;
        return date;
    }
    public static setTable(table: any) {
        Materiel.table = table;
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
    public abstract initDetailsModal(): void;
    public abstract destroy(): void ;
    public abstract destroyHTML(): void ;
    public abstract archiver(): void ;
    public abstract test(): boolean;
    protected abstract DBinsert():boolean;
    protected abstract DBdelete():boolean;
    protected abstract DBupdate():boolean;
    protected abstract DBarchiver():boolean;
    protected abstract DBaffecter():boolean;
    protected abstract getType():number;
    protected static getDignationID():number{return -1};
    protected abstract addDesignation(designation:Designation):void;
    protected abstract setRefID(refID:number):void;
    public static unlock(){
        lock = false;
    }
    public static lock(){
        lock = true;
    }
    public static setDesignation(designaton:string){
        Materiel.newDesignation.setDesignation(designaton);
    }
    public static setReference(reference: string){
        Materiel.newReference.setReference(reference);
    }
    private static setNewDesignationEmpty(){
        this.newDesignation = new Designation(-1,"");
    }
    private static setNewReferenceEmpty(){
        this.newReference = new Reference(-1,"")
    }
    protected static async storeDesignationRef(materiel:Materiel,designation:Designation){
        if(!Materiel.newDesignation.isEmpty()){
            var designation:Designation =   await Materiel.newDesignation.store(materiel.getType());
            materiel.designation = designation.getDesignationID();
            materiel.addDesignation(designation);
            await this.storeReference(materiel,designation);
            Materiel.setNewDesignationEmpty()
            return
        }
        await this.storeReference(materiel,designation);
    }
    private static async storeReference(materiel:Materiel,designation:Designation){
        if(designation != undefined &&!designation.isEmpty() && designation.getDesignationID() != undefined&&!Materiel.newReference.isEmpty() ){
            var reference:Reference = await Materiel.newReference.store(designation.getDesignationID());
            materiel.setRefID(reference.getID())
            designation.addReference(reference)
            Materiel.setNewReferenceEmpty()
        }
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
function closeModal(modal: string) {
    $("#" + modal).toggle("fast");
    $(".modal").trigger("click");
    $(".modal-backdrop").remove();
    Materiel.lock();
}
function resetForm(form: string) {
    $("#" + form).trigger("reset");
    $(".validate").removeClass("invalid");
    $("#" + form + " label").removeClass("active");
}
class MaterielInfo extends Materiel {
    public static readonly type = 1;
    private static list:List<MaterielInfo> = new List<MaterielInfo>();
    private static designationList: List<Designation>;
    private static item:number;
    private static row:HTMLElement;
    private static form:string="add";
    private num: number;
    private comment: string;
    private ref: number;
    constructor(
        designation: number,
        ref: number,
        comment: string,
        num: number,
        dateAcqui: Date,
        matID:string=""
    ) {
        super(matID,designation, dateAcqui);
        this.num = num;
        this.comment = comment;
        this.ref = ref;
    }
    public show() {
        super.show();
        console.log("num : " + this.num);
        console.log("comment : " + this.comment);
        console.log("ref : " + this.ref);
    }
    public static showDesiList(){
        console.error("MaterielInfo.showDesiList()")
        for(var i:number=0;i<MaterielInfo.designationList.size();i++)
            console.log(MaterielInfo.designationList.get(i))
    }
    public static init(){
        MaterielInfo.initInputs();
        MaterielInfo.initDesignationsList();
    }
    public static initInputs(){
        $($("template.reference").parent()).append($("template.reference").html())
        $($("template.commentaire").parent()).append($("template.commentaire").html())
        $($("template.num-inventaire").parent()).append($("template.num-inventaire").html())
        $($("#updateForm template.date-aqui").parent()).append($("#updateForm template.date-aqui").html())
        $($("#addForm template.date-aqui").parent()).append($("#addForm template.date-aqui").html())
    }
    public static initList(materiel:any){
        materiel.forEach((b: {matID:string; designation: number; ref: number; num: number; comment:string; dateAcquisition: Date;}) => {
            MaterielInfo.list.add(new MaterielInfo(parseInt(b.designation+"",10),parseInt(b.ref+"",10),b.comment,parseInt(b.num+"",10),b.dateAcquisition,b.matID));
        });
    }
    public static initDesignationsList() {
        MaterielInfo.designationList = new List<Designation>();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "json"
        });
        $.ajax({
            url: "/getDesignations/" + MaterielInfo.type,
            type: "GET",
            success: function(result) {
                result.designations.forEach(
                    (b: { designationID: number; designation: string }) => {
                        var desig: Designation = new Designation(
                            b.designationID,
                            b.designation
                        );
                        desig.initList();
                        MaterielInfo.designationList.add(desig);
                    }
                );
                MaterielInfo.initDesignationsSelect();
            },
            error: function() {
                console.log("designation Database Error");
            }
        });
    }
    public static initDesignationsSelect(index:number = -1){
        $("#"+MaterielInfo.form+"Form select.designation").empty();
        $("#"+MaterielInfo.form+"Form select.designation")
        .append(new Option("","",false,false))
        .trigger("change");
        var selected:boolean = false;
        for(var i:number=0;i<MaterielInfo.designationList.size();i++){
            if(index == i)
                selected = true
            var newOption = new Option(
                MaterielInfo.designationList.get(i).getDesignation() ,
                i + "",
                selected,
                selected
            );
            $("#"+MaterielInfo.form+"Form select.designation")
                .append(newOption)
                .trigger("change");
            selected  = false;
        }

    }
    public static designationSelected(index: number,refIndex:number = -1) {
        if(index>=0)
        MaterielInfo.designationList
            .get(index)
            .designationSelected(MaterielInfo.form,refIndex);
    }
    public static setItem(b:number){
        MaterielInfo.item = b;
    }
    public static getItem():MaterielInfo{
        return MaterielInfo.list.get(MaterielInfo.item);
    }
    public static setRow(r:HTMLElement){
        MaterielInfo.row = r;
    }
    public static destroy(): void {
        displayMsg("remove",1)
        try{MaterielInfo.list.get(MaterielInfo.item).DBdelete()}
        catch(error){
            console.error("error")
            return  
        }
        MaterielInfo.list.get(MaterielInfo.item).matId = "";
        MaterielInfo.list.get(MaterielInfo.item).num = NaN
        MaterielInfo.destroyHTML();
    }
    public static destroyHTML(): void {
        /* destroyHTML */
        MaterielInfo.row.remove()
        MaterielInfo.table.row(MaterielInfo.row).remove().draw();
        displayMsg("remove",0)
        closeModal('modalRemove')
    }
    public static archiver(): void {
        MaterielInfo.list.get(MaterielInfo.item).DBarchiver()
        MaterielInfo.list.get(MaterielInfo.item).matId = "";
        MaterielInfo.list.get(MaterielInfo.item).num = NaN
        MaterielInfo.destroyHTML();
    }
    public static getDesignation(index:number):number{
        if(!isNaN(index) && index >= 0)
            return MaterielInfo.designationList.get(index).getDesignationID()
        return -1;
    }
    public static getReference(index:number , refIndex:number):number{
        if(!isNaN(index) && !isNaN(refIndex) && refIndex >=0 && index >= 0)
            return MaterielInfo.designationList.get(index).getReference(refIndex).getID()
        return -1;
    }
    public static setForm(form:string){
        MaterielInfo.form = form;
    }
    public static getForm():string{
        return MaterielInfo.form
    }
    public static getListLenght():number{
        return this.list.size()
    }
    public addDesignation(designation: Designation) {
        MaterielInfo.designationList.add(designation);
        var o = $("<option/>", {value: MaterielInfo.designationList.size(), text: designation.getDesignation()});
        $('.designation').append(o);
        $('.designation').trigger('change')
    }
    public initUpdateForm(): void {
        $("#updateForm").trigger('reset')
        var index:number = this.getDesignationIndex()
        selectUpdateOption(index,MaterielInfo.designationList.get(index).getReferenceIndex(this.ref));
        var tab = $("#updateForm input");
        $("#updateForm label").addClass('active')
        $(tab[0]).attr('value',this.comment);
        $(tab[1]).attr('value',this.num);
        $(tab[2]).attr('value',this.getDateAcqui());
    }
    public initRemoveModal(): void {
        $("#materiel-name").text(this.getDesignationText()+" "+this.getReferenceText())
    }
    public initAffecterModal(): void {
        MaterielAffectaion.uncheck();
        $("span.materiel-info").text(this.getDesignationText()+" "+this.getReferenceText())
    }
    public initDetailsModal(): void {
        throw new Error("Method not implemented.");
    }
    public getType(): number {
        return MaterielInfo.type;
    }
    public async ajouter(): Promise<void> {
        Materiel.unlock()
        await Materiel.storeDesignationRef(this,MaterielInfo.designationList.get(this.getDesignationIndex()));
        if(this.test()){
            this.DBinsert()
            MaterielInfo.list.add(this)
            this.ajouterHTML()
        }
    }
    public ajouterHTML(): void {
        /** ajouterHtml */
        MaterielInfo.table.row.add([
            this.getDesignationText(),
            this.getReferenceText(),
            this.num,
            this.getDateAcqui()+"",
            $("template#row-btns").html()
        ]).node().id = (MaterielInfo.list.size()-1+"");
        MaterielInfo.table.draw();
        var cols = $("tr#"+(MaterielInfo.list.size()-1)+" td");
        for(var i=0;i<4;i++)
            $(cols[i]).addClass('pt-3-half');
        displayMsg("add",0);
        resetForm("addForm");
        Materiel.lock()
        //closeModal('modalAdd')
    }
    public update(): void {
        Materiel.unlock()
        displayMsg(MaterielInfo.form,1)
        if(this.test()){
            this.DBupdate();
            if(MaterielInfo.list.update(this,MaterielInfo.item))
                this.updateHTML();
        }
        else
            displayMsg(MaterielInfo.form,2)
    }
    public updateHTML(): void {
        var tab = $("table#materiel-info tr#"+MaterielInfo.item+" .pt-3-half");
        $(tab[0]).text(this.getDesignationText());
        $(tab[1]).text(this.getReferenceText());
        $(tab[2]).text(this.num);
        $(tab[3]).text(this.getDateAcqui());
        displayMsg(MaterielInfo.form,0)
        closeModal('modalupdate')
    }
    public affecter(): void {
        throw new Error("Method not implemented.");
    }
    public affecterHTML(): void {
        throw new Error("Method not implemented.");
    }
    public destroy(): void {
        throw new Error("Method not implemented.");
    }
    public destroyHTML(): void {
        throw new Error("Method not implemented.");
    }
    public archiver(): void {
        throw new Error("Method not implemented.");
    }
    public getDesignationIndex():number{
        for(var i=0;i<MaterielInfo.designationList.size();i++){
            if(this.designation == MaterielInfo.designationList.get(i).getDesignationID())
                return i;
        }
        return -1;
    }
    private getDesignationText():string{
        return MaterielInfo.designationList.get(this.getDesignationIndex()).getDesignation()
    }
    public getDesignationID():number{
        return MaterielInfo.designationList.get(this.getDesignationIndex()).getDesignationID()
    }
    private getReferenceText():string{
        var designation:Designation = MaterielInfo.designationList.get(this.getDesignationIndex());
        return designation.getReference(designation.getReferenceIndex(this.ref)).getText()
    }
    public getMatID():string{
        return this.matId;
    }
    private getData():object{
        return {option:1,designation:this.designation,ref:this.ref,num:this.num,comment:this.comment,date:this.getDateAcqui()}
    }
    private setMatID(id:string){
        this.matId = id;
    }
    public setRefID(refID:number):void{
        this.ref = refID;
    }
    public test():boolean{
        if(lock)
            return true;
        var tab = $("form#"+MaterielInfo.form+"Form input");
        var select = $("form#"+MaterielInfo.form+"Form span.select2-container--default .select2-selection--single")
        var verify:boolean = true;
        if(this.designation == -1 || isNaN(this.designation)){
            $(select[1]).css("border-color","#f44336")
            verify = false;
        }else{
            $(select[1]).css("border-color","#fff")
        }
        if(this.ref == -1 || isNaN(this.ref)){
            $(select[2]).css("border-color","#f44336")
            verify = false;
        }else{
            $(select[2]).css("border-color","#fff")
        }
        if(this.comment == ""){
            $(tab[0]).removeClass('valid').addClass('invalid');
            verify = false;
        }else{
            $(tab[0]).removeClass('invalid').addClass('valid');
        }
        if( isNaN(this.num) || this.num == -1){
            $(tab[1]).removeClass('valid').addClass('invalid');
            verify = false;
        }else{
            var i:number;
            for(i=0;i<MaterielInfo.list.size();i++){
                if(MaterielInfo.list.get(i).num == this.num && MaterielInfo.list.get(i).matId != this.matId){
                    $(tab[1]).removeClass('valid').addClass('invalid');
                    verify = false;
                    break;
                }
            }
            if( i == MaterielInfo.list.size() )
                $(tab[1]).removeClass('invalid').addClass('valid');
        }
        if(!(this.dateAcqui instanceof Date && this.getDateAcqui() != "NaN-NaN-NaN")){
            $(tab[2]).removeClass('valid').addClass('invalid');
            verify = false;
        }else{
            $(tab[2]).removeClass('invalid').addClass('valid');
        }
        return verify;
    }
    protected DBinsert():boolean{
        var mat:MaterielInfo=this;
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
            data:obj,
            success: function(result) {
                mat.setMatID(result)
                return true;
            },
            error: function() {
                return false;
            }
        });
        return false;
    }
    protected DBdelete():boolean{
        var mat:MaterielInfo=this;
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "materiel/1@"+mat.matId,
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
        var mat:MaterielInfo=this;
        var obj = this.getData();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "materiel/"+mat.matId,
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
        var mat:MaterielInfo=this;
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            dataType: "TEXT"
        });
        $.ajax({
            url: "archiver/1@"+mat.matId,
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
        MaterielAffectaion.getEns()
        return false;
    }
}
function getFormData(form: string): Materiel {
    var type:number = parseInt($('#'+form+'Form .materiel-type  option:selected').attr('value')+"",10)
    var designation:number = parseInt($('#'+form+'Form select.designation  option:selected').attr('value')+"",10)
    var reference:number = parseInt($('#'+form+'Form select.reference  option:selected').attr('value')+"",10)
    var tab = $("#" + form + "Form input");
    switch(type){
        case 1 :{
                var matID:string = "";
                if(form == "update")
                    matID = MaterielInfo.getItem().getMatID()
                return new MaterielInfo(
                    MaterielInfo.getDesignation(designation),
                    MaterielInfo.getReference(designation,reference),
                    $(tab[0]).val() + "",
                    parseInt($(tab[1]).val() + "", 10),
                    new Date($(tab[2]).val() + ""),
                    matID
                );
        }
        case 2 :{
            return new MaterielInfo(
                designation,
                reference,
                $(tab[0]).val() + "",
                parseInt($(tab[1]).val() + "", 10),
                new Date($(tab[3]).val() + "")
            );
            
        }
        case 3 :{
            return new MaterielInfo(
                designation,
                reference,
                $(tab[0]).val() + "",
                parseInt($(tab[1]).val() + "", 10),
                new Date($(tab[3]).val() + "")
            );
            
        }
        case 4 :{
            return new MaterielInfo(
                designation,
                reference,
                $(tab[0]).val() + "",
                parseInt($(tab[1]).val() + "", 10),
                new Date($(tab[3]).val() + "")
            );
            
        }
        default:{
            return new MaterielInfo(
                -1,
                -1,
                "",
                -1,
                new Date("")
            );
        }
    }
}
function initList(){
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        dataType: "json"
    });
    $.ajax({
        url: "getListes",
        type: "GET",
        success: function(result) {
            MaterielInfo.initList(result.materielInfo);
            MaterielAffectaion.initList(result.enseignant)
        },
        error: function() {
            console.log("initList Database Error");
        }
    });
}
function selectUpdateOption(designation:number,ref:number){
    MaterielInfo.initDesignationsSelect(designation)
    MaterielInfo.designationSelected(designation,ref)
}
class MaterielAffectaion{
    private static List:Array<number> = new Array<number>();
    private static mat:Materiel;
    private static row:HTMLTableRowElement;
    private static input:HTMLElement;
    public static setMat(mat:Materiel){
        this.mat = mat;
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
        });
    }

}
/*class Equipement extends Materiel{
    private ref:string;
    private num:number;
    constructor (designation:string  , ref:string, num:number , dateAcqui:Date){
        super(designation,dateAcqui);
        this.num = num ;
        this.ref = ref ;
    }
}
class FornitureInfo extends Materiel{
    private comment:string;
    private ref:string;
    private quantite:number;
    constructor (designation:string , ref:string ,comment:string ,quantite:number ,  dateAcqui:Date){
        super(designation,dateAcqui);
        this.quantite = quantite ;
        this.comment = comment;
        this.ref = ref ;
    }
    
}
class FornitureBureau extends Materiel{
    private quantite:number;
    constructor (designation:string , quantite:number , dateAcqui:Date){
        super(designation,dateAcqui);
        this.quantite = quantite ;
    }
    
}*/
initList();