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
    
    //min max for price slider
    $( "#priceSliderRange" ).slider({
      range: true,
      min: $( "#priceSliderRange" ).data( 'min-value' ),
      max: $( "#priceSliderRange" ).data( 'max-value' ),
      values: [	$( "#priceSliderRange" ).data( 'fact-min-value' ), $( "#priceSliderRange" ).data( 'fact-max-value' ) ], 
      step: 1,
      slide: function( event, ui ) {
        $( "#priceSliderRangeText" ).text( "\u041E\u0442 " + String( ui.values[ 0 ] ).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + " - \u0434\u043E " + String( ui.values[ 1 ] ).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') );
        $( '.bx-filter input.min-price' ).val( ui.values[ 0 ]);
        $( '.bx-filter input.max-price' ).val( ui.values[ 1 ]);
        smartFilter.keyup( $( '.bx-filter input.max-price' )[0] );
      }
    });
    $( "#priceSliderRangeText" ).text( "\u041E\u0442 " + String( $( "#priceSliderRange" ).slider( "values", 0 )).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + " - \u0434\u043E " + String( $( "#priceSliderRange" ).slider( "values", 1 )).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    $( '.bx-filter input.min-price' ).val( $( "#priceSliderRange" ).slider( "values", 0 ));
    $( '.bx-filter input.max-price' ).val( $( "#priceSliderRange" ).slider( "values", 1 ));
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));