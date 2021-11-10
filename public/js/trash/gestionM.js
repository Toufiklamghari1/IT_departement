// materiel info   t1
// equipement bureau t3
// forniture info t2
// forniture bureau t4
const $tableID = $('#table');
const $BTN = $('#export-btn');
const $EXPORT = $('#export');
const $tabs = [$('#tab1'),$('#tab2'),$('#tab3'),$('#tab4')]
setActive(1)
var quantite;
var quantiteD;
var quantiteTab = [];
var rowSelected;
var inputID;
var t="t1";
var modal;
var affecterInputs;
var editInputs = $("#editForm input");
var newTag;
var newOldTag = "";
var removeRowId;
var removeRowHTMLId;
var updateId;
var affectedMatID;
function showInput(data,option){
  if(designation.val() == 0 ){
  $("#addRefLabel").css("display","none");
  ref.data('select2').$container.css("display","none");}
  if(data == 4)
  editRef.data('select2').$container.css("display","none");
  else{
  editRef.data('select2').$container.css("display","");
  }
  if(modal == "edit"){
    Inputs = $("#editModal input");
  }
  else{ 
    Inputs =  $("#modalAdd input");
  }
  switch(data){
    case 0:{
      for(var i=0;i<Inputs.length-2;i++){
        $(Inputs[i]).parent().css("display","none");
      }
      break;
    }
    case 1:{
      for(var i=0;i<Inputs.length-1;i++){
        if(i == 2){
          $(Inputs[i]).parent().css("display","none");
          continue;
        }
        $(Inputs[i]).parent().css("display","");
      }
      break;
    }
    case 2:{
      $(Inputs).parent().css("display","");
      for(var i=0;i<Inputs.length-2;i++){
        if(i==1){
          $(Inputs[i]).parent().css("display","none");
          continue;
        }
        $(Inputs[i]).parent().css("display","");
      }
      break;
    }
    case 3:{
      for(var i=0;i<Inputs.length-1;i++){
        if(i==0 || i == 2){
          $(Inputs[i]).parent().css("display","none");
          continue;
        }
        $(Inputs[i]).parent().css("display","");
      }
      break;
    }
    case 4:{
      $(Inputs).parent().css("display","");
      for(var i=0;i<Inputs.length-2;i++){
        $(Inputs[i]).parent().css("display","none");
      }
      break;
    }
  }
}
function tableId(Num){
    t="t"+Num;
    for(var i=0;i<4;i++){
      if( i ==parseInt(Num,10)-1){
        $tabs[i].addClass('active-tab');
        //$$tabs[i].classList.add('active-tab');
        continue;
      }
      try{
        $tabs[i].removeClass('active-tab');
        //$tabs[i].classList.remove('active-tab');
      }catch(e){
        console.log(e)
      }
    }
}
function rowNumberTab(tab){
  switch(tab){
    case 1:{

      return $("#table1 >tbody >tr").length+1;
    }
    case 2:{
      return $("#table2 >tbody >tr").length+1;
    }
    case 3:{
      return $("#table3 >tbody >tr").length+1;
    }
    case 4:{
      return $("#table4 >tbody >tr").length+1;
    }
  }
}
function getRowNumber(row){
    var rowhelp = $(row).attr('id').substring(1,row.length);
    // row   -->   $(row)
    var position = /[a-z]/i.exec($(row)).index;
    row = $(row).attr('id').substring(position+1,row.length);
    var id1 = row.match(/(\d+)/);
    var id="";
    for(var i=0;i<id1.length-1;i++){
    id += id1[i];
    }
    return id;
};
function isChecked(boxNum){
  console.log("isChecked :" +boxNum)
    if($("#Arow"+boxNum).hasClass('affecter-row')){
      $("#Arow"+boxNum).removeClass("affecter-row");
      if(t == 't1' || t == 't3'){
          $(".check-box").attr('disabled',false)
        var btn = $("#shared"+boxNum+"  i");
        if($(btn[1]).hasClass('hidden')){
          $(btn[0]).addClass('hidden')
          $(btn[1]).removeClass('hidden')
        }
        $("#shared"+boxNum).attr('disabled',true)
      }
      if(t == 't2' || t == 't4'){
        $("#affecterQuantite"+boxNum).val("");
        $("#affecterQuantite"+boxNum).attr('disabled',true)
        inputID = boxNum
        updateQ(0)

      }
    }
    else{
      $("#Arow"+boxNum).addClass("affecter-row");
      if(t == 't1' || t == 't3'){
        $(".check-box").attr('disabled',true)
        $("#check"+boxNum).attr('disabled',false)
        $("#shared"+boxNum).removeAttr('disabled')
      }
      else{
        $("#affecterQuantite"+boxNum).attr('disabled',false)
      }
    }
};
function disableBtnAffecter(type){
  console.log("disabled");
  var i=1;
  var row = $("[id="+t+"col"+i+"]");
  var $btn;
  while(row.length != 0){
    var nbr = parseInt(row[1].textContent,10);
     $btn=$("#"+t+type+i);
    if(nbr<=0){
      console.log("disabled"+i);
      $btn.prop("disabled",true);
      $btn.css('color','#4d4d4d');
    }
    else{
      $btn.prop("disabled",false);
      $btn.css('color','');
    }
    i++;
    var row = $("[id="+t+"col"+i+"]");
  }
}
function disableBtn(type,id){
  var btn =$("#"+t+type+id);
  btn.prop("disabled",true);
  btn.css('color','#4d4d4d');
}
function enableBtn(type,id){
  var btn =$("#"+t+type+id);
  btn.prop("disabled",false);
  btn.css('color','');
}
function addRow(data){
  
  if(data.option == 0){
    var newOption = new Option(data.tag, data.designationID, true, true);
    editDesignation.append(newOption).trigger('change');
    designation.append(newOption).trigger('change');
    return ;
  }
  if(data.ref == 0){
    console.log("show newRefTag");
    var newOption = new Option(data.tag, data.refID, true, true);
    ref.append(newOption).trigger('change');
    data.ref = data.refID;
  }
  var newRowContent;
  switch(parseInt(data.option)){ 
    case 1 :{
      newRowContent=
      "  <tr id='t1row"+rowNumberTab(1)+"' class='text-white'>"+
      "  <td id='t1col"+rowNumberTab(1)+"' class='pt-3-half' >"+ $("#designationChois option[value="+data.designation+"]").text() +"</td>"+
      "  <td id='t1col"+rowNumberTab(1)+"' class='pt-3-half' >"+ $("#refChois option[value="+data.ref+"]").text() +"</td>"+
      "  <td id='t1col"+rowNumberTab(1)+"' class='pt-3-half' >"+ data.num +"</td>"+
      //"  <td id='t1col"+rowNumberTab(1)+"' class='pt-3-half' >"+ data.quantite +"</td>"+
      "  <td id='t1col"+rowNumberTab(1)+"' class='pt-3-half' >"+ data.date +"</td>"+
      "  <td id='"+data.matId+"'>"+
      "    <span id='t1span"+rowNumberTab(1)+"' class='table-info-b'><button id='t1affecter"+rowNumberTab(1)+"'  type='button' class='btn btn-info btn-sm left-right-buttons btn-left ml-0' data-toggle='modal' data-target='#modalAffecterForm'><i class='fas fa-users-cog fa-2x'></i></button></span>"+
      "    <span class='table-warning-b' id='t1edit"+rowNumberTab(1)+"'><button id='t1btn"+rowNumberTab(1)+"' type='button' class='btn btn-warning btn-sm btn-center p-edit' data-toggle='modal' data-target='#editModal'><i class='far fa-edit'></i></button></span>"+
      "    <span id='t1span"+rowNumberTab(1)+"' class='table-remove-b'><button id='t1remove"+rowNumberTab(1)+"' type='button' class='btn btn-danger btn-sm left-right-buttons btn-right mr-0' data-toggle='modal' data-target='#modalConfirmDelete'><i class='far fa-trash-alt fa-2x'></i></button></span>"+
      "  </td></tr>";
      break;
    }
    case 2 :{
     newRowContent=
      "  <tr id='t2row"+rowNumberTab(2)+"' class='text-white'>"+
      "  <td id='t2col"+rowNumberTab(2)+"' class='pt-3-half' >"+ $("#designationChois option[value="+data.designation+"]").text() +"</td>"+
      "  <td id='t2col"+rowNumberTab(2)+"' class='pt-3-half' >"+ $("#refChois option[value="+data.ref+"]").text() +"</td>"+
      "  <td id='t2col"+rowNumberTab(2)+"' class='pt-3-half' >"+ data.quantite +"</td>"+
      "  <td id='"+data.matId+"'>"+
      "    <span id='t2span"+rowNumberTab(2)+"' class='table-info-b'><button id='t2affecter"+rowNumberTab(2)+"'  type='button' class='btn btn-info btn-sm left-right-buttons btn-left' data-toggle='modal' data-target='#modalAffecterForm'><i class='fas fa-users-cog fa-2x'></i></button></span>"+
      "    <span class='table-warning-b' id='t2edit"+rowNumberTab(2)+"'><button id='t2btn"+rowNumberTab(2)+"' type='button' class='btn btn-warning btn-sm btn-center p-edit' data-toggle='modal' data-target='#editModal'><i class='far fa-edit'></i></button></span>"+
      "    <span id='t2span"+rowNumberTab(2)+"' class='table-remove-b'><button id='t2remove"+rowNumberTab(2)+"' type='button' class='btn btn-danger btn-sm left-right-buttons btn-right' data-toggle='modal' data-target='#modalConfirmDelete'><i class='far fa-trash-alt fa-2x'></i></button></span>"+
      "  </td></tr>";
      break;
    }
    case 3 :{
     newRowContent=
      "  <tr id='t3row"+rowNumberTab(3)+"' class='text-white'>"+
      "  <td id='t3col"+rowNumberTab(3)+"' class='pt-3-half' >"+ $("#designationChois option[value="+data.designation+"]").text() +"</td>"+
      "  <td id='t3col"+rowNumberTab(3)+"' class='pt-3-half' >"+ $("#refChois option[value="+data.ref+"]").text() +"</td>"+
      "  <td id='t3col"+rowNumberTab(3)+"' class='pt-3-half' >"+ data.num +"</td>"+
      //"  <td id='t3col"+rowNumberTab(3)+"' class='pt-3-half' >"+ data.quantite +"</td>"+
      "  <td id='t3col"+rowNumberTab(3)+"' class='pt-3-half' >"+ data.date +"</td>"+
      "  <td id='"+data.matId+"'>"+
      "    <span id='t3span"+rowNumberTab(3)+"' class='table-info-b'><button id='t3affecter"+rowNumberTab(3)+"'  type='button' class='btn btn-info btn-sm left-right-buttons btn-left' data-toggle='modal' data-target='#modalAffecterForm'><i class='fas fa-users-cog fa-2x'></i></button></span>"+
      "    <span class='table-warning-b ' id='t3edit"+rowNumberTab(3)+"'><button id='t3btn"+rowNumberTab(3)+"' type='button' class='btn btn-warning btn-sm btn-center p-edit' data-toggle='modal' data-target='#editModal'><i class='far fa-edit'></i></button></span>"+
      "    <span id='t3span"+rowNumberTab(3)+"' class='table-remove-b'><button id='t3remove"+rowNumberTab(3)+"' type='button' class='btn btn-danger btn-sm left-right-buttons btn-right' data-toggle='modal' data-target='#modalConfirmDelete'><i class='far fa-trash-alt fa-2x'></i></button></span>"+
      "  </td></tr>";
      break;
    }
    case 4 :{
     newRowContent=
      "  <tr id='t4row"+rowNumberTab(4)+"' class='text-white'>"+
      "  <td id='t4col"+rowNumberTab(4)+"' class='pt-3-half' >"+ $("#designationChois option[value="+data.designation+"]").text() +"</td>"+
      "  <td id='t4col"+rowNumberTab(4)+"' class='pt-3-half' >"+ data.quantite +"</td>"+
      "  <td id='"+data.matId+"'>"+
      "    <span id='t4span"+rowNumberTab(4)+"' class='table-info-b'><button id='t4affecter"+rowNumberTab(4)+"'  type='button' class='btn btn-info btn-sm left-right-buttons btn-left' data-toggle='modal' data-target='#modalAffecterForm'><i class='fas fa-users-cog fa-2x'></i></button></span>"+
      "    <span class='table-warning-b' id='t4edit"+rowNumberTab(4)+"'><button id='t4btn"+rowNumberTab(4)+"' type='button' class='btn btn-warning btn-sm btn-center p-edit' data-toggle='modal' data-target='#editModal'><i class='far fa-edit'></i></button></span>"+
      "    <span id='t4span"+rowNumberTab(4)+"' class='table-remove-b'><button id='t4remove"+rowNumberTab(4)+"' type='button' class='btn btn-danger btn-sm left-right-buttons btn-right' data-toggle='modal' data-target='#modalConfirmDelete'><i class='far fa-trash-alt fa-2x'></i></button></span>"+
      "  </td></tr>";
      break;
    }
  
  }
    $("#table"+data.option+" > tbody").append(newRowContent); 
    //table.row.add( $(newRowContent)).draw();
}
function updateRow(data){
  var id = $("#"+updateId).parent().attr('id');
  var tds = $("#"+id+" td");
  console.log("row id "+id);
      $(tds[0]).text($("#editDesignationChois option[value="+data.designation+"]").text());
  switch(data.option){
    case 1:{
      $(tds[1]).text($("#editRefChois option[value="+data.ref+"]").text());
      $(tds[2]).text(data.num);
      $(tds[3]).text(data.date);
      break;
    }
    case 2:{
      $(tds[1]).text($("#editRefChois option[value="+data.ref+"]").text());
      $(tds[2]).text(data.quantite);
      break;
    }
    case 3:{
      console.log('equipemeny bureau update : '+$("#editRefChois option[value="+data.ref+"]").text())
      $(tds[1]).text($("#editRefChois option[value="+data.ref+"]").text());
      $(tds[2]).text(data.num);
      $(tds[3]).text(data.date);
      break;
    }
    case 4:{
      $(tds[1]).text(data.quantite);
      break;
    }
 }
 $("#editModal").trigger('click')
 $("#t1edit1").click();
}
function destroyMaker(){
  var data = removeRowId+"@"+1
  destroy(data);
}
function verifierNum(withFocus){
  // verify numero
  if(tab[0].val() == ""){
    tab[0].removeClass('is-invalid').removeClass('is-valid').removeClass('vaidate')
    tab[0].addClass('is-invalid');
    if(withFocus){
      tab[0].focus();
      focus=false;
    }
  }
  else{
    console.log("is else");
    var i=1;
    var numRow;
    do{
      try{
        numRow =  document.querySelector("[id=col"+i+"]").textContent;
      }catch(e){
        break;
      }
      console.log(numRow);
      if(numRow == tab[0].val()){
        tab[0].addClass('is-invalid');
        if(withFocus){
          tab[0].focus();
          focus=false;
        }
        return false;
      }
      i++;
    }while(numRow.length);
      console.log('is valid');
      tab[0].removeClass('validate');
      tab[0].removeClass('is-invalid');
      tab[0].addClass('is-valid');
  }
}
function verifierCap(withFocus){
  // verify capacite
  if(tab[1].val() == ""){
    tab[1].removeClass('is-invalid','is-valid');
    if(!tab[1].hasClass('validate'))
      tab[1].addClass('validate');
    if(focus){
      tab[1].removeClass('validate').addClass('is-invalid');
      if(withFocus){
        tab[1].focus();
        focus=false;
      }
    }
    else{
      tab[1].removeClass('validate').addClass('is-invalid');
    }
  }
  else{
    tab[1].removeClass('is-invalid','is-valid');
    tab[1].removeClass('validate').addClass('is-valid');
  }
}
function verifierDate(withFocus){
  // verify date
  if(tab[2].val() == ""){
    tab[2].removeClass('is-invalid','is-valid');
    if(!tab[2].hasClass('validate'))
      tab[2].addClass('validate');
    if(focus){
      tab[2].removeClass('validate').addClass('is-invalid');
      if(withFocus){
        tab[2].focus();
        focus=false;
      }
    }
    else
      tab[2].removeClass('validate').addClass('is-invalid');
  }
  else{
    tab[2].removeClass('is-invalid','is-valid');
    tab[2].removeClass('validate').addClass('is-valid');
  }
}
function initModal(){
  $('#addForm input').val("");
  $('#addForm input').removeClass('valid')
  $('#modalAdd input').siblings('label').removeClass('active');
  selectLabel(1,false)
  ref.select2('val',0);
  selectLabel(0,false)
  designation.select2('val',0)
}
function displayMsgSuccess(index){
    var tabMsg =   $("."+modal+"Msg div")
    for(var i=0;i<tabMsg.length;i++){
      if(i==index){
        $(tabMsg[i]).removeClass('hidden')
        continue
      }
      if(!$(tabMsg[i]).hasClass('hidden')){
        $(tabMsg[i]).addClass('hidden')
      }
    }
}
function storeMaker(add){
  if(add){
    var data ={
      option:typeChois.val(),
      designation:parseInt(designation.val(),10),
      quantite:parseInt($("input#Quantite").val(),10),
      num:parseInt($("input#Num").val(),10),
      commentaire:$("input#Commentaire").val(),
      date:$("input#date").val()
    }
    if(isNewRefTag){
      isNewRefTag = false;
      data.ref = 0;
      data.tag = refNewTag;
    }
    else{
      data.ref = parseInt(ref.val(),10);
      data.tag = "";
    }
  store(data);
  }
  else{
    var data ={
      option:parseInt($("#editTypeChois").val(),10),
      designation:parseInt($("#editDesignationChois").val(),10),
      quantite:parseInt($("input#editQuantite").val(),10),
      num:parseInt($("input#editNum").val(),10),
      commentaire:$("input#editCommentaire").val(),
      date:$("input#editDate").val()
    }
    if(isEditNewRefTag){
      console.log("isNewT")
      isEditNewRefTag = false;
      data.ref = 0;
      data.tag = editRefNewTag;
    }
    else{
      data.ref = parseInt(editRef.val(),10);
      data.tag = "";
    }
    update(data)
  }
}
function showMaker(id){
  console.log("this is show")
  var data = "m@"+id;
  show(data)
}
function store(data){
  if(data.option != 0 || data.type == ""){
    data.option = typeChois.val();
  displayMsgSuccess(2)
  }
$.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    dataType:"TEXT"
  });
    $.ajax({
      url: "materiel",
      type: "POST",
      data: data,
      success: function(result) {
        console.log("ajax success with " +result);
        // add row
        if(data.option == 0){
          console.log(data.designationID)
          showRef(parseInt(typeChois.val(),10),data.designationID)
        }
        var info = (""+result).split('@');
        if(data.ref == 0){
          console.log("is newRefTag");
          data.refID = info[0];
          info[0] = info[1];
        }
        if(info[0] == '-1'){
          console.log('its new q')
          displayMsgSuccess(0);
          console.log(data.option)
          if(data.option == 2)
            matType = 2
          else  
            matType = 1;
          var cell = $("#"+$('#'+info[1]).parent().attr('id')+" td")[matType];
          //cell.text(parseInt(cell.text(),10)+parseInt(data.quantite));
          $(cell).text(parseInt($(cell).text(),10)+parseInt(data.quantite,10))
          initModal();
          return true;
        }
        data.matId = info[0];
        console.log(data)
        addRow(data);
        if(data.option != 0){
          displayMsgSuccess(0);
          initModal();
        }
        return true;
       },
      error:function(result){
        console.log("ajax failed with : "+result);
        displayMsgSuccess(1);
        return false;
      }
      });
}
function update(data){
  displayMsgSuccess(2);
  console.log("this is update with data : "+data)
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    dataType:"TEXT"
  });
  $.ajax({
    url: "materiel/"+updateId,
    type: 'PATCH',
    data: data,
    success: function(result) {
      if(data.option != 0){
        console.log("ajax update success with :"+result);
        displayMsgSuccess(0);
        updateRow(data);
        }
      },
    error:function(){
      console.log("ajax update failed");
      displayMsgSuccess(1);
    }
    });
}
function destroy(data){
  displayMsgSuccess(2)
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  $.ajax({
    url: "materiel/"+data,
    type: 'DELETE',
    success: function() {
      console.log("destroy ajax success");
      displayMsgSuccess(0)
      $("#"+t+"row"+removeRowHTMLId).remove();
      $("#modalConfirmDelete").modal("toggle");
      $("#modalConfirmDelete").addClass("modal-bakdrop")
    },
    error:function(){
      console.log("destroy ajax failed");
      displayMsgSuccess(1)
    }
  });

};
function show(data){
        $.ajaxSetup({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType:"json"
        });
        $.ajax({
        url: "materiel/"+data,
        type: "get",
        success: function(result) {
            console.log("ajax success with ");
            console.log(result);
            editCode(result.result);
            return true;
        },
        error:function(){
            console.log("ajax failed");
            return false;
        }
        });
}
function affecterMaker(){
  var data;
  var tab = $("#affecterTable tbody  tr");
  var i = 1
  var enseignant=[];
  var quantite=[];
  while(i<=tab.length){
    var row = tab[i-1];
    if($(row).hasClass('affecter-row')){
      if(t == 't1' || t == 't3'){
        var data = {'option':5,'matID':parseInt(affectedMatID),'type':1,'enseignantID':parseInt(($($(row).children()[1]).attr('id')).substring(1))}
        if($($('#shared'+i+' i')[0]).hasClass('hidden'))
          data.partage = 0;
        else  
          data.partage = 1
        affecter(data);
        return
      }
      else{
        if($($($(row).children()[4]).children()[0]).val() != "" && parseInt($($($(row).children()[4]).children()[0]).val()) !=0){
          enseignant[i-1] = parseInt(($($(row).children()[1]).attr('id')).substring(1));
          quantite[i-1] = parseInt($($($(row).children()[4]).children()[0]).val()) ;
        }
      }
    }
    i++;
  }
  var data = {'option':5,'matID':affectedMatID,'type':2,'enseignantsID':enseignant,'quantites':quantite}
  if(data.enseignantsID.length > 0 ){
    console.log(data)
    affecter(data);
  }
}
function affecter(data){
  displayMsgSuccess(2)
$.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    dataType:"text"
  });
    $.ajax({
      url: "materiel",
      type: "POST",
      data: data,
      success: function(result) {
        displayMsgSuccess(0)
        console.log("ajax affecter success with " +result);
          updateAffectation(data);
          return true
       
       },
      error:function(result){
        displayMsgSuccess(1)
        console.log("ajax affecter failed with : "+result);
        return false;
      }
      });
}
function updateAffectation(data){
  console.log('this is updateAffectation')
  if(data.type == 1){
    $("#"+data.matID).parent().remove();
    console.log('this is updateAffectation1')
  }
  else{
    if(t == 't2')
      if(quantiteD <= 0)
        $("#"+data.matID).parent().remove();
      else{console.log(quantiteD)
        console.log($("#"+data.matID).parent().attr('id'))
        $($('#'+$('#'+data.matID).parent().attr('id')+' td')[2]).text(quantiteD)
      }
    else
      if(quantiteD <= 0)
        $("#"+data.matID).parent().remove();
      else
        $("#"+$($("#"+data.matID).parent()).attr('id')+" td")[1].text(quantiteD)
  }
  $('#modalAffecterForm').toggle('click');
  $('#t1affecter1').click();
  $('#t2affecter1').click();
  $('#t3affecter1').click();
  $('#t4affecter1').click();
}
function editCode(data){
  //editDesignation.select2('val',data.designationID);
  data = data[0]
  editTypeChois.select2('val',t.match(/\d+/)[0])
  console.log(data.designationID)
  editDesignation.val(data.designationID).trigger('change')
  switch(t){
    case "t1":{
      showRef(parseInt(t.match(/\d+/)[0],10),data.designationID,data.refID)
      $(editInputs[0]).val(data.commentaire).siblings('label').addClass('active');
      $(editInputs[1]).val(data.numInventaire).siblings('label').addClass('active');
      $(editInputs[2]).val(data.quantite).siblings('label').addClass('active');
      $(editInputs[3]).val(data.dateAcquisition).siblings('label').addClass('active');
      break;
    }
    case "t2":{
      showRef(parseInt(t.match(/\d+/)[0],10),data.designationID,data.refID)
      $(editInputs[0]).val(data.commentaire).siblings('label').addClass('active');
      $(editInputs[2]).val(data.quantite).siblings('label').addClass('active');
      $(editInputs[3]).val(data.dateAcquisition).siblings('label').addClass('active');
      break;
    }
    case "t3":{
      showRef(parseInt(t.match(/\d+/)[0],10),data.designationID,data.refID)
      $(editInputs[1]).val(data.numInventaire).siblings('label').addClass('active');
      $(editInputs[2]).val(data.quantite).siblings('label').addClass('active');
      $(editInputs[3]).val(data.dateAcquisition).siblings('label').addClass('active');
      break;
    }
    case "t4":{
      showRef(0);
      $(editInputs[2]).val(data.quantite).siblings('label').addClass('active');
      $(editInputs[3]).val(data.dateAcquisition).siblings('label').addClass('active');
      break;
    }
  }
  enableBtn("affecter",id);
  enableBtn("remove",id);
}
function updateQ(q){
  if(parseInt(quantiteD)+parseInt(quantiteTab[inputID]) < q  ){
    console.log("you can't")
    $("#affecterQuantite"+inputID).val(quantiteTab[inputID])
    return
  }
  if(parseInt(quantite) - parseInt(q) >= 0){
    quantiteTab[inputID] = parseInt(q);
    q=0;
    quantiteTab.forEach(function(val){
      q += val;
    })
    quantiteD = (parseInt(quantite) - q);
    $('#affecterMsg').text(" La Quantité disponible : "+quantiteD);
    if(quantiteD == 0){
      //$("#affecterQuantite "+)
    }
  }
}

//disable btn affecter
  disableBtnAffecter("affecter");
  $("tr").on('click',function(){
    $("#"+rowSelected).css('background-color','')
    rowSelected = $(this).attr('id');
    $("#"+rowSelected).css('background-color','rgb(28, 30, 31)')
  })
// add
  $('.table-add').on('click', 'i', function(){
    console.log('this is add')
    modal = "add";
    typeChois.val(parseInt(t.match(/\d+/)[0])).trigger('change');
    showInput(parseInt(t.match(/\d+/)[0]))
  });
  // key listber for affecterQuantite
  $(".affecterQuantite").keypress(function(val) {
    console.log("key pressed :"+val.which)
    if(val.keyCode == 46){
      console.log("delete key pressed")
      updateQ(parseInt($("#affecterQuantite"+inputID).val()));
    }
    if(val.keyCode >=48 && val.keyCode <= 57){
      updateQ(parseInt($("#affecterQuantite"+inputID).val()+""+(parseInt(val.which)-48)));
    }
  });
  $(".affecterQuantite").on('click',function(){
    inputID =getRowNumber(this)
    if(parseInt($("#affecterQuantite"+inputID).val())>=0){
      updateQ($("#affecterQuantite"+inputID).val());
    }
  })
  // shared in affectation
  $("#modalAffecterForm").on('click','.is-shared',function (){
    id=getRowNumber(this)
    console.log($("#shared"+id).attr('disabled'))
    if($("#shared"+id).attr('disabled') != 'disabled'){
      console.log("shared")
      var btn = $("#shared"+id+"  i");
      console.log("tab.lenth : "+btn.length)
      if($(btn[0]).hasClass('hidden')){
        console.log("hello1")
        $(btn[1]).addClass('hidden')
        $(btn[0]).removeClass('hidden')
      }
      else{
        console.log("hello2")
        $(btn[0]).addClass('hidden')
        $(btn[1]).removeClass('hidden')
      }
    }
  })
//remove
  $tableID.on('click', '.table-remove-b', function () {
      id=getRowNumber(this);
      modal = "remove";
      displayMsgSuccess(-1)
      // show modal
      if($("#modalConfirmDelete").hasClass('modal-backdrop')){
        $("#modalConfirmDelete").removeClass("modal-backdrop");
        $("#modalConfirmDelete").modal('dispose');
      }
      removeRowHTMLId =id;
      removeRowId = $(this).parent().attr('id');
      var msg="Supprimer le materiel  ";
      var row = document.querySelectorAll('[id='+t+'col'+id+']');
      msg += row[0].textContent;
      document.getElementById("msg").textContent=msg;
  });
//edit
  $tableID.on('click', '.table-warning-b', function () {
      id=getRowNumber(this);
      modal = "edit";
      displayMsgSuccess(-1);
      editOn = true;
      // show modal
      if($("#editModal").hasClass('modal-backdrop')){
        $("#editModal").removeClass("modal-backdrop");
        $("#editModal").modal('dispose');
      }
      $('#editForm input').val("");
      $('#editModal input').siblings('label').removeClass('active');
      $('#editModal input').addClass('valid')
      editDesignation.select2('val',0)
      editRef.select2('val',0)
      updateId= $(this).parent().attr('id');
      disableBtn("affecter",id);
      disableBtn("remove",id);
      switch(t){
        case "t1":{
          showInput(1,0);
          showMaker(updateId+"@1")
          break;
        }
        case "t2":{
          showInput(2,0);
          showMaker(updateId+"@2");
          break;
        }
        case "t3":{
          showInput(3,0)
          showMaker(updateId+"@3");
          break;
        }
        case "t4":{
          showInput(4,0);
          showMaker(updateId+"@4");
          break;
        }
      }
      enableBtn("affecter",id);
      enableBtn("remove",id);
  });
//affecter
  $tableID.on('click', '.table-info-b', function () {
  // uncheck boxes
  modal = "affecter";
  displayMsgSuccess(-1)
  isBox=false;
  if(affecterInputs == undefined){
    affecterInputs=$(".modalAffecterForm input"); 
  }
  for(i=1;i<affecterInputs.length;i++){
    if(affecterInputs[i].checked){
      affecterInputs[i].click();
    }
      $("#check"+i).prop("disabled", false);
  }
  id=getRowNumber(this);
  affectedMatID = $($(this).parent()).attr('id');
  quantiteTab = [];
  switch(t){
    case "t1":{
      $('#affecterMsg').addClass('hidden')
      $($("#affecterTable thead td")[4]).addClass('hidden')
      $(".inputQ").addClass('hidden')
      $($("#affecterTable thead td")[5]).removeClass('hidden')
      $(".is-shared").parent().removeClass('hidden')
      break;
    }
    case "t2":{
      $('#affecterMsg').removeClass('hidden')
      $($("#affecterTable thead td")[4]).removeClass('hidden')
      $(".inputQ").removeClass('hidden')
      $($("#affecterTable thead td")[5]).addClass('hidden')
      $(".is-shared").parent().addClass('hidden')
      if($("#"+t+"row"+id+" td")[2])
        quantite = $("#"+t+"row"+id+" td")[2].textContent;
      $('#affecterMsg').text(" La Quantité disponible : "+quantite);
      break;
    }
    case "t3":{
      $('#affecterMsg').addClass('hidden')
      $($("#affecterTable thead td")[4]).addClass('hidden')
      $(".inputQ").addClass('hidden')
      $($("#affecterTable thead td")[5]).removeClass('hidden')
      $(".is-shared").parent().removeClass('hidden')
      break;
    }
    case "t4":{
      $('#affecterMsg').removeClass('hidden')
      $($("#affecterTable thead td")[4]).removeClass('hidden')
      $(".inputQ").removeClass('hidden')
      $($("#affecterTable thead td")[5]).addClass('hidden')
      $(".is-shared").parent().addClass('hidden')
      quantite = $("#"+t+"row"+id+" td")[1].textContent;
      $('#affecterMsg').text(" La Quantité disponible : "+quantite);
      break;
    }
  }
  quantiteD = quantite;
  });
//A few jQuery helpers for exporting only
  jQuery.fn.pop = [].pop;
  jQuery.fn.shift = [].shift;

  $BTN.on('click', () => {

      const $rows = $$tableID.find('tr:not(:hidden)');
      const headers = [];
      const data = [];

      // Get the headers (add special header logic here)
      $($rows.shift()).find('th:not(:empty)').each(function () {
      headers.push($(this).text().toLowerCase());
      });

      // Turn all existing rows into a loopable array
      $rows.each(function () {
        const $td = $(this).find('td');
        const h = {};

        // Use the headers from earlier to name our hash keys
        headers.forEach((header, i) => {
          h[header] = $td.eq(i).text();
        });

        data.push(h);
    });

      // Output the result
      $EXPORT.text(JSON.stringify(data));
  });