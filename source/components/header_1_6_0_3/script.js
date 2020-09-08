( function($) {

  'use strict';
  
  $( function() {
    
    //nav button
    $(".bj-nav-button, #nav-button-xs").sideNav({
      onOpen: function() {
        //blur the page
        document.querySelector( 'html' ).classList.add( 'i-blur' );
      },
      onClose: function() {
        //focus the page
        document.querySelector( 'html' ).classList.remove( 'i-blur' );
      }
    });

    /*setTimeout( function() {
      $( '.bj-page-header' ).addClass( 'i-load' );
    }, 10);*/
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));