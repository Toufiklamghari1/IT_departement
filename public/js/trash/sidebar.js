function setActive(i,j){
    $($("#sidebar ul li")[i]).addClass("active");
    if(j){
        console.log('is j')
        $("#archive").removeClass('hidden')
        $($("#archive a")[j-1]).addClass("active");
    }
    else{
        $("#archive a").removeClass("active");
    }
    
}
$('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
});