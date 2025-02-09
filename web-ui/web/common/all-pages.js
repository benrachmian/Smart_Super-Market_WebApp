var refreshRateForAlert = 4000; //milli seconds
var CHECK_ORDERS_ALERT = buildUrlWithContextPath("checkOrdersAlert");
var CHECK_FEEDBACKS_ALERT = buildUrlWithContextPath("checkFeedbacksAlert");
var CHECK_NEW_STORES_IN_ZONE_ALERT = buildUrlWithContextPath("checkNewStoresInZoneAlert");
var GET_ROLE_URL = buildUrlWithContextPath("role");
var GET_USERNAME = buildUrlWithContextPath("username");
var username;

// var GET_ORDER_ALERT_VERSION = buildUrlWithContextPath("orderAlertVersion");
// var GET_FEEDBACK_ALERT_VERSION = buildUrlWithContextPath("feedbackAlertVersion");

function scrollToAnimate(scrollTo){
    $('html, body').animate({
        scrollTop: scrollTo.offset().top
    }, 1000);
}

function successMsg(whereToAppend,successMsg){
    //if ( !$( "#successDiv" ).length ) {
    if ( !whereToAppend.find($("#successDiv")).length ) {
        $("<div id='successDiv' style='display: none' class=\"isa_success\" >"
            + "<i class=\"fa fa-check\"></i>"
            + "<span id=\"success\">" + successMsg + " </span>"
            + "</div>").appendTo(whereToAppend).slideDown("slow");
    }
    else{
        //$("#success").empty().append(successMsg);
        $(whereToAppend).filter($("#success")).empty().append(successMsg);
    }
    scrollToAnimate($("#successDiv"));
}

function errorMsg(whereToAppend,errorMsg){
    //if ( !$( "#errorDiv" ).length ) {
    if (!whereToAppend.find("#errorDiv").length ) {
        $("<div id='errorDiv' style='display: none' class=\"isa_error\" >"
            + "<i class=\"fa fa-times-circle\"></i>"
            + "<span id=\"error\">" + errorMsg + " </span>"
            + "</div>").appendTo(whereToAppend).slideDown("slow");
    }
    else{
        // $("#error").empty().append(errorMsg);
        //$(whereToAppend).filter($("#error")).empty().append(errorMsg);
        whereToAppend.find("#error").empty().append(errorMsg);
    }
    scrollToAnimate($("#errorDiv"));
}

function addOrdersToOrderAlertDiv(newOrders){
    $.each(newOrders || [], function (index, newOrder) {
        // $("<div class=\"columnAlert\">" +
        //     "                <div class=\"card\">" +
        //     "                    <h3>New Order</h3>" +
        //     "                    <p>Order ID:" + newOrder.orderSerialNumber + "</p>" +
        //     "                    <p>Customer: " + newOrder.customerOrderedUsername + "</p>" +
        //     "                    <p>Amount of products kinds: " + newOrder.amountOfProductsKinds + "</p>" +
        //     "                    <p>Products cost: " + newOrder.productsCost + "</p>" +
        //     "                    <p>Delivery cost: " + newOrder.deliveryCost.toFixed(2) + "</p>" +
        //     "                    <p>Store from whom the order was made: " + newOrder.storesFromWhomTheOrderWasMade[0].storeName + ", ID: " + newOrder.storesFromWhomTheOrderWasMade[0].storeSerialNumber + "</p>" +
        //     "                </div>" +
        //     "            </div>").appendTo($("#alertsCards"));
        $("#alertsCards").prepend("<div class=\"columnAlert\">" +
            "                <div class=\"card\">" +
            "                    <h3>New Order</h3>" +
            "                    <p>Order ID:" + newOrder.orderSerialNumber + "</p>" +
            "                    <p>Customer: " + newOrder.customerOrderedUsername + "</p>" +
            "                    <p>Amount of products kinds: " + newOrder.amountOfProductsKinds + "</p>" +
            "                    <p>Products cost: " + newOrder.productsCost + "</p>" +
            "                    <p>Delivery cost: " + newOrder.deliveryCost.toFixed(2) + "</p>" +
            "                    <p>Store from whom the order was made: " + newOrder.storesFromWhomTheOrderWasMade[0].storeName + ", ID: " + newOrder.storesFromWhomTheOrderWasMade[0].storeSerialNumber + "</p>" +
            "                </div>" +
            "            </div>");
    });
}

function createAlertsDivToBody(){
    $("<!-- The Modal -->\n" +
        "<div id=\"myModal\" class=\"modal\">\n" +
        "\n" +
        "  <!-- Modal content -->\n" +
        "  <div class=\"modal-content\">\n" +
        "    <div class=\"modal-header\">\n" +
        "      <span class=\"close\">&times;</span>\n" +
        "      <h2>Alerts!</h2>\n" +
        "    </div>\n" +
        "    <div class=\"modal-body\">\n" +
        "      <div class='row' id='alertsCards'></div>" +
        "    </div>\n" +
        "  </div>\n" +
        "\n" +
        "</div>").appendTo($("body"));
}

function showAlerts(){
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        $("#myModal").remove();
    }
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            $("#myModal").remove();
        }
    }
}

function ajaxCheckForOrdersAlerts() {
    $.ajax({
        url: CHECK_ORDERS_ALERT,
        //dataType: "json",
        error: function(error) {
        },
        success: function (newOrdersAndVersion) {
            if (newOrdersAndVersion.length > 0) {
                if($("#myModal").length > 0){
                    addOrdersToOrderAlertDiv(newOrdersAndVersion);
                }
                else {
                    createAlertsDivToBody();
                    addOrdersToOrderAlertDiv(newOrdersAndVersion);
                    showAlerts();
                }
            }
                setTimeout(ajaxCheckForOrdersAlerts,refreshRateForAlert);
        }
    })
}

function addNewStoresAlertDiv(newStores){
    $.each(newStores || [], function (index, newStore) {
        if(newStore.storeOwner !== username) {
            // $("<div class=\"columnAlert\">" +
            //     "                <div class=\"card\">" +
            //     "                    <h3>New store name: " + newStore.storeName + " </h3>" +
            //     "                    <p>Store owner:" + newStore.storeOwner + "</p>" +
            //     "                    <p>Store location: X: " + newStore.storeLocation.x + " Y: " + newStore.storeLocation.y + "</p>" +
            //     "                    <p>Num of products: " + newStore.numOfProductsKindsInStore + " out of " + newStore.numOfProductsKindsInStoreZone + " possible</p>" +
            //     "                </div>" +
            //     "            </div>").appendTo($("#newStoresAlertCards"));
            $("#alertsCards").prepend("<div class=\"columnAlert\">" +
                "                <div class=\"card\">" +
                "                    <h3>New Store</h3>" +
                "                    <p>New store name: " + newStore.storeName + " </p>" +
                "                    <p>Store owner:" + newStore.storeOwner + "</p>" +
                "                    <p>Store location: X: " + newStore.storeLocation.x + " Y: " + newStore.storeLocation.y + "</p>" +
                "                    <p>Num of products: " + newStore.numOfProductsKindsInStore + " out of " + newStore.numOfProductsKindsInStoreZone + " possible</p>" +
                "                </div>" +
                "            </div>");
        }
    });
}

function addFeedbacksToFeedbackAlertDiv(newFeedbacks) {
    $.each(newFeedbacks || [], function (index, newFeedback) {
        // $("<div class=\"columnAlert\">" +
        //     "                <div class=\"card\">" +
        //     "                    <h3>Ranking: " + newFeedback.rank + "/5 </h3>" +
        //     "                    <p>Feedback giver:" + newFeedback.feedbackGiver +"</p>" +
        //     "                    <p>Comment: " + (newFeedback.comment.length == 0 ? "No Comment" : newFeedback.comment) + "</p>" +
        //     "                    <p>Store who got the feedback ID: " + newFeedback.storeGotFeedbackId + "</p>" +
        //     "                </div>" +
        //     "            </div>").appendTo($("#alertsCards"));
        $("#alertsCards").prepend("<div class=\"columnAlert\">" +
            "                <div class=\"card\">" +
            "                    <h3>New Ranking</h3>" +
            "                    <p>Ranking: " + newFeedback.rank + "/5 </p>" +
            "                    <p>Feedback giver:" + newFeedback.feedbackGiver +"</p>" +
            "                    <p>Comment: " + (newFeedback.comment.length === 0 ? "No Comment" : newFeedback.comment) + "</p>" +
            "                    <p>Store who got the feedback ID: " + newFeedback.storeGotFeedbackId + "</p>" +
            "                </div>" +
            "            </div>");
    });
}

function ajaxCheckForFeedbacksAlerts() {
    $.ajax({
        url: CHECK_FEEDBACKS_ALERT,
        //dataType: "json",
        error: function(error) {
        },
        success: function (newFeedbacks) {
            if (newFeedbacks.length > 0) {
                if ($("#myModal").length > 0) {
                    addFeedbacksToFeedbackAlertDiv(newFeedbacks);
                } else {
                    createAlertsDivToBody();
                    addFeedbacksToFeedbackAlertDiv(newFeedbacks);
                    showAlerts();
                }
            }
            setTimeout(ajaxCheckForFeedbacksAlerts,refreshRateForAlert);
        }
    })
}

function checkIfNewStoresHasStoreOfOtherUser(newStores){
    var answer = false;
    $.each(newStores || [], function (index, newStore) {
        if(newStore.storeOwner !== username) {
           answer = true;
        }
    });

    return answer;
}

function ajaxCheckForNewStoresInZoneAlerts() {
    $.ajax({
        url: CHECK_NEW_STORES_IN_ZONE_ALERT,
        //dataType: "json",
        error: function(error) {
        },
        success: function (newStores) {
            if (newStores.length > 0) {
                if($("#myModal").length > 0){
                    addNewStoresAlertDiv(newStores);
                }
                else {
                    if (checkIfNewStoresHasStoreOfOtherUser(newStores)) {
                        createAlertsDivToBody();
                        addNewStoresAlertDiv(newStores);
                        showAlerts();
                    }
                }
            }
            setTimeout(ajaxCheckForNewStoresInZoneAlerts,refreshRateForAlert);
        }
    })

}

function ajaxGetUsername(){
    $.ajax({
        url: GET_USERNAME,
        success: function (usernameFromAjax) {
            username = usernameFromAjax;
        }
    })
}

//activate the timer calls after the page is loaded
$(function() {
    ajaxGetUsername();
    $.ajax({
        url: GET_ROLE_URL,
        success: function (role) {
            if (role === "store-owner") {
                //ajaxGetOrderVersion();
                ajaxCheckForOrdersAlerts();
                ajaxCheckForFeedbacksAlerts();
                ajaxCheckForNewStoresInZoneAlerts();
            }
        }
    })
});

$(function() {
    anime.timeline({loop: false})
        .add({
            targets: '.ml5 .line',
            opacity: [0.5,1],
            scaleX: [0, 1],
            easing: "easeInOutExpo",
            duration: 700
        }).add({
        targets: '.ml5 .line',
        duration: 600,
        easing: "easeOutExpo",
        //translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
    }).add({
        targets: '.ml5 .ampersand',
        opacity: [0,1],
        scaleY: [0.5, 1],
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=600'
    }).add({
        targets: '.ml5 .letters-left',
        opacity: [0,1],
        translateX: ["0.5em", 0],
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=300'
    }).add({
        targets: '.ml5 .letters-right',
        opacity: [0, 1],
        translateX: ["-0.5em", 0],
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=600'
    });
    // }).add({
    //     targets: '.ml5',
    //     opacity: 0,
    //     duration: 1000,
    //     easing: "easeOutExpo",
    //     delay: 1000
    // });
});

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

// function scroll_to(div){
//     $('html, body').animate({
//         scrollTop: $("moreStoreDetailsDiv").offset().top
//     },1000);
// }

//auto expand textarea
// function adjust_textarea(h) {
//     h.style.height = "20px";
//     h.style.height = (h.scrollHeight)+"px";
// }

//make text feild only numbers:
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}