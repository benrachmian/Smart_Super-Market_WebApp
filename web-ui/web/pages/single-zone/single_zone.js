var GET_ZONE = buildUrlWithContextPath("chosenZone");
var GET_PRODUCTS = buildUrlWithContextPath("productsInZone");
var GET_STORES = buildUrlWithContextPath("storesInZone");


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
        url: GET_PRODUCTS,
        error: function (e){

        },
        success: function(productsInZone) {
            showProductsInZone(productsInZone);
        }
    })
}

function showStoresInZone(storesInZone) {
    $("#centerPage").empty().append( $("<div class=\"row\"> <br>"));
    $("#welcomeTitle").empty().append( $("<h1>Stores In System: </h1>"));
    $.each(storesInZone || [], function(index, store) {
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
            "                </div>" +
            "            </div>").appendTo($("#centerPage"));
        $("</div>").appendTo($("#centerPage"));
    });
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

$(function() {
    setTitle();
    $("#productsInZoneButton").click(function (){
        clickOnProductsInZoneButton();
    });
    $("#storesInZoneButton").click(function (){
        clickOnStoresInZoneButton();
    });
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

