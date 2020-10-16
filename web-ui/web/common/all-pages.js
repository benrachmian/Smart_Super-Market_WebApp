var orderAlertVersion = 0;
var CHECK_ORDERS_ALERT = buildUrlWithContextPath("checkOrdersAlert");


function alertTheUserForNewOrder(newOrders){

}

function ajaxCheckForAlerts() {
    $.ajax({
        url: CHECK_ORDERS_ALERT,
        data: "orderAlertVersion=" + orderAlertVersion,
        //dataType: "json",
        error: function(error) {
        },
        success: function (newOrdersAndVersion) {
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
            if (newOrdersAndVersion.version > orderAlertVersion) {
                orderAlertVersion = (orderAlertVersion + newOrdersAndVersion.version);
                alertTheUserForNewOrder(newOrdersAndVersion.newOrders);
                $( "<!-- The Modal -->\n" +
                    "<div id=\"myModal\" class=\"modal\">\n" +
                    "\n" +
                    "  <!-- Modal content -->\n" +
                    "  <div class=\"modal-content\">\n" +
                    "    <div class=\"modal-header\">\n" +
                    "      <span class=\"close\">&times;</span>\n" +
                    "      <h2>Success!</h2>\n" +
                    "    </div>\n" +
                    "    <div class=\"modal-body\">\n" +
                    "      <p>The order was made successfully!</p>\n" +
                    "    </div>\n" +
                    "    <div class=\"modal-footer\">\n" +
                    "      <h3>See you next time!</h3>\n" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "\n" +
                    "</div>").appendTo($("body"));
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
                setTimeout(ajaxCheckForAlerts,refreshRate);
        }
    })
}

//activate the timer calls after the page is loaded
$(function() {
    $.ajax({
        url: GET_ROLE_URL,
        success: function (role) {
            if (role === "store-owner") {
                //setInterval(ajaxCheckForAlerts, refreshRate);
                ajaxCheckForAlerts();
            }
        }
    })
});