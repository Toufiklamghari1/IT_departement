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
  $('.details').on('click',function(){
    id=getRowNumber($(this).parent().parent());
    var row = $("[id=col"+id+"]");
    getDetails(row[0].textContent);
  })