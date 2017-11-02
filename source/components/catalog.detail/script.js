( function($) {

  'use strict';
  
  $( function() {
    
    $( '#oneClick form' ).submit( function(e) {
    
      e.preventDefault();
      var $form = $( this );
      var $body = $( '#oneClick .modal-body' );
      
      $.ajax({
        url: $form.attr( 'action' ),
        type: $form.attr( 'method' ),
        dataType: "json",
        data: $form.serialize(),
        success: function(data) {
          if ( data && data.MESSAGE ) {
            $body.height( $body.height());
            $body.empty().append( '<p>' + data.MESSAGE + '</p>' );
            $body.height( $body.find( 'p' ).height());
            
            $( '.btn' ).hide();
            $( '.i-gray' ).show();
          }
        },
        error: function() {}
      });
    });
  
    setTimeout( function() {
      $( 'body' ).addClass( 'i-load' );
    }, 100);
  
    //click zoom
    $( '.b-catalog-detail__icons .b-icon-zoom' ).click( function() {
      $( '.b-catalog-detail__gallery .fotorama' ).data( 'fotorama' ).requestFullScreen();
    });
    
    //click colors
    $( '.b-catalog-detail__colors-block' ).delegate( '.b-catalog-detail__colors-item', 'click', function() {
      
      //highlite
      $( '.b-catalog-detail__colors-item' ).removeClass( 'i-active' );
      $( this ).addClass( 'i-active' );
      
      //set disabled sizes
      setDisabledSizes( this );
      
      //set disabled colors
      setDisabledColors( $( '.b-catalog-detail__sizes-item.i-active' ));
    });
    
    //click sizes
    $( '.b-catalog-detail__sizes-block' ).delegate( '.b-catalog-detail__sizes-item', 'click', function() {
    
      //highlite
      $( '.b-catalog-detail__sizes-item' ).removeClass( 'i-active' );
      $( this ).addClass( 'i-active' );
      
      //set cookie
      Cookies.set( 'size', $( this ).text(), { expires: 365, path: window.location.href });
      
      //set disabled colors
      setDisabledColors( this );
      
      //set disabled sizes
      setDisabledSizes( $( '.b-catalog-detail__colors-item.i-active' ));
      
    });
    
    showAllProperties();
    
    showFirstOffer();
    
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
    
    //sizes table-xs
    $( '.b-sizes-menu__table-xs ' ).delegate( 'select', 'change', selectSize );
    $( '.b-sizes-menu__table-xs select:eq(0)' ).change();
    
    function selectSize(e) {
      var $select = $( e.target );
      var $selected = $select.find( 'option:selected' );
      var n = $select.find( 'option' ).index( $selected );
      //selects
      $( '.b-sizes-menu__table-xs select ').each( function() {
         $( this ).find( 'option:eq(' + n + ')' ).attr({ selected: 'selected' });
      });
      //spans
      $( '.b-sizes-menu__table-xs td span' ).hide();
      $( '.b-sizes-menu__table-xs td' ).each( function() {
        $( this ).find ( 'span:eq(' + n + ')' ).show();
      });
    }
    
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
    
    function showAllProperties() {
      //onLoad
      //create colors
      $( '.b-catalog-detail__colors-block' ).empty();
      var colorsArray = [];
      
      $( '#catalogDetailData div' ).each( function() {
        var flag = true;
        var $this = $( this );
        
        colorsArray.forEach( function( cur, i, arr ) {
          if ( cur === $this.data( 'color-color_ref' )) {
            flag = false;
            return;
          }
        });
        
        if ( flag ) {
          colorsArray.push( $( this ).data( 'color-color_ref' ));
        }
      });
        
      colorsArray.forEach( function( cur, i, arr ) {
        $( '.b-catalog-detail__colors-block' ).append( '<span class="b-catalog-detail__colors-item" style="background-image: url( \'' + cur + '\' )"><span></span></span>' );
      });
      
      //create sizes
      $( '.b-catalog-detail__sizes-block' ).empty();
      var sizesArray = [];
      
      $( '#catalogDetailData div' ).each( function() {
        var flag = true;
        var $this = $( this );
        
        sizesArray.forEach( function( cur, i, arr ) {
          if ( cur === $this.data( 'list-sizes_shoes' )) {
            flag = false;
            return;
          }
        });
        
        if ( flag ) {
          sizesArray.push( $( this ).data( 'list-sizes_shoes' ));
        }
      });
        
      sizesArray.forEach( function( cur, i, arr ) {
        $( '.b-catalog-detail__sizes-block' ).append( '<span class="b-catalog-detail__sizes-item"><span>' + cur + '</span></span>' );
      });
    }
    
    function showFirstOffer() {  
      //get size cookie
      var sizeCookie = Cookies.get( 'size' ) || $( '.b-catalog-detail__sizes-item:eq(0)').text();
      
      //show offer
      var flag = false;
      $( '.b-catalog-detail__colors-item' ).each( function() {
        var $color = $( this );
        $( '#catalogDetailData div' ).each( function() {
          var $div = $( this );
          if ( $color.css( 'backgroundImage' ).search( $div.data( 'color-color_ref' )) !== -1 && $div.data( 'list-sizes_shoes' )+''  === (sizeCookie+'') ) {
            if ( !flag ) {
              showOffer( $div );
              flag = true;
            }
          }
        });
      });
    }
    
    function showOffer( $div ) {
      //color
      $( '.b-catalog-detail__colors-item' ).each( function() {
        if ( $( this ).css( 'backgroundImage' ).search( $div.data( 'color-color_ref' )) !== -1) {
          $( this ).addClass( 'i-active' );
        }
      });
      //size
      $( '.b-catalog-detail__sizes-item' ).each( function() {
        if ( $( this ).text() === ($div.data( 'list-sizes_shoes' )+'')) {
          $( this ).addClass( 'i-active' );
        }
      });
      //gallery
      var images = '';
      var srcArray = $div.data( 'photo' ).split( ';' );
      srcArray.forEach( function( cur, i, arr ) {
        images += '<img src="' + cur + '" alt="" >';
      });
      $( '.b-catalog-detail__gallery .fotorama' ).data( 'fotorama' ).destroy();
      $( '.b-catalog-detail__gallery .fotorama' ).empty().html( images );
      $( '.b-catalog-detail__gallery .fotorama' ).fotorama();
      //art
      $( '#catalogDetailArt' ).text( $div.data( 'art' ));
      //code
      $( '#catalogDetailCode' ).text( $div.data( 'code' ));
      //num
      $( '#catalogDetailNum' ).text( $div.data( 'num' ));
      //discount icon
      $( '.b-icon-discount' ).text( $div.data( 'discount-percent' ));
    }
    
    function setDisabledColors( item ) {
      var $item = $( item );
      var size = $item.text();
      var colorsArray = [];
      
      $( '#catalogDetailData div' ).each( function() {
        var $this = $( this );
        
        if ( ($this.data( 'list-sizes_shoes' ) + '') === size ) {
          colorsArray.push( $this.data( 'color-color_ref' ));
        }
      });
      
      $( '.b-catalog-detail__colors-item' ).each( function() {
        var flag = false;
        var $item = $( this );
        colorsArray.forEach( function( cur, i, arr ) {
          if ( $item.css( 'backgroundImage' ).search( cur ) !== -1 ) {
            flag = true;
          }
        });
        
        if ( flag ) {
          $item.removeClass( 'i-disabled' );
        } else {
          $item.addClass( 'i-disabled' );
        }
        
      });
      
      //set active from enabled
      if ( $( '.b-catalog-detail__colors-item.i-active' ).hasClass( 'i-disabled' )) {
        $( '.b-catalog-detail__colors-item.i-active' ).removeClass( 'i-active' );
        $( '.b-catalog-detail__colors-item:not( .i-disabled ):eq(0)' ).addClass( 'i-active' );
      }
      
      //show offer
      $( '#catalogDetailData div' ).each( function() {
        if ( $( '.b-catalog-detail__colors-item.i-active').css( 'backgroundImage' ).search( $( this).data( 'color-color_ref' )) !== -1 && ( $( this).data( 'list-sizes_shoes' )+'' ) === $( '.b-catalog-detail__sizes-item.i-active').text()) {
          showOffer( $( this ));
        }
      });
    }
    
    function setDisabledSizes( item ) {
      var $item = $( item );
      var color = $item.css( 'backgroundImage' );
      var sizesArray = [];
      
      $( '#catalogDetailData div' ).each( function() {
        var $this = $( this );
        
        if ( color.search( $this.data( 'color-color_ref' )) !== -1 ) {
          sizesArray.push( $this.data( 'list-sizes_shoes' ));
        }
      });
      
      $( '.b-catalog-detail__sizes-item' ).each( function() {
        var flag = false;
        var $item = $( this );
        sizesArray.forEach( function( cur, i, arr ) {
          if ( $item.text() === ( cur + '' )) {
            flag = true;
          }
        });
        
        if ( flag ) {
          $item.removeClass( 'i-disabled' );
        } else {
          $item.addClass( 'i-disabled' );
        }
        
      });
      
      //set active from enabled
      if ( $( '.b-catalog-detail__sizes-item.i-active' ).hasClass( 'i-disabled' )) {
        $( '.b-catalog-detail__sizes-item.i-active' ).removeClass( 'i-active' );
        $( '.b-catalog-detail__sizes-item:not( .i-disabled ):eq(0)' ).addClass( 'i-active' );
      }
      
      //show offer
      $( '#catalogDetailData div' ).each( function() {
        if ( $( '.b-catalog-detail__colors-item.i-active').css( 'backgroundImage' ).search( $( this).data( 'color-color_ref' )) !== -1 && ( $( this).data( 'list-sizes_shoes' )+'' ) === $( '.b-catalog-detail__sizes-item.i-active').text()) {
          showOffer( $( this ));
        }
      });
    }
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));