(function($) {
    "use strict";
    $(function() {
        $(".b-brands-card__img img").lazyload();
        var slidesPerView = 6, spaceBetween = 30;
        if (window.matchMedia("(max-width: 400px)").matches) {
            slidesPerView = 1;
            spaceBetween = 10;
        } else if (window.matchMedia("(max-width: 700px)").matches) {
            slidesPerView = 3;
            spaceBetween = 10;
        }
        var swiper = new Swiper(".swiper-container", {
            slidesPerView: slidesPerView,
            spaceBetween: spaceBetween,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            preloadImages: false,
            lazy: true,
            watchSlidesVisibility: true,
            on: {
                init: function() {
                    $(".b-brands").addClass("i-swiper-init");
                }
            }
        });
    });
})(jQuery);