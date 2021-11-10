var data={'PESA':1,'PH':2,'PES':3}
function storeV(){
    // function add(save)
    displayMsgSuccess(2)
    var nom= $('input[name=Nomv]').val();
    var prenom= $('input[name=Prenomv]').val();
    var user = $('#Emailv').val();
    var grade=$('#selectGv option:selected').text();
    var em=$('#selectAv option:selected').text();
    var tel= $('#inputTel').val();
    var etab= $('#inputEtab').val();
    var periode= $('#inputPer').val();
    var df= $('#inputdf').val();
    var email = user + '@' + em;
    //alert(nom + prenom + email + tel + etab + grade + periode )
    $.ajax({
        url: "enseignentV",
        headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type: "POST",
        dataType: "text",
        data: {
            "Nomv" : nom,
            "Prenomv" : prenom,
            "Gradev" : grade,
            "Emailv" : email,
            "Telv" : tel,
            "Etabv" : etab,
            "Periodev": periode,
            "datefin" : df
        },
        success: function(data){
            if((data.errors)){
                $('.error').removeClass('hidden');
                $('.error').text(data.errors.Nom);
                $('.error').text(data.errors.Prenom);
                $('.error').text(data.errors.Email);
                $('.error').text(data.errors.Grade);
                $('.error').text(data.errors.DateRecrutement);
            }else{
                $('.error').remove();
                $('#dBasicExample').append("<tr class='enseignentv"+data+" active-tab'>"+
                    "<td>"+ nom +"</td>"+
                    "<td>"+ prenom +"</td>"+
                    "<td>"+ etab +"</td>"+
                    "<td>"+ tel +"</td>"+
                    "<td>"+
                    "<button class='showEnsvA table-info-b btn btn-info btn-sm left-right-buttons btn-left' data-id='"+data+"'>"+
                    "<i class='far fa-eye fa-3x'></i></button>"+
                    "<button class='edit-ensv table-warning-b btn btn-warning btn-sm btn-center p-edit' data-id='"+data+"'  data-nom='"+nom+"' data-prenom='"+prenom+"'"+
                    "data-email='"+email+"' data-grade='"+grade+"' data-etablisement='"+etab+"'"+
                    "data-num='"+tel+"' data-dated='"+periode+"' data-datef='"+df+"'>"+
                    "<i class='far fa-edit'></i></button>"+
                    "<button class='delete-ensv table-remove-b btn btn-danger btn-sm left-right-buttons btn-right' data-id='"+data+"' data-nom='"+nom+"' data-prenom='"+prenom+"'>"+
                    "<i class='far fa-trash-alt fa-2x'></i></button>"+
                    "</td>" +
                    "</tr>"

                );
                console.log("true");
                initModal()
                displayMsgSuccess(0)

            }
        },
        error:function(){
        displayMsgSuccess(1)
        console.log("erAjout");
        }
    });
    //$('#resetv input').val("");
    //$('#resetv input').siblings('label').removeClass('active')
    //$('#resetv input').removeClass('valid')
        // $('#inputNom').val('');
    // $('#inputPrenom').val('');
    // $('#inputEmail').val('');
    // $('#inputGrade').val('');
    // $('#inputDateDeRecrutement').val('Date De Recrutement');

}
function selectedR(id,ch){

    $(id +" option:selected").each(function () {
           $(this).removeAttr('selected');
        });
    var nb=$(id+ " option").length;
        for(i=1;i<=nb;i++){
            if($(id +' option[value='+i+']').text() == ch){
                $(id +' option[value='+i+']').attr('selected','true');
                break;
            }
        }
}
 
$(document).on('click', '.edit-ensv', function() {
    console.log("edit ensE")
    modal = "editV"
    initEditModal();
    $('#footer_action_buttonE').text(" modifier");
    $('#deleteME').removeClass('modal-sm modal-notify modal-danger');
    $('#deleteME').addClass('modal-notify');

    // $('.modal-header').removeClass('d-flex justify-content-center');
    $('.modal-header').addClass('d-flex text-center');
    ///$('#footer_action_buttonE').addClass('fa-edit');
    $('.btn-sE').removeClass('btn-sm');
    //$('#footer_action_buttonE').removeClass('fa-trash-alt');
    $('.actionBtnE').removeClass('btn-danger');
    $('.actionBtnE').addClass('btn-success');
    $('.actionBtnE').addClass('editMV');
    $('#titleMV').text('Modifier Enseignent  vacataire ');
    $('#titleMV').addClass('h4')
    $('.deleteContentE').hide();
    $('.form-horizontalll').show();
    $('#ide').val($(this).data('id'));
    $('#inputNomev').val($(this).data('nom'));
    $('#inputPrenomev').val($(this).data('prenom'));
    $('#inputPerv').val($(this).data('dated'));
    $('#inputdfv').val($(this).data('datef'));

    $('#inputemailv').val($(this).data('email'));
        var e_mail = $('#inputemailv').val();
        var parts = e_mail.split('@',2);
    $('#Emailev').val(parts[0]);
        selectedR('#selectAev',parts[1]);
    $('#inputGradeev').val($(this).data('grade'));
        var grad = $('#inputGradeev').val();
        console.log("grad after "+grad)
        switch(grad){
            case 'PESA':{
                console.log("grad pesa");
                editVGrad.select2('val','1');
                break;
            }
            case 'PH':{
                console.log("grad ph");
                editVGrad.select2('val','2');
                break;
            }
            case 'PES':{
                console.log("grad pes");
                editVGrad.select2('val','3');
                break;
            }
        }

    $('#inputTele').val($(this).data('num'));

    $('#inputEtabe').val($(this).data('etablisement'));



    $('#EditME').modal('show');
});
    // pour la mofificatiot et la supprission
$('.modal-footer').on('click', '.editMV', function() {
    displayMsgSuccess(2)
    var nom = $('#inputNomev').val();
    var prenom = $('#inputPrenomev').val();
    var user = $('#Emailev').val();
    var grad=$('#selectGev option:selected').text();
    var em=$('#selectAev option:selected').text();
    var tel = $('#inputTele').val();
    var etabe = $('#inputEtabe').val();
    var dated = $('#inputPerv').val();
    var datef = $('#inputdfv').val();
    var id = $('#ide').val();
    var email = user + '@' + em;
    $.ajaxSetup({
        headers:{
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "text",
    });
    $.ajax({
        url: "enseignentV/"+id,
        type: "PATCH",
        data: {
            "ID": id,
            "Nom": nom,
            "Prenom": prenom,
            "Email": email,
            "Grade": grad,
            "NumT" : tel,
            "Etablisement": etabe,
            "dateD": dated,
            "dateF": datef,

        },
        success: function(data) {

            $('.enseignentv' + id).replaceWith(" "+
                "<tr class='enseignentv" + id + " active-tab'>"+
                "<td>" + nom + "</td>"+
                "<td>" + prenom + "</td>"+
                "<td class='hidden'>" + id + "</td>"+
                "<td>" + etabe + "</td>"+
                "<td>" + tel + "</td>"+
                "<td>"+
                "<button class=' table-info-b btn btn-info btn-sm left-right-buttons btn-left' data-id='"+id+"'>"+
                    "<i class='fas fa-info-circle fa-3x'></i></button>"+
                "<button class='edit-ensv table-warning-b btn btn-warning btn-sm btn-center p-edit' data-id='"+id+"'  data-nom='"+nom+"' data-prenom='"+prenom+"'"+
                "data-email='"+email+"' data-grade='"+grad+"' data-etablisement='"+etabe+"'"+
                "data-num='"+tel+"' data-dated='"+dated+"' data-datef='"+datef+"'>"+
                    "<i class='far fa-edit'></i></button>"+
                "<button class='delete-ensv table-remove-b btn btn-danger btn-sm left-right-buttons btn-right' data-id='"+id+"' data-nom='"+nom+"' data-prenom='"+prenom+"'>"+
                    "<i class='far fa-trash-alt fa-2x'></i></button>"+
                "</td>" +
                "</tr>");
                displayMsgSuccess(0)
                console.log('update V success');
            },
            error:function(){
                
             displayMsgSuccess(1)
             console.log('update failed');
            }
    });
});

// form Delete function
$(document).on('click', '.delete-ensv', function() {
    //hamza2
    $('#footer_action_buttonE').text(" Enregistrer");
    $('#deleteME').addClass('modal-sm modal-notify modal-danger');
    $('#deleteME').removeClass('modal-success');

    $('.modal-header').addClass('d-flex justify-content-center');
    $('.btn-sE').addClass('btn-sm');
    //$('#footer_action_buttonE').removeClass('fa-edit');
    //$('#footer_action_buttonE').addClass('fa-trash-alt');
    $('.actionBtnE').removeClass('btn-success');
    $('.actionBtnE').addClass('btn-danger');
    $('.actionBtnE').addClass('deleteE');
    $('#titleMV').text('Supprimer Enseignent');
    $('.ide').text($(this).data('id'));
    $('.deleteContentE').show();
    $('.form-horizontalll').hide();
    $('.titlee').html($(this).data('nom') + ' '+ $(this).data('prenom'));
    $('#EditME').modal('show');
});

$('.modal-footer').on('click', '.deleteE', function(){
    var id = $('.ide').text();
    console.log(id);
    $.ajax({
        type: 'DELETE',
        url: 'enseignentV/'+id,
        data: {
            '_token': $('input[name=_token]').val(),
            'id': id
        },
        success: function(data){
            $('.enseignentv'+id).remove();
        },
        error: function(){
            console.log('error');
        }
    });
});

// show function
$(document).on('click','.showEnsvA',function(){
    $('#idEnsM').text($(this).data('id'));

    var id = $('#idEnsM').text();
    $.ajaxSetup({
        headers:{
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
    });
    $.ajax({
        type: 'GET',
        url: 'enseignentV/'+id,
        success: function(j){
            $('#showensM').modal('show');
            $('#body-ens').remove();
            // information personnel
            var etat=j[0].active;
            var nom=j[0].Nom;
            var prenom=j[0].Prenom;
            $('#nomEns').text(nom + ' ' + prenom);

            if(etat==1){
                $('#etatvs').text("Actif");
            }
            else{
                $('#etatvs').text("Non Actif");
            }
            $('#emailvs').text(j[0].email);
            $('#gradevs').text(j[0].grade);
            $('#datedebuts').text(j[0].dateDebut);
            $('#telvs').text(j[0].numT);
            $('#datefin').text(j[0].dateFin);
            $('#etabvs').text(j[0].Etablisement);

        },
        error: function(){
            console.log("errooo");
        }
    });


});
//edit
$(document).on('click','.table-warning-v',function(){
    displayMsgSuccess(-1)
    console.log("editV")
    modal = "editV";
    initEditModal();
}); 
