function update(id,num,capacite,date){
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      dataType:"text"
    });
    $.ajax({
      url: "bureau/"+editId[id],
      type: 'PATCH',
      data: {"Num":num ,"Capacite":capacite ,"Date":date },
      success: function() {
        console.log("update ajax success");
        },
      error:function(){
        console.log("update ajax failed");
      }
      });
  }
  $tableID.on('click', '.table-warning-b', function () {
    id=getRowNumber(this);
    // change row to editable and color
      var row = document.querySelectorAll('[id=col'+id+']');
      if($(this).attr('id').includes("edit")){
        editId[id]=row[0].textContent;
        for(var i=0;i<row.length;i++){
          if(i==2)
            continue;
          row[i].setAttribute("contenteditable",true);
        }
        $("#row"+id).css('background-color','rgb(78, 78, 78)');
        $("#edit"+id).css("display","none");
        $("#save"+id).css("display","");
        disableBtn("affecter",id);
        disableBtn("remove",id);
      }
      else{
        for(var i=0;i<row.length;i++){
          row[i].setAttribute("contenteditable",false);
        }
        $("#row"+id).css('background-color','');
        //save
        var data1= document.querySelectorAll('[id=col'+id+']');
        var data = [];
        data[0]=id;
        for(var i=1;i<4;i++)
          data[i] = row[0].textContent;
        update(id,data1[0].textContent,data1[1].textContent,data1[3].textContent);
        // database 
        $("#edit"+id).css("display","");
        $("#save"+id).css("display","none");
        enableBtn("affecter",id);
        enableBtn("remove",id);
        disableBtnAffecter("affecter");
      }
  });