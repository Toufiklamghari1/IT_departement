setActive(4,3)
$('#archiveBureau').DataTable({
    "order":[],
    'columnDefs': [ {
        'targets':[0],
        'orderable': false,
    }]
});
$(document).on('click','.showArcBu',function(){
    $('#bureauID').text($(this).data('id'));
    var bureau= $('#bureauID').text();

    $.ajaxSetup({
        headers:{
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
    });
    $.ajax({
        type: 'GET',
        url: 'archivebureau/'+bureau,

        success: function(j){
            $('#removeEns').remove();
            var num = j.bureau[0].num;
            $('#nomABureau').text(num);

            var etat = j.bureau[0].active;
            if(etat==0){
                $('#etats').text('Non Actif');
            }else {
                $('#etats').text('Actif');
            }

            $('#nums').text(num);

            $('#capacites').text(j.bureau[0].capacite);

            $('#dates').text(j.bureau[0].dateAcquisition);
            console.log(j.bureauInfo);
            console.log(j.bureau);
            console.log(j.mat_partage);
            var indexens= j.bureauInfo.length;
            for(var i=0;i<indexens;i++){
                $('#tbodyEns').append(
                    "<tr id='removeEns'>"+
                    "<td>"+ j.bureauInfo[i].Nom +"</td>"+
                    "<td>"+ j.bureauInfo[i].Prenom +"</td>"+
                    "<td>"+ j.bureauInfo[i].email +"</td>"+
                    "<td>"+ j.bureauInfo[i].active +"</td></tr>"

                );
            }

            var indexpar= j.mat_partage.length;

            for(var i=0;i<indexpar;i++){
                $('#tbodypart').append(
                    "<tr id='removeEns'>"+
                    "<td>"+ j.mat_partage[i].Nom + " "+ j.mat_partage[i].Prenom +"</td>"+
                    "<td>"+ j.mat_partage[i].designation +"</td>"+
                    "<td>"+ j.mat_partage[i].active +"</td></tr>"

                );
            }
            $('#showArcBureau').modal('show');
        },
        error: function(){
            console.log("erreur");
        },
    });
});


$(document).on('click','.dis-modal',function(){
    $('#bureauID').text($(this).data('id'));
    var id= $('#bureauID').text();
    $.ajaxSetup({
        headers:{
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
    });
    $.ajax({
        type: 'PATCH',
        url: 'archivebureau/'+id,
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

$(document).on('click','.acti-modal',function(){
    $('#bureauID').text($(this).data('id'));
    var id= $('#bureauID').text();
    console.log(id);
    $.ajaxSetup({
        headers:{
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
    });
    $.ajax({
        type: 'PATCH',
        url: 'archivebureau/'+id,
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
