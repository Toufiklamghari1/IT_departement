setActive(2)
switchAffecter(2,1)
var modal ;
var enseignantID;
function selectLabel(index,display){
    var div = $("."+modal+"floating-lab");
    if(display){
        if($(div[index]).hasClass('hidden'))
            $(div[index]).removeClass('hidden')
    }
    else{
        if(!$(div[index]).hasClass('hidden'))
            $(div[index]).addClass('hidden')
    }
}
function isChecked(row,boxNum){
    displayMsgSuccess(-1);
    if($("#restituer").hasClass('hidden'))
        $("#restituer").removeClass('hidden')
    var ids = ['Mrow','Erow','Mrest','Erest']
    row = ids[row]
    console.log("row "+row)
      if($("#"+row+boxNum).hasClass('affecter-row')){
        $("#"+row+boxNum).removeClass("affecter-row");
        }
      else{
        $("#"+row+boxNum).addClass("affecter-row");
      }
};
function initModal(){
    $('#'+modal+'Modal input').val("");
    $('#'+modal+'Modal input').removeClass('valid')
    $('#'+modal+'Modal input').siblings('label').removeClass('active');
    //selectLabel(1,false)
    //selectLabel(0,false)
    if(modal == "addV"){
        gradeVChois.select2('val',0)
    }
    if(modal == "addE"){
        gradeChois.select2('val',0)
        bureauChois.select2('val',0)
    }
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
function switchBtn(id1,id2){
    console.log("switchBtn");
    $("#tab"+id2).removeClass('activeTab')
    $("#Ens"+id2).addClass('hidden')

    $("#tab"+id1).addClass('activTab')
    $("#Ens"+id1).removeClass('hidden')
    //
}
function affecterMaker(){
    var data;
    var tab = $("#affecterTableM  tr");
    var i = 1
    var mat = 0;
    var materiels=[];
    while(i<=tab.length){
      var row = tab[i-1];
      console.log(($($(row).children()[0]).attr('id')))
      if($(row).hasClass('affecter-row')){
          console.log('this is checked row')
            materiels[mat] = parseInt(($($(row).children()[0]).attr('id')).substring(1));
            mat++;
        }
      i++;
    }
    tab = $("#affecterTableE tr");
    i=0;
    while(i<=tab.length){
      var row = tab[i-1];
      if($(row).hasClass('affecter-row')){
        console.log('this is checked row')
            materiels[mat] = parseInt(($($(row).children()[0]).attr('id')).substring(1));
            mat++;
        }
      i++;
    }
    var data = {'option':'a','enseignantID':enseignantID,'materiels':materiels}
    if(data.materiels.length > 0 ){
      affecter(data)
      return;
    }
      //affecter(data);
}
function switchAffecter(id1,id2){
    console.log("switchBtn");
    $("#tab"+id2).addClass('active')
    $("#affecter"+id1).removeClass('active-tab')
    $("#tab"+id1).removeClass('active')
    $("#affecter"+id2).addClass('active-tab')
    //
}
function initEditModal(){
    $('#'+modal+'Modal input').addClass('valid')
    $('#'+modal+'Modal input').siblings('label').addClass('active');
}
function initShow(){
    affecterInputs=$(".addNewInputs input"); 
      for(i=0;i<affecterInputs.length;i++){
        if(affecterInputs[i].checked){
          affecterInputs[i].click();
        }
          $("#check"+i).prop("disabled", false);
      }
}
function restituerMaker(){
    var data;
    var tab = $("#tbodyMTI  tr");
    var i = 1
    var mat = 0;
    var materiels=[];
    while(i<=tab.length){
      var row = tab[i-1];
      console.log(($($(row).children()[0]).attr('id')))
      if($(row).hasClass('affecter-row')){
          console.log('this is checked row')
            materiels[mat] = parseInt(($($(row).children()[0]).attr('id')).substring(1));
            mat++;
        }
      i++;
    }
    tab = $("#tbodyMEB tr");
    i=0;
    while(i<=tab.length){
      var row = tab[i-1];
      if($(row).hasClass('affecter-row')){
        console.log('this is checked row')
            materiels[mat] = parseInt(($($(row).children()[0]).attr('id')).substring(1));
            mat++;
        }
      i++;
    }
    var data = {'option':'r','enseignantID':enseignantID,'materiels':materiels}
    if(data.materiels.length > 0 ){
        affecter(data)
        return;
    }
      //affecter(data);
}
// function newAffecteRow(data){
//     var trs = $("#"+data+" tr");
//     var charType = data.substring(0,1)
//     var tbody = "affecterTable"+charType;
//     if(charType == 'M'){
//         var type = 0;
//         code = 'm'
//     }
//     else
//         if(charType == 'E'){
//             var type = 1;
//             code = 'e'
//         }
//     var number = $("#"+tbody+" tr").length+1;
//     var newRow =
//     "<tr id='"+charType+"row"+number+"'>"+
//         "<td id='"+$(trs[0]).attr('id')+"' class='check-cell affecterTable' ><input class='check-box'  type='checkbox' id='"+code+"aCheck"+number+"'  onchange='isChecked("+type+","+number+")'><label class='label-size' for='"+code+"aCheck"+number+"'></label></td>"+
//         "<td><label>"+$(trs[1]).text()+"</label></td>"+
//         "<td><label>"+$(trs[2]).text()+"</label></td>"+
//         "<td><label>"+$(trs[3]).text()+"</label></td>"+
//     "</tr>";
//     $("#"+tbody).append(newRow)
// }
function affecter(data){
    displayMsgSuccess(2)
  $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      dataType:"text"
    });
      $.ajax({
        url: "enseignent/-1",
        type: "PUT",
        data: data,
        success: function(result) {
          console.log("ajax affecterRest success with " +result);
            updateAffectation(data);
          displayMsgSuccess(0)
            return true
         
         },
        error:function(result){
          displayMsgSuccess(1)
          console.log("ajax affecterRest failed with : "+result);
          return false;
        }
        });
}
function updateAffectation(data){
    console.log(data)
    if(data.option == 'a'){
        tab=data.materiels;
        for(var i=0;i<tab.length;i++){
            $($('#m'+data[i]).parent()).remove();
        }
    }
    if(data.option == 'r'){
        tab=data.materiels;
        for(var i=0;i<tab.length;i++){
            $($('#r'+tab[i]).parent()).remove();
        }
    }
} 
$('form input').on('click',function(){
    displayMsgSuccess(-1)
})
//ens v
$('#dBasicExample').DataTable({
    "order":[],
    'columnDefs': [ {
        'targets': [5],
        'orderable': false,
    }]
});
// ens
$('#dtBasicExample').DataTable({
    "order":[],
    'columnDefs': [ {
        'targets': [1,5],
        'orderable': false,
    }]
});
var emailChois = $("#selectA").select2({
    dropdownParent: $('#modalAdd'),
    minimumResultsForSearch: Infinity,
});
emailChois.on('change',function(){
    displayMsgSuccess(-1)
})
var gradeChois = $("#selectG").select2({
    dropdownParent: $('#modalAdd'),
    placeholder:"Grade ",
    allowClear: true,
    minimumResultsForSearch: Infinity,
});
gradeChois.on('change',function(){
    displayMsgSuccess(-1)
})
var bureauChois = $("#selectB").select2({
    dropdownParent: $('#modalAdd'),
    placeholder:"Bureau "
});
bureauChois.on('change',function(){
    displayMsgSuccess(-1)
})
$("#selectAv").select2({
    dropdownParent: $('#EnsV'),
});
var gradeVChois = $("#selectGv").select2({
    dropdownParent: $('#EnsV'),
    placeholder:"Grade "
});
gradeVChois.on('change',function(){
    displayMsgSuccess(-1)
})
var selectE=$("#selectAR").select2({
    dropdownParent: $('#myModal'),
});
selectE.on('change',function(){
    displayMsgSuccess(-1)
})

$("#selectGrade").select2({
    dropdownParent: $('#myModal'),
    placeholder:"Grade ",
    minimumResultsForSearch: Infinity,
});
var editVGrad=$("#selectGev").select2({
    dropdownParent: $('#EditME'),
    placeholder:"Grade ",
    minimumResultsForSearch: Infinity,
});

$("#selectAev").select2({
    dropdownParent: $('#EditME'),
    minimumResultsForSearch: Infinity,
});
$(document).on('click','.btn-info-affecter',function(){
    modal = "affecter";
    switchAffecter(2,1)
    enseignantID = $(this).parent().parent().attr('id').substring(3)
    affecterInputs=$(".modalAffecterForm input"); 
      for(i=0;i<affecterInputs.length;i++){
        if(affecterInputs[i].checked){
          affecterInputs[i].click();
        }
          $("#check"+i).prop("disabled", false);
      }
    displayMsgSuccess(-1)
});
