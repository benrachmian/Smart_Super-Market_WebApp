var GET_ZONE = buildUrlWithContextPath("chosenZone");


function setTitle() {
    $.ajax({
        url: GET_ZONE,
        error: function (e){

        },
        success: function(r) {
            $(document).attr("title", r);
            $("<h1>Welcome to zone " + r + " </h1>").appendTo($("#welcomeTitle"));
        }
    })
}


function w3_open() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
}
function w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
}

$(function() {
    setTitle();
});