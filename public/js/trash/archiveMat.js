$('#tableMFBA').DataTable();
$('#tableMFIA').DataTable();
$('#tableMEBA').DataTable();
$('#tableMtIA').DataTable();
setActive(4,1)

// activer ou disactiver un materiel Info
$(document).on('click','.disMI-modal',function(){
    $('#matiID').text($(this).data('id'));
    var id= $('#matiID').text();
    $.ajaxSetup({
        headers:{
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
    });
    $.ajax({
        type: 'PATCH',
        url: 'archiveMat/'+id,
        data:{
            'button' : 0
        },
        success: function(j){
            $('#switch1'+id).addClass('hidden');
            $('#switch2'+id).removeClass('hidden');

        },
        error: function(){
            console.log("erreur1");
        }

    });

});

$(document).on('click','.actiMI-modal',function(){
    $('#matiID').text($(this).data('id'));
    var id= $('#matiID').text();
    console.log(id);
    $.ajaxSetup({
        headers:{
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
    });
    $.ajax({
        type: 'PATCH',
        url: 'archiveMat/'+id,
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
            console.log("erreur2");
        }

    });

});

// activer ou disactiver un materiel Info
$(document).on('click','.disEB-modal',function(){
    $('#matiID').text($(this).data('id'));
    var id= $('#matiID').text();
    $.ajaxSetup({
        headers:{
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
    });
    $.ajax({
        type: 'PATCH',
        url: 'archiveMat/'+id,
        data:{
            'button' : 0
        },
        success: function(j){
            $('#switch1'+id).addClass('hidden');
            $('#switch2'+id).removeClass('hidden');

        },
        error: function(){
            console.log("erreur1");
        }

    });

});

$(document).on('click','.actiEB-modal',function(){
    $('#matiID').text($(this).data('id'));
    var id= $('#matiID').text();
    console.log(id);
    $.ajaxSetup({
        headers:{
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
        },
        dataType: "json",
    });
    $.ajax({
        type: 'PATCH',
        url: 'archiveMat/'+id,
        data :{
            'button' :1
        },
        success: function(j){
                console.log(j);
            $('#switch2'+id).addClass('hidden');
            $('#switch1'+id).removeClass('hidden');
        },
        error: function(){
            console.log("erreur2");
        }

    });

});
