var GET_ZONE = buildUrlWithContextPath("chosenZone");
var GET_PRODUCTS_OF_ZONE = buildUrlWithContextPath("productsInZone");
var GET_STORES = buildUrlWithContextPath("storesInZone");
var GET_PRODUCTS_IN_STORE = buildUrlWithContextPath("productsInStore");
var GET_ROLE_URL = buildUrlWithContextPath("role");
var SAVE_ORDER_DATA_TYPE_LOCATION = buildUrlWithContextPath("saveOrderDateTypeLocation");
var SAVE_SHOPPING_CART = buildUrlWithContextPath("saveShoppingCart");
var CHECK_IF_HAS_DISCOUNTS = buildUrlWithContextPath("checkForDiscounts");
var GET_DISCOUNTS = buildUrlWithContextPath("discountsInOrder");
var ADD_PRODUCT_IN_DISCOUNT_TO_CART = buildUrlWithContextPath("addProductInDiscountToCart");
var GET_STORES_PARTICIPATING = buildUrlWithContextPath("storesParticipating");
var GET_PRODUCTS_BOUGHT_FROM_STORE = buildUrlWithContextPath("productsBoughtFromStore");
var GET_PRODUCTS_AND_DELIVERY_COST = buildUrlWithContextPath("productsAndDeliveryCost");
var MAKE_NEW_STATIC_ORDER = buildUrlWithContextPath("makeNewStaticOrder");
var MAKE_NEW_DYNAMIC_ORDER = buildUrlWithContextPath("makeNewDynamicOrder");
var GET_PRODCUTS_IN_SYSTEM = buildUrlWithContextPath("productsInSystem");
var FIND_CHEAPEST_BASKET = buildUrlWithContextPath("findCheapestBasket");
var RANK_STORE = buildUrlWithContextPath("rankStore");
var GET_ORDERS_HISTORY = buildUrlWithContextPath("ordersHistory");
var GET_STORE_ORDERS_HISTORY = buildUrlWithContextPath("storeOrdersHistory");
var GET_FEEDBACKS = buildUrlWithContextPath("getFeedbacks");
var CHECK_NEW_STORE_SETTINGS = buildUrlWithContextPath("checkNewStoreSettings");
var ADD_NEW_STORE_TO_ZONE = buildUrlWithContextPath("newStoreToZone");
var orderToLocationX;
var orderToLocationY;
var chosenStoreIdForAjax;
var discountsMap = new Map();
var shoppingCartTableHtml;
var shoppingCartSummaryHtml;
var productsInOrderMap = new Map();
var orderDistance;
var orderDate;
var totalProductsCost = 0;
var totalDeliveryCost = 0;
var orderType;
var shoppingCart = [];
var productsToNewStore = [];
var productTry = [];
var userRole;


function ProductInCart (product, amount){
    this.product = product;
    this.amount = amount;
}

function ProductInNewStore (product, price){
    this.product = product;
    this.price = price;
}




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

function updateProductsCostAndTotalCost(price, amount){
    var currProductsCost = parseFloat($("#productsCost")[0].innerText);
    var updateProductsCost = currProductsCost + (price * amount);
    var currTotalCost = parseFloat($("#totalOrderCost")[0].innerText);
    $("#productsCost")[0].innerText = updateProductsCost.toFixed(2);
    $("#totalOrderCost")[0].innerText = (currTotalCost + (price * amount)).toFixed(2);

}

function showProductsInStore(productsInStore, chosenStoreName) {
    $("#moreStoreDetailsDiv").remove();
    $("#centerPage").append( $("<div class='w3-container w3-border w3-round-xlarge' id='moreStoreDetailsDiv'  <br>"));
    $("<div><h1 style='text-align: center'> Products in store " + chosenStoreName + ": </h1></div>").appendTo( $("#moreStoreDetailsDiv"));


    $("#moreStoreDetailsDiv").append( $("<div class=\"row\"> <br>"));
    $.each(productsInStore || [], function(index, product) {
        $("<div class=\"column\">" +
            "                <div class=\"card\">" +
            "                    <h3>" + product.productName + "</h3>" +
            "                    <p>ID: " + product.productSerialNumber + "</p>" +
            "                    <p>Way of buying: " + product.wayOfBuying + "</p>" +
            "                    <p>Price per unit/kilo: " + product.price + "</p>" +
            "                    <p>Ammount sold in store: " + product.amountSoldInStore + "</p>" +
            "                </div>" +
            "            </div>").appendTo($("#moreStoreDetailsDiv"));

    });
    $("</div>").appendTo($("#moreStoreDetailsDiv"));
    $('html, body').animate({
        scrollTop: $("#moreStoreDetailsDiv").offset().top
    },1000);
}

function showChosenStoreProduct(buttonClicked) {
    chosenStoreIdForAjax = $(buttonClicked)[0].dataset.chosenstoreid;
    var chosenStoreName = $(buttonClicked)[0].dataset.chosenstorename;

    $.ajax({
        url: GET_PRODUCTS_IN_STORE,
        data: "chosenStoreId=" + chosenStoreIdForAjax,
        error: function (e){

        },
        success: function(productsInStore) {
            showProductsInStore(productsInStore,chosenStoreName);
        }
    })
}

function showChosenStoreOrderHistory(storeId,storeName){
    $.ajax({
        url: GET_STORE_ORDERS_HISTORY,
        data: "chosenStoreId=" + storeId,
        error: function (e){

        },
        success: function(ordersFromStore) {
            $("#moreStoreDetailsDiv").remove();
            $("#centerPage").append( $("<div class='w3-container w3-border w3-round-xlarge' id='moreStoreDetailsDiv'  <br>"));
            if(ordersFromStore.length == 0){
                errorMsg($("#moreStoreDetailsDiv"),"There are no orders from this store yet!");
            }
            else {
                $("<div><h1 style='text-align: center'> Orders History of " + storeName + ": </h1></div>").appendTo($("#moreStoreDetailsDiv"));


                $("#moreStoreDetailsDiv").append($("<div class=\"row\"> <br>"));
                $.each(ordersFromStore || [], function (index, order) {
                    $("<div class=\"column\">" +
                        "                <div class=\"card\">" +
                        "                    <h3>Order ID:" + order.orderSerialNumber + "</h3>" +
                        "                    <p>Order date: " + order.orderDate.day + "/" + order.orderDate.month + "/" + order.orderDate.year + "</p>" +
                        "                    <p>Who ordered: " + order.customerOrderedUsername + "</p>" +
                        "                    <p>Order to location: X: " + order.orderToLocation.x + " Y: " + order.orderToLocation.y + "</p>" +
                        "                    <p>Amount of products in order:  " + order.amountOfProducts + "</p>" +
                        "                    <p>Products cost:  " + order.productsCost.toFixed(2) + "</p>" +
                        "                    <p>Delivery cost:  " + order.deliveryCost.toFixed(2) + "</p>" +
                        "                    <button class=\"button products-in-order-button\" data-chosenOrderId=\'" + order.orderSerialNumber + "\'><span>Show products in order </span></button>" +
                        "                </div>" +
                        "            </div>").appendTo($("#moreStoreDetailsDiv"));
                    $(".products-in-order-button").filter('[data-chosenOrderId="' + order.orderSerialNumber + '"]').click(function () {
                        showChosenOrderProducts(order.orderSerialNumber, order.productsInOrder, $("#moreStoreDetailsDiv"));
                    })
                });
                $("</div>").appendTo($("#moreStoreDetailsDiv"));
                $('html, body').animate({
                    scrollTop: $("#moreStoreDetailsDiv").offset().top
                }, 1000);
            }
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
            "                    <p>Total profit from delivery:  " + store.totalProfitFromDelivery.toFixed(2) + "</p>" +
            "                    <button class=\"button showProductsButton\" data-chosenStoreName=\'" + storeName + "\'" + " data-chosenStoreId=" + store.storeSerialNumber + " onclick=\"showChosenStoreProduct(this)\"><span>Show Products </span></button>" +

            "                </div>" +
            "            </div>").appendTo($("#centerPage"));
        if(store.storeOwner === username){
            $("<button class=\"button show-store-order-history-button\" data-chosenStoreId=\'" + store.storeSerialNumber + "\'><span>Show Orders History </span></button>")
                .insertBefore($(".showProductsButton").filter('[data-chosenStoreId="' + store.storeSerialNumber + '"]'));
            $(".show-store-order-history-button").filter('[data-chosenStoreId="' + store.storeSerialNumber + '"]').click(function (){
                showChosenStoreOrderHistory(store.storeSerialNumber,store.storeName);
            })
        }
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


function saveShoppingCartInSession() {
    $.ajax({
        method: "post",
        url: SAVE_SHOPPING_CART,
        data: JSON.stringify(shoppingCart),
        error: function(error) {

        },
        success: function () {

        }
    })
}

function addDiscountsToDiv() {

    $.ajax({
        url: GET_DISCOUNTS,
        // data: "chosenStoreId=" + chosenStoreIdForAjax,
        error: function (e) {

        },
        success: function (discountsForProducts) {
            $.each(discountsForProducts || [], function (index, discountsForProduct) {
                $.each(discountsForProduct || [], function (index, discountForProduct) {
                    var discountKind = discountForProduct.key.discountKind;
                    var amountToBuyForDiscount = discountForProduct.key.ifYouBuyProductAndAmount.value;
                    var productBoughtForDiscount = discountForProduct.key.productNameToBuyForDiscount;
                    var productWayOfBuying = discountForProduct.key.productWayOfBuying;
                    var productToBuyId = discountForProduct.key.ifYouBuyProductAndAmount.key;
                    var msg1 = "You bought " + amountToBuyForDiscount + (productWayOfBuying === "BY_QUANTITY" ? " units " : " kilos ") +
                        "of " + productBoughtForDiscount + " (ID:" + productToBuyId + ")."
                    var msg2 = "you deserve";
                    var offers = discountForProduct.key.offers;
                    var amountToImplement = discountForProduct.value;
                    if(discountKind === "ONE_OF"){
                        msg2 = msg2.concat(" one of the following products:")
                    }
                    else if(discountKind === "ALL_OR_NOTHING"){
                        msg2 = msg2.concat(" all of the following products:")
                    }
                    else{
                        msg2 = msg2.concat(":");
                    }
                    discountsMap.set(discountForProduct.key.discountName,discountForProduct);
                    $("<option>" + discountForProduct.key.discountName + "</option>").appendTo($("#discountSelect"));
                    $("<div class=\"singleDiscount\">" +
                        "<br><p id=\"sub-title\">" + discountForProduct.key.discountName + "&ensp;(Amount left:<label class='amountToImplement' data-discountName='" +discountForProduct.key.discountName + " '>" + amountToImplement + "</label>) </p>" +
                        "<p>" + msg1 + "</p>" +
                        "<p>" + msg2 + "</p>" +
                        "            <div class='row'></div>").appendTo($("#discountsInOrderDiv"));
                    $.each(offers || [], function (index, offer) {
                        $("<div class=\"column\">" +
                            "                <div class=\"card\">" +
                            "                    <h3>" + offer.productName + "</h3>" +
                            "                    <p>ID: " + offer.productSerialNumber + "</p>" +
                            "                    <p>Quantity " + offer.productQuantity + "</p>" +
                            "                    <p>Price per unit: " + offer.pricePerUnit + "</p>" +
                            "                </div>" +
                            "            </div>").appendTo($(".singleDiscount").find(".row"));
                    });
                    $("</div>").appendTo($(".singleDiscount"));
                });
            });
        }
    });}


function checkIfNeedToChooseProducts(discountName) {
    var discount = discountsMap.get(discountName);
    if(discount.key.discountKind === "ONE_OF"){
        $("#selectProductDiscount").empty();
        $.each(discount.key.offers || [], function(index, offer) {
            $("<option>" + offer.productName + ", ID: " + offer.productSerialNumber + "</option>").appendTo($("#selectProductDiscount"));
        });
        // scrollToAnimate($("#productForDiscountLi"));
        $("#productForDiscountLi").show(500);
    }
    else{
        $("#productForDiscountLi").hide(500);
    }

}

function ajaxAddProductInDiscountToCart(discountName, productInDiscountSerialNumber, productQuantity){

    $.ajax({
        method: "post",
        url: ADD_PRODUCT_IN_DISCOUNT_TO_CART,
        data: "discountName=" + discountName + "&productInDiscountSerialNumber=" + productInDiscountSerialNumber + "&productQuantity=" + productQuantity,
        error: function(error) {

        },
        success: function () {

        }
    })
}

function addDiscountProductToCart(selectedProductAsOfferInDiscount,discountName){
    var productInStore = productsInOrderMap.get(selectedProductAsOfferInDiscount.productSerialNumber);
    productInStore.productName = selectedProductAsOfferInDiscount.productName + " (Discount)";
    addChosenProductToTable(productInStore,selectedProductAsOfferInDiscount.productQuantity,$("#shoppingCartTable"));
    ajaxAddProductInDiscountToCart(discountName,productInStore.productSerialNumber,selectedProductAsOfferInDiscount.productQuantity);
    updateProductsCostAndTotalCost(selectedProductAsOfferInDiscount.pricePerUnit,selectedProductAsOfferInDiscount.productQuantity);

}

function getLabelWithAmount(discountName){
    var labelToUpdateWithAmount;
    var labels = $(".amountToImplement");
    var i;
    for(i=0;i<labels.length;i++) {
        if (labels[i].dataset.discountname.slice(0,-1) === discountName) {
            labelToUpdateWithAmount = labels[i];
            break;
        }
    }

    return labelToUpdateWithAmount;
}

function subAmountInAllDiscountsContainTheProduct(discount){
    var triggerDiscountProductSerialNumber = discount.key.ifYouBuyProductAndAmount.key;
    discountsMap.forEach(function (value, key, map){
        if(value.key.ifYouBuyProductAndAmount.key === triggerDiscountProductSerialNumber){
            var labelToUpdateWithAmount = getLabelWithAmount(value.key.discountName);
            var newAmount = (labelToUpdateWithAmount.textContent - 1);
            labelToUpdateWithAmount.textContent = newAmount;
        }
    });

}

function getDiscountAmountToImplement(discount){
    var labelWithAmount = getLabelWithAmount(discount.key.discountName);
    return labelWithAmount.textContent;
}

function onAddDiscountToCart(){
    var discount = discountsMap.get($("#discountSelect").val());
    if(typeof discount === 'undefined'){
        errorMsg($("#addDiscountItemToShoppingCartDiv"),"You must select a discount first!");
        $("#errorDiv").css("width","max-content");
    }
    else if(getDiscountAmountToImplement(discount) <= 0){
        errorMsg($("#addDiscountItemToShoppingCartDiv"),"You can't implement this discount anymore!");
        $("#errorDiv").css("width","max-content");
    }
    else {
        $("#errorDiv").remove();
        if (discount.key.discountKind === "ONE_OF") {
            var selectedProductAsOfferInDiscount = discount.key.offers[$("#selectProductDiscount")[0].selectedIndex];
            addDiscountProductToCart(selectedProductAsOfferInDiscount, discount.key.discountName);
        } else {
            discount.key.offers.forEach(function (offer, index) {
                addDiscountProductToCart(offer, discount.key.discountName);
            });
        }
    subAmountInAllDiscountsContainTheProduct(discount);
    }


}

function createDiscountsInOrderPage() {
    $("#centerPage").empty();
    $("#welcomeTitle").empty().append( $("<h1>Discounts </h1>"));
    $("<br><div class='w3-container w3-border w3-round-xlarge' id='discountsInOrderDiv'>" +
        "</div>" +
        // "<form id='addDiscountItemToShoppingCartButtonForm' class=\"form-style-7\">\n" +
        "<div id='addDiscountItemToShoppingCartDiv' class=\"form-style-7\">" +
        "<ul>\n" +
        "<li>\n" +
        "    <label for=\"selectDiscount\">Select Discount</label>\n" +
        "    <select id='discountSelect'  class=\"select-css\">\n" +
        "    <option value=\"\" disabled selected>Select a discount</option>\n" +
        "</select>" +
        "    <span>Select the discount you would like to implement</span>\n" +
        "</li>\n" +
        "<li id='productForDiscountLi' style='display: none'>\n" +
        "    <label for=\"selectProductDiscount\">Select Product</label>\n" +
        "    <select id='selectProductDiscount'  class=\"select-css\">\n" +
        "    <option value=\"\" disabled selected>Select a product</option>\n" +
        "</select>" +
        "    <span>Select the product you would like to buy from the discount</span>\n" +
        "</li>\n" +
        "<li>\n" +
        "    <button id='addDiscountItemToShoppingCartButton' class='button' > <span>Add To Cart </span> </button>\n" +
        "</li>\n" +
        "</ul>" +
            "</div>"
        // "</form>"
    ).appendTo($("#centerPage"));
    $("<p id=\"sub-title\"> Shopping Cart: </p>").appendTo($("#centerPage"));
    shoppingCartTableHtml.appendTo($("#centerPage"));
    shoppingCartSummaryHtml.appendTo($("#centerPage"));
    $(  "<div style='display: flex; justify-content: center'>" +
        "<button id='continueToOrderSummaryButton' class='button'> Continue </button></div>").appendTo($("#centerPage"));
    $( "#discountSelect").change(function() {
        checkIfNeedToChooseProducts($(this).val());
    });
    $( "#addDiscountItemToShoppingCartButton").click(function() {
        onAddDiscountToCart();
    });
    $( "#continueToOrderSummaryButton").click(function() {
        createOrderSummaryPage();
    });

    addDiscountsToDiv();
}

function createProductFromStoreCard(productName,productId,wayOfBuying,quantity,pricePerUnit,totalCost,isPartOfDiscount){
    return "<div class=\"column\">" +
        "                <div class=\"card\">" +
        "                    <h3>" + productName + "</h3>" +
        "                    <p>ID: " + productId + "</p>" +
        "                    <p>Way of buying: " + wayOfBuying + "</p>" +
        "                    <p>Quantity " + quantity + "</p>" +
        "                    <p>Price per unit: " + pricePerUnit + "</p>" +
        "                    <p>Total cost: " + totalCost + "</p>" +
        "                    <p>Is part of discount: " + isPartOfDiscount + "</p>" +
        "                </div>" +
        "            </div>";
}

function addProductsBoughtFromStore(storeId){
    var storeIdAjaxData = "storeId=" + storeId;

    $.ajax({
        url: GET_PRODUCTS_BOUGHT_FROM_STORE,
        data: storeIdAjaxData,
        error: function (e) {

        },
        success: function (productsBoughtFromStore) {
            $.each(productsBoughtFromStore || [], function (index, productBoughtFromStore) {
                if(productBoughtFromStore.key.isPartOfDiscount) {
                    $(createProductFromStoreCard(
                        productBoughtFromStore.key.originalProductInStore.productName,
                        productBoughtFromStore.key.originalProductInStore.productSerialNumber,
                        productBoughtFromStore.key.originalProductInStore.wayOfBuying,
                        productBoughtFromStore.value,
                        productBoughtFromStore.key.discountPrice,
                        (productBoughtFromStore.key.discountPrice * productBoughtFromStore.value),
                        "Yes"
                    )).appendTo($(".storeAndProductsParticipatingDiv").filter('[data-storeId="' + storeId + '"]'));
                }
                else{
                    $(createProductFromStoreCard(
                        productBoughtFromStore.key.productName,
                        productBoughtFromStore.key.productSerialNumber,
                        productBoughtFromStore.key.wayOfBuying,
                        productBoughtFromStore.value,
                        productBoughtFromStore.key.price,
                        (productBoughtFromStore.key.price * productBoughtFromStore.value),
                        "No"
                    )).appendTo($(".storeAndProductsParticipatingDiv").filter('[data-storeId="' + storeId + '"]'));
                }
            });
        }
    });

}

function addStoresParticipatingToOrderSummaryDiv(){
    $.ajax({
        url: GET_STORES_PARTICIPATING,
        error: function (e) {

        },
        success: function (storesParticipating) {
            $.each(storesParticipating || [], function (index, storeParticipating) {
                var distance = calcDistance(
                    orderToLocationX,
                    orderToLocationY,
                    storeParticipating.storeLocation.x,
                    storeParticipating.storeLocation.y);
                $("<br><div class='storeAndProductsParticipatingDiv' data-storeId='" + storeParticipating.storeSerialNumber + "' id='storeAndProductsParticipatingDiv'>" +
                    "<p id='sub-title2'>" + storeParticipating.storeName + "</p>" +
                    "<div class='centerDiv'>" +
                    "<ul class=\"notATable\">\n" +
                    "   <li><label>Store ID</label><div>" + storeParticipating.storeSerialNumber + "</div></li>\n" +
                    "   <li><label>PPK</label><div>" + storeParticipating.ppk + "</div></li>\n" +
                    "   <li><label>Order distance</label><div>" + distance.toFixed(2) + "</div></li>\n" +
                    "   <li><label>Delivery cost</label><div>" + (distance * storeParticipating.ppk).toFixed(2) + "</div></li>\n" +
                    "</ul>" +
                    "</div>" +
                    "<p id='sub-title'>Products bought from store:</p>" +
                    "</div>"
                ).appendTo($("#storesAndProductsParticipatingDiv"));
                addProductsBoughtFromStore(storeParticipating.storeSerialNumber);
            });
        }
    });
}


function startCountingTextArea(storeId) {
        $('textarea:last').keyup(function () {

            var characterCount = $(this).val().length,
                current = $('.current').filter('[data-storeId="' + storeId + '"]'),
                maximum = $('.maximum').filter('[data-storeId="' + storeId + '"]'),
                theCount = $('.the-count').filter('[data-storeId="' + storeId + '"]');

            current.text(characterCount);


            /*This isn't entirely necessary, just playin around*/
            if (characterCount < 70) {
                current.css('color', '#666');
            }
            if (characterCount > 70 && characterCount < 90) {
                current.css('color', '#6d5555');
            }
            if (characterCount > 90 && characterCount < 100) {
                current.css('color', '#793535');
            }
            if (characterCount > 100 && characterCount < 120) {
                current.css('color', '#841c1c');
            }
            if (characterCount > 120 && characterCount < 139) {
                current.css('color', '#8f0001');
            }

            if (characterCount >= 140) {
                maximum.css('color', '#8f0001');
                current.css('color', '#8f0001');
                theCount.css('font-weight', 'bold');
            } else {
                maximum.css('color', '#666');
                theCount.css('font-weight', 'normal');
            }


        });
}


function rankStoreAjax(storeToRankId, comment, starRating){
    var parameters = "storeToRankId=" + storeToRankId + "&comment=" + comment + "&starRating=" + starRating + "&orderDate=" + orderDate;
    var whereToAppend = $(".wrapper").filter('[data-storeId="' + storeToRankId + '"]');

    $.ajax({
        method: "post",
        url: RANK_STORE,
        data: parameters,
        error: function(error) {
            errorMsg(whereToAppend,error.responseText);
        },
        success: function () {
            $( whereToAppend.find("#errorDiv")).remove();
            successMsg(whereToAppend,"You rank the store successfully!");
            $(".rankButton").filter('[data-storeId="' + storeToRankId + '"]').prop('disabled', true); //TO DISABLED
        }
    })
}

function createRankingStoresPage(){
    $("#centerPage").empty();
    $("#welcomeTitle").empty().append( $("<h1>Rank Stores </h1>"));
    $("<div id=rankStoresDiv> </div>").appendTo($("#centerPage"));


    $.ajax({
        url: GET_STORES_PARTICIPATING,
        error: function (e) {

        },
        success: function (storesParticipating) {
            $.each(storesParticipating || [], function (index, storeParticipating) {
                var storeId = storeParticipating.storeSerialNumber;
                $(  "<p class='centerDiv' id='sub-title2'> " + storeParticipating.storeName + "</p>" +
                   "<div class=\"containerRanking\">\n" +
                    "<div data-storeId='" + storeId + "' class=\"my-rating centerDiv\"></div>" +
                    "<div data-storeId='" + storeId + "' class=\"wrapper\">\n" +
                    "  <h1>Enter your feedback here</h1>\n" +
                    "  <textarea name=\"the-textarea\" data-storeId='" + storeId + "' class='comment-text-area' id=\"the-textarea\" maxlength=\"300\" placeholder=\"Start Typing...\"autofocus></textarea>\n" +
                    "  <div data-storeId='" + storeId + "' class=\"the-count\">\n" +
                    "    <span data-storeId='" + storeId + "' class=\"current\">0</span>\n" +
                    "    <span data-storeId='" + storeId + "' class=\"maximum\">/ 300</span>\n" +
                    "  </div>\n" +
                    "<div><button data-storeId='" + storeId + "' class='button rankButton' > <span>Click here to rank the store </span> </button></div>" +
                    "</div>"
                ).appendTo($("#rankStoresDiv"));

                 startCountingTextArea(storeId);
                 $(".rankButton").filter('[data-storeId="' + storeId + '"]').click(function (){
                     rankStoreAjax(storeId,
                         $(".comment-text-area").filter('[data-storeId="' + storeId + '"]').val(),
                         $(".my-rating").filter('[data-storeId="' + storeId + '"]').starRating('getRating'));

                 })
            });
            $("<div class='centerDiv'><button style='width: 15%' class='button' id='finishRankingButton' > <span>Finish </span> </button></div>").appendTo($("#centerPage"));
            $("#finishRankingButton").click(function (){
                window.location.replace("single_zone.html");
            });
            $(".my-rating").starRating({
                starSize: 25,
                starShape: "rounded",
            });
        }
    });
}



function makeNewStaticOrderAjax(deliveryCost){
    var parameters = chosenStoreIdForAjax;
    parameters = parameters.concat("&orderDate=" + orderDate + "&deliveryCost=" + deliveryCost);
    parameters = parameters.concat("&orderToX=" + orderToLocationX + "&orderToY=" + orderToLocationY);

    $.ajax({
        method: "post",
        url: MAKE_NEW_STATIC_ORDER,
        data: parameters,
        error: function(error) {
            errorMsg($("#centerPage"),error.responseText);
        },
        success: function () {
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";
            span.onclick = function() {
                modal.style.display = "none";
                createRankingStoresPage();
            }
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    createRankingStoresPage();
                }
            }
        }
    })
}

function makeNewDynamicOrderAjax(){
    var parameters = "orderDate=" + orderDate;
    parameters = parameters.concat("&orderToX=" + orderToLocationX + "&orderToY=" + orderToLocationY);

    $.ajax({
        method: "post",
        url: MAKE_NEW_DYNAMIC_ORDER,
        data: parameters,
        error: function(error) {
            errorMsg($("#centerPage"),error.responseText);
        },
        success: function () {
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";
            span.onclick = function() {
                modal.style.display = "none";
                createRankingStoresPage();
            }
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    createRankingStoresPage();
                }
            }
        }
    })
}

function makeNewOrder(totalDeliveryCost){
    if(orderType ==="Static Order"){
        makeNewStaticOrderAjax(totalDeliveryCost);
    }
    else{
        makeNewDynamicOrderAjax();
    }
}

function createOrderSummaryPage() {
    $.ajax({
        method: "GET",
        url: GET_PRODUCTS_AND_DELIVERY_COST,
        data: "orderToLocationX=" + orderToLocationX + "&orderToLocationY=" + orderToLocationY,
        error: function (error) {

        },
        success: function (totalProductsAndDeliveryCostAjaxResponse) {
            $("#centerPage").empty();
            $("#welcomeTitle").empty().append( $("<h1>Order Summary </h1>"));
            $(  "<br><p id=\'sub-title\'> Stores and products participating: </p>" +
                "<div class='w3-container w3-border w3-round-xlarge' id='storesAndProductsParticipatingDiv'>" +

                "</div>" +
                "<div class='centerDiv'>" +
                "<ul class=\"notATable\">\n" +
                "   <li><label>Order date</label><div>" + orderDate + "</div></li>\n" +
                "   <li><label>Total products cost</label><div>" + totalProductsAndDeliveryCostAjaxResponse.totalProductsCost + "</div></li>\n" +
                "   <li><label>Total delivery cost</label><div>" + totalProductsAndDeliveryCostAjaxResponse.totalDeliveryCost.toFixed(2) + "</div></li>\n" +
                "   <li><label>Total order cost</label><div>" + (totalProductsAndDeliveryCostAjaxResponse.totalProductsCost + totalProductsAndDeliveryCostAjaxResponse.totalDeliveryCost).toFixed(2) + "</div></li>\n" +
                "</ul>" +
                "</div>" +
                "<div style='display: flex; justify-content: center'>"+
                "        <button id='confirmOrderButton' class='button' > <span>Confirm Order </span> </button>" +
                "        </div>" +
                "<!-- The Modal -->\n" +
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
                "</div>"
            ).appendTo($("#centerPage"));

            addStoresParticipatingToOrderSummaryDiv();
            $( "#confirmOrderButton" ).click(function() {
                makeNewOrder(totalProductsAndDeliveryCostAjaxResponse.totalDeliveryCost);
            });
        }
    })
}

function continueToDiscountPageOrSummary() {
        $.ajax({
            method: "GET",
            url: CHECK_IF_HAS_DISCOUNTS,
            data: chosenStoreIdForAjax,
            error: function (error) {

            },
            success: function (hasDiscount) {
                if (hasDiscount === "true") {
                    createDiscountsInOrderPage();
                } else {
                    createOrderSummaryPage();
                }
            }
        })
}

function buildAddProductsToCartStaticOrderPage(deliveryCost) {
    shoppingCart = [];
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
        "<div><label>Delivery cost:</label><label id='deliveryCost'> &ensp;" + deliveryCost.toFixed(2) + "</label></div>" +
        "<div><label>Products cost:</label><label id='productsCost'> &ensp; 0</label></div>" +
        "<div><label>Total order cost:</label><label id='totalOrderCost'> &ensp;" +  deliveryCost.toFixed(2) + "</label></div>" +
        "</div>" +
        "<div style='display: flex; justify-content: center'>" +
        "<button id='continueToDiscountPageOrSummaryButton' class='button' > <span>Continue </span> </button>" +
        "</div>"
    ).appendTo($("#centerPage"));
    $( "#continueToDiscountPageOrSummaryButton" ).click(function() {
        shoppingCartTableHtml = $("#shopping-cart-table");
        shoppingCartSummaryHtml = $("#staticOrderSummary");
        if(shoppingCart.length == 0){
            errorMsg($("#centerPage"),"You can't continue with an empty shopping cart!");
        }
        else{
            window.scrollTo(0, 0);
            $( "#errorDiv" ).remove();
            saveShoppingCartInSession();
            continueToDiscountPageOrSummary();
        }
    });

}

function updateCost(ammount,price,rowIndex){
    $("#products-in-store-table")[0].rows[rowIndex + 1].cells[6].innerText = (ammount * price).toFixed(2);
}

// function errorMsg(whereToAppend,errorMsg){
//     //if ( !$( "#errorDiv" ).length ) {
//     if (!whereToAppend.find("#errorDiv").length ) {
//         $("<div id='errorDiv' style='display: none' class=\"isa_error\" >"
//             + "<i class=\"fa fa-times-circle\"></i>"
//             + "<span id=\"error\">" + errorMsg + " </span>"
//             + "</div>").appendTo(whereToAppend).slideDown("slow");
//     }
//     else{
//        // $("#error").empty().append(errorMsg);
//         //$(whereToAppend).filter($("#error")).empty().append(errorMsg);
//         whereToAppend.find("#error").empty().append(errorMsg);
//     }
//     scrollToAnimate($("#errorDiv"));
// }
// function successMsg(whereToAppend,successMsg){
//     //if ( !$( "#successDiv" ).length ) {
//     if ( !whereToAppend.find($("#successDiv")).length ) {
//         $("<div id='successDiv' style='display: none' class=\"isa_success\" >"
//             + "<i class=\"fa fa-check\"></i>"
//             + "<span id=\"success\">" + successMsg + " </span>"
//             + "</div>").appendTo(whereToAppend).slideDown("slow");
//     }
//     else{
//         //$("#success").empty().append(successMsg);
//         $(whereToAppend).filter($("#success")).empty().append(successMsg);
//     }
//     scrollToAnimate($("#successDiv"));
// }

function isFloat(n){
    return n % 1 !== 0;
}

// function scrollToAnimate(scrollTo){
//     $('html, body').animate({
//         scrollTop: scrollTo.offset().top
//     }, 1000);
// }

function addChosenProductToTable(productToAdd,amountOrPrice,whereToAppend) {
    $("<tr>" +
        "<td>" + productToAdd.productName + "</td>" +
        "<td>" + productToAdd.productSerialNumber + "</td>" +
        "<td>" + productToAdd.wayOfBuying + "</td>" +
        "<td>" + amountOrPrice + "</td>" +
        "</tr>").appendTo(whereToAppend);
}

function addProductToCart(productToAdd,rowIndex,amount,productWayOfBuying,isStaticOrder) {
    if(amount ===""){
        $( "#successDiv" ).remove();
        errorMsg($("#product-table-div"),"You must enter an amount!");
    }
    else if(amount <=0){
        $( "#successDiv" ).remove();
        errorMsg($("#product-table-div"),"The amount must be a positive number!");
    }
    else if(productWayOfBuying === "By quantity" && isFloat(amount)){
        $( "#successDiv" ).remove();
        errorMsg($("#product-table-div"),"When you buy a product by quantity you must enter an integer!");
        // scrollToAnimate($("#shoppingCartTable"));
    }
    else {
        $( "#errorDiv" ).remove();
        addChosenProductToTable(productToAdd,amount,$("#shoppingCartTable"));
        if(isStaticOrder) {
            updateProductsCostAndTotalCost(productToAdd.price, amount);
            //init amount and cost:
            $("#products-in-store-table")[0].rows[rowIndex + 1].cells[4].children[0].value = "";
            $("#products-in-store-table")[0].rows[rowIndex + 1].cells[6].innerText = "";
        }
        successMsg($("#product-table-div"),"The product was added to the cart successfully!");
        var productInCart = new ProductInCart(productToAdd,amount);
        shoppingCart.push(productInCart);
    }
}

function addProductsInStoreToTable(storeIDForAjax) {
    $.ajax({
        method: "post",
        url: GET_PRODUCTS_IN_STORE,
        data: storeIDForAjax,
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
                    "<td></td>" +
                    "</tr>").appendTo($("#productsInStoreTable"));
                $( ".addToCartButton:last" ).click(function() {
                    var amount = $("#products-in-store-table")[0].rows[index+1].cells[4].children[0].value;
                    var productWayOfBuying = $("#products-in-store-table")[0].rows[index+1].cells[2].innerText;
                    addProductToCart(product,index,amount,productWayOfBuying,true);
                });
                productsInOrderMap.set(product.productSerialNumber,product);
            });
        }
    })
}



function chooseProductsForStaticOrder(tableRow,deliveryCost) {
    chosenStoreIdForAjax = 'chosenStoreId=' + tableRow.cells[1].innerText;
    buildAddProductsToCartStaticOrderPage(deliveryCost);
    addProductsInStoreToTable(chosenStoreIdForAjax);
}

function addStoresTable() {
    addStoresTableContainer();

    $.ajax({
        url: GET_STORES,
        error: function (e){

        },
        success: function(storesInZone) {
            $.each(storesInZone || [], function(index, store) {
                orderDistance = calcDistance(orderToLocationX,orderToLocationY,store.storeLocation.x,store.storeLocation.y);
                $("<tr onclick=\"chooseProductsForStaticOrder(this," + (orderDistance * store.ppk) + ")\">" +
                    "<td>" + store.storeName + "</td>" +
                    "<td>" + store.storeSerialNumber + "</td>" +
                    "<td> X: " + store.storeLocation.x + " Y: " + store.storeLocation.y + "</td>" +
                    "<td>" + store.ppk + "</td>" +
                    "<td>" + (orderDistance * store.ppk).toFixed(2) + "</td>" +
                    "</tr>").appendTo($("#storesTable"));
            });
        }
    })
}

function addProductsInSystemToTableForOrder(){
    $.ajax({
        method: "post",
        url: GET_PRODCUTS_IN_SYSTEM,
        error: function(error) {

        },
        success: function (productsInSystem) {
            $.each(productsInSystem || [], function(index, product) {
                $("<tr>" +
                    "<td>" + product.productName + "</td>" +
                    "<td>" + product.productSerialNumber + "</td>" +
                    "<td>" + product.wayOfBuying + "</td>" +
                    "<td> <input id='amountInTableBox' type=\"number\" id=\"amount\" min='1'' name=\"amount\"></td>" +
                    "<td><button class='button addToCartButton'> Add To Cart </button></td>" +
                    "</tr>").appendTo($("#productsInSystemTable"));
                $( ".addToCartButton:last" ).click(function() {
                    var amount = $("#products-in-system-table")[0].rows[index+1].cells[3].children[0].value;
                    var productWayOfBuying = $("#products-in-system-table")[0].rows[index+1].cells[2].innerText;
                    addProductToCart(product,index,amount,productWayOfBuying,false);
                });
                productsInOrderMap.set(product.productSerialNumber,product);
            });
        }
    })
}


function addProductToNewStoreTable(productToAdd,price,productId) {
    if(price ===""){
        $( "#successDiv" ).remove();
        errorMsg($("#product-table-div"),"You must enter a price!");
    }
    else if(price <=0){
        $( "#successDiv" ).remove();
        errorMsg($("#product-table-div"),"The price must be a positive number!");
    }
    else {
        $( "#errorDiv" ).remove();
        $("tr").filter('[data-productId="' + productId + '"]').remove();
        addChosenProductToTable(productToAdd,price,$("#productsInNewStoreTable"));
        successMsg($("#product-table-div"),"The product was added to the cart successfully!");
         var productInNewStore = new ProductInNewStore(productToAdd,price);
         productsToNewStore.push(productInNewStore);
    }
}

function addProductsInSystemToTableForNewStore(){
    $.ajax({
        method: "post",
        url: GET_PRODCUTS_IN_SYSTEM,
        error: function(error) {

        },
        success: function (productsInSystem) {
            $.each(productsInSystem || [], function(index, product) {
                $("<tr data-productId=\'" + product.productSerialNumber + "\'>" +
                    "<td>" + product.productName + "</td>" +
                    "<td>" + product.productSerialNumber + "</td>" +
                    "<td>" + product.wayOfBuying + "</td>" +
                    "<td class='priceTd' data-productId=\'" + product.productSerialNumber + "\'> <input style='width: 60px' id='PriceTableBox' type=\"number\" id=\"amount\" min='1'' name=\"price\"></td>" +
                    "<td><button class='button addToStoreButton'> Add To Store </button></td>" +
                    "</tr>").appendTo($("#productsInSystemTable"));
                $( ".addToStoreButton:last" ).click(function() {
                    var price = $($(".priceTd").filter('[data-productId="' + product.productSerialNumber + '"]')[0]).find("input")[0].value;
                    addProductToNewStoreTable(product,price,product.productSerialNumber);
                });
                //productsInOrderMap.set(product.productSerialNumber,product);
            });
        }
    })
}

function createStoresParticipatingInDynamicOrderPage(storesParticipating) {
    $("#centerPage").empty();
    $("#welcomeTitle").empty().append($("<h1>Stores Participating </h1>"));
    $("<br><div class='storeParticipatingDiv row'></div>").appendTo($("#centerPage"));
    $.each(storesParticipating || [], function (index, store) {
        var distance = calcDistance(orderToLocationX, orderToLocationY, store.store.storeLocation.x, store.store.storeLocation.y);
        var deliveryCost = (store.store.ppk * distance);
        $("<div class=\"column\">" +
            "                <div class=\"card\">" +
            "                    <h3>" + store.store.storeName + "</h3>" +
            "                    <p>Location: X: " + store.store.storeLocation.x + " Y: " + store.store.storeLocation.y + "</p>" +
            "                    <p>Order distance: " + distance.toFixed(2) + "</p>" +
            "                    <p>PPK: " + store.store.ppk + "</p>" +
            "                    <p>Delivery cost: " + deliveryCost.toFixed(2) + "</p>" +
            "                    <p>Number of products kinds bought: " + store.numProductsKind + "</p>" +
            "                    <p>Total products cost: " + store.productsCost + "</p>" +
            "                    <p>Total cost: " + (store.productsCost + deliveryCost).toFixed(2) + "</p>" +
            "                </div>" +
            "            </div>").appendTo($(".storeParticipatingDiv"));
    });
    //$("</div>").appendTo($("#centerPage"));

    $("<div style='display: flex; justify-content: center'>" +
        "<button id='continueToDiscountPageOrSummaryButton' class='button' > <span>Continue </span> </button>" +
        "</div>").appendTo($("#centerPage"));
    $("#continueToDiscountPageOrSummaryButton").click(function () {
        continueToDiscountPageOrSummary();
    });
}

function saveShoppingCartInSessionAndCreateCheapestBasket(){
    $.ajax({
        method: "post",
        data: JSON.stringify(shoppingCart),
        url: FIND_CHEAPEST_BASKET,
        error: function(error) {

        },
        success: function (storesParticipating) {
            createStoresParticipatingInDynamicOrderPage(storesParticipating);
        }
    })
}

function createDynamicOrderPage(){
    shoppingCart = [];
    $("#centerPage").empty();
    $("#welcomeTitle").empty().append( $("<h1>Make Dynamic Order </h1>"));
    $("<br><p id=\"sub-title\"> Choose products to buy: </p>").appendTo($("#centerPage"));
    $("<div id='product-table-div' class=\"table-div\">\n" +
        "<table id='products-in-system-table' class=\"styled-table\">\n" +
        "    <thead>\n" +
        "    <tr>\n" +
        "        <th>Product Name</th>\n" +
        "        <th>ID</th>\n" +
        "        <th>Way Of Buying</th>\n" +
        "        <th>Amount</th>\n" +
        "        <th></th>\n" +
        "    </tr>\n" +
        "    </thead>\n" +
        "    <tbody id=\"productsInSystemTable\">\n" +
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
        "<div style='display: flex; justify-content: center'>" +
        "<button id='continueToDiscountPageOrSummaryButton' class='button' > <span>Continue </span> </button>" +
        "</div>"
    ).appendTo($("#centerPage"));
    $( "#continueToDiscountPageOrSummaryButton" ).click(function() {
        shoppingCartTableHtml = $("#shopping-cart-table");
        shoppingCartSummaryHtml = $("#staticOrderSummary");
        if(shoppingCart.length == 0){
            errorMsg($("#centerPage"),"You can't continue with an empty shopping cart!");
        }
        else{
            window.scrollTo(0, 0);
            $( "#errorDiv" ).remove();
            saveShoppingCartInSessionAndCreateCheapestBasket();
        }
    });
    addProductsInSystemToTableForOrder();
}

function overloadOrderFirstDetailsFormSubmit() {
    $("#orderFirstDetails").submit(function() {

        orderDate = $("#orderDate")[0].value;
        var parameters = $(this).serialize();
        var orderTypes = document.getElementById("orderTypeSelect");
        var orderTypeSelected = orderTypes.options[orderTypes.selectedIndex].value;
        parameters = parameters.concat("&ordertype=" + orderTypeSelected);
        orderType = orderTypeSelected;

        $.ajax({
            data: parameters,
            url: SAVE_ORDER_DATA_TYPE_LOCATION,
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
                    //orderType = r;
                    addStoresTable();
                }
                else{
                    createDynamicOrderPage();
                }
            }
        });
        // return value of the submit operation
        return false;
    })
}

function createCardsForProductsInOrderHistory(productName,id,wayOfBuying,storeTheProductsBelongsName,storeTheProductsBelongsId,amountBought,price,totalCost,isPartOfDiscount){
    return  "<div style='width: 33%' class=\"column\">" +
        "                <div class=\"card\">" +
        "                    <h3>" + productName + "</h3>" +
        "                    <p>ID: " + id + "</p>" +
        "                    <p>Way of buying: " + wayOfBuying + "</p>" +
        "                    <p>Store the product was bought from name: " + storeTheProductsBelongsName + "</p>" +
        "                    <p>Store the product was bought from ID: " + storeTheProductsBelongsId + "</p>" +
        "                    <p>Amount bought: " + amountBought + "</p>" +
        "                    <p>Price per unit/kilo: " + price + "</p>" +
        "                    <p>Total product cost: " + totalCost + "</p>" +
        "                    <p>Is part of discount: " + isPartOfDiscount + "</p>" +
        "                </div>" +
        "            </div>";
}

function showChosenOrderProducts(orderId, productsInOrder,whereToAppend){
    $("#productsInOrderDiv").remove();
    //$("#centerPage").append( $("<div class='w3-container w3-border w3-round-xlarge' id='productsInOrderDiv'  <br>"));
    whereToAppend.append( $("<div class='w3-container w3-border w3-round-xlarge' id='productsInOrderDiv'  <br>"));
    $("<div><h1 style='text-align: center'> Products in order ID: " + orderId + ": </h1></div>").appendTo( $("#productsInOrderDiv"));


    $("#productsInOrderDiv").append( $("<div class=\"row\"> <br>"));
    $.each(productsInOrder || [], function(index, product) {
        var isPartOfDiscount = product.key.isPartOfDiscount === true ? "Yes" : "No";
        if(product.key.isPartOfDiscount){
            $(createCardsForProductsInOrderHistory(
                product.key.originalProductInStore.productName,
                product.key.originalProductInStore.productSerialNumber,
                product.key.originalProductInStore.wayOfBuying,
                product.key.originalProductInStore.storeTheProductBelongsName,
                product.key.originalProductInStore.storeTheProductBelongsID,
                product.value,
                product.key.discountPrice,
                (product.key.discountPrice *product.value),
                isPartOfDiscount,
            )).appendTo($("#productsInOrderDiv"));
        }
        else{
            $(createCardsForProductsInOrderHistory(
                product.key.productName,
                product.key.productSerialNumber,
                product.key.wayOfBuying,
                product.key.storeTheProductBelongsName,
                product.key.storeTheProductBelongsID,
                product.value,
                product.key.price,
                (product.key.price * product.value),
                isPartOfDiscount,
            )).appendTo($("#productsInOrderDiv"));
        }
        // $("<div class=\"column\">" +
        //     "                <div class=\"card\">" +
        //     "                    <h3>" + product.key.productName + "</h3>" +
        //     "                    <p>ID: " + product.key.productSerialNumber + "</p>" +
        //     "                    <p>Way of buying: " + product.key.wayOfBuying + "</p>" +
        //     "                    <p>Store the product was bought from name: " + product.key.storeTheProductBelongsName + "</p>" +
        //     "                    <p>Store the product was bought from ID: " + product.key.storeTheProductBelongsID + "</p>" +
        //     "                    <p>Amount bought: " + product.value + "</p>" +
        //     "                    <p>Price per unit/kilo: " + product.key.price + "</p>" +
        //     "                    <p>Total product cost: " + (product.key.price * product.value) + "</p>" +
        //     "                    <p>Is part of discount: " + isPartOfDiscount + "</p>" +
        //     "                </div>" +
        //     "            </div>").appendTo($("#productsInOrderDiv"));

    });
    $("</div>").appendTo($("#productsInOrderDiv"));
    $('html, body').animate({
        scrollTop: $("#productsInOrderDiv").offset().top
    },1000);

}

function showOrdersHistory(ordersHistory){
    $.each(ordersHistory || [], function(index, order) {
        $("<div class=\"column\">" +
            "                <div class=\"card\">" +
            "                    <h3>Order ID:" + order.orderSerialNumber + "</h3>" +
            "                    <p>Order date: " + order.orderDate.day + "/" + order.orderDate.month + "/" + order.orderDate.year + "</p>" +
            "                    <p>Order to location: X: " + order.orderToLocation.x + " Y: " + order.orderToLocation.y +  "</p>" +
            "                    <p>Number of stores particiapting: " + order.amountOfStoresParticipating + "</p>" +
            "                    <p>Amount of products in order:  " + order.amountOfProducts + "</p>" +
            "                    <p>Products cost:  " + order.productsCost.toFixed(2) + "</p>" +
            "                    <p>Delivery cost:  " + order.deliveryCost.toFixed(2) + "</p>" +
            "                    <p>Total order cost:  " + order.totalOrderCost.toFixed(2) + "</p>" +
            "                    <button class=\"button products-in-order-button\" data-chosenOrderId=\'" + order.orderSerialNumber + "\'><span>Show products in order </span></button>" +
            "                </div>" +
            "            </div>").appendTo($("#centerPage"));
        $(".products-in-order-button").filter('[data-chosenOrderId="' + order.orderSerialNumber + '"]').click(function (){
            showChosenOrderProducts(order.orderSerialNumber,order.productsInOrder, $("#centerPage"));
        })
    });
    $("</div>").appendTo($("#centerPage"));
}

function clickOnMyOrdersHistoryButton(){
    $("#centerPage").empty();
    $("#welcomeTitle").empty().append( $("<h1>My Orders History </h1>"));
    $.ajax({
        url: GET_ORDERS_HISTORY,
        error: function (e){

        },
        success: function(ordersHistory) {
            if (ordersHistory.length == 0) {
                errorMsg($("#centerPage"), "There are no any orders yet!");
            } else {
                $("#errorDiv").remove();
                showOrdersHistory(ordersHistory);
            }
        }
    })

}

function clickOnMakeOrderButton() {
    $("#centerPage").empty();
    $("#welcomeTitle").empty().append( $("<h1>Make New Order </h1>"));
    $("<form id='orderFirstDetails' method=\"GET\" action=\"saveOrderDateTypeLocation\" class=\"form-style-7\">\n" +
        "<ul>\n" +
        "<li>\n" +
        "    <label for=\"date\">Order Date</label>\n" +
        "    <input id='orderDate' type=\"date\" name=\"date\" maxlength=\"100\">\n" +
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

function showFeedbacks(feedbacks){
    $("<br>").appendTo($("#centerPage"));
    $.each(feedbacks || [], function(index, feedback) {
        $("<div class=\"column\">" +
            "                <div class=\"card\">" +
            "                    <h3><div class=\"my-rating\"></div></h3>" +
            "                    <p>Feedback giver: " + feedback.feedbackGiver +"</p>" +
            "                    <p>Order date: " + feedback.date.day + "/" + feedback.date.month + "/" + feedback.date.year + "</p>" +
            "                    <p>Comment: " + (feedback.comment==="" ? "No Comment" : feedback.comment) + "</p>" +
            "                </div>" +
            "            </div>").appendTo($("#centerPage"));
        $(".my-rating").starRating({
            starSize: 25,
            initialRating: feedback.rank,
            readOnly: true
        });
    });
    $("</div>").appendTo($("#centerPage"));

}

function clickOnShowFeedbacksButton(){
    $("#centerPage").empty();
    $("#welcomeTitle").empty().append( $("<h1>My Feedbacks In Zone </h1>"));
    $.ajax({
        url: GET_FEEDBACKS,
        error: function (error){
            errorMsg($("#centerPage"),error.responseText);
        },
        success: function(feedbacks) {
            $("#errorDiv").remove();
            showFeedbacks(feedbacks);
        }
    })
}

function NewStoreDetails (storeId,storeName,locationX,locationY,ppk,productsInNewStore){
    this.storeId = storeId;
    this.storeName = storeName;
    this.locationX = locationX;
    this.locationY = locationY;
    this.ppk = ppk;
    this.productsInNewStore = productsInNewStore;
}

function showAlert(msg,title1,title2){
    $("<!-- The Modal -->\n" +
        "<div id=\"myModal\" class=\"modal\">\n" +
        "\n" +
        "  <!-- Modal content -->\n" +
        "  <div class=\"modal-content\">\n" +
        "    <div class=\"modal-header\">\n" +
        "      <span class=\"close\">&times;</span>\n" +
        "      <h2>" + title1 + "</h2>\n" +
        "    </div>\n" +
        "    <div class=\"modal-body\">\n" +
        "      <p>" + msg + "</p>\n" +
        "    </div>\n" +
        "    <div class=\"modal-footer\">\n" +
        "      <h3>" + title2 + "</h3>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "\n" +
        "</div>").appendTo($("body"));
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
        window.location.replace("single_zone.html");
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            window.location.replace("single_zone.html");
        }
    }
}

function ajaxAddNewStore(storeId,storeName,x,y,ppk){
    var newStoreDetails = new NewStoreDetails(storeId,storeName,x,y,ppk,productsToNewStore);
    $.ajax({
        method: "post",
        //data: {data: JSON.stringify(newStoreDetails)},
        //dataType: "JSON",
        data: JSON.stringify(newStoreDetails),
        url: ADD_NEW_STORE_TO_ZONE,
        error: function(error) {

        },
        success: function () {
            showAlert("The store was added successfully!","Success","");
        }
    })
}

function createChooseProductsToNewStorePage(storeId,StoreName,x,y,ppk){
    productsToNewStore = [];
    $("#centerPage").empty();
    $("#welcomeTitle").empty().append( $("<h1>Add Products To New Store </h1>"));
    $("<br><p id=\"sub-title\"> Choose products to add: </p>").appendTo($("#centerPage"));
    $("<div id='product-table-div' class=\"table-div\">\n" +
        "<table id='products-in-system-table' class=\"styled-table\">\n" +
        "    <thead>\n" +
        "    <tr>\n" +
        "        <th>Product Name</th>\n" +
        "        <th>ID</th>\n" +
        "        <th>Way Of Buying</th>\n" +
        "        <th>Price</th>\n" +
        "        <th></th>\n" +
        "    </tr>\n" +
        "    </thead>\n" +
        "    <tbody id=\"productsInSystemTable\">\n" +
        "    <!-- and so on... -->\n" +
        "    </tbody>\n" +
        "</table>\n" +
        "</div>" +
        "<br><p id=\"sub-title\"> Products In Store: </p>" +
        "<table id='new-store-products-table' class=\"styled-table\">\n" +
        "    <thead>\n" +
        "    <tr>\n" +
        "        <th>Product Name</th>\n" +
        "        <th>ID</th>\n" +
        "        <th>Way Of Buying</th>\n" +
        "        <th>Price</th>\n" +
        "    </tr>\n" +
        "    </thead>\n" +
        "    <tbody id=\"productsInNewStoreTable\">\n" +
        "    <!-- and so on... -->\n" +
        "    </tbody>\n" +
        "</table>\n" +
        "</div>" +
        "<div style='display: flex; justify-content: center'>" +
        "<button id='addNewStoreButton' class='button' > <span>Add New Store </span> </button>" +
        "</div>"
    ).appendTo($("#centerPage"));
    $( "#addNewStoreButton" ).click(function() {
        if(productsToNewStore.length == 0){
            errorMsg($("#centerPage"),"You can't make a new store without at least one product!");
        }
        else{
            window.scrollTo(0, 0);
            $( "#errorDiv" ).remove();
            ajaxAddNewStore(storeId,StoreName,x,y,ppk);
        }
    });
    addProductsInSystemToTableForNewStore();
}

function overloadNewStoreFormSubmit(){
    $("#new-store-form").submit(function() {

        //orderDate = $("#orderDate")[0].value;
        var parameters = $(this).serialize();
        var storeName = $(this).find("#storeName")[0].value;
        var storeId = $(this).find("#intTextBox")[0].value;
        var x = $(this).find("#locationX")[0].value;
        var y = $(this).find("#locationY")[0].value;
        var ppk = $(this).find("#ppk")[0].value;
        $.ajax({
            data: parameters,
            url: CHECK_NEW_STORE_SETTINGS,
            error: function(e) {
                errorMsg($("#centerPage"),e.responseText);
            },
            success: function(r) {
                createChooseProductsToNewStorePage(storeId,storeName,x,y,ppk);
            }
        });
        // return value of the submit operation
        return false;
    })
}

function clickOnAddStoreButton(){
    $("#centerPage").empty();
    $("#welcomeTitle").empty().append( $("<h1>Add New Store To Zone </h1>"));
    $("<form id='new-store-form' method=\"GET\" class=\"form-style-7\">\n" +
        "<ul>\n" +
        "<li>\n" +
        "    <label for=\"storeId\">Store ID</label>\n" +
        "    <input id='intTextBox' type=\"text\" name=\"storeId\" maxlength=\"100\">\n" +
        "    <span>Insert the new store ID </span>\n" +
        "</li>\n" +
        "<li>\n" +
        "    <label for=\"storeName\">Store Name</label>\n" +
        "    <input id='storeName' type=\"text\" name=\"storeName\" maxlength=\"100\">\n" +
        "    <span>Insert the new store name</span>\n" +
        "</li>\n" +
        "<li>\n" +
        "    <label for=\"locationX\">X Location</label>\n" +
        "  <input type=\"number\" id=\"locationX\" name=\"locationX\" min=\"1\" max=\"50\">" +
        "    <span>Enter your X location</span>\n" +
        "</li>\n" +
        "<li>\n" +
        "    <label for=\"locationY\">Y Location</label>\n" +
        "  <input type=\"number\" id=\"locationY\" name=\"locationY\" min=\"1\" max=\"50\">" +
        "    <span>Enter your Y location</span>\n" +
        "</li>\n" +
        "<li>\n" +
        "    <label for=\"ppk\">PPK</label>\n" +
        "  <input type=\"number\" step=\"0.01\" id=\"ppk\" name=\"ppk\" min=\"1\">" +
        "    <span>Enter the store's price per kilometer</span>\n" +
        "</li>\n" +
        "<li>\n" +
        "    <button class='button' type=\"submit\" value=\"Continue\" > <span>Continue </span> </button>\n" +
        "</li>\n" +
        "</ul>\n" +
        "</form>").appendTo($("#centerPage"));
        setInputFilter(document.getElementById("intTextBox"), function(value) {
        return /^-?\d*$/.test(value); });

    overloadNewStoreFormSubmit();
}

// function ajaxGetUsername(){
//     $.ajax({
//         url: GET_USERNAME,
//         success: function (usernameFromAjax) {
//             username = usernameFromAjax;
//         }
//     })
// }

function setButtonsAccordingToUserRole() {
    $.ajax({
        url: GET_ROLE_URL,
        success: function (role) {
            userRole = role;
            if(role === "customer"){
                $("<a href=\"#\" id=\"makeOrder\" class=\"w3-bar-item w3-button\" onclick=\"w3_close()\">Make Order</a>").insertBefore("#backButton");
                $("<a href=\"#\" id=\"userOrdersHistory\" class=\"w3-bar-item w3-button\" onclick=\"w3_close()\">My Orders History</a>").insertBefore("#backButton");
                $("#makeOrder").click(function (){
                    clickOnMakeOrderButton();
                });
                $("#userOrdersHistory").click(function (){
                    clickOnMyOrdersHistoryButton();
                });
            }
            else{
                $("<a href=\"#\" id=\"show-feedbacks-button\" class=\"w3-bar-item w3-button\" onclick=\"w3_close()\">Show Feedbacks</a>").insertBefore("#backButton");
                $("<a href=\"#\" id=\"add-store-button\" class=\"w3-bar-item w3-button\" onclick=\"w3_close()\">Add Store To Zone</a>").insertBefore("#backButton");
                $("#show-feedbacks-button").click(function (){
                    clickOnShowFeedbacksButton();
                });
                $("#add-store-button").click(function (){
                    clickOnAddStoreButton();
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

// $(function() {
//     anime.timeline({loop: false})
//         .add({
//             targets: '.ml5 .line',
//             opacity: [0.5,1],
//             scaleX: [0, 1],
//             easing: "easeInOutExpo",
//             duration: 700
//         }).add({
//         targets: '.ml5 .line',
//         duration: 600,
//         easing: "easeOutExpo",
//         translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
//     }).add({
//         targets: '.ml5 .ampersand',
//         opacity: [0,1],
//         scaleY: [0.5, 1],
//         easing: "easeOutExpo",
//         duration: 600,
//         offset: '-=600'
//     }).add({
//         targets: '.ml5 .letters-left',
//         opacity: [0,1],
//         translateX: ["0.5em", 0],
//         easing: "easeOutExpo",
//         duration: 600,
//         offset: '-=300'
//     }).add({
//         targets: '.ml5 .letters-right',
//         opacity: [0, 1],
//         translateX: ["-0.5em", 0],
//         easing: "easeOutExpo",
//         duration: 600,
//         offset: '-=600'
//     });
//     // }).add({
//     //     targets: '.ml5',
//     //     opacity: 0,
//     //     duration: 1000,
//     //     easing: "easeOutExpo",
//     //     delay: 1000
//     // });
// });

// function scroll_to(div){
//     $('html, body').animate({
//         scrollTop: $("moreStoreDetailsDiv").offset().top
//     },1000);
// }
//
// //auto expand textarea
// function adjust_textarea(h) {
//     h.style.height = "20px";
//     h.style.height = (h.scrollHeight)+"px";
// }
//
// //make text feild only numbers:
// function setInputFilter(textbox, inputFilter) {
//     ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
//         textbox.addEventListener(event, function() {
//             if (inputFilter(this.value)) {
//                 this.oldValue = this.value;
//                 this.oldSelectionStart = this.selectionStart;
//                 this.oldSelectionEnd = this.selectionEnd;
//             } else if (this.hasOwnProperty("oldValue")) {
//                 this.value = this.oldValue;
//                 this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
//             } else {
//                 this.value = "";
//             }
//         });
//     });
// }