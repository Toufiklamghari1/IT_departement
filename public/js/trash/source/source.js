
export function getRowNumber(row){
    var id1 = $(row).attr('id').match(/(\d+)/);
    var id="";
    for(var i=0;i<id1.length-1;i++){
        id += id1[i];
    }
    return id;
}
export function displayMsgSuccess(index){
    var tabMsg =   $("."+modal+"Msg div")
    for(var i=0;i<tabMsg.length;i++){
      if(i==index){
        $(tabMsg[i]).removeClass('hidden')
        continue
      }
      if(!$(tabMsg[i]).hasClass('hidden')){
        $(tabMsg[i]).addClass('hidden')
        }
    }   
}
export function store(data , type){
$.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    dataType:"text"
  });
    $.ajax({
      url: ""+type,
      type: "POST",
      data: data,
      success: function() {
          var obj = [true]
          return obj;
       },
      error:function(){
          var obj = [false]
          return obj;
      }
    });
}
export function update(id , data , type){
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      dataType:"text"
    });
    $.ajax({
      url: ""+type+"/"+id,
      type: 'PATCH',
      data: data,
      success: function() {
        return true;
        },
      error:function(){
        return false;
      }
      });
}
export function destroy(id , type){
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
      url: ""+type+"/"+id,
      type: 'DELETE',
      success: function() {
          return true;
        },
      error:function(){
          return false;
      }
      });
}
export function affecter(type , data){
$.ajaxSetup({
    headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    dataType:"json"
});
    $.ajax({
    url: type,
    type: "POST",
    data: data,
    success: function(result) {
        return true;
        },
    error:function(result){
        return false;
    }
});
}
export function getDetails(id , type){
$.ajaxSetup({
    headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    dataType:"json"
});
$.ajax({
url: type+"/"+id,
type: "GET",
success: function(result) {
    var obj = [true , result]
    return obj;
},
error:function(){
    var onj = [false]
    return false;
}
});
}
export function addRow(data,table){
  table.row.add([
    data[0],
    data[1],
    data[2],
    data[3],
    data[4],
    data[5]
  ]).draw(false);
}
export function readForm(form){
  
}