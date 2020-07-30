( function($) {

  'use strict';
  
  $( function() {
    
    $( '.b-catalog-recommend__gallery' ).each( function() {
      var $gallery = $( this ),
          $container = $gallery.find( '.swiper-container' );
      
      var swiper = new Swiper( $container, {
        slidesPerView: $gallery.data( 'slidesperview' ),
        spaceBetween: 30,
        navigation: {
          nextEl: $gallery.find( '.swiper-button-next' ),
          prevEl: $gallery.find( '.swiper-button-prev' ),
        }
      });
    });
  
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));