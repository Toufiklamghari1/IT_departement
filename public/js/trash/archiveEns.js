setActive(4,2)
function switchBtn(id1,id2){
    console.log("switchBtn");
    $("#Ens"+id1).css('display','')
    $("#tab"+id1).addClass('active-tab')
    $("#Ens"+id2).css('display','none').removeClass('active-tab');
    $("#tab"+id2).removeClass('active-tab')
}
$('#archiveEns').DataTable({
    "order":[],
    'columnDefs': [ {
        'targets':[1],
        'orderable': false,
    }]
});
$('#archiveEnsv').DataTable({
    "order":[],
    'columnDefs': [ {
        'targets':[1],
        'orderable': false,
    }]
});
// show function
$(document).on('click','.showArcEns',function(){
    $('#idAEnsM').text($(this).data('id'));

    var id = $('#idAEnsM').text();
    $.ajaxSetup({
        headers:{
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
    });
    $.ajax({
        type: 'GET',
        url: 'archive/'+id,
        data:{
            'ens': 0,
        },
        success: function(j){
            $('#showArcEnsM').modal('show');
            $('#body-ensAv').hide();
            // information personnel
            var etat=(j.ens_bureau)[0].active;
            var nom=j.ens_bureau[0].nom;
            var prenom=j.ens_bureau[0].prenom;
            $('#nomAEns').text(nom + ' ' + prenom);

            if(etat==1){
                $('#etatAs').text("Actif");
            }
            else{
                $('#etatAs').text("Non Actif");
            }
            $('#emailAs').text(j.ens_bureau[0].email);
            $('#gradeAs').text(j.ens_bureau[0].grade);
            $('#bureauAs').text(j.ens_bureau[0].bureau);
            $('#dateAs').text(j.ens_bureau[0].dateRecrutement);

            //information sur le material

            var index=j.equi_bureau.length;

            if(index != 0){
                $('#removeA').remove();
                for(var i=0;i<index;i++){
                    $('#tbodyMEBA').append(
                        "<tr id='removeA'><td>"+ j.equi_bureau[i].numInventaire +"</td>"+
                        "<td>"+ j.equi_bureau[i].designation +"</td>"+
                        "<td>"+ j.equi_bureau[i].reference +"</td>"+
                        "<td>"+ j.equi_bureau[i].Quantite +"</td></tr>"

                    );
                }
            }else{
                $('#removeA').remove();

            }

            var indexmt=j.mat_Info.length;
            if(indexmt!=0){
                $('#removeA').remove();
                for(var i=0;i<indexmt;i++){
                    $('#tbodyMTIA').append(
                        "<tr id='removeA'><td>"+ j.mat_Info[i].numInventaire +"</td>"+
                        "<td>"+ j.mat_Info[i].designation +"</td>"+
                        "<td>"+ j.mat_Info[i].reference +"</td>"+
                        "<td>"+ j.mat_Info[i].Quantite +"</td></tr>"
                    );
                }
            }else{
                $('#removeA').remove();

            }

            $('#body-ensA').show();
            console.log(j);
        },
        error: function(){
            console.log("errooo");
        }
    });


 });
 // show enseignant vacatire
$(document).on('click','.showArcEnsv',function(){
    $('#idAEnsM').text($(this).data('id'));

    var id = $('#idAEnsM').text();
    $.ajaxSetup({
        headers:{
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
    });
    $.ajax({
        type: 'GET',
        url: 'archive/'+id,
        data:{
            'ens' : 1,
        },
        success: function(j){
            $('#showArcEnsM').modal('show');
            $('#body-ensA').hide();
            // information personnel
            var etat=j[0].active;
            var nom=j[0].nom;
            var prenom=j[0].prenom;
            $('#nomAEns').text(nom + ' ' + prenom);

            if(etat==0){
                $('#etatAvs').text('Non Actif');
            }else{
                $('#etatAvs').text('Actif');
            }
            $('#emailAvs').text(j[0].email);
            $('#gradeAvs').text(j[0].grade);
            $('#etabAvs').text(j[0].Etablisement);
            $('#telAvs').text(j[0].numT);
            $('#datedebutAs').text(j[0].dateDebut);
            $('#datefinA').text(j[0].dateFin);
            $('#body-ensAv').show();
            console.log(j);
        },
        error: function(){
            console.log("errooo1");
        }
    });
});
//disactiver ou activer un enseignant
$(document).on('click','.disE-modal',function(){
    $('#ensID').text($(this).data('id'));
    var id= $('#ensID').text();
    $.ajaxSetup({
        headers:{
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
    });
    $.ajax({
        type: 'PATCH',
        url: 'archive/'+id,
        data:{
            'button' : 0
        },
        success: function(j){
            // $('#'+id).replaceWith(
            //     "<td><a class='acti-modal text-danger text-center' data-id='"+id+"'> <i class='far fa-times-circle siz'></i></a></td>"
            // );
            $('#switch1'+id).addClass('hidden');
            $('#switch2'+id).removeClass('hidden');

        },
        error: function(){
            console.log("erreur");
        }

    });

});
$(document).on('click','.actiE-modal',function(){
    $('#ensID').text($(this).data('id'));
    var id= $('#ensID').text();
    console.log(id);
    $.ajaxSetup({
        headers:{
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
    });
    $.ajax({
        type: 'PATCH',
        url: 'archive/'+id,
        data :{
            'button' :1
        },
        success: function(j){
                console.log(j);
            // $('#'+id).replaceWith(
            //     "<td><a class='dis-modal text-success text-center' data-id='"+id+"'><i class='far fa-check-circle siz'></i></a></td>"
            // );
            $('#switch2'+id).addClass('hidden');
            $('#switch1'+id).removeClass('hidden');
        },
        error: function(){
            console.log("erreur");
        }

    });

});
//disactiver ou activer un enseignant vacataire
$(document).on('click','.disEv-modal',function(){
    $('#ensID').text($(this).data('id'));
    var id= $('#ensID').text();
    $.ajaxSetup({
        headers:{
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
    });
    $.ajax({
        type: 'PATCH',
        url: 'archive/'+id,
        data:{
            'button' : 0
        },
        success: function(j){
            // $('#'+id).replaceWith(
            //     "<td><a class='acti-modal text-danger text-center' data-id='"+id+"'> <i class='far fa-times-circle siz'></i></a></td>"
            // );
            $('#switch1'+id).addClass('hidden');
            $('#switch2'+id).removeClass('hidden');

        },
        error: function(){
            console.log("erreur");
        }

    });

});
$(document).on('click','.actiEv-modal',function(){
    $('#ensID').text($(this).data('id'));
    var id= $('#ensID').text();
    console.log(id);
    $.ajaxSetup({
        headers:{
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
    });
    $.ajax({
        type: 'PATCH',
        url: 'archive/'+id,
        data :{
            'button' :1
        },
        success: function(j){
                console.log(j);
            $('#switch2'+id).addClass('hidden');
            $('#switch1'+id).removeClass('hidden');
        },
        error: function(){
            console.log("erreur");
        }

    });

});
