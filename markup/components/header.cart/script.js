( function($) {

  'use strict';
  
  $( function() {
  
    //header cart-dropdown
    if ( window.ontouchstart === undefined ) {
      $( '.bj-cart-icon' ).hover( function(e) {

        window.cartDropdownFlag = true;
          
        $( '.bj-page-header__sub' ).slideUp();
        $( '#nav-button-xs' ).sideNav( 'hide' );
        $( '.bj-page-header__dropdown article:visible' ).slideUp().removeClass( 'i-animate' );
        $( '.bj-page-header__user-dropdown article' ).slideUp().removeClass( 'i-animate' );
        
        $( '.bj-page-header__cart-dropdown article' ).slideDown();
        setTimeout( function() {
          $( '.bj-page-header__cart-dropdown article' ).addClass( 'i-animate' );
        }, 100 );
        
        //ajax
        $.ajax({
          url: $( '#cartDropdown' ).data( 'url' ),
          type: $( '#cartDropdown' ).data( 'method' ),
          dataType: "html",
          success: function( html ) {
            if ( html ) {
              $( '#cartDropdown .container-fluid' ).html( html );
            }
          },
          error: function (a, b, c) {
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
          
      }, function() {
          window.cartDropdownFlag = false;
          setTimeout( function() {
            if ( !window.cartDropdownFlag ) {
              $( '.bj-page-header__cart-dropdown article' ).slideUp().removeClass( 'i-animate' );
            }
          }, 100 );
      });

      $( '.bj-page-header__cart-dropdown article' ).hover( function(e) {
          window.cartDropdownFlag = true;
      }, function() {
           window.cartDropdownFlag = false;
           setTimeout( function() {
            if ( !window.cartDropdownFlag ) {
              $( '.bj-page-header__cart-dropdown article' ).slideUp().removeClass( 'i-animate' );
            }
          }, 100 );
      });
    }
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));