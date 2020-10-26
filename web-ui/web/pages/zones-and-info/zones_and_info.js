var chatVersion = 0;
var refreshRate = 2000; //milli seconds
var USER_LIST_URL = buildUrlWithContextPath("userslist");
var GET_ROLE_URL = buildUrlWithContextPath("role");
var UPLOAD_FILE_URL = buildUrlWithContextPath("uploadfile");
var GET_ZONE_DATA_TO_TABLE = buildUrlWithContextPath("zoneData");
var CHARGE_MONEY_URL = buildUrlWithContextPath("chargeMoney");
var GET_ACCOUNT_MOVEMENTS_URL = buildUrlWithContextPath("accountMovements");
var GET_MONEY_IN_ACCOUNT = buildUrlWithContextPath("moneyInAccount");
var SINGLE_ZONE_URL = buildUrlWithContextPath("singleZone");
var CHAT_LIST_URL = buildUrlWithContextPath("chat");
var SEND_CHAT = buildUrlWithContextPath("sendChat");



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
        success: function () {
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

function addZonesToTable(newZones) {
    $("#zonesTable").empty();
    $.each(newZones || [], appendNewZoneToZonesTable);
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
                errorMsg($("#centerPage"),e.responseText);
            },
            success: function() {
                $("#errorDiv").remove();
                successMsg($("#centerPage"),"The zone was successfully loaded!");
                ajaxZoneTable();
            }
        });
        // return value of the submit operation
        return false;
    })


}

function overloadChargeSubmit() {
    $("#chargeMoneyForm").submit(function() {

        var parameters = $(this).serialize();

        $.ajax({
            data: parameters,
            url: CHARGE_MONEY_URL,
            timeout: 4000,
            error: function(e) {
                // $(".actionStatusContainer").css("display", "block");
                // console.error("Failed to submit");
                // $(".isa_error").css("display", "block");
                // $(".isa_success").css("display", "none");
                // $("#error").empty();
                // $("#error").append(e.responseText);
                //showErrorMsg(e);
                errorMsg($("#centerPage"),e.responseText);
            },
            success: function() {
                $("#errorDiv").remove();
                successMsg($("#centerPage"),"You charged your account successfully!");
                $("#chargeMoneySubmit").attr("disabled",true);
            }
        });
        // return value of the submit operation
        return false;
    })
}

function clickOnChargeMoneyButton() {
    var centerPage = $("#centerPage");
    centerPage.empty();
    $("#welcomeTitle").empty().append( $("<h1>Charge Money </h1>"));
    $("<form id='chargeMoneyForm' method=\"GET\" action=\"chargeMoney\" class=\"form-style-7\">\n" +
        "<ul>\n" +
        "<li>\n" +
        "     <label for=\"money\">Money To Charge:</label>" +
        "    <input type=\"number\" step=\"0.01\" class=\"form-control\" id=\"number\" placeholder=\"Enter Money To Charge\" name=\"money\">" +
        "    <span>Insert the amount of money you would like to charge</span>\n" +
        "</li>\n" +
        "<li>\n" +
        "    <label for=\"chargeDate\">Charge Date:</label>\n" +
        "  <input type=\"date\" id=\"chargeDate\" name=\"chargeDate\">" +
        "    <span>Enter the date of charge</span>\n" +
        "</li>\n" +
        "<li>\n" +
        "    <button id='chargeMoneySubmit' class='button' type=\"submit\" value=\"Charge\" > <span>Charge </span> </button>\n" +
        "</li>\n" +
        "</ul>\n" +
        "</form>").appendTo(centerPage);


    overloadChargeSubmit();
}

function addButtonsByRole(role) {
    if(role === "customer"){
        $("<a href=\"#\" id=\"chargeMoneyButton\" class=\"w3-bar-item w3-button\" onclick=\"w3_close()\">Charge Money</a>").insertAfter("#accountMovementsButton");
        $("#chargeMoneyButton").click(function (){
            clickOnChargeMoneyButton();
        });
    }
    // store owner
    else{
        $("#uploadform").css("display","block");
        $("<input type='file' name='file1'>" +
            "<input type='submit' value='Upload File'/><br>"
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

function ajaxZoneTable() {
    $.ajax({
        url: GET_ZONE_DATA_TO_TABLE,
        //data: "numOfZonesInTable=" + numOfZonesInTable,
        //dataType: "json",
        error: function(error) {
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
            //if (data.numOfZones !== numOfZonesInTable) {
                //numOfZonesInTable = data.numOfZones;
                addZonesToTable(data.zonesEntries);
            //}
        }
    })
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
        "</details>").appendTo($("#centerPage"));
}

function showAccountMovements(accountMovements) {
    $.each(accountMovements || [], showAccountMovement);
}

function clickOnAccountMovementsButton() {
    $("#centerPage").empty();
    $("#welcomeTitle").empty().append( $("<h1>Account Movements </h1>"));

    $.ajax({
        url: GET_ACCOUNT_MOVEMENTS_URL,
        timeout: 4000,
        error: function(error) {
            errorMsg($("#centerPage"),error.responseText)
        },
        success: function(accountMovements) {
             showAccountMovements(accountMovements);
        }
    });
}

function createChatEntry(entry,index) {
    var chatEntry;
    if(index % 2 === 0){
        chatEntry = "<div class=\"containerChat\">\n" +
            "  <p>" + entry.username + ": " +  entry.chatString + "</p>\n" +
            "  <span class=\"time-right\">" + entry.time + "</span>\n" +
            "</div>";
    }
    else{
        chatEntry = "<div class=\"containerChat darker\">\n" +
            "  <p>" + entry.username + ": " +  entry.chatString + "</p>\n" +
            "  <span class=\"time-left\">" + entry.time + "</span>\n" +
            "</div>";
    }

    return chatEntry;
}

function appendChatEntry(index, entry,numOfNewMsg){
    var entryElement = createChatEntry(entry,numOfNewMsg);
    $(".chatDiv").append(entryElement).append("<br>");
}

function appendToChatArea(entries,oldVersion) {
    var numOfNewMsg = oldVersion;
    $.each(entries || [], function (index,entry)
    {
        appendChatEntry(index,entry,numOfNewMsg);
        numOfNewMsg++;
    });

    // handle the scroller to auto scroll to the end of the chat area
    var scroller = $(".chatDiv");
    var height = scroller[0].scrollHeight - $(scroller).height();
    $(scroller).stop().animate({ scrollTop: height }, "slow");
    
}

function ajaxChatContent(){
    $.ajax({
        url: CHAT_LIST_URL,
        data: "chatversion=" + chatVersion,
        dataType: 'json',
        success: function(data) {
            /*
             data will arrive in the next form:
             {
                "entries": [
                    {
                        "chatString":"Hi",
                        "username":"bbb",
                        "time":1485548397514
                    },
                    {
                        "chatString":"Hello",
                        "username":"bbb",
                        "time":1485548397514
                    }
                ],
                "version":1
             }
             */
            console.log("Server chat version: " + data.version + ", Current chat version: " + chatVersion);
            if (data.version !== chatVersion) {
                var oldVersion = chatVersion;
                chatVersion = data.version;
                appendToChatArea(data.entries,oldVersion);
            }
            triggerAjaxChatContent();
        },
        error: function() {
            triggerAjaxChatContent();
        }
    });
}

function triggerAjaxChatContent(){
    setTimeout(ajaxChatContent, 500);
}

function overloadChatFormSubmit(){
    $("#chatForm").submit(function() {
        $.ajax({
            data: $(this).serialize(),
            url: SEND_CHAT,
            timeout: 2000,
            error: function() {
                console.error("Failed to submit");
            },
            success: function(r) {
                //do not add the user string to the chat area
                //since it's going to be retrieved from the server
                //$("#result h1").text(r);
            }
        });

        $("#userstring").val("");
        // by default - we'll always return false so it doesn't redirect the user.
        return false;
    });
}

function clickOnChatButton(){
    chatVersion = 0;
    var centerPage =  $("#centerPage");
    centerPage.empty();
    $("#welcomeTitle").empty().append( $("<h1>Chat </h1>"));
    $("<div class='chatDiv'></div>" +
        "<form class='centerDiv' style='margin-top: 20px' id='chatForm' >\n" +
        "\t\t\t\t\t\t<input style='margin-right: 15px' type=\"text\" id=\"userstring\" name=\"userstring\"/>\n" +
        "\t\t\t\t\t\t<input type=\"submit\" value=\"Send\"/>\n" +
        "\t\t\t\t\t</form><br>")
        .appendTo(centerPage);
    $("<div class=\"usersDiv\" class=\"users-in-system\">\n" +
        "            <h4>Users in system:</h4>\n" +
        "            <ul id=\"userslist\">\n" +
        "            </ul>\n" +
        "        </div>").appendTo(centerPage);
    overloadChatFormSubmit();
    ajaxChatContent();
}

function clickOnMoneyInAccountButton() {
    $("#centerPage").empty();
    $("#welcomeTitle").empty().append( $("<h1>Money In Account </h1>"));

    $.ajax({
        url: GET_MONEY_IN_ACCOUNT,
        timeout: 4000,
        error: function(error) {
            errorMsg($("#centerPage"),error.responseText)
        },
        success: function(moneyInAccount) {
            $("  <div class=\"w3-panel w3-light-grey\" style='background-color: white'>\n" +
                "    <span style=\"font-size:150px;line-height:0.6em;opacity:0.2\">$</span>\n" +
                "    <p class=\"w3-xlarge\" style=\"margin-top: -55px;margin-left: 120px;\"><i>You've got " + moneyInAccount + "$ in your account</i></p>\n" +
                "  </div>")
                .appendTo($("#centerPage"));
        }
    });
}



//activate the timer calls after the page is loaded
$(function() {
    //The users list is refreshed automatically every second
    ajaxUsersList();
    ajaxZoneTable();
    setInterval(ajaxUsersList, refreshRate);
    setInterval(ajaxZoneTable, refreshRate);
    ajaxButtonsByRole();
    $("#accountMovementsButton").click(function (){
        clickOnAccountMovementsButton();
    });
    $("#moneyInAccountButton").click(function (){
        clickOnMoneyInAccountButton();
    });
    $("#chatButton").click(function (){
        clickOnChatButton();
    });
});


// //add a method to the button in order to make that form use AJAX
// //and not actually submit the form
// $(function() { // onload...do
//     //add a function to the submit event
//
// });


