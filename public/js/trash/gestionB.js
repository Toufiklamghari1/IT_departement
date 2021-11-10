const $tableID = $('#table');
const $BTN = $('#export-btn');
const $EXPORT = $('#export');
setActive(3);
var rowNumber = $('#bureauTable >tbody >tr').length;
var checkedNumber;
var isBox=false;
var placeDisponible = 0;// Start
var focus; 
var affecterNum =""; 
var removeId;
var removeRowId;
var editId=[];
var rowSelected;
var active=false;
var tab=[];
var modal;
var affecterInputs;
var affcterMsg =  $(".affecter div")
var deleteMsg =  $(".delete div")
//select row​
function getRowNumber(row){
    var id1 = $(row).attr('id').match(/(\d+)/);
  
  var id="";
  for(var i=0;i<id1.length-1;i++){
    id += id1[i];
  }
  return id;
};
function isChecked(boxNum){
  var box=affecterInputs[boxNum];
  if(box.checked){
    if(placeDisponible > 0){
      checkedNumber++;
      $("#Arow"+boxNum).addClass("affecter-row");
    }
  }
  else{
    if(placeDisponible >=0){
      checkedNumber--;
      $("#Arow"+boxNum).removeClass("affecter-row");
    }
  }
  $('#affecterMsg').text("Le nombre selectioner : "+checkedNumber);
  // disable check
  if(placeDisponible-checkedNumber ==1 && isBox){
     $('#affecterMsg').css('color','rgb(12, 238, 31)');
     for(i=1;i<affecterInputs.length;i++){
      if(!affecterInputs[i].checked && ('Bureau : '+$($("#"+$(affecterInputs[i]).parent().parent().attr('id')+" td")[3]).text()) != $('#numBureau').text()){
        $("#check"+i).attr('disabled',false);
      }
    }
  }
  if(placeDisponible == checkedNumber && isBox){
    $('#affecterMsg').css('color','rgb(255, 216, 45)');
    for(i=1;i<affecterInputs.length;i++){
      if(!affecterInputs[i].checked){
        affecterInputs[i].setAttribute('disabled',true);
      }
    }
  }
};
function disableBtnAffecter(type){
  var i=1;
  var row = $("[id=col"+i+"]");
  while(row.length != 0){
    var nbr = parseInt(row[1].textContent,10)-parseInt(row[2].textContent,10);
    if(nbr<=0){
      var btn =$("#"+type+i);
      btn.prop("disabled",true);
      btn.css('color','#4d4d4d');
    }
    else{
      var btn =$("#"+type+i);
      btn.prop("disabled",false);
      btn.css('color','');
    }
    i++;
    var row = $("[id=col"+i+"]");
}
}
function disableBtn(type,id){
  var btn =$("#"+type+id);
  btn.prop("disabled",true);
  btn.css('color','#4d4d4d');
}
function enableBtn(type,id){
  var btn =$("#"+type+id);
  btn.prop("disabled",false);
  btn.css('color','');
}
function addRow(num,capacite,nbr,date){
  var newRowContent=
    "<tr id='row"+rowNumber+"'>"+
    "<td><button type='button' class='details btn btn-primary btn-sm btn-center p-1' data-toggle='modal' data-target='#detailsModal'>"+
    "<i class='fas fa-info-circle'></i></button></td>"+
    "<td id='col"+rowNumber+"' class='pt-3-half' contenteditable='false'>"+num+"</td>"+
    "<td id='col"+rowNumber+"'  class='pt-3-half' contenteditable='false'>"+capacite+"</td>"+
    "<td id='col"+rowNumber+"'  class='pt-3-half' contenteditable='false'>"+nbr+"</td>"+
    "<td id='col"+rowNumber+"'  class='pt-3-half' contenteditable='false'>"+date+"</td>"+
    "<td>"+
      "<span id='span"+rowNumber+"'  class='table-info-b ml-0'><button id='affecter"+rowNumber+"'  type='button' class='btn btn-info btn-sm left-right-buttons btn-left ml-0' data-toggle='modal' data-target='#modalAffecterForm'><i class='fas fa-users-cog fa-2x'></i></button></span>"+
      "<span id='edit"+rowNumber+"'  class='table-warning-b'><button id='btnedit"+rowNumber+"'  type='button' class='btn btn-warning btn-sm btn-center p-edit'><i class='far fa-edit'></i></button></span>"+
      "<span id='save"+rowNumber+"'  class='table-warning-b ' style='display: none;'><button id='btnsave"+rowNumber+"'  type='button' class='btn btn-success btn-sm btn-center p-save'><i class='far fa-save'></i></button></span>"+
      "<span id='span"+rowNumber+"'  class='table-remove-b mr-0'><button id='remove' type='button"+rowNumber+"'  class='btn btn-danger btn-sm left-right-buttons btn-right mr-0' data-toggle='modal' data-target='#modalConfirmDelete'><i class='far fa-trash-alt fa-2x'></i></button></span>"+
      "</td>"+
    "</tr>";
    $("#bureauTable").append(newRowContent); 
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
function displayMsgSuccess(index){
  console.log('displayMsgSuccess')
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
    for(i=0;i<tab.length;i++){
      tab[i].removeClass('is-invalid');
      tab[i].removeClass('is-valid');
      if(!tab[i].hasClass('validate')){
        tab[i].addClass('validate');
        }
      }
    $('#addForm').trigger("reset");
    $('#addForm input').siblings('label').removeClass('active');
    active=false;
}
function store(){
    focus=true;
    var numero = $("input#addForm_numero").val();
    var capacite = parseInt($("input#addForm_capacite").val(),10);
    var date = $("input#addForm_date").val();
    if(!tab.length){
      tab[0]=$("#addForm_numero");
      tab[1]=$("#addForm_capacite");
      tab[2]=$("#addForm_date");
    }
    verifierNum(true);
    verifierCap(true);
    verifierDate(true);
    active = true;
    if(!focus){
      $("#addSuccess").css("display",'none');
      $("#addError").css("display","");
      return false;
    }
    var data={"option":1, "num":numero,"capacite":capacite,"date":date}
$.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    dataType:"text"
  });
    $.ajax({
      url: "bureau",
      type: "POST",
      data: data,
      success: function(result) {
        console.log("ajax success"+result);
        // add row
        rowNumber++;
        addRow(numero,capacite,0,date);
        // empty input
        initModal();
        $("#addSuccess").css("display",'');
        $("#addError").css("display","none");
       },
      error:function(result){
        console.log("ajax failed with "+data);
        $("#addSuccess").css("display",'none');
        $("#addError").css("display","");
      }
      });
}
function update(id,num,capacite,date){
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    dataType:"text"
  });
  $.ajax({
    url: "bureau/"+editId[id],
    type: 'PATCH',
    data: {"Num":num ,"Capacite":capacite ,"Date":date },
    success: function() {
      console.log("update ajax success");
      },
    error:function(){
      console.log("update ajax failed");
    }
    });
}
function destroy(){
  console.log(removeId)
  displayMsgSuccess(2)
  if(parseInt($($("#row"+removeRowId+" td")[3]).text()) > 0){
    console.log($($("#row"+removeRowId+" td")[3]).text())
    displayMsgSuccess(3)
    return
  }
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  $.ajax({
    url: "bureau/"+removeId,
    type: 'DELETE',
    success: function() {
      console.log("destroy ajax success");
      displayMsgSuccess(0)
      $('#modalConfirmDelete').trigger('click')
      $("#remove1").click();
      $("#row"+removeRowId).remove();
      },
    error:function(){
      console.log("destroy ajax failed");
      displayMsgSuccess(1)
    }
    });
}
function affecter(){
  for(var i=0;i<affcterMsg.length;i++){
      if(i==2){
        $(affcterMsg[i]).removeClass('hidden')
        continue
      }
    if(!$(affcterMsg[i]).hasClass('hidden')){
      $(affcterMsg[i]).addClass('hidden')
    }
  }
  var tab=[] ;
  for(var i=0;i<affecterInputs.length;i++){
    if(affecterInputs[i].checked){
      tab.push($(affecterInputs[i]).parent().attr('id'));
    }
  }
  var data ={"option":2, "num":affecterNum,"enseignants":tab};
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    dataType:"json"
  });
    $.ajax({
      url: "bureau",
      type: "POST",
      data: data,
      success: function(result) {
        console.log("ajax affectation success"+result+" end");
        for(var i=0;i<affcterMsg.length;i++){
            if(i==0){
              $(affcterMsg[i]).removeClass('hidden')
              continue
            }
          if(!$(affcterMsg[i]).hasClass('hidden')){
            $(affcterMsg[i]).addClass('hidden')
          }
        }
        data = result.capacite
        var row = 1;
        var i = 0;
        var rows = $("#bureauTable tr")
        while(row < rows.length+1){
          var val = data[i];
          var cols = $("#row"+row+" td");
          if(i < data.length && $(cols[1]).text() == ""+val.bureauID){
            $(cols[3]).text(val.ensNumber)
            i++;
            row++;
            continue;
          }
          $(cols[3]).text(0)
          row++;
        }
        data = result.ensBureau;
        i = 0;
        var rows = $("#bureauTable tr")
        data.forEach(function(val){
          console.log(val.enseignantID+" , "+val.bureauID)
          $($("#"+$(".affecterTable#"+val.enseignantID).parent().attr('id')+" td")[3]).text(val.bureauID)//.
        })
        disableBtnAffecter("affecter");
        $("#modalAffecterForm").toggle('click');
        $('#affecter1').click();
       },
      error:function(result){
        console.log("ajax affectation failed with "+result);
        for(var i=0;i<affcterMsg.length;i++){
            if(i==1){
              $(affcterMsg[i]).removeClass('hidden')
              continue
            }
          if(!$(affcterMsg[i]).hasClass('hidden')){
            $(affcterMsg[i]).addClass('hidden')
          }
        }
      }
  });
}
function getDetails(num){
  $.ajaxSetup({
    headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    dataType:"json"
  });
  $.ajax({
  url: "bureau/"+num,
  type: "GET",
  success: function(result) {
    console.log("ajax success ")
      showDetails(result)
      return true;
  },
  error:function(){
      console.log("ajax failed");
      return false;
  }
  });
}
function showDetails(result){
  var labels = $("#bureauInfo label");
  (result.bureau).forEach(function (data) {
    $(labels[0]).text("Numéro : "+data.num);
    $(labels[1]).text("Capacite : "+data.capacite);
    $(labels[2]).text("Date d'acquiqition : "+data.dateAcquisition);
  });
  // add rows to table
  $("#ensList tbody tr").remove();
  $("#editRefChois option").remove();
  (result.enseignants).forEach(function (ens) {
    newRow = "<tr><td>"+ens.nom+"</td><td>"+ens.prenom+"</td><td>"+ens.grade+"</td><td>"+ens.date+"</td></tr>"
    $("#ensList").append(newRow);
  });

}
// disable btn affecter
disableBtnAffecter("affecter");
$("tr").on('click',function(){
  $("#"+rowSelected).css('background-color','')
  rowSelected = $(this).attr('id');
  $("#"+rowSelected).css('background-color','rgb(28, 30, 31)')
})
// affecter table 
$('#affecterTable').DataTable({
  "order":[],
  'columnDefs': [ {
    'targets': [0],
    'orderable': false, 
 }]
});
// bureau table
$("#bureauTable").DataTable({
  "order":[],
  'columnDefs': [ {
    'targets': [0,5],
    'orderable': false, 
 }]
})
//verifier data
$('.modal-content').on('change',function(){
  if(active){
    verifierNum(false);
    verifierCap(false);
    verifierDate(false);
  }
});
$(".add-form").on('click',function(){
  $(".modal-content").click();
  
});
$('#addForm input').on('click',function(){
  $("#addSuccess").css("display",'none');
  $("#addError").css("display","none");
})
//details
$('.details').on('click',function(){
  id=getRowNumber($(this).parent().parent());
  var row = $("[id=col"+id+"]");
  getDetails(row[0].textContent);
})
// add
  $('.table-add').on('click',function(){
    initModal();
  });
  // remove
  $tableID.on('click', '.table-remove-b', function () {
    modal = 'remove';
    displayMsgSuccess(-1)
      id=getRowNumber(this);
      if($("#modalConfirmDelete").hasClass('modal-backdrop')){
        $("#modalConfirmDelete").removeClass("modal-backdrop");
        $("#modalConfirmDelete").modal('dispose');
      }
      removeRowId=id;
      var msg="Supprimer le bureau numéro ";
      var row = document.querySelector('[id=col'+id+']');
      console.log(row.textContent);
      msg += row.textContent;
      removeId= row.textContent;
      document.getElementById("msg").textContent=msg;
  });
  // edit
  $tableID.on('click', '.table-warning-b', function () {
    id=getRowNumber(this);
    // change row to editable and color
      var row = document.querySelectorAll('[id=col'+id+']');
      if($(this).attr('id').includes("edit")){
        editId[id]=row[0].textContent;
        for(var i=0;i<row.length;i++){
          if(i==2)
            continue;
          row[i].setAttribute("contenteditable",true);
        }
        $("#row"+id).css('background-color','rgb(78, 78, 78)');
        $("#edit"+id).css("display","none");
        $("#save"+id).css("display","");
        disableBtn("affecter",id);
        disableBtn("remove",id);
      }
      else{
        for(var i=0;i<row.length;i++){
          row[i].setAttribute("contenteditable",false);
        }
        $("#row"+id).css('background-color','');
        //save
        var data1= document.querySelectorAll('[id=col'+id+']');
        var data = [];
        data[0]=id;
        for(var i=1;i<4;i++)
          data[i] = row[0].textContent;
        update(id,data1[0].textContent,data1[1].textContent,data1[3].textContent);
        // database 
        $("#edit"+id).css("display","");
        $("#save"+id).css("display","none");
        enableBtn("affecter",id);
        enableBtn("remove",id);
        disableBtnAffecter("affecter");
      }
  });
  // affecter
  $tableID.on('click', '.table-info-b', function () {
    for(var i=0;i<affcterMsg.length;i++){
      if(!$(affcterMsg[i]).hasClass('hidden'))
        $(affcterMsg[i]).addClass('hidden')
    }
    id=getRowNumber(this);
    var row = $("[id=col"+id+"]");
    // uncheck boxes
    isBox=false;
    if(affecterInputs == undefined){
      affecterInputs=$(".modalAffecterForm input");
    }
    for(i=1;i<affecterInputs.length;i++){
      if(affecterInputs[i].checked){
        affecterInputs[i].click();
      }
    var aRow = $("#"+$(affecterInputs[i]).parent().parent().attr('id')+" td")[3];
    if($(aRow).text() == row[0].textContent){
      $("#check"+i).prop("disabled", true);
      continue
    }
        $("#check"+i).prop("disabled", false);
    }
    checkedNumber = 0;
    $('#affecterMsg').text("Le nombre selectioner : "+checkedNumber).css('color','rgb(12, 238, 31)');
    // verifier le nombre d'enseignants choisie
    $('#numBureau').text('Bureau : '+row[0].textContent)
    placeDisponible = parseInt(row[1].textContent,10)-parseInt(row[2].textContent,10);
    affecterNum = row[0].textContent;
    isBox=true;
    
  });
  // A few jQuery helpers for exporting only
  jQuery.fn.pop = [].pop;
  jQuery.fn.shift = [].shift;

  $BTN.on('click', () => {

      const $rows = $tableID.find('tr:not(:hidden)');
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