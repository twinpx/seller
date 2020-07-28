( function($) {

  'use strict';
  
  $( function() {
    
    //clear
    $( '.b-search-form-control' ).keyup( function() {
      if ( $( this ).val() !== '' ) {
        $( '.b-search-form-clear' ).addClass( 'i-show' );
      } else {
        $( '.b-search-form-clear' ).removeClass( 'i-show' );
      }
    });

    $( '.b-search-form-clear' ).click( function() {
      $( '.b-search-form-control' ).val( '' ).focus();
      $( this ).removeClass( 'i-show' );
    });
    
    //submit
    $( '.b-search-form-control' ).keydown( function(e) {
      if ( e.which === 13 ) {
        if ( $.trim($( '.b-search-form-control' ).val()) !== '' ) {
          $( '.b-search-form form' ).submit();
        } else {
          return false;
        }
      }
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));