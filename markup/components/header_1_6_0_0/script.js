( function($) {

  'use strict';
  
  $( function() {
    
    //nav button
    $("#nav-button").sideNav({
      onOpen: function() {
        //blur the page
        document.querySelector( 'html' ).classList.add( 'i-blur' );
      },
      onClose: function() {
        //focus the page
        document.querySelector( 'html' ).classList.remove( 'i-blur' );
      }
    });//mobile
    
    $( '.bj-page-header .bj-logo-space__icon.bj-header-user-icon' ).popover({
      html: !0,
      trigger: "click",
      placement: "bottom"
    });
    
    $( document ).click( function(e) {
      if ( !$( e.target ).hasClass( 'bj-header-user-icon' ) && !$( e.target ).hasClass( 'popover-content' )) {
        $( '.bj-page-header .bj-logo-space__icon.bj-header-user-icon' ).popover( 'hide' );
      }
    });
    
    $( '.bj-page-header__menu-link' ).click( function(e) {
      e.preventDefault();
      e.stopPropagation();
      $( '.bj-page-header__dropdown article' ).slideDown();
    });
    
    $( '.bj-page-header__dropdown article' ).click( function(e) {
        e.stopPropagation();
    });
    
    $( '.bj-page-header__dropdown .up' ).click( function(e) {
        $( this ).closest( 'article' ).slideUp();
        e.preventDefault();
    });
    
    $( document ).click( function() {
      $( '.bj-page-header__dropdown article' ).slideUp();
    });
    
    $( window ).bind( 'scroll' ).scroll();
    
    $( '.bj-page-header__search .bj-header-search-icon' ).click( function() {
      $( this ).closest( '.bj-page-header__search' ).addClass( 'i-active' ).find( 'input' ).focus();
    });
    
    $( '.bj-page-header__search__input' ).blur( function() {
      $( this ).val( '' ).closest( '.bj-page-header__search' ).removeClass( 'i-active' );
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));