var GET_ZONE = buildUrlWithContextPath("chosenZone");
var GET_PRODUCTS_OF_ZONE = buildUrlWithContextPath("productsInZone");
var GET_STORES = buildUrlWithContextPath("storesInZone");
var GET_PRODUCTS_IN_STORE = buildUrlWithContextPath("productsInStore");
var GET_ROLE_URL = buildUrlWithContextPath("role");
var SAVE_ORDER_DATA_TYPE_LOCATION = buildUrlWithContextPath("saveOrderDateTypeLocation");
var orderToLocationX;
var orderToLocationY;


function setTitle() {
    $.ajax({
        url: GET_ZONE,
        error: function (e){

        },
        success: function(r) {
            $(document).attr("title", r);
            $("<h1>Welcome to zone " + r + " </h1>").appendTo($("#welcomeTitle"));
        }
    })
}


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

function showProductsInZone(productsInZone) {
    $("#centerPage").empty().append( $("<div class=\"row\"> <br>"));
    $("#welcomeTitle").empty().append( $("<h1>Products In System: </h1>"));
    $.each(productsInZone || [], function(index, product) {
        $("<div class=\"column\">" +
            "                <div class=\"card\">" +
            "                    <h3>" + product.productName + "</h3>" +
            "                    <p>ID: " + product.productSerialNumber + "</p>" +
            "                    <p>Way of buying: " + product.wayOfBuying + "</p>" +
            "                    <p>Number of stores selling the product: " + product.numOfStoresSellingTheProduct + "</p>" +
            "                    <p>Product average price: " + product.avgPrice + "</p>" +
            "                    <p>Ammount sold in all stores: " + product.amountSoldInAllStores + "</p>" +
            "                </div>" +
            "            </div>").appendTo($("#centerPage"));
        $("</div>").appendTo($("#centerPage"));
    });
}

function clickOnProductsInZoneButton() {
    $.ajax({
        url: GET_PRODUCTS_OF_ZONE,
        error: function (e){

        },
        success: function(productsInZone) {
            showProductsInZone(productsInZone);
        }
    })
}

function showProductsInStore(productsInStore, chosenStoreName) {
    $("#productsInStoreDiv").remove();
    $("#centerPage").append( $("<div class='w3-container w3-border w3-round-xlarge' id='productsInStoreDiv'  <br>"));
    $("<div><h1 style='text-align: center'> Products in store " + chosenStoreName + ": </h1></div>").appendTo( $("#productsInStoreDiv"));


    $("#productsInStoreDiv").append( $("<div class=\"row\"> <br>"));
    $.each(productsInStore || [], function(index, product) {
        $("<div class=\"column\">" +
            "                <div class=\"card\">" +
            "                    <h3>" + product.productName + "</h3>" +
            "                    <p>ID: " + product.productSerialNumber + "</p>" +
            "                    <p>Way of buying: " + product.wayOfBuying + "</p>" +
            "                    <p>Price per unit/kilo: " + product.price + "</p>" +
            "                    <p>Ammount sold in store: " + product.amountSoldInStore + "</p>" +
            "                </div>" +
            "            </div>").appendTo($("#productsInStoreDiv"));
    });
    $("</div>").appendTo($("#productsInStoreDiv"));
    $('html, body').animate({
        scrollTop: $("#productsInStoreDiv").offset().top
    },1000);


}

function showChosenStoreProduct(buttonClicked) {
    var chosenStoreId = $(buttonClicked)[0].dataset.chosenstoreid;
    var chosenStoreName = $(buttonClicked)[0].dataset.chosenstorename;

    $.ajax({
        url: GET_PRODUCTS_IN_STORE,
        data: "chosenStoreId=" + chosenStoreId,
        error: function (e){

        },
        success: function(productsInStore) {
            showProductsInStore(productsInStore,chosenStoreName);
        }
    })
}

function showStoresInZone(storesInZone) {
    $("#centerPage").empty().append( $("<div class=\"row\"> <br>"));
    $("#welcomeTitle").empty().append( $("<h1>Stores In System: </h1>"));
    $.each(storesInZone || [], function(index, store) {
        var storeName = store.storeName;
        $("<div class=\"column\">" +
            "                <div class=\"card\">" +
            "                    <h3>" + store.storeName + "</h3>" +
            "                    <p>ID: " + store.storeSerialNumber + "</p>" +
            "                    <p>Store owner:  " + store.storeOwner + "</p>" +
            "                    <p>Store location: X: " + store.storeLocation.x + " Y: " + store.storeLocation.y + "</p>" +
            "                    <p>Number of orders from store: " + store.totalOrders + "</p>" +
            "                    <p>Products sold cost:  " + store.productsSoldCost + "</p>" +
            "                    <p>PPK:  " + store.ppk + "</p>" +
            "                    <p>Total profit from delivery:  " + store.totalProfitFromDelivery + "</p>" +
            "                    <button class=\"button\" data-chosenStoreName=\'" + storeName + "\'" + " data-chosenStoreId=" + store.storeSerialNumber + " onclick=\"showChosenStoreProduct(this)\"><span>Show Products </span></button>" +

            "                </div>" +
            "            </div>").appendTo($("#centerPage"));
    });
    $("</div>").appendTo($("#centerPage"));
}

function clickOnStoresInZoneButton() {
    $.ajax({
        url: GET_STORES,
        error: function (e){

        },
        success: function(storesInZone) {
            showStoresInZone(storesInZone);
        }
    })
}


function addStoresTableContainer() {
    $("#centerPage").empty();
    $("#welcomeTitle").empty().append( $("<h1>Choose Store </h1>"));
    $("<div class=\"table-div\">\n" +
        "<table class=\"styled-table\">\n" +
        "    <thead>\n" +
        "    <tr>\n" +
        "        <th>Store Name</th>\n" +
        "        <th>Store ID</th>\n" +
        "        <th>Location</th>\n" +
        "        <th>PPK</th>\n" +
        "        <th>Delivery Cost</th>\n" +
        "    </tr>\n" +
        "    </thead>\n" +
        "    <tbody id=\"storesTable\">\n" +
        "    <!-- and so on... -->\n" +
        "    </tbody>\n" +
        "</table>\n" +
        "</div>").appendTo($("#centerPage"));
}

function calcDistance(orderToLocationX, orderToLocationY, storeX, storeY) {
    var a = Math.abs(orderToLocationX - storeX);
    var b = Math.abs(orderToLocationY - storeY);
    var aPower2 = Math.pow(a, 2);
    var bPower2 = Math.pow(b, 2);
    return Math.sqrt(aPower2 + bPower2);
}

function addProductsInStoreForStaticOrderContainer(deliveryCost) {
    $("#centerPage").empty();
    $("#welcomeTitle").empty().append( $("<h1>Make Static Order </h1>"));
    $("<br><p id=\"sub-title\"> Products In Store: </p>").appendTo($("#centerPage"));
    $("<div id='product-table-div' class=\"table-div\">\n" +
        "<table id='products-in-store-table' class=\"styled-table\">\n" +
        "    <thead>\n" +
        "    <tr>\n" +
        "        <th>Product Name</th>\n" +
        "        <th>ID</th>\n" +
        "        <th>Way Of Buying</th>\n" +
        "        <th>Price</th>\n" +
        "        <th>Amount</th>\n" +
        "        <th></th>\n" +
        "        <th>Cost</th>\n" +
        "    </tr>\n" +
        "    </thead>\n" +
        "    <tbody id=\"productsInStoreTable\">\n" +
        "    <!-- and so on... -->\n" +
        "    </tbody>\n" +
        "</table>\n" +
        "</div>" +
        "<br><p id=\"sub-title\"> Shopping Cart: </p>" +
        "<table id='shopping-cart-table' class=\"styled-table\">\n" +
        "    <thead>\n" +
        "    <tr>\n" +
        "        <th>Product Name</th>\n" +
        "        <th>ID</th>\n" +
        "        <th>Way Of Buying</th>\n" +
        "        <th>Amount</th>\n" +
        "    </tr>\n" +
        "    </thead>\n" +
        "    <tbody id=\"shoppingCartTable\">\n" +
        "    <!-- and so on... -->\n" +
        "    </tbody>\n" +
        "</table>\n" +
        "</div>" +
        "<div id='staticOrderSummary'>" +
        "<div><label>Delivery cost:</label><label id='deliveryCost'>" + deliveryCost.toFixed(2) + "</label></div>" +
        "<div><label>Products cost:</label><label id='productsCost'> 0</label></div>" +
        "<div><label>Total order cost:</label><label id='totalOrderCost'>" +  deliveryCost.toFixed(2) + "</label></div>" +
        "</div>"
    ).appendTo($("#centerPage"));

}

function updateCost(ammount,price,rowIndex){
    $("#products-in-store-table")[0].rows[rowIndex + 1].cells[6].innerText = (ammount * price).toFixed(2);
}

function addProductToCart(productToAdd,rowIndex) {
    var amount = $("#products-in-store-table")[0].rows[rowIndex+1].cells[4].children[0].value;
    $("<tr>" +
        "<td>" + productToAdd.productName + "</td>" +
        "<td>" + productToAdd.productSerialNumber + "</td>" +
        "<td>" + productToAdd.wayOfBuying + "</td>" +
        "<td>" + amount + "</td>" +
        "</tr>").appendTo($("#shoppingCartTable"));
    $('html, body').animate({
        scrollTop: $("#shoppingCartTable").offset().top
    }, 1000);
    var currProductsCost = parseFloat($("#productsCost")[0].innerText);
    var updateProductsCost = currProductsCost + (productToAdd.price * amount);
    var currTotalCost = parseFloat($("#totalOrderCost")[0].innerText);
    $("#productsCost")[0].innerText = updateProductsCost.toFixed(2);
    $("#totalOrderCost")[0].innerText = (currTotalCost + (productToAdd.price * amount)).toFixed(2);
}

function addProductsInStoreToTable(storeNameForAjax) {
    $.ajax({
        method: "post",
        url: GET_PRODUCTS_IN_STORE,
        data: storeNameForAjax,
        error: function(error) {

        },
        success: function (productsInStore) {
            $.each(productsInStore || [], function(index, product) {
                $("<tr>" +
                    "<td>" + product.productName + "</td>" +
                    "<td>" + product.productSerialNumber + "</td>" +
                    "<td>" + product.wayOfBuying + "</td>" +
                    "<td>" + product.price + "</td>" +
                    "<td> <input onchange=\"updateCost(this.value," + product.price + "," + index + ")\" id='amountInTableBox' type=\"number\" id=\"amount\" min='1'' name=\"amount\"></td>" +
                    "<td><button class='button addToCartButton'> Add To Cart </button></td>" +
                    "<td>0</td>" +
                    "</tr>").appendTo($("#productsInStoreTable"));
                $( ".addToCartButton:last" ).click(function() {
                    addProductToCart(product,index);
                });
            });
        }
    })
}



function chooseProductsForStaticOrder(tableRow,deliveryCost) {
    var storeIDForAjax = 'chosenStoreId=' + tableRow.cells[1].innerText;
    addProductsInStoreForStaticOrderContainer(deliveryCost);
    addProductsInStoreToTable(storeIDForAjax);
}

function addStoresTable() {
    addStoresTableContainer();
    var distance;

    $.ajax({
        url: GET_STORES,
        error: function (e){

        },
        success: function(storesInZone) {
            $.each(storesInZone || [], function(index, store) {
                distance = calcDistance(orderToLocationX,orderToLocationY,store.storeLocation.x,store.storeLocation.y);
                $("<tr onclick=\"chooseProductsForStaticOrder(this," + (distance * store.ppk) + ")\">" +
                    "<td>" + store.storeName + "</td>" +
                    "<td>" + store.storeSerialNumber + "</td>" +
                    "<td> X: " + store.storeLocation.x + " Y: " + store.storeLocation.y + "</td>" +
                    "<td>" + store.ppk + "</td>" +
                    "<td>" + (distance * store.ppk).toFixed(2) + "</td>" +
                    "</tr>").appendTo($("#storesTable"));
            });
        }
    })
}

function overloadOrderFirstDetailsFormSubmit() {
    $("#orderFirstDetails").submit(function() {

        var parameters = $(this).serialize();
        var orderTypes = document.getElementById("orderTypeSelect");
        var orderTypeSelected = orderTypes.options[orderTypes.selectedIndex].value;
        parameters = parameters.concat("&ordertype=" + orderTypeSelected);

        $.ajax({
            data: parameters,
            url: SAVE_ORDER_DATA_TYPE_LOCATION,
            timeout: 4000,
            error: function(e) {
                if ( !$( "#errorDiv" ).length ) {
                    $("<div id='errorDiv' style='display: none' class=\"isa_error\" >"
                        + "<i class=\"fa fa-times-circle\"></i>"
                        + "<span id=\"error\">" + e.responseText + " </span>"
                        + "</div>").appendTo($("#centerPage")).slideDown("slow");
                    $('html, body').animate({
                        scrollTop: $("#errorDiv").offset().top
                    }, 1000);
                }
                else{
                    $("#error").empty().append(e.responseText);
                }
            },
            success: function(r) {
                orderToLocationX = $("#locationX").val();
                orderToLocationY = $("#locationY").val();
                if(r==="Static Order"){
                    addStoresTable();
                }
            }
        });
        // return value of the submit operation
        return false;
    })
}

function clickOnMakeOrderButton() {
    $("#centerPage").empty();
    $("#welcomeTitle").empty().append( $("<h1>Make New Order </h1>"));
    $("<form id='orderFirstDetails' method=\"GET\" action=\"saveOrderDateTypeLocation\" class=\"form-style-7\">\n" +
        "<ul>\n" +
        "<li>\n" +
        "    <label for=\"date\">Order Date</label>\n" +
        "    <input type=\"date\" name=\"date\" maxlength=\"100\">\n" +
        "    <span>Insert the order date here</span>\n" +
        "</li>\n" +
        "<li>\n" +
        "    <label for=\"orderType\">Order Type</label>\n" +
        "    <select id='orderTypeSelect' form='orderFirstDetails' class=\"select-css\">\n" +
        "    <option value=\"\" disabled selected>Select Order Type</option>\n" +
        "    <option>Static Order</option>\n" +
        "    <option>Dynamic Order</option>\n" +
        "</select>" +
        "    <span>Choose an order type</span>\n" +
        "</li>\n" +
        "<li>\n" +
        "    <label for=\"locationX\">X Location</label>\n" +
        "  <input type=\"number\" id=\"locationX\" name=\"locationX\">" +
        "    <span>Enter your X location</span>\n" +
        "</li>\n" +
        "<li>\n" +
        "    <label for=\"locationY\">Y Location</label>\n" +
        "  <input type=\"number\" id=\"locationY\" name=\"locationY\">" +
        "    <span>Enter your Y location</span>\n" +
        "</li>\n" +
        "<li>\n" +
        "    <button id='continueToStaticOrDynamicOrder' class='button' type=\"submit\" value=\"Continue\" > <span>Continue </span> </button>\n" +
        "</li>\n" +
        "</ul>\n" +
        "</form>").appendTo($("#centerPage"));

    overloadOrderFirstDetailsFormSubmit();
}

function setButtonsAccordingToUserRole() {
    $.ajax({
        url: GET_ROLE_URL,
        success: function (role) {
            if(role === "customer"){
                $("<a href=\"#\" id=\"makeOrder\" class=\"w3-bar-item w3-button\" onclick=\"w3_close()\">Make Order</a>").insertBefore("#backButton");
                $("#makeOrder").click(function (){
                    clickOnMakeOrderButton();
                });
            }
        }
    })
}

$(function() {
    setTitle();
    $("#productsInZoneButton").click(function (){
        clickOnProductsInZoneButton();
    });
    $("#storesInZoneButton").click(function (){
        clickOnStoresInZoneButton();
    });
    setButtonsAccordingToUserRole();
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
        translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
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

function scroll_to(div){
    $('html, body').animate({
        scrollTop: $("productsInStoreDiv").offset().top
    },1000);
}

//auto expand textarea
function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
}