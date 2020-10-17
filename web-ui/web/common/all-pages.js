var refreshRateForAlert = 4000; //milli seconds
var orderAlertVersion = 0;
var CHECK_ORDERS_ALERT = buildUrlWithContextPath("checkOrdersAlert");
var GET_ORDER_ALERT_VERSION = buildUrlWithContextPath("orderAlertVersion");


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

function ajaxCheckForAlerts() {
    $.ajax({
        url: CHECK_ORDERS_ALERT,
        data: "orderAlertVersion=" + orderAlertVersion,
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
                setTimeout(ajaxCheckForAlerts,refreshRateForAlert);
        }
    })
}

function ajaxGetOrderVersion() {
    $.ajax({
        url: GET_ORDER_ALERT_VERSION,
        success: function (orderVersion) {
            orderAlertVersion = orderVersion;
            ajaxCheckForAlerts();
        }
    })
}

//activate the timer calls after the page is loaded
$(function() {
    $.ajax({
        url: GET_ROLE_URL,
        success: function (role) {
            if (role === "store-owner") {
                //ajaxCheckForAlerts();
                ajaxGetOrderVersion();
            }
        }
    })
});