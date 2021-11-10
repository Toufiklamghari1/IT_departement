
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