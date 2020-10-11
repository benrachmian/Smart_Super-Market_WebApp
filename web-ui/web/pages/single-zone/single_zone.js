var GET_ZONE = buildUrlWithContextPath("chosenZone");
var GET_PRODUCTS_OF_ZONE = buildUrlWithContextPath("productsInZone");
var GET_STORES = buildUrlWithContextPath("storesInZone");
var GET_PRODUCTS_IN_STORE = buildUrlWithContextPath("productsInStore");
var GET_ROLE_URL = buildUrlWithContextPath("role");
var SAVE_ORDER_DATA_TYPE_LOCATION = buildUrlWithContextPath("saveOrderDateTypeLocation");


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

function checkValidOrderDate(parameters) {
    return false;
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
        "    <option value=\"\" disabled selected>Select an order type</option>\n" +
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