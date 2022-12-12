( function($) {

  'use strict';
  
  $( function() {
    
    $( '.bj-catalogue-tabs.i-v15' ).each( function() {
      var $catalogueTabs = $( this );
      var $tabPanes = $( this ).find( '.tab-pane' );
      var $navTabs = $( this ).find( '.nav-tabs' );
      
      //create tabs menu
      $tabPanes.each( function() {
        var $pane = $( this );
        var c = '';
        
        if ( $pane.hasClass( 'active' )) {
          c = ' class="active"';
        }
        $navTabs.append( '<li' + c + '><a href="#' + $pane.attr( 'id' ) + '" role="tab" data-toggle="tab" class="bj-icon-link">' + $pane.data( 'tab' ) + '</a></li>' );
      });
      
      $navTabs.find( 'a' ).click( function() {
        var $a = $( this );
        setTimeout( function() {
          $catalogueTabs.find( '.tab-pane[id="' + String( $a.attr( 'href' )).substring(1) + '"]' ).find( '.b-catalog-element__img, .b-catalog-element__img-hover' ).lazyload();
        }, 500);
      });
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));