var GET_ZONE = buildUrlWithContextPath("chosenZone");


function setTitle() {
    $.ajax({
        url: GET_ZONE,
        error: function (e){

        },
        success: function(r) {
            $(document).attr("title", r);
        }
    })
}

//activate the timer calls after the page is loaded
$(function() {
    //The users list is refreshed automatically every second
    setTitle();
});