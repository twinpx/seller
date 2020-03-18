(function($) {
    "use strict";
    $(function() {
        $(".b-catalog-detail").bind("detail.ecommerce", function() {
            var productObj = {
                id: $(".b-catalog-detail").data("id"),
                name: $(".b-catalog-detail h1").text(),
                price: $(".b-catalog-detail__price").text(),
                quantity: 1
            };
            if ($(".i-ecom-brand").length) {
                productObj.brand = $(".i-ecom-brand").text();
            }
            dataLayer.push({
                ecommerce: {
                    detail: {
                        products: [ productObj ]
                    }
                }
            });
        });
        $(".b-catalog-detail__button-block .btn-100").click(function() {
            var productObj = {
                id: $(".b-catalog-detail").data("id"),
                name: $(".b-catalog-detail h1").text(),
                price: $(".b-catalog-detail__price").text(),
                quantity: 1
            };
            if ($(".i-ecom-brand").length) {
                productObj.brand = $(".i-ecom-brand").text();
            }
            dataLayer.push({
                ecommerce: {
                    add: {
                        products: [ productObj ]
                    }
                }
            });
        });
        $(".b-catalog-element__button .btn").bind("add.ecommerce", function() {
            var $element = $(this).closest(".b-catalog-element");
            var productObj = {
                id: $element.data("id"),
                name: $element.find(".b-catalog-element__title").text(),
                price: $element.find(".b-catalog-element__price span").text(),
                quantity: 1
            };
            if ($element.find(".i-ecom-brand").length) {
                productObj.brand = $element.find(".i-ecom-brand").text();
            }
            dataLayer.push({
                ecommerce: {
                    add: {
                        products: [ productObj ]
                    }
                }
            });
        });
        $(".b-catalog-detail__button-block [data-toggle]").not(".btn").click(function() {
            var productObj = {
                id: $(".b-catalog-detail").data("id"),
                name: $(".b-catalog-detail h1").text(),
                price: $(".b-catalog-detail__price").text(),
                quantity: 1
            };
            if ($(".i-ecom-brand").length) {
                productObj.brand = $(".i-ecom-brand").text();
            }
            dataLayer.push({
                ecommerce: {
                    add: {
                        products: [ productObj ]
                    }
                }
            });
        });
        $("#oneClick").bind("onClickSuccess.ecommerce", function() {
            dataLayer.push({
                ecommerce: {
                    purchase: {
                        actionField: "",
                        products: [ productObj ]
                    }
                }
            });
        });
    });
})(jQuery);