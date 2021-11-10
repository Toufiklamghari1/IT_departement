Bureau.initList();
Bureau.setRow($("#bureauTable tr#0"));
$('#affecterTable').DataTable({
    "order":[],
    'columnDefs': [ {
      'targets': [0],
      'orderable': false, 
   }]
  });
bureauTable = $("#bureauTable").DataTable({
  "order":[[ 4, "desc" ]],
  'columnDefs': [ {
    'targets': [0,5],
    'orderable': false, 
  }]
})
$(".add-btn").on('click',function(){
  displayMsg('add')
})
$("#addForm").on('click',function(){
  getFormData('addForm').test('addForm');
})
$("#ajouter").on("click",function(){
  getFormData("addForm").ajouter();
})
$("#bureauTable").on("click",'.edit-btn',function(){
  displayMsg("update");
  Bureau.setItem(getIndex(this))
  Bureau.getItem().initUpdateForm();
})
$("#updateForm").on('click',function(){
  getFormData('updateForm').test('updateForm');
})
$("#modifier").on("click",function(){
  getFormData("updateForm").update();
})
$("#bureauTable").on("click",'.remove-btn',function(){
  displayMsg("remove");
  Bureau.setItem(getIndex(this))
  Bureau.getItem().initRemoveModal();
  Bureau.setRow($(this).parent().parent());
})
$("#destroy").on("click",function(){
  Bureau.getItem().destroy();
})
$("#bureauTable").on("click",'.affecter-btn',function(){
  displayMsg("affecter");
  Bureau.setItem(getIndex(this))
  Bureau.getItem().initAffecterModal();
})
$("#bureauTable").on("click",'.details-btn',function(){
  Bureau.setItem(getIndex(this))
  Bureau.getItem().initDetailsModal();
})
$(".check-box").on("change",function(){
  BureauAffectation.setInput(this)
  if($(this).prop('checked'))
    Bureau.getItem().updateNbrSelect(1);
  else
    Bureau.getItem().updateNbrSelect(-1);
})
