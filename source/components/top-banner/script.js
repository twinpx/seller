(function ($) {
  'use strict';

  $(function () {
    //$( '.firstbanerfotorama' ).fotorama();

    var swiper = new Swiper('#topSwiper', {
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
    });

    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });
})(jQuery);
