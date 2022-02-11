(function ($) {
  'use strict';

  $(function () {
    //$( '.firstbanerfotorama' ).fotorama();

    var device = 'desktop';
    if (window.matchMedia('(max-width: 767px)').matches) {
      device = 'mobile';
    }

    document.querySelector('.swiper--' + device).style.display = 'block';

    var swiper = new Swiper('.swiper--' + device, {
      on: {
        init: function () {
          setTimeout(function () {
            swiper.el
              .closest('.top-swiper-ph')
              .classList.add('top-swiper--initialized');
          }, 500);
        },
      },
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
      slidesPerView: 1,
      autoplay: {
        delay: 20000,
        disableOnInteraction: false,
      },
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      preloadImages: false,
      lazy: {
        loadPrevNext: true,
      },
      watchSlidesVisibility: true,
    });

    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });
})(jQuery);
