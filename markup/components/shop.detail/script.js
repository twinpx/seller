(function($) {
    "use strict";
    $(function() {
        setTimeout(function() {
            $(".b-shop-detail").addClass("i-loaded");
        }, 500);
        var swiper = new Swiper(".swiper-container", {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            preloadImages: false,
            lazy: true,
            watchSlidesVisibility: true
        });
        ymaps.ready(function() {
            var shopDetailMap = new ymaps.Map("shopDetailMapID", {
                center: window.shopDetailMapCoords,
                zoom: window.shopDetailMapZoom || 9,
                controls: [ "typeSelector", "zoomControl" ]
            }, {
                typeSelectorFloat: "left",
                zoomControlSize: "small"
            }), shopDetailPlacemark = new ymaps.Placemark(shopDetailMap.getCenter(), {}, {
                iconLayout: "default#image",
                iconImageHref: window.shopDetailMapBalloonHref,
                iconImageSize: [ 43, 64 ],
                iconImageOffset: [ -22, -64 ]
            });
            shopDetailMap.geoObjects.add(shopDetailPlacemark);
            shopDetailMap.behaviors.disable("scrollZoom");
            shopDetailMap.events.add("click", function() {
                shopDetailMap.behaviors.enable("scrollZoom");
            });
            if (window.matchMedia("(max-width: 1024px)").matches) {
                shopDetailMap.behaviors.disable("drag");
            }
        });
    });
})(jQuery);