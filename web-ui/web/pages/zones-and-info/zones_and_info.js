var numOfZonesInTable = 0;
var refreshRate = 2000; //milli seconds
var USER_LIST_URL = buildUrlWithContextPath("userslist");
var GET_ROLE_URL = buildUrlWithContextPath("role");
var UPLOAD_FILE_URL = buildUrlWithContextPath("uploadfile");
var GET_NEW_ZONE_DATA_TO_TABLE = buildUrlWithContextPath("newzonedata");
var CHARGE_MONEY_URL = buildUrlWithContextPath("chargeMoney");
var GET_ACCOUNT_MOVEMENTS_URL = buildUrlWithContextPath("accountMovements");
var SINGLE_ZONE_URL = buildUrlWithContextPath("singleZone");


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


function goToZonePage(tableRow) {

    var chosenZone = 'chosenZone=' + tableRow.cells[1].innerText;

    $.ajax({
        method: "post",
        url: SINGLE_ZONE_URL,
        data: chosenZone,
        error: function(error) {

        },
        success: function (data) {
            window.location.href = "../single-zone/single_zone.html";
        }
    })
}

function appendNewZoneToZonesTable(index, zoneEntry) {
   $("<tr onclick=\"goToZonePage(this)\">" +
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
        data: "numOfZonesInTable=" + numOfZonesInTable,
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
            if (data.numOfZones !== numOfZonesInTable) {
                numOfZonesInTable = data.numOfZones;
                appendNewZonesToZonesTable(data.zonesEntries);
            }
                triggerAjaxNewZoneToTable();
        }
    })

}

// function showErrorMsg(error) {
//     //$(".actionStatusContainer").css("display", "block");
//     $(".isa_error").css("display", "block");
//     $(".isa_success").css("display", "none");
//     $("#error").empty();
//     $("#error").append(error.responseText);
//     $("#error").append("bbbb");
//     $("cccc").appendTo( $("#error"));
// }

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
                //$(".actionStatusContainer").css("display", "block");
                $(".isa_success").css("display", "block");
                $(".isa_error").css("display", "none");
                // $("#success").empty();
                // $("#success").append("The file was uploaded successfully!");
                ajaxNewZoneToTable();
            }
        });
        // return value of the submit operation
        return false;
    })


}

function overloadChargeSumbit() {
    $("#chargeMoney").submit(function() {

        var parameters = $(this).serialize();

        $.ajax({
            data: parameters,
            url: CHARGE_MONEY_URL,
            timeout: 4000,
            error: function(e) {
                $(".actionStatusContainer").css("display", "block");
                console.error("Failed to submit");
                $(".isa_error").css("display", "block");
                $(".isa_success").css("display", "none");
                $("#error").empty();
                $("#error").append(e.responseText);
                //showErrorMsg(e);
            },
            success: function(r) {
                //$(".actionStatusContainer").css("display", "block");
                $(".isa_success").css("display", "block");
                $(".isa_error").css("display", "none");
            }
        });
        // return value of the submit operation
        return false;
    })
}

function clickOnChargeMoneyButton() {
    $(".actionContainer").empty();
    $(".actionStatusContainer").empty();
    $(".actionContainer").css("display","block");
    $("<form method=\"GET\" id='chargeMoney' action=\"chargeMoney\">" +
        "        <div class=\"form-group\">" +
        "            <label for=\"money\">Money To Charge:</label>" +
        "            <input type=\"number\" step=\"0.01\" class=\"form-control\" id=\"number\" placeholder=\"Enter Money To Charge\" name=\"money\">" +
        "<br><label for=\"chargeDate\">Charge Date:</label>" +
        "  <input type=\"date\" id=\"chargeDate\" name=\"chargeDate\">" +
        "<input type=\"submit\" value=\"Charge!\">" +
        + "</div>").appendTo($(".actionContainer"));

    $("<div class=\"isa_error\" style='display: none'>"
    + "<i class=\"fa fa-times-circle\"></i>"
    + "<span id=\"error\"></span>"
    + "</div>"
    + "<div class=\"isa_success\" style='display: none'>"
    + "<i class=\"fa fa-check\"></i>"
    + "<span id=\"success\">You successfully charged your account!</span>"
    ).appendTo($(".actionStatusContainer"));


    overloadChargeSumbit();
}

function addButtonsByRole(role) {
    if(role === "customer"){
        $(".box").prepend("<a href=\"#\" id='chargeMoneyButton' class=\"btn btn-turquoise  btn-animation-1\" role=\"button\"'>Charge Money</a>");
        $("#chargeMoneyButton").click(function (){
            clickOnChargeMoneyButton();
        });
    }
    // store owner
    else{
        $("#uploadform").css("display","block");
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

function showAccountMovement(index, accountMovement) {

    $("<details>" +
        "    <summary> Account Movement #" + (index+1) + "</summary>" +
        "    <p>Account Movement Type: " + accountMovement.accountMovementType + "</p>" +
        "    <p>Movement Date: " + accountMovement.movementDate.day + "/" + accountMovement.movementDate.month +
                "/" + accountMovement.movementDate.year + "</p>" +
        "    <p>Movement Sum: " + accountMovement.movementSum + "</p>" +
        "    <p>Money In Account Before This Movement: " + accountMovement.accountMoneyBeforeAction + "</p>" +
        "    <p>Money In Account After This Movement: " + accountMovement.accountMoneyAfterAction + "</p>" +
        "</details>").appendTo($(".actionContainer"));
}

function showAccountMovements(accountMovements) {
    $.each(accountMovements || [], showAccountMovement);
        // $('<li>' + "Username: " +  user.username + "<br> Role: " +  user.role  +  '</li>').appendTo($("#userslist"));
}

function clickOnAccountMovementsButton() {
    $.ajax({
        url: GET_ACCOUNT_MOVEMENTS_URL,
        timeout: 4000,
        error: function(e) {
            $(".actionStatusContainer").empty();
            // $("<div class=\"isa_error\" style='display: none'>" +
            //     "<i class=\"fa fa-times-circle\"></i>" +
            //     "<span id=\"error\"></span>" +
            //     "</div>").appendTo($(".actionStatusContainer"));
            //$(".actionStatusContainer").empty();
            $(".actionStatusContainer").css("display", "block");
            $(".actionContainer").empty();
            console.error("Failed to submit");
            $(".isa_error").css("display", "block");
            $(".isa_success").css("display", "none");
            $("#error").empty();
            $("#error").append(e.responseText);
            //showErrorMsg(e);
        },
        success: function(r) {
            $(".actionContainer").empty();
            $(".actionStatusContainer").empty();
            $(".actionContainer").css("display", "block");
            showAccountMovements(r);
        }
    });
}

//activate the timer calls after the page is loaded
$(function() {
    //The users list is refreshed automatically every second
    ajaxUsersList();
    ajaxNewZoneToTable();
    setInterval(ajaxUsersList, refreshRate);
    triggerAjaxNewZoneToTable();
    ajaxButtonsByRole();
    $("#accountMovementsButton").click(function (){
        clickOnAccountMovementsButton();
    });
});





