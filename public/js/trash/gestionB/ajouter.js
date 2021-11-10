import {store,displayMsgSuccess,addRow,readForm} from '/js/source/source.js';
import Bureau from '/ts/Bureau';
/*function addRow(data){
    var newRowContent=
      "<tr id='row"+rowNumber+"'>"+
      "<td><button type='button' class='details btn btn-primary btn-sm btn-center p-1' data-toggle='modal' data-target='#detailsModal'>"+
      "<i class='fas fa-info-circle'></i></button></td>"+
      "<td id='col"+rowNumber+"' class='pt-3-half' contenteditable='false'>"+data+"</td>"+
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
}*/
$("#ajouter").on('click',function(){
    verifierNum();
    verifierCap();
    verifierDate();
    if(!verifierNum() || !verifierCap() || !verifierDate()){
      displayMsgSuccess(1)
      return false;
    }
    var data={"option":1, "num":tab[0].val(),"capacite":parseInt(tab[1].val(),10),"date":tab[2].val()}
      var data = store(data,"bureau")
      if(data[0] == true){
        rowNumber++;
        addRow(data);
        initModal();
        displayMsgSuccess(0)
      }
      else{
        displayMsgSuccess(1)
      }
});
$(".add-form").on('click',function(){
  console.log("TypeScript test")
  b = new Bureau("10ab",10,20,"10/10/2020");
  b.show();
    $(".modal-content").click();
});
$('#addForm input').on('click',function(){
  displayMsgSuccess(-1)
})
$('.table-add').on('click',function(){
})
$('.modal-content').on('change',function(){
  verifierNum();
  verifierCap();
  verifierDate();
});