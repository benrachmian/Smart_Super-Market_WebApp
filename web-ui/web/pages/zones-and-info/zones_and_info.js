var numOfZonesInTable = 0;
var refreshRate = 2000; //milli seconds
var USER_LIST_URL = buildUrlWithContextPath("userslist");
var GET_ROLE_URL = buildUrlWithContextPath("role");
var UPLOAD_FILE_URL = buildUrlWithContextPath("uploadfile");
var GET_NEW_ZONE_DATA_TO_TABLE = buildUrlWithContextPath("newzonedata");


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




function appendNewZoneToZonesTable(index, zoneEntry) {
   $("<tr>" +
        "<td>" + zoneEntry.zoneOwner + "</td>" +
        "<td>" + zoneEntry.zone + "</td>" +
        "<td>" + zoneEntry.kindOfProducts + "</td>" +
        "<td>" + zoneEntry.numberOfStores + "</td>" +
        "<td>" + zoneEntry.numberOfOrders + "</td>" +
        "<td>" + zoneEntry.avgOrderCost + "</td>" +
        "</tr>").appendTo($("#zonesTable"));
}

function appendNewZonesToZonesTable(newZones) {
    $.each(newZones || [], appendNewZoneToZonesTable);

}

function ajaxNewZoneToTable() {
    $.ajax({
        url: GET_NEW_ZONE_DATA_TO_TABLE,
        // data: "numOfZonesInTable=" + numOfZonesInTable,
        dataType: "json",
        error: function(error) {
            triggerAjaxNewZoneToTable();
        },
        success: function (data) {
            /*
            data will arrive in the next form:
            {
               "zones": [
                   {
                       "zoneOwner":"[zoneOwnerUserName]",
                       "zone":"darom",
                       "kindsOfProducts":10,
                       "numberOfStores":8,
                       "numberOfOrders":4,
                       "averageOrderCost ":55.4
                   },
                   {
                       "zoneOwner":"[zoneOwnerUserName]",
                       "zone":"gush dan",
                       "kindsOfProducts":4,
                       "numberOfStores":2,
                       "numberOfOrders":3,
                       "averageOrderCost ":65.4
                   }
               ],
            }
            */
                appendNewZonesToZonesTable(data);
                triggerAjaxNewZoneToTable();
        }
    })

}

function overloadFileUploadWithAjax() {

    $("#uploadform").submit(function() {
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
                $(".isa_success").css("display", "none");
                $("#error").empty();
                $("#error").append(e.responseText);
            },
            success: function(r) {
                $(".isa_success").css("display", "block");
                $(".isa_error").css("display", "none");
                ajaxNewZoneToTable();
            }
        });
        // return value of the submit operation
        return false;
    })


}

function addButtonsByRole(role) {
    if(role === "customer"){
        $(".box").prepend("<a href=\"#\" class=\"btn btn-turquoise  btn-animation-1\" role=\"button\">Charge Money</a>");
    }
    // store owner
    else{
        $("<input type='file' name='file1'>" +
            "<input type='submit' value='Upload File'/><br>"
            + "<div class=\"isa_error\" style='display: none'>"
            + "<i class=\"fa fa-times-circle\"></i>"
            + "<span id=\"error\"></span>"
            + "</div>"
            + "<div class=\"isa_success\" style='display: none'>"
            + "<i class=\"fa fa-check\"></i>"
            + "<span id=\"success\">The zone system was uploaded successfully!</span>"
            + "</div>"
        ).appendTo($("#upload-file"));

        overloadFileUploadWithAjax();
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

function triggerAjaxNewZoneToTable() {
    setTimeout(ajaxNewZoneToTable, refreshRate);
}

//activate the timer calls after the page is loaded
$(function() {
    //The users list is refreshed automatically every second
    ajaxUsersList();
    ajaxNewZoneToTable();
    setInterval(ajaxUsersList, refreshRate);
    triggerAjaxNewZoneToTable();
    ajaxButtonsByRole();
});





