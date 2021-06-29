(function ($) {
  'use strict';

  $(function () {
    $('.b-shops').each(function () {
      var $shops = $(this);

      //lazyload
      $shops.find('.b-shops-card__img img').lazyload();

      //swiper gallery
      var slidesPerView = $shops.data('slidesperview') || 4,
        spaceBetween = $shops.data('spacebetween') || 30;
      if (window.matchMedia('(max-width: 400px)').matches) {
        slidesPerView = 1;
        spaceBetween = 10;
      } else if (window.matchMedia('(max-width: 700px)').matches) {
        slidesPerView = 2;
        spaceBetween = 10;
      }

      //swiper init
      var swiper = new Swiper($shops.find('.swiper-container'), {
        slidesPerView: slidesPerView,
        spaceBetween: spaceBetween,
        navigation: {
          nextEl: $shops.find('.swiper-button-next'),
          prevEl: $shops.find('.swiper-button-prev'),
        },
        preloadImages: false,
        lazy: {
          loadPrevNext: true,
        },
        watchSlidesVisibility: true,
        on: {
          init: function () {
            $shops.addClass('i-swiper-init');
          },
        },
      });
    });
  });
})(jQuery);
