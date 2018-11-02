( function($) {

  'use strict';
  
  $( function() {
  
    var top;
    
    if ( String( window.location.href ).search( 'filter' ) !== -1 && $( '.b-catalog-filter' ).length ) {
      if ( $( '.b-catalog-filter' ).closest( '.col-md-3' ).length ) {
        top = $( '.b-catalog-filter' ).closest( '.col-md-3' ).offset().top;
      } else {
        top = $( '.b-catalog-filter' ).offset().top;
      }
      setTimeout( function() {
        $.scrollTo( top - 30, 500 );
      }, 1500 );
    }
  
    $( '.bx-filter-parameters-box-title' ).click( function(e) {
      e.preventDefault();
      $( this ).closest( '.bx-filter-parameters-box' ).find( '.bx-filter-block ' ).slideToggle();
    });
    
    $( ".b-catalog-filter-switch" ).click( function(e) {
			e.preventDefault();
			$( this ).next( ".b-catalog-filter" ).slideToggle();
      var $hidden = $( this ).find( 'span:hidden' );
      var $visible = $( this ).find( 'span:visible' ).hide();
      $hidden.show();
      $visible.hide();
		});
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));