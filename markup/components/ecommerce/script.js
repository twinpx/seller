(function($) {
    "use strict";
    $(function() {
        window.dataLayer = window.dataLayer || [];
        $(".b-catalog-detail").bind("detail.ecommerce", function() {
            var variant = "";
            $("#propListBlock [data-prop]").each(function(index, elem) {
                variant += $(elem).find(".i-active").text() + " ";
            });
            var productObj = {
                id: $(".b-catalog-detail").data("id"),
                name: $(".b-catalog-detail h1").text(),
                price: parseInt($(".b-catalog-detail__price").text().split(" ").join(""), 10),
                category: $("#catalogDetailData").data("category"),
                brand: $("#catalogDetailData").data("brand"),
                quantity: 1,
                variant: $.trim(variant)
            };
<<<<<<< HEAD
            if ($(".i-ecom-brand").length) {
                productObj.brand = $(".i-ecom-brand").text();
            }
=======
            var currencyCode = $("#catalogDetailData div[ data-id=" + $(".b-catalog-detail").data("id") + "]").data("cur");
>>>>>>> iss11019
            window.dataLayer.push({
                ecommerce: {
                    currencyCode: currencyCode,
                    detail: {
                        products: [ productObj ]
                    }
                }
            });
        });
        $(".b-catalog-detail__button-block .btn-100:not( .i-gray )").click(function() {
<<<<<<< HEAD
=======
            var variant = "";
            $("#propListBlock [data-prop]").each(function(index, elem) {
                variant += $(elem).find(".i-active").text() + " ";
            });
>>>>>>> iss11019
            var productObj = {
                id: $(".b-catalog-detail").data("id"),
                name: $(".b-catalog-detail h1").text(),
                price: parseInt($(".b-catalog-detail__price").text().split(" ").join(""), 10),
                category: $("#catalogDetailData").data("category"),
                brand: $("#catalogDetailData").data("brand"),
                quantity: 1,
                variant: $.trim(variant)
            };
<<<<<<< HEAD
            if ($(".i-ecom-brand").length) {
                productObj.brand = $(".i-ecom-brand").text();
            }
=======
            var currencyCode = $("#catalogDetailData div[ data-id=" + $(".b-catalog-detail").data("id") + "]").data("cur");
>>>>>>> iss11019
            window.dataLayer.push({
                ecommerce: {
                    currencyCode: currencyCode,
                    add: {
                        products: [ productObj ]
                    }
                }
            });
        });
        $(".b-catalog-element__button .btn").bind("add.ecommerce", function() {
            var $element = $(this).closest(".b-catalog-element");
            var variant = "";
            $element.find(".b-catalog-element__propList-block [data-prop]").each(function(index, elem) {
                variant += $(elem).find(".i-active").text() + " ";
            });
            var productObj = {
                id: $element.data("id"),
                name: $element.find(".b-catalog-element__title").text(),
                price: parseInt($element.find(".b-catalog-element__price span").text().split(" ").join(""), 10),
                category: $element.find(".b-catalog-element__data").data("category"),
                brand: $element.find(".b-catalog-element__data").data("brand"),
                quantity: 1,
                variant: $.trim(variant)
            };
<<<<<<< HEAD
            if ($element.find(".i-ecom-brand").length) {
                productObj.brand = $element.find(".i-ecom-brand").text();
            }
            window.dataLayer.push({
=======
            var currencyCode = $element.find(".b-catalog-element__data div[ data-id=" + $element.data("id") + "]").data("cur");
            window.dataLayer.push({
                currencyCode: currencyCode,
>>>>>>> iss11019
                ecommerce: {
                    add: {
                        products: [ productObj ]
                    }
                }
            });
        });
        $("#basket-root .basket-item-actions-remove").bind("click", function() {
            var $element = $(this).closest(".basket-items-list-item-container");
            var variant = "";
            $("#propListBlock [data-prop]").each(function(index, elem) {
                variant += $(elem).find(".i-active").text() + " ";
            });
            var productObj = {
                id: $element.data("id"),
                name: $element.find(".basket-item-info-name").text(),
                price: parseInt(String($element.find(".basket-items-list-item-price-for-one .basket-item-price-current-text").html()).replace("&nbsp;", "").replace("&amp;nbsp;", "").replace(" ", ""), 10),
                category: $element.data("category"),
                brand: $element.data("brand"),
                quantity: $element.find("input.basket-item-amount-filed").val()
            };
<<<<<<< HEAD
            if ($(".i-ecom-brand").length) {
                productObj.brand = $(".i-ecom-brand").text();
            }
=======
            var currencyCode = $element.data("cur");
>>>>>>> iss11019
            window.dataLayer.push({
                ecommerce: {
                    currencyCode: currencyCode,
                    remove: {
                        products: [ productObj ]
                    }
                }
            });
        });
<<<<<<< HEAD
        $("#oneClick").bind("onClickSuccess.ecommerce", function() {
=======
        $("#oneClick").bind("oneClickSuccess.ecommerce", function() {
            var variant = "";
            $("#propListBlock [data-prop]").each(function(index, elem) {
                variant += $(elem).find(".i-active").text() + " ";
            });
            var productObj = {
                id: $(".b-catalog-detail").data("id"),
                name: $(".b-catalog-detail h1").text(),
                price: parseInt($(".b-catalog-detail__price").text().split(" ").join(""), 10),
                category: $("#catalogDetailData").data("category"),
                brand: $("#catalogDetailData").data("brand"),
                quantity: 1,
                variant: $.trim(variant)
            };
            var currencyCode = $("#catalogDetailData div[ data-id=" + $(".b-catalog-detail").data("id") + "]").data("cur");
>>>>>>> iss11019
            window.dataLayer.push({
                ecommerce: {
                    currencyCode: currencyCode,
                    purchase: {
                        actionField: {
                            id: window.oneClickOrderId,
                            goal_id: window.oneClickYandexId
                        },
                        products: [ productObj ]
                    }
                }
            });
        });
    });
})(jQuery);