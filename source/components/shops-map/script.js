( function($) {

  'use strict';
  
  $( function() {
    
    //lazyload
    $( '.b-shops-card__img img, .b-shops-card__img div' ).lazyload();
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));