
function store(){
    // function add(save)
    displayMsgSuccess(2)
    console.log('this is store')
    var nom= $('input[name=Nom]').val();
    var prenom= $('input[name=Prenom]').val();
    var user = $('#Email').val();
    var grade=$('#selectG option:selected').text();
    var em=$('#selectA option:selected').text();
    var date= $('input[name=DateDeRecrutement]').val();
    var bureau = $('#selectB option:selected').val();
    var idens = $('#maxid').val();
    var partsbu = bureau.split('nb places :',2);
    // alert(idens);
    var bureauId=partsbu[0];
    // alert(bureauId);
    idens++;
    var nb_places= partsbu[1];
    // alert("nb"+ nb_places);
    nb_places--;
    // alert("nb"+ nb_places);
    var email = user + '@' + em;
    $.ajax({
        url: "enseignent",
        headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type: "POST",
        dataType: "text",
        data: {
            "Nom" : nom,
            "Prenom" : prenom,
            "Grade" : grade,
            "Email" : email,
            "DateDeRecrutement": date,
            "NumBureau" :bureauId,
        },
        success: function(data){
            console.log(data);
            if((data.errors)){
                displayMsgSuccess(1)
                $('.error').removeClass('hidden');
                $('.error').text(data.errors.Nom);
                $('.error').text(data.errors.Prenom);
                $('.error').text(data.errors.Email);
                $('.error').text(data.errors.Grade);
                $('.error').text(data.errors.DateRecrutement);
            }else{
                $('.error').remove();
                $('#dtBasicExample').append("<tr class='enseignent"+idens+" active-tab'>"+
                "<td><a type='button' class='showEnsA text-primary p-1'"+
                "data-id='"+data+"'><i class='far fa-eye siz'></i></a></td>"+
                    "<td>"+ nom +"</td>"+
                    "<td>"+ prenom +"</td>"+
                    "<td>"+ date +"</td>"+
                    "<td>"+
                    "<button class='table-info-b btn btn-info btn-sm left-right-buttons btn-left'"+
                    "data-id='{{ $ens->enseignantID}}'data-nom='"+nom+"'data-prenom='"+prenom+"'data-email='"+email+"'data-grade='"+grade+
                                                                     "'data-daterecrutement='"+date+"'>"+
                    "<i class='fas fa-users-cog fa-2x'></i></button>"+
                    "<button class='edit-modal table-warning-b btn btn-warning btn-sm btn-center p-edit'"+
                    "data-id='"+data+"'data-nom='"+nom+"'data-prenom='"+prenom+"'data-email='"+email+"'data-grade='"+grade+
                                                                     "'data-daterecrutement='"+date+"'>"+
                    "<i class='far fa-edit'></i></button>"+
                    "<button class='delete-modal table-remove-b btn btn-danger btn-sm left-right-buttons btn-right'"+
                    "data-id='"+data+"'data-nom='"+nom+"'data-prenom='"+prenom+"'data-email='"+email+"'data-grade='"+grade+
                                                                     "'data-daterecrutement='"+date+"'>"+
                    "<i class='far fa-trash-alt fa-2x'></i></button>"+
                    "</td>" +
                    "</tr>"

                );
                $('#title').text(nom +' '+prenom);
                $('#hid').removeClass('hidden');
                if(nb_places == 0){
                    $('#'+bureauId+2).remove();
                }else{
                    $('#nb_place').val(nb_places);
                }
                $('#maxid').val(idens);


                console.log("trueE");
                initModal()
                displayMsgSuccess(0)
            }
            
        },
        error:function(){
            displayMsgSuccess(1)
        }
    });
    $('#selectB').prop('selectedIndex',0);
    $("#selectB option:selected").each(function () {
        $(this).removeAttr('selected');
     });

}
function selectedR(id,ch){
    $(id +" option:selected").each(function () {
           $(this).removeAttr('selected');
        });
    var nb=$(id+ " option").length;
        for(i=1;i<nb;i++){
            if($(id +' option[value='+i+']').text() == ch){
                $(id +' option[value='+i+']').attr('selected','true');
                break;
            }
        }
} 
// function Edit POST
    $(document).on('click', '.edit-modal', function() {
        $('#footer_action_button').text(" modifier");
        $('#deleteM').removeClass('modal-sm modal-notify modal-danger');
        $('#deleteM').addClass('modal-notify modal-success');

        $('.modal-header').removeClass('d-flex justify-content-center');
        $('.modal-header').addClass('d-flex text-center');
        //$('#footer_action_button').addClass('fa-edit');
        $('.btn-s').removeClass('btn-sm');
        //$('#footer_action_button').removeClass('fa-trash-alt');
        $('.actionBtn').addClass('btn-success');
        $('.actionBtn').removeClass('btn-danger');
        $('.actionBtn').addClass('edit');
        $('#titleM').text('Modifier Enseignent ');
        $('.deleteContent').hide();
        $('.form-horizontall').show();
        $('#ID').val($(this).data('id'));
        $('#finputNom').val($(this).data('nom'));
        $('#finputPrenom').val($(this).data('prenom'));

        $('#finputEmail').val($(this).data('email'));
            var e_mail = $('#finputEmail').val();
            var parts = e_mail.split('@',2);
        $('#fEmail').val(parts[0]);
            selectedR('#selectAR',parts[1]);


        $('#finputGrade').val($(this).data('grade'));
            var grad = $('#finputGrade').val();
            selectedR('#selectGrade',grad);

        $('#finputDateDeRecrutement').val($(this).data('daterecrutement'));
        $('#myModal').modal('show');
    });
// pour la mofificatiot et la supprission
    $('.modal-footer').on('click', '.edit', function() {
        displayMsgSuccess(2)
        var nom = $('#finputNom').val();
        var prenom = $('#finputPrenom').val();
        var user = $('#fEmail').val();
        var grad=$('#selectGrade option:selected').text();
        var em=$('#selectAR option:selected').text();
        var date = $('#finputDateDeRecrutement').val();
        var id = $('#ID').val();
        var email = user + '@' + em;
        $.ajaxSetup({
            headers:{
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "text",
        });
        $.ajax({
            url: "enseignent/"+id,
            type: "PATCH",
            data: {
                "ID": id,
                "Nom": nom,
                "Prenom": prenom,
                "Email": email,
                "Grade": grad,
                "Recrutement" : date,

            },
            success: function(data) {
                $('.enseignent' + id).replaceWith(" "+
                    "<tr class='enseignent" + id + " active-tab'>"+
                    "<td><a type='button' class='showEnsA  btn btn-primary btn-sm btn-center text-center p-0 pt-2'"+
                    "data-id='"+id+"'><i class='fas fa-info-circle'></i></a></td>"+
                    "<td class='hidden'>" + id + "</td>"+
                    "<td>" + nom + "</td>"+
                    "<td>" + prenom + "</td>"+
                    "<td>" + date + "</td>"+
                    "<td>"+
                    "<button class='table-info-b btn btn-info btn-sm left-right-buttons btn-left'"+
                    "data-id='"+id+"'data-nom='"+nom+"'data-prenom='"+prenom+"'data-email='"+email+"'data-grade='"+grad+
                                                                    "'data-daterecrutement='"+date+"'>"+
                        "<i class='fas fa-users-cog fa-2x'></i></button>"+
                    "<button class='edit-modal table-warning-b btn btn-warning btn-sm btn-center p-edit'"+
                    "data-id='"+id+"'data-nom='"+nom+"'data-prenom='"+prenom+"'data-email='"+email+"'data-grade='"+grad+
                                                                    "'data-daterecrutement='"+date+"'>"+
                        "<i class='far fa-edit'></i></button>"+
                    "<button class='delete-modal table-remove-b btn btn-danger btn-sm left-right-buttons btn-right'"+
                    "data-id='"+id+"'data-nom='"+nom+"'data-prenom='"+prenom+"'data-email='"+email+"'data-grade='"+grad+
                                                                    "'data-daterecrutement='"+date+"'>"+
                        "<i class='far fa-trash-alt fa-2x'></i></button>"+
                    "</td>" +
                    "</tr>");
                    displayMsgSuccess(0)
                    console.log('update success');
                    //$('#editform input').siblings('label').addClass('active');
                },
               error:function(){
                   
                displayMsgSuccess(1)
                console.log('update failed');
               }
               
                
        });
    });

// form Delete function
    $(document).on('click', '.delete-modal', function() {
        $('#footer_action_button').text(" Supprimer");
        $('#deleteM').addClass('modal-sm modal-notify modal-danger');
        $('#deleteM').removeClass('modal-success');

        $('.modal-header').addClass('d-flex justify-content-center');
        $('.btn-s').addClass('btn-sm');
        //$('#footer_action_button').removeClass('fa-edit');
        //$('#footer_action_button').addClass('fa-trash-alt');
        $('.actionBtn').removeClass('btn-success');
        $('.actionBtn').addClass('btn-danger');
        $('.actionBtn').addClass('delete');
        $('#titleM').text('Supprimer Enseignent');
        $('.id').text($(this).data('id'));

        $('.deleteContent').show();
        $('.form-horizontall').hide();
        $('.title').html($(this).data('nom') + ' '+ $(this).data('prenom'));
        $('#myModal').modal('show');
    });

    $('.modal-footer').on('click', '.delete', function(){
        var id = $('.id').text();
        $.ajax({
            type: 'DELETE',
            url: 'enseignent/'+id,
            data: {
                '_token': $('input[name=_token]').val(),
                'id': id
            },
            success: function(data){
                $('.enseignent' +id ).remove();
                console.log(data);
            },
            error: function(a){
                console.log(a);
            }
        });
    });
// show function
    $(document).on('click','.showEnsA',function(){
        $('#idEnsM').text($(this).data('id'));
        //>>>>>
        displayMsgSuccess(-1)
        enseignantID = $(this).attr('data-id')
        modal = 'show'
        //>>>>
        var id = $('#idEnsM').text();
        $.ajaxSetup({
            headers:{
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
        });
        $.ajax({
            type: 'GET',
            url: 'enseignent/'+id,
            success: function(j){
                $('#showensM').modal('show');
                $('#body-ensv').remove();
                // information personnel
                var etat=j.ens_bureau[0].active;
                var nom=j.ens_bureau[0].nom;
                var prenom=j.ens_bureau[0].prenom;
                $('#nomEns').text(nom + ' ' + prenom);

                if(etat==1){
                    $('#etats').text("Actif");
                }
                else{
                    $('#etats').text("Non Actif");
                }
                $('#emails').text(j.ens_bureau[0].email);
                $('#grades').text(j.ens_bureau[0].grade);
                $('#bureaus').text(j.ens_bureau[0].bureau);
                $('#dates').text(j.ens_bureau[0].dateRecrutement);

                //information sur le material

                var index=j.equi_bureau.length;

                if(index != 0){
                    $('#tbodyMEB td').remove();
                    for(var i=0;i<index;i++){
                        $('#tbodyMEB').append(
                            "<tr id='Erest"+(i+1)+"'>"+
                            "<td id='r"+j.equi_bureau[i].matID+"' class='check-cell affecterTable' ><input class='check-box'  type='checkbox' id='mrCheck"+(i+1)+"'  onchange='isChecked(3,"+(i+1)+")'><label class='label-size' for='mrCheck"+(i+1)+"' ></label></td>"+
                            "<td>"+ j.equi_bureau[i].designation +"</td>"+
                            "<td>"+ j.equi_bureau[i].reference +"</td>"+
                            "<td>"+ j.equi_bureau[i].numInventaire +"</td></tr>"
                        );
                    }
                }else{
                    $('#tbodyMEB td').remove();
                    $('#tbodyMEB td').text('its empty')
                }

                var indexmt=j.mat_Info.length;
                if(indexmt!=0){
                    $('#tbodyMTI td').remove();
                    for(var i=0;i<indexmt;i++){
                        $('#tbodyMTI').append(
                            "<tr id='Mrest"+(i+1)+"'>"+
                            "<td id='r"+j.mat_Info[i].matID+"' class='check-cell affecterTable' ><input class='check-box'  type='checkbox' id='erCheck"+(i+1)+"'  onchange='isChecked(2,"+(i+1)+")'><label class='label-size' for='erCheck"+(i+1)+"' ></label></td>"+
                            "<td>"+ j.mat_Info[i].designation +"</td>"+
                            "<td>"+ j.mat_Info[i].reference +"</td>"+
                            "<td>"+ j.mat_Info[i].numInventaire +"</td></tr>"
                        );
                    }
                }else{
                    $('#tbodyMTI td').remove();
                    $('#tbodyMTI td').text('its empty')
                }


            },
            error: function(){
                console.log("errooo");
            }
        });


    });
//add modal
    $(document).on('click','.addBtn',function(){
        id = $(this).parent().attr('id');
        if(id == "Ens1")
            modal = "addE"
        if(id == "Ens2")
            modal = "addV"
        displayMsgSuccess(-1)
    });
    //edit
    $(document).on('click','.table-warning-e',function(){
        displayMsgSuccess(-1)
        modal = "editE";
        initEditModal();
    }); 



