( function($) {

  'use strict';
  
  $( function() {
  
    $( '.b-catalog-detail__icons .b-icon-zoom' ).click( function() {
      $( '.b-catalog-detail__gallery .fotorama' ).data( 'fotorama' ).requestFullScreen();
    });
    
    $( '.b-catalog-detail__colors-item' ).click( function() {
      $( '.b-catalog-detail__colors-item' ).removeClass( 'i-active' );
      $( this ).addClass( 'i-active' );
    });
    
    $( '.b-catalog-detail__sizes-item' ).click( function() {
      $( '.b-catalog-detail__sizes-item' ).removeClass( 'i-active' );
      $( this ).addClass( 'i-active' );
    });
    
    $( '.b-catalog-detail__size-table-link a, #sizeIcon' ).sideNav({
      menuWidth: '60%'
    });
    
    $( '#commentsIcon' ).click( function() {
      var $commentsTab = $( '.b-tabs__tab[ data-tab="comments" ]' );
      if ( $commentsTab.hasClass( 'i-active' )) {
        $.scrollTo( $( '.b-tabs__nav__menu' ), 500 );
      } else {
        $( '.b-tabs__tab[ data-tab="comments" ]' ).click();
      }
    });
    
    $( '#shareIcon' ).click( function() {
      $.scrollTo( $( '.b-catalog-detail__share' ), 500 );
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));