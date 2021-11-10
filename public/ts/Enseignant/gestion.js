Enseignant.init();
/*$('#affecterTable').DataTable({
    "order":[],
    'columnDefs': [ {
      'targets': [0],
      'orderable': false, 
   }]
  });*/
Enseignant.setTable($("table#enseignant").DataTable({
  "order":[[ 3, "desc" ]],
  'columnDefs': [ {
    'targets': [4],
    'orderable': false, 
  }]
}));
/*$("table#equipement").DataTable({
  "order":[[ 3, "desc" ]],
  'columnDefs': [ {
    'targets': [0,4],
    'orderable': false, 
  }]
})*/
$(".card-header").on('click','a',function(){
  Enseignant.setForm("add")
  displayMsg(Enseignant.getForm())
})
$("#addForm").on('click',function(){
  getFormData(Enseignant.getForm()).test();
})
$("#ajouter").on("click",function(){
  getFormData(Enseignant.getForm()).ajouter();
})
$("table").on("click",'.edit-btn',function(){
  Enseignant.setForm("update")
  displayMsg(Enseignant.getForm());
  Enseignant.setItem(getIndex(this))
  Enseignant.getItem().initUpdateForm();
})
$("#updateForm").on('click',function(){
  getFormData(Enseignant.getForm()).test();
})
$("#modifier").on("click",function(){
  getFormData(Enseignant.getForm()).update();
})
$("table").on("click",'.remove-btn',function(){
  Enseignant.setRow($(this).parent().parent());
  Enseignant.setForm("remove")
  displayMsg(Enseignant.getForm());
  Enseignant.setItem(getIndex(this))
  Enseignant.getItem().initRemoveModal();
})
$("#destroy").on("click",function(){
  Enseignant.destroy();
})
$("#archiver").on("click",function(){
  Enseignant.archiver();
})
$("table").on("click",'.affecter-btn',function(){
  Enseignant.setForm("affecter")
  displayMsg(Enseignant.getForm());
  Enseignant.setItem(getIndex(this))
  Enseignant.getItem().initAffecterModal();
})
$(".check-box").on("change",function(){
  if($(this).prop('checked')){
    MaterielAffectaion.setInput(this)
    MaterielAffectaion.disableCheck();
  }
  else
    MaterielAffectaion.enableCheck(this);
})
$(".is-shared").on("click",function(){
    MaterielAffectaion.isShared(this)
})