function updateCartTotals() {
    if ($('#empty-cart').length != 0) {
        prepCart();
    }

    $.uCommerce.getBasket({}, function (response) {
        var basket = response.Basket;
        var qty = $(".item-qty");
        var sub = $(".order-subtotal");
        var tax = $(".order-tax");
        var disc = $(".order-discounts");
        var tot = $(".order-total");

        qty.text(basket.FormattedTotalItems);
        sub.text(basket.FormattedSubTotal);
        tax.text(basket.FormattedTaxTotal);
        disc.text(basket.FormattedDiscountTotal);
        tot.text(basket.FormattedOrderTotal);
    });
};
function prepCart() {
    var icn = $("<i>", { "class": "icon-shopping-cart icon-white" });
    var qty = $("<span>", { "class": "item-qty" });
    var tot = $("<span>", { "class": "order-total" });
    var cart = $("<a>", { 'href': '/cart.aspx', "id": "mini-cart" });

    cart.append(icn).append(qty).append(" items in cart, total: ").append(tot);
    $('#empty-cart').replaceWith(cart);
};