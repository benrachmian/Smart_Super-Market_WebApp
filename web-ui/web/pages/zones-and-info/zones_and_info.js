var refreshRate = 2000; //milli seconds
var USER_LIST_URL = buildUrlWithContextPath("userslist");
var GET_ROLE_URL = buildUrlWithContextPath("role");

//users = a list of usernames, essentially an array of javascript strings:
// ["moshe","nachum","nachche"...]
function refreshUsersList(users) {
    //clear all current users
    $("#userslist").empty();

    // rebuild the list of users: scan all users and add them to the list of users
    $.each(users || [], function(index, user) {
        console.log("Adding user #" + index + ": " + user);
        //create a new <option> tag with a value in it and
        //appeand it to the #userslist (div with id=userslist) element
        $('<li>' + "Username: " +  user.username + "<br> Role: " +  user.role  +  '</li>').appendTo($("#userslist"));
    });
}

function ajaxUsersList() {
    $.ajax({
        url: USER_LIST_URL,
        success: function(users) {
            refreshUsersList(users);
        }
    });
}

function addButtonsByRole(role) {
    if(role === "customer"){
        // $("<a href=\"#\" class=\"btn btn-turquoise  btn-animation-1\" role=\"button\">Charge Money</a>").appendTo($(".box"));
        $(".box").prepend("<a href=\"#\" class=\"btn btn-turquoise  btn-animation-1\" role=\"button\">Charge Money</a>");
    }
    else{
        $(".box").prepend("<a href=\"#\" class=\"btn btn-turquoise  btn-animation-1\" role=\"button\">Upload File</a>");
    }
}

function ajaxButtonsByRole() {
    $.ajax({
        url: GET_ROLE_URL,
        success: function (role) {
            addButtonsByRole(role);
        }
    })

}

//activate the timer calls after the page is loaded
$(function() {

    //The users list is refreshed automatically every second
    setInterval(ajaxUsersList, refreshRate);
    ajaxButtonsByRole();
});