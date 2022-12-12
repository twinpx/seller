( function($) {

  'use strict';
  
  $( function() {
    
    $('.b-brands').each(function () {
      var $brands = $(this);

      //swiper gallery
      var slidesPerView = $brands.data('slidesperview') || 6,
        spaceBetween = $brands.data('spacebetween') || 30;
      if (window.matchMedia('(max-width: 400px)').matches) {
        slidesPerView = 1;
        spaceBetween = 10;
      } else if (window.matchMedia('(max-width: 700px)').matches) {
        slidesPerView = 2;
        spaceBetween = 10;
      }

      //swiper init
      var swiper = new Swiper($brands.find('.swiper-container'), {
        slidesPerView: slidesPerView,
        spaceBetween: spaceBetween,
        navigation: {
          nextEl: $brands.find('.swiper-button-next'),
          prevEl: $brands.find('.swiper-button-prev'),
        },
        preloadImages: false,
        lazy: {
          loadPrevNext: true,
        },
        watchSlidesVisibility: true,
        on: {
          init: function () {
            $brands.addClass('i-swiper-init');
          },
        },
      });
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));