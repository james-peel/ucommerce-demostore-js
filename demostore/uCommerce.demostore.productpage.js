var _itemAddedAlert = null;
$(function () {
	enableAddToCartWhenSelected($('#add-to-basket'), $('#dimension'));
	wireupAddToCartButton($('#add-to-basket'), $('#catalog-id'), $('#product-sku'), $('#dimension'), $('#quantity-to-add'));
});
function enableAddToCartWhenSelected(addToCartButton, dimensionSelect) {
    if (dimensionSelect.length == 0)
		return;

	addToCartButton.removeClass('btn-success').addClass('disabled');

	dimensionSelect.change(function () {
	    updateAddToCartButton(addToCartButton, dimensionSelect);
	});
};
function updateAddToCartButton(addToCartButton, dimensionSelect) {
    if (dimensionSelect.length == 0)
		return;

    var isEmpty = (dimensionSelect.val() === "");

	// If the user has made a valid selection enable the add to cart button
    if (!isEmpty) {
		addToCartButton.removeClass('disabled').addClass('btn-success').removeAttr('disabled');
	} else {
		addToCartButton.removeClass('btn-success').addClass('disabled').attr('disabled', 'disabled');
	}
};
function wireupAddToCartButton(addToCartButton, catalogIdInput, skuInput, dimensionSelect, quantityInput) {
	addToCartButton.click(function (e) {
		e.preventDefault();

		if (!addToCartButton.hasClass('disabled'))
		{
		    var sku = skuInput.val();
		    var variantSku = dimensionSelect.val();
		    var qty = 1;

		    $.uCommerce.addToBasket(
                {
                    catalogId: catalogIdInput.val(),
                    sku: sku,
                    variantSku: variantSku,
                    quantity: qty
                },
                function () {
                    //updateCartTotals(addToCartButton);

                    /*var parent = addToCartButton.parent();
                    var alert = parent.find(".item-added");
                    if (alert.length == 0) {
                        // Add an alert box so the customer knows they've added an item to the cart
                        alert = $('<div />', {
                            "class": "alert alert-success item-added",
                            html: '<button type="button" class="close" data-dismiss="alert">×</button><p>Thanks, this item has been added to your cart. <a href="/cart.aspx">Click here to view your cart</a>.</p>'
                        }).hide();
                        parent.append(alert);
                        alert.slideDown();
                    } else {
                        alert.effect("highlight", { color: '#FCF8E3' }, 500);
                    }
    
                    // Incase there's already a timeout in place, clear it
                    clearTimeout(_itemAddedAlert);
    
                    // Remove the alert after 5 seconds
                    _itemAddedAlert = setTimeout(function () {
                        alert.slideUp(500, function () {
                            alert.remove();
                        });
                    }, 5000);
                    */
                }
            );
		}
    });
};

function getObjectsByKey(obj, key, val) {
	var objects = [];
	for (var i in obj) {
		if (!obj.hasOwnProperty(i)) continue;
		if (typeof obj[i] == 'object') {
			objects = objects.concat(getObjectsByKey(obj[i], key, val));
		} else if (i == key && obj[key] == val) {
			objects.push(obj);
		}
	}
	return objects;
}