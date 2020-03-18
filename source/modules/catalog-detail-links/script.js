$( function() {
    
  if ( document.getElementById( 'catalogDetailPrevLink' ) || document.getElementById( 'catalogDetailNextLink' )) {
    var mouseCoords = {
      x: 0
    };
    
    $( document ).mousemove( function(e) {
    
      mouseCoords.x = e.pageX;
    
      var scroll = $( document ).height() - $( '.bj-page-footer' ).outerHeight() - 32 - 64 - $( window ).height()/2;
      
      if ( scroll < ( window.pageYOffset || document.documentElement.scrollTop )) {
        $( '#catalogDetailPrevLink.i-appear, #catalogDetailNextLink.i-appear' ).removeClass( 'i-appear' );
        return;
      }
      
      if ( e.pageX <= ($( document ).width() - $( '.bj-page-content' ).width()) / 2 + 200 ) {
        $( '#catalogDetailPrevLink' ).addClass( 'i-appear' );
      } else if ( e.pageX >= ($( document ).width() + $( '.bj-page-content' ).width()) / 2 - 200 ) {
        $( '#catalogDetailNextLink' ).addClass( 'i-appear' );
      } else {
        $( '#catalogDetailPrevLink.i-appear, #catalogDetailNextLink.i-appear' ).removeClass( 'i-appear' );
      }
    });
    
    $( window ).scroll( function(e) {
      var scroll = $( document ).height() - $( '.bj-page-footer' ).outerHeight() - 32 - 64 - $( window ).height()/2;
      if ( scroll < ( window.pageYOffset || document.documentElement.scrollTop )) {
        $( '#catalogDetailPrevLink, #catalogDetailNextLink' ).removeClass( 'i-appear' ).addClass( 'i-hide' );
        return;
      } else {
        $( '#catalogDetailPrevLink.i-hide, #catalogDetailNextLink.i-hide' ).removeClass( 'i-hide' );
        if ( !$( '#catalogDetailPrevLink.i-appear, #catalogDetailNextLink.i-appear' ).length ) {
          if ( mouseCoords.x <= ($( document ).width() - $( '.bj-page-content' ).width()) / 2 + 200 ) {
            $( '#catalogDetailPrevLink' ).addClass( 'i-appear' );
          } else if ( mouseCoords.x >= ($( document ).width() + $( '.bj-page-content' ).width()) / 2 - 200 ) {
            $( '#catalogDetailNextLink' ).addClass( 'i-appear' );
          } else {
            $( '#catalogDetailPrevLink.i-appear, #catalogDetailNextLink.i-appear' ).removeClass( 'i-appear' );
          }
        }
      }
    });
  }
  
});