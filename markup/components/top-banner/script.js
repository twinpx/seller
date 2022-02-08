(function($) {
    "use strict";
    $(function() {
        var swiper = new Swiper("#topSwiper", {
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true
            },
            slidesPerView: 1,
            autoplay: {
                delay: 2e4,
                disableOnInteraction: false
            },
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }
        });
    });
})(jQuery);