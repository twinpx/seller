( function($) {

  'use strict';
  
  $( function() {
    
    $( '.b-catalog-element__colors-item' ).click( function() {
      $( this ).parent().find( '.b-catalog-element__colors-item' ).removeClass( 'i-active' );
      $( this ).addClass( 'i-active' );
    });
  
    $( '.b-catalog-element__sizes-item' ).click( function() {
      $( this ).parent().find( '.b-catalog-element__sizes-item' ).removeClass( 'i-active' );
      $( this ).addClass( 'i-active' );
    });
    
    $( '.b-catalog-element__img, .b-catalog-element__img-hover' ).lazyload();
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));