var refreshRateForAlert = 4000; //milli seconds
var orderAlertVersion = 0;
var CHECK_ORDERS_ALERT = buildUrlWithContextPath("checkOrdersAlert");
var CHECK_FEEDBACKS_ALERT = buildUrlWithContextPath("checkFeedbacksAlert");
var CHECK_NEW_STORES_IN_ZONE_ALERT = buildUrlWithContextPath("checkNewStoresInZoneAlert");
// var GET_ORDER_ALERT_VERSION = buildUrlWithContextPath("orderAlertVersion");
// var GET_FEEDBACK_ALERT_VERSION = buildUrlWithContextPath("feedbackAlertVersion");


function addOrdersToOrderAlertDiv(newOrders){
    $.each(newOrders || [], function (index, newOrder) {
        $("<div class=\"columnAlert\">" +
            "                <div class=\"card\">" +
            "                    <h3>Order ID:" + newOrder.orderSerialNumber + "</h3>" +
            "                    <p>Customer: " + newOrder.customerOrderedUsername + "</p>" +
            "                    <p>Amount of products kinds: " + newOrder.amountOfProductsKinds + "</p>" +
            "                    <p>Products cost: " + newOrder.productsCost + "</p>" +
            "                    <p>Delivery cost: " + newOrder.deliveryCost.toFixed(2) + "</p>" +
            "                    <p>Store from whom the order was made: " + newOrder.storesFromWhomTheOrderWasMade[0].storeName + ", ID: " + newOrder.storesFromWhomTheOrderWasMade[0].storeSerialNumber + "</p>" +
            "                </div>" +
            "            </div>").appendTo($("#orderAlertsCards"));
    });
}

function ajaxCheckForOrdersAlerts() {
    $.ajax({
        url: CHECK_ORDERS_ALERT,
        //dataType: "json",
        error: function(error) {
        },
        success: function (newOrdersAndVersion) {
            if (newOrdersAndVersion.length > 0) {
                //orderAlertVersion = (orderAlertVersion + newOrdersAndVersion.version);
                $("#myModal").remove();
                $( "<!-- The Modal -->\n" +
                    "<div id=\"myModal\" class=\"modal\">\n" +
                    "\n" +
                    "  <!-- Modal content -->\n" +
                    "  <div class=\"modal-content\">\n" +
                    "    <div class=\"modal-header\">\n" +
                    "      <span class=\"close\">&times;</span>\n" +
                    "      <h2>Orders Alert!</h2>\n" +
                    "    </div>\n" +
                    "    <div class=\"modal-body\">\n" +
                    "      <div class='row' id='orderAlertsCards'></div>" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "\n" +
                    "</div>").appendTo($("body"));
                addOrdersToOrderAlertDiv(newOrdersAndVersion);
                var modal = document.getElementById("myModal");
                var span = document.getElementsByClassName("close")[0];
                modal.style.display = "block";
                span.onclick = function() {
                    modal.style.display = "none";
                }
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }

            }
                setTimeout(ajaxCheckForOrdersAlerts,refreshRateForAlert);
        }
    })
}

function addNewStoresAlertDiv(newStores){
    $.each(newStores || [], function (index, newStore) {
        $("<div class=\"columnAlert\">" +
            "                <div class=\"card\">" +
            "                    <h3>New store name: " + newStore.storeName + " </h3>" +
            "                    <p>Store owner:" + newStore.storeOwner +"</p>" +
            "                    <p>Store location: X: " + newStore.storeLocation.x + " Y: " + newStore.storeLocation.y + "</p>" +
            "                    <p>Num of products: " + newStore.numOfProductsKindsInStore + " out of " + newStore.numOfProductsKindsInStoreZone + " possible</p>" +
            "                </div>" +
            "            </div>").appendTo($("#newStoresAlertCards"));
    });
}

function addFeedbacksToFeedbackAlertDiv(newFeedbacks) {
    $.each(newFeedbacks || [], function (index, newFeedback) {
        $("<div class=\"columnAlert\">" +
            "                <div class=\"card\">" +
            "                    <h3>Ranking: " + newFeedback.rank + "/5 </h3>" +
            "                    <p>Feedback giver:" + newFeedback.feedbackGiver +"</p>" +
            "                    <p>Comment: " + (newFeedback.comment.length == 0 ? "No Comment" : newFeedback.comment) + "</p>" +
            "                    <p>Store who got the feedback ID: " + newFeedback.storeGotFeedbackId + "</p>" +
            "                </div>" +
            "            </div>").appendTo($("#feedbackAlertsCards"));
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
                $("#myModal").remove();
                $( "<!-- The Modal -->\n" +
                    "<div id=\"myModal\" class=\"modal\">\n" +
                    "\n" +
                    "  <!-- Modal content -->\n" +
                    "  <div class=\"modal-content\">\n" +
                    "    <div class=\"modal-header\">\n" +
                    "      <span class=\"close\">&times;</span>\n" +
                    "      <h2>Feedbacks Alert!</h2>\n" +
                    "    </div>\n" +
                    "    <div class=\"modal-body\">\n" +
                    "      <div class='row' id='feedbackAlertsCards'></div>" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "\n" +
                    "</div>").appendTo($("body"));
                addFeedbacksToFeedbackAlertDiv(newFeedbacks);
                var modal = document.getElementById("myModal");
                var span = document.getElementsByClassName("close")[0];
                modal.style.display = "block";
                span.onclick = function() {
                    modal.style.display = "none";
                }
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }

            }
            setTimeout(ajaxCheckForFeedbacksAlerts,refreshRateForAlert);
        }
    })
}


function ajaxCheckForNewStoresInZoneAlerts() {
    $.ajax({
        url: CHECK_NEW_STORES_IN_ZONE_ALERT,
        //dataType: "json",
        error: function(error) {
        },
        success: function (newStores) {
            if (newStores.length > 0) {
                $("#myModal").remove();
                $( "<!-- The Modal -->\n" +
                    "<div id=\"myModal\" class=\"modal\">\n" +
                    "\n" +
                    "  <!-- Modal content -->\n" +
                    "  <div class=\"modal-content\">\n" +
                    "    <div class=\"modal-header\">\n" +
                    "      <span class=\"close\">&times;</span>\n" +
                    "      <h2>New Stores Alert!</h2>\n" +
                    "    </div>\n" +
                    "    <div class=\"modal-body\">\n" +
                    "      <div class='row' id='newStoresAlertCards'></div>" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "\n" +
                    "</div>").appendTo($("body"));
                addNewStoresAlertDiv(newStores);
                var modal = document.getElementById("myModal");
                var span = document.getElementsByClassName("close")[0];
                modal.style.display = "block";
                span.onclick = function() {
                    modal.style.display = "none";
                }
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }

            }
            setTimeout(ajaxCheckForNewStoresInZoneAlerts,refreshRateForAlert);
        }
    })

}

//activate the timer calls after the page is loaded
$(function() {
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