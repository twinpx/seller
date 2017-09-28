( function($) {

  'use strict';
  
  $( function() {
  
    setTimeout( function() {
      $( 'body' ).addClass( 'i-load' );
    }, 100);
  
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
    
    //sizes table
    $( '.b-sizes-menu__table ' ).delegate( 'th', 'mouseenter', function() {
      var $tr = $( this ).parent();
      var num = $tr.closest( 'tbody' ).find( 'tr' ).index( $tr );
      $tr.addClass( 'i-hover' );
      $( '.b-sizes-menu__scroll tr:eq( ' + num + ' )' ).addClass( 'i-hover' );
    })
    .delegate( 'th', 'mouseleave', function() {
      $( '.b-sizes-menu__table tr.i-hover' ).removeClass( 'i-hover' );
    })
    .delegate( 'td', 'mouseenter', function() {
      var $td = $( this );
      var $tr = $td.parent();
      var num = $tr.closest( 'tbody' ).find( 'tr' ).index( $tr );
      var numTd = $tr.find( 'td' ).index( $td );
      $tr.addClass( 'i-hover' );
      $( '.b-sizes-menu__th tr:eq( ' + num + ' )' ).addClass( 'i-hover' );
      
      $td.addClass( 'i-active' );
      
      $tr.closest( 'tbody' ).find( 'tr' ).each( function() {
        $( this ).find( 'td:eq( ' + numTd +  ' )' ).addClass( 'i-hover' );
      });
    })
    .delegate( 'td', 'mouseleave', function() {
      $( '.b-sizes-menu__table tr.i-hover, .b-sizes-menu__table td.i-hover' ).removeClass( 'i-hover' );
      $( '.b-sizes-menu__table td.i-active' ).removeClass( 'i-active' );
    })
    .delegate( 'td', 'click', function() {
    
      if ( $( this ).hasClass( 'i-clicked-active' )) {
        $( '.b-sizes-menu__table .i-clicked' ).removeClass( 'i-clicked' );
        $( '.b-sizes-menu__table .i-clicked-active' ).removeClass( 'i-clicked-active' );
        $( '.b-sizes-menu__table' ).removeClass( 'i-clicked' );
      } else {
        $( '.b-sizes-menu__table .i-clicked' ).removeClass( 'i-clicked' );
        $( '.b-sizes-menu__table .i-clicked-active' ).removeClass( 'i-clicked-active' );
        
        $( '.b-sizes-menu__table .i-hover' ).addClass( 'i-clicked' ).removeClass( 'i-hover' );
        $( '.b-sizes-menu__table .i-active' ).addClass( 'i-clicked-active' ).removeClass( 'i-active' );
        
        $( '.b-sizes-menu__table' ).addClass( 'i-clicked' );
      }
      
    });
    
    $( '.side-nav__close' ).click( function() {
      $( '#slide-size-table' ).sideNav( 'hide' );
    });
    
    showTableBorders();
    resizeSideNav();
    
    $( window ).bind( 'resize', function() {
      setTimeout( function() {
        showTableBorders();
        resizeSideNav();
      }, 100 );
    });
    
    function resizeSideNav() {
    
      if ( window.matchMedia( '( min-width: 992px )' ).matches && !$( '#slide-size-table' ).hasClass( 'i-60' )) {
        $( '#slide-size-table' ).addClass( 'i-60' ).removeClass( 'i-80' ).removeClass( 'i-95' );
        $( '.b-catalog-detail__size-table-link a, #sizeIcon' ).sideNav( 'destroy' );
        $( '.b-catalog-detail__size-table-link a, #sizeIcon' ).sideNav({
          menuWidth: '60%'
        });
      } else if ( window.matchMedia( '( min-width: 768px )' ).matches && window.matchMedia( '( max-width: 991px )' ).matches && !$( '#slide-size-table' ).hasClass( 'i-80' )) {
        $( '#slide-size-table' ).addClass( 'i-80' ).removeClass( 'i-60' ).removeClass( 'i-95' );
        $( '.b-catalog-detail__size-table-link a, #sizeIcon' ).sideNav( 'destroy' );
        $( '.b-catalog-detail__size-table-link a, #sizeIcon' ).sideNav({
          menuWidth: '80%'
        });
      } else if ( window.matchMedia( '(max-width: 767px)' ).matches && !$( '#slide-size-table' ).hasClass( 'i-95' )) {
        $( '#slide-size-table' ).addClass( 'i-95' ).removeClass( 'i-60' ).removeClass( 'i-80' );
        $( '.b-catalog-detail__size-table-link a, #sizeIcon' ).sideNav( 'destroy' );
        $( '.b-catalog-detail__size-table-link a, #sizeIcon' ).sideNav({
          menuWidth: '95%'
        });
      }
    
    }
    
    function showTableBorders() {
      if ( $( '.b-sizes-menu__scroll' ).width() < $( '.b-sizes-menu__scroll table' ).width()) {
        $( '.b-sizes-menu__table' ).addClass( 'i-scrolled' );
      } else {
        $( '.b-sizes-menu__table' ).removeClass( 'i-scrolled' );
      }
    }
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));