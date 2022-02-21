window.addEventListener("load", function() {
    document.querySelectorAll(".b-shops").forEach(function(shops) {
        new Swiper(shops.querySelector(".swiper-container"), {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            preloadImages: false,
            lazy: {
                loadPrevNext: true
            },
            watchSlidesVisibility: true,
            on: {
                init: function() {
                    shops.classList.add("i-swiper-init");
                }
            },
            slidesPerView: 1,
            spaceBetween: 10,
            breakpoints: {
                400: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                700: {
                    slidesPerView: 4,
                    spaceBetween: 30
                }
            }
        });
    });
});