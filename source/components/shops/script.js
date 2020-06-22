( function($) {

  'use strict';
  
  $( function() {
    
    //lazyload
    $( '.b-shops-card__img img' ).lazyload();
    
    //swiper gallery
    var slidesPerView = 4, spaceBetween = 30;
    if ( window.matchMedia( "(max-width: 400px)" ).matches ) {
      slidesPerView = 1;
      spaceBetween = 10;
    } else if ( window.matchMedia( "(max-width: 700px)" ).matches ) {
      slidesPerView = 2;
      spaceBetween = 10;
    }
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: slidesPerView,
      spaceBetween: spaceBetween,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      preloadImages: false,
      lazy: true,
      watchSlidesVisibility: true,
      on: {
        init: function () {
          $( '.b-shops' ).addClass( 'i-swiper-init' );
        },
      }
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));