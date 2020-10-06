var refreshRate = 2000; //milli seconds
var USER_LIST_URL = buildUrlWithContextPath("userslist");
var GET_ROLE_URL = buildUrlWithContextPath("role");
var UPLOAD_FILE_URL = buildUrlWithContextPath("uploadfile");


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

function uploadFileAjax() {
    var file = this[0].files[0];

    var formData = new FormData();
    formData.append("file", file);
    //formData.append("name", this[1].value);

    $.ajax({
        method:'POST',
        data: formData,
        url: UPLOAD_FILE_URL,
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        timeout: 4000,
        error: function(e) {
            console.error("Failed to submit");
            $(".isa_error").css("display", "block");
        },
        success: function(r) {
            $(".isa_error").css("display", "block");
        }
    });
}

function addButtonsByRole(role) {
    if(role === "customer"){
        // $("<a href=\"#\" class=\"btn btn-turquoise  btn-animation-1\" role=\"button\">Charge Money</a>").appendTo($(".box"));
        $(".box").prepend("<a href=\"#\" class=\"btn btn-turquoise  btn-animation-1\" role=\"button\">Charge Money</a>");
    }
    // store owner
    else{
        // $(".box").prepend("" +
        //     "<form id = \"uploadFile\" action=\"../../uploadFiles\" enctype=\"multipart/form-data\" method=\"POST\">"
        //     + "<input type=\"file\" accept=\".xml\" name=\"xmlFile\"><br><br>"
        //     + "<input type=\"Submit\" value=\"Upload File\"'>"
        //     + "</form>"
        //     + "<div class=\"isa_error\" style='display: none'>"
        //     + "<i class=\"fa fa-times-circle\"></i>"
        //     + "<span id=\"error\"></span>"
        //     + "</div>");

        $("<input type='file' name='file1'>" +
            "<input type='submit' value='Upload File'/><br>").appendTo($("#upload-file"));


        $("#uploadform").submit(function() {
            uploadFileAjax();
            // return value of the submit operation
            return false;
        })
        // $(".isa_error").css("display", "block");
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



// // step 1: onload - capture the submit event on the form.
// $(function() { // onload...do
//     $("#uploadFile").submit(function() {
//         uploadFileAjax();
//         // return value of the submit operation
//         // by default - we'll always return false so it doesn't redirect the user.
//         return false;
//     })
// })


