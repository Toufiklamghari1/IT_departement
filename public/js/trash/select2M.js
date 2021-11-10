var refNewTag;
var refNewOldTag;
var isNewRefTag=false;
var editRefNewTag;
var editRefNewOldTag;
var isEditNewRefTag=false;
var editOn = false;
function selectLabel(index,display){
    var div = $("."+modal+"floating-lab");
    if(display){
        if($(div[index]).hasClass('hidden'))
            $(div[index]).removeClass('hidden')
    }
    else{
        if(!$(div[index]).hasClass('hidden'))
            $(div[index]).addClass('hidden')
    }
}
function showRef(type,designationID,refID){
    if((type>0 && type <4 && designationID != "" && parseInt(designationID)>0) || (parseInt(editTypeChois.val())>0 && (parseInt(typeChois.val())>0 ) &&  parseInt(designationID)>0)){
        console.log("this is showRef")
        designationID = "r@"+designationID;
        if( modal == "add"){
            $("#addRefLabel").css("display","");
            ref.data('select2').$container.css("display","");
        }
        if( modal == "edit" && type != 4){
            editRef.data('select2').$container.css("display","");
        }
        $.ajaxSetup({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType:"json"
        });
        $.ajax({
        url: "materiel/"+designationID,
        type: "get",
        success: function(result) {
            console.log("ajax success with "+result);
            displayRef(result.result,refID);
            return true;
        },
        error:function(){
            console.log("showRef ajax failed");
            return false;
        }
        });
    }
    else{
        console.log("showRef test is failed")
        $($(".div-label")[1]).css('display','none')
        $($(".div-label")[3]).css('display','none')
        ref.data('select2').$container.css("display","none");
        $("#addRefLabel").css("display","none");
        editRef.data('select2').$container.css("display","none");
    }
}
function displayRef(data,refID){
    console.log(data);
    if(modal == "add"){
        $("#refChois option").remove();
        var newOption = new Option("","", false, false);
        ref.append(newOption).trigger('change');
        data.forEach(function (value) {
            newOption = new Option(value.ref,value.refID, false, false);
            ref.append(newOption).trigger('change');
        });
    }
    if(modal == "edit"){
        $("#editRefChois option").remove();
        var newOption = new Option("","", false, false);
        editRef.append(newOption)//.trigger('change');
        data.forEach(function (value) {
            newOption = new Option(value.ref,value.refID, false, false);
            editRef.append(newOption)
        });
        if(editOn){
            $('#editRefChois').val(refID);
            editRef.select2().trigger('change')
            editOn = false;
        }
    }
}
// materiel tabes{
    $("#table1").DataTable({
    "order":[],
    'columnDefs': [ {
        'targets': [4],
        'orderable': false, 
    }]
    });
    $("#table2").DataTable({
        "order":[],
        'columnDefs': [ {
        'targets': [3],
        'orderable': false, 
    }]
    });
    $("#table3").DataTable({
        "order":[],
        'columnDefs': [ {
        'targets': [4],
        'orderable': false, 
    }]
    });
    $("#table4").DataTable({
        "order":[],
        'columnDefs': [ {
        'targets': [2],
        'orderable': false, 
    }]
    });

//affecter table 
    $('#affecterTable').DataTable({
        "order":[],
        'columnDefs': [ {
        'targets': [0],
        'orderable': false, 
    }]
    });
// edit
    var editTypeChois= $("#editTypeChois").select2({
        dropdownParent: $('#editModal'),
        allowClear: true,
        minimumResultsForSearch: Infinity,
    })
    editTypeChois.on('select2:select', function (e) {
        var data = e.params.data.id;
        showInput(parseInt(data,10));
        showRef(parseInt(data,10),designation.val())
        //showRef(parseInt(data,10),editDesignation.val())
    })
    editTypeChois.on('select2:clear',function(){
        showInput(0);
        showRef(0);
    })
    var editDesignation = $("#editDesignationChois").select2({
        dropdownParent: $('#editModal'),
        tags: "true",
        placeholder:"Designation",
        allowClear: true,
        createTag: function (params) {
            var term = $.trim(params.term);
            if (term === '') {
            return null;
            }
            newTag = term;
            return {
            id: term,
            text: term +'(nouveau)'
            };
        },
    })
    editDesignation.on('change',function(){
        if(newTag != newOldTag && newTag != undefined ){
            designationID=$("#editDesignationChois > option").length-1;
            data ={option:0,designationID:designationID,tag:newTag}
            store(data);
        }
        newOldTag = newTag;
        selectLabel(2,true)
    });
    editDesignation.on('select2:select', function (e) {
        var data = e.params.data.id;
        selectLabel(2,true)
        selectLabel(3,false)
        if(editTypeChois.val() != 4)
            showRef(editTypeChois.val(),parseInt(data,10))
    })
    editDesignation.on('select2:clear',function(){
        showRef(0);
        selectLabel(3,false)
        selectLabel(2,false)
    })
    var editRef= $("#editRefChois").select2({
        dropdownParent: $('#editModal'),
        tags: "true",
        placeholder: "Reference",
        allowClear: true,
        createTag: function (params) {
            var term = $.trim(params.term);
            if (term === '') {
            return null;
            }
            editRefNewTag = term;
            return {
            id: term,
            text: term + ' (nouveau)'
            };
        },
    
    });
    editRef.on('change',function(){
    if(editRefNewTag != editRefNewOldTag && editRefNewTag != undefined ){
        isEditNewRefTag = true;
    }
    editRefNewOldTag = editRefNewTag;
    selectLabel(3,true)
    })
    editRef.on('select2:clear',function(){
        selectLabel(3,false)
        })
// add
    var typeChois= $("#typeChois").select2({
        dropdownParent: $('#modalAdd'),
        allowClear: true,
        minimumResultsForSearch: Infinity,
    })
    typeChois.on('select2:select', function (e) {
        var data = e.params.data.id;
        showInput(parseInt(data,10));
        showRef(parseInt(data,10),designation.val())
    })
    typeChois.on('select2:clear',function(){
        showInput(0);
        showRef(0);
    })
    var designation = $("#designationChois").select2({
        dropdownParent: $('#modalAdd'),
        placeholder:"Designation",
        tags: "true",
        allowClear: true,
        createTag: function (params) {
            var term = $.trim(params.term);
            if (term === '') {
            return null;
            }
            newTag = term;
            return {
            id: term,
            text: term +'(nouveau)'
            };
        },
    })
    designation.on('change',function(){
        if(newTag != newOldTag && newTag != undefined ){
        designationID=$("#designationChois > option").length-1;
        var data ={option:0,designationID:designationID,tag:newTag}
        store(data);
        }
        newOldTag = newTag;
    });
    designation.on('select2:select', function (e) {
        var data = e.params.data.id;
        if(parseInt(data,10) > 0 )
            showRef(typeChois.val(),parseInt(data,10))
        selectLabel(0,true);
        selectLabel(1,false)
    })
    designation.on('select2:clear',function(){
        showRef(0);
        selectLabel(0,false);
    })
    var ref = $("#refChois").select2({
    dropdownParent: $('#modalAdd'),
    tags: "true",
    placeholder: "Reference",
    allowClear: true,
    createTag: function (params) {
        var term = $.trim(params.term);
        if (term === '') {
        return null;
        }
        refNewTag = term;
        return {
        id: term,
        text: term + ' (nouveau)'
        };
    },

    });
    ref.on('change',function(){
        if(refNewTag != refNewOldTag && refNewTag != undefined ){
            isNewRefTag = true;
            selectLabel(1,true);
        }
        refNewOldTag = refNewTag;
    })
    ref.on('select2:select',function(){
        selectLabel(1,true);
    })
    ref.on('select2:clear',function(){
        selectLabel(1,false);
    })


