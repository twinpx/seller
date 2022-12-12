( function($) {

  'use strict';
  
  $( function() {
    
    //nav button
    $("#nav-button-xs").sideNav({
      onOpen: function() {
        //blur the page
        document.querySelector( 'html' ).classList.add( 'i-blur' );
      },
      onClose: function() {
        //focus the page
        document.querySelector( 'html' ).classList.remove( 'i-blur' );
      }
    });//mobile
    
    $( '#nav-button' ).click( function(e) {//desktop
      e.preventDefault();
      $( '.bj-page-header__sub' ).slideToggle();
    });
  
    /*setTimeout( function() {
      $( '.bj-page-header' ).addClass( 'i-load' );
    }, 10);*/

    /*$( document ).click( function(e) {
      if ( !$( e.target ).hasClass( 'bj-personal-icon' ) && !$(e.target).hasClass( 'popover-content' )) {
        $( ".bj-page-header .bj-personal-icon" ).popover( 'hide' );
      }
    });*/

    //header dropdown
    $(".bj-page-header__menu-link").click( function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        $( ".bj-page-header__sub" ).slideUp();
        $( "#nav-button-xs" ).sideNav( 'hide' );
        $(".bj-page-header__user-dropdown article").slideUp().removeClass( 'i-animate' );
        
        if ( $(".bj-page-header__dropdown article").is( ':visible' )) {
          $(".bj-page-header__dropdown article:visible").slideUp().removeClass( 'i-animate' );
        } else {
          $(".bj-page-header__dropdown article").slideDown().addClass( 'i-animate' );
        }
        
        //hide cart dropdown
        if ( window.cartDropdownFlag ) {
          window.cartDropdownFlag = false;
          setTimeout( function() {
            if ( !window.cartDropdownFlag ) {
              $( '.bj-page-header__cart-dropdown article' ).slideUp().removeClass( 'i-animate' );
              $( '#cartDropdown' ).removeClass( 'i-loaded' );
            }
          }, 100 );
        }
    });
    $(".bj-page-header__dropdown article").click(function(e) {
        e.stopPropagation();
    });
    $(".bj-page-header__dropdown .up").click( function(e) {
        $(this).closest("article").slideUp().removeClass( 'i-animate' );
        e.preventDefault();
    });

    //user dropdown
    $( ".bj-personal-icon" ).click( function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      $( ".bj-page-header__sub" ).slideUp();
      $( "#nav-button-xs" ).sideNav( 'hide' );
      $( ".bj-page-header__dropdown article:visible" ).slideUp().removeClass( 'i-animate' );
      $( ".bj-page-header__user-dropdown article" ).slideToggle().toggleClass( 'i-animate' );
      
      if ( window.cartDropdownFlag ) {
        window.cartDropdownFlag = false;
        setTimeout( function() {
          if ( !window.cartDropdownFlag ) {
            $( '.bj-page-header__cart-dropdown article' ).slideUp().removeClass( 'i-animate' );
            $( '#cartDropdown' ).removeClass( 'i-loaded' );
          }
        }, 100 );
      }
    });
    
    //header cart-dropdown
    if ( !$( 'html' ).hasClass( 'bx-touch' )) {//desktop
      
      $( '.bj-cart-icon' ).click( function(e) {
        
        e.stopPropagation();
        e.preventDefault();
      
        if ( !window.cartDropdownFlag ) {
          
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
                setTimeout( function() {
                  $( '#cartDropdown' ).addClass( 'i-loaded' );
                }, 100 );
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
          
        } else {
          window.cartDropdownFlag = false;
          setTimeout( function() {
            if ( !window.cartDropdownFlag ) {
              $( '.bj-page-header__cart-dropdown article' ).slideUp().removeClass( 'i-animate' );
            }
          }, 100 );
          setTimeout( function() {
            if ( !window.cartDropdownFlag ) {
              $( '#cartDropdown' ).removeClass( 'i-loaded' );
            }
          }, 500 );
        }
          
      });

      /*$( '.bj-page-header__cart-dropdown article' ).hover( function(e) {//when the action is "hover", now it's click
          window.cartDropdownFlag = true;
      }, function() {
           window.cartDropdownFlag = false;
           setTimeout( function() {
            if ( !window.cartDropdownFlag ) {
              $( '.bj-page-header__cart-dropdown article' ).slideUp().removeClass( 'i-animate' );
              $( '#cartDropdown' ).removeClass( 'i-loaded' );
            }
          }, 100 );
      });*/
    } else {
      $( '.bj-cart-icon' ).click( function(e) {
          e.stopPropagation();
      });
    }
    
    $( document ).bind( 'click', function(e) {
      
      $(".bj-page-header__dropdown article").slideUp().removeClass( 'i-animate' );
      $(".bj-page-header__user-dropdown article").slideUp().removeClass( 'i-animate' );
      
      if ( window.cartDropdownFlag && !$(e.target).closest( '#cartDropdown' ).length ) {
        window.cartDropdownFlag = false;
        setTimeout( function() {
          if ( !window.cartDropdownFlag ) {
            $( '.bj-page-header__cart-dropdown article' ).slideUp().removeClass( 'i-animate' );
            $( '#cartDropdown' ).removeClass( 'i-loaded' );
          }
        }, 100 );
      }
      
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));