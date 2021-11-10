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