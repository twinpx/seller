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
                variant: variant
            };
            var currencyCode = $("#catalogDetailData div[ data-id=" + $(".b-catalog-detail").data("id") + "]").data("cur");
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
                variant: variant
            };
            var currencyCode = $("#catalogDetailData div[ data-id=" + $(".b-catalog-detail").data("id") + "]").data("cur");
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
            $element(".b-catalog-element__propList-block").each(function(index, elem) {
                variant += $(elem).find(".i-active").text() + " ";
            });
            var productObj = {
                id: $element.data("id"),
                name: $element.find(".b-catalog-element__title").text(),
                price: parseInt($element.find(".b-catalog-element__price span").text().split(" ").join(""), 10),
                category: $element.find(".b-catalog-element__data").data("category"),
                brand: $element.find(".b-catalog-element__data").data("brand"),
                quantity: 1,
                variant: variant
            };
            var currencyCode = $element.find(".b-catalog-element__data div[ data-id=" + $element.data("id") + "]").data("cur");
            window.dataLayer.push({
                currencyCode: currencyCode,
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
            var currencyCode = $("#catalogDetailData div[ data-id=" + $(".b-catalog-detail").data("id") + "]").data("cur");
            window.dataLayer.push({
                currencyCode: currencyCode,
                ecommerce: {
                    add: {
                        products: [ productObj ]
                    }
                }
            });
        });
        $("#oneClick").bind("onClickSuccess.ecommerce", function() {
            var currencyCode = $("#catalogDetailData div[ data-id=" + $(".b-catalog-detail").data("id") + "]").data("cur");
            window.dataLayer.push({
                currencyCode: currencyCode,
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