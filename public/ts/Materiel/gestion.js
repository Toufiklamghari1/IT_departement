MaterielInfo.init();
$('#affecterTable').DataTable({
    "order":[],
    'columnDefs': [ {
      'targets': [0],
      'orderable': false, 
   }]
  });
MaterielInfo.setTable($("table#materiel-info").DataTable({
  "order":[[ 3, "desc" ]],
  'columnDefs': [ {
    'targets': [4],
    'orderable': false, 
  }]
}));
$("table#equipement").DataTable({
  "order":[[ 3, "desc" ]],
  'columnDefs': [ {
    'targets': [0,4],
    'orderable': false, 
  }]
})
$("table#forniture-bureau").DataTable({
  'columnDefs': [ {
    'targets': [2],
    'orderable': false, 
  }]
})
$("table#forniture-info").DataTable({
  'columnDefs': [ {
    'targets': [3],
    'orderable': false, 
  }]
})
$('select.materiel-type').select2({ 
  minimumResultsForSearch: -1 
});
$('#addForm .designation').select2({
  dropdownParent: $('#modalAdd'),
  tags: "true",
  placeholder: 'Designation',
  allowClear: true,
  createTag: function (params) {
    var text = $.trim(params.term);
    Materiel.setDesignation(text)
    return {
      id: text,
      text: text+" (new)"
      };
  }
  });
$('#addForm .designation').on('select2:select', function (e) {
  $('#addForm select.reference').empty().trigger('change')
  MaterielInfo.designationSelected(e.params.data.id)
  getFormData(MaterielInfo.getForm()).test()
});
$('#addForm .designation').on('select2:clear', function (e) {
  $('#addForm select.reference').empty().trigger('change')
  getFormData(MaterielInfo.getForm()).test()
});
$('#updateForm .designation').select2({
  dropdownParent: $('#modalUpdate'),
  tags: "true",
  placeholder: 'Designation',
  allowClear: true,
  createTag: function (params) {
    var text = $.trim(params.term);
      Materiel.setDesignation(text)
      return {
        id: text,
        text: text+" (new)"
        };
  }
  });
$('#updateForm .designation').on('select2:select', function (e) {
  $('#updateForm select.reference').empty().trigger('change')
  MaterielInfo.designationSelected(e.params.data.id)
  getFormData(MaterielInfo.getForm()).test()
});
$('#updateForm .designation').on('select2:clear', function (e) {
  $('#updateForm select.reference').empty().trigger('change')
  getFormData(MaterielInfo.getForm()).test()
});
$('#updateForm select.reference').select2({
  dropdownParent: $('#modalUpdate'),
  placeholder: 'Reference',
  tags: "true",
  allowClear: true,
  createTag: function (params) {
    var text = $.trim(params.term);
      Materiel.setReference(text)
      return {
        id: params.term,
        text: params.term+" (new)"
        };
  }
});
$('#addForm select.reference').select2({
  dropdownParent: $('#modalAdd'),
  placeholder: 'Reference',
  tags: true,
  allowClear: true,
  createTag: function (params) {
    var text = $.trim(params.term);
      Materiel.setReference(text)
      return {
        id: text,
        text: text+" (new)"
        };
  }
});
$(".card-header").on('click','a',function(){
  MaterielInfo.setForm("add")
  displayMsg(MaterielInfo.getForm())
})
$("#addForm").on('click',function(){
  getFormData(MaterielInfo.getForm()).test();
})
$("#ajouter").on("click",function(){
  getFormData(MaterielInfo.getForm()).ajouter();
})
$("table").on("click",'.edit-btn',function(){
  MaterielInfo.setForm("update")
  displayMsg(MaterielInfo.getForm());
  MaterielInfo.setItem(getIndex(this))
  MaterielInfo.getItem().initUpdateForm();
})
$("#updateForm").on('click',function(){
  getFormData(MaterielInfo.getForm()).test();
})
$("#modifier").on("click",function(){
  getFormData(MaterielInfo.getForm()).update();
})
$("table").on("click",'.remove-btn',function(){
  MaterielInfo.setRow($(this).parent().parent());
  MaterielInfo.setForm("remove")
  displayMsg(MaterielInfo.getForm());
  MaterielInfo.setItem(getIndex(this))
  MaterielInfo.getItem().initRemoveModal();
})
$("#destroy").on("click",function(){
  MaterielInfo.destroy();
})
$("#archiver").on("click",function(){
  MaterielInfo.archiver();
})
$("table").on("click",'.affecter-btn',function(){
  MaterielInfo.setForm("affecter")
  displayMsg(MaterielInfo.getForm());
  MaterielInfo.setItem(getIndex(this))
  MaterielInfo.getItem().initAffecterModal();
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