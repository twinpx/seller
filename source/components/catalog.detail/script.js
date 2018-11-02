( function($) {

  'use strict';
  
  $( function() {
    
    //ecommerce
    $( '.b-catalog-detail' ).trigger( 'detail.ecommerce' );
  
    //mobile props
    $( '.b-catalog-detail__props-slide' ).click( function(e) {
      $( '.b-catalog-detail__props' ).slideToggle();
    });
  
    //comments form
    /*$('#collapseCommentForm').click( function() {
      $( this ).hide();
    });*/
    $('#collapseCommentForm').on( 'show.bs.collapse', function () {
      
      $( '#collapseCommentButton' ).hide();
    
      $.ajax({
        url: $( '#collapseCommentButton' ).data( 'ajax-url' ),
        type: 'GET',
        dataType: "json",
        success: function(data) {
          if ( data && data.SUCCESS === 'Y' ) {
            for ( var key in data.value ) {
              $( '#collapseCommentForm form [name=' + key + ']' ).val( data.value[key]);
            }
          }
        },
        error: function() {}
      });
      
    });
    
    $('textarea.form-control').autosize();
  
		$( '#consentModal button.btn-default:first' ).click( function() {
			$( '#collapseCommentForm input:checkbox' ).prop('checked', true);
			$( '#consentModal .modal-header .close' ).click();
			//$( '#collapseCommentForm button[ type="submit" ]' ).addClass( 'i-available' );
		});
		$( '#consentModal button.btn-reset' ).click( function() {
			$( '#collapseCommentForm input:checkbox' ).prop('checked', false);
			$( '#consentModal .modal-header .close' ).click();
			//$( '#collapseCommentForm button[ type="submit" ]' ).removeClass( 'i-available' );
		});
		$( '#collapseCommentForm form' ).submit( function(e) {
			if ( $( '#collapseCommentForm input:checkbox' ).prop( 'checked' ) === false ) {
				$('#consentModal').modal('show');
			}
		});
    
    var json = $( '#register-user-conf label' ).data( 'bx-user-consent' );
    if ( typeof json === 'string' ) {
      json = json.replace( /&quot;/g, '"');
      json = JSON.parse( json );
    }
		var sessid = $( '#sessid' ).val();
		
		$('#consentModal').on( 'show.bs.modal', function (e) {
														  
		  $.ajax({
        url: json.actionUrl,
        type: "GET",
        dataType: "json",
        data: {
          id: json.id,
          sessid: sessid,
          action: "getText",
          sec: json.sec
        },
        success: function(data) {
          $( '#consentModal .modal-body' ).text( data.text );
        },
        error: function() {}
		  });
		  
		});
    
    //store buttons - an icon and a link
    $( '#catalogDetailFavLink, #catalogDetailFavIcon' ).click( function(e) {
      e.preventDefault();
      var $link = $( this );
      var $elems = $( '#catalogDetailFavLink, #catalogDetailFavIcon' );
      
      $.ajax({
        url: $link.data( 'ajax-url' ),
        type: 'GET',
        dataType: "json",
        data: 'id=' + $( '.b-catalog-detail' ).attr( 'data-id' ) + '&stored=' + $link.data( 'stored' ),
        success: function(data) {
          if ( data && data.STATUS === 'Y' ) {
            window.catalogDetailStoredProducts = window.catalogDetailStoredProducts || [];
            $( '#catalogDetailFavLink' ).find( 'span' ).toggleClass( 'hidden' );
            $( '#catalogDetailFavIcon' ).toggleClass( 'i-stored' );
            if ( $elems.data( 'stored' ) === 'N' ) {
              $elems.data({ stored: 'Y'});
              window.catalogDetailStoredProducts.push( $( '.b-catalog-detail' ).attr( 'data-id' ));
            } else {
              $elems.data({ stored: 'N'});
              window.catalogDetailStoredProducts.forEach( function( cur ) {
                if ( cur === $( '.b-catalog-detail' ).attr( 'data-id' )) {
                  window.catalogDetailStoredProducts.pop( cur );
                }
              });
            }
          }
        },
        error: function() {}
      });
      
    });
    
    //buy button
    $( '.b-catalog-detail__button-block .btn' ).click( function(e) {
      e.preventDefault();
      var $btn = $( this );
      
      $.ajax({
        url: $btn.data( 'ajax-url' ),
        type: 'GET',
        dataType: "json",
        data: 'id=' + $( '.b-catalog-detail' ).attr( 'data-id' ),
        success: function(data) {
          if ( data && data.STATUS === 'Y' ) {
            //num of the products in the store
            $( '#catalogDetailNum' ).text( data.num );
            $( 'div[data-id=' + $( '.b-catalog-detail' ).attr( 'data-id' ) + ']' ).data({ num: data.num });
            //num of the products in a cart
            $( '#bx_cart_num' ).text( data.cart );
          }
        },
        error: function() {}
      });
      
    });
    
    //buy modal window
    $( '#buyDetailModal' ).on( 'show.bs.modal', function (e) {
      var size = $( '.b-catalog-detail__sizes-item.i-active' ).text();
      var color = $( '.b-catalog-detail__colors-item.i-active' ).css( 'backgroundImage' );
      var colorClass = $( '.b-catalog-detail__colors-item.i-active' ).attr( 'class' );
      var $div = $( '#catalogDetailData div[ data-id=' + $( '.b-catalog-detail' ).attr( 'data-id' ) + ']' );
      var src = '';
      var srcString = '';
      
      if ( $div.data( 'big-photo' )) {
        srcString = String( $div.data( 'big-photo' ));
        src = srcString.substring( 0 , srcString.indexOf(';')) || srcString;
      } else if ( $div.data( 'photo' )) {
        srcString = String( $div.data( 'photo' ));
        src = srcString.substring( 0 , srcString.indexOf(';')) || srcString;
      }
      
      if ( src ) {
        $( '#buyDetailModal .b-buy-modal-img' ).html( '<img src="' + src + '" alt="">' );
      } else {
        $( '#buyDetailModal .b-buy-modal-img' ).html( '' );
      }
      
      $( '#buyDetailModal .b-buy-modal-text' ).html( '<h2>' + $( 'h1' ).text() + '</h2><p><span class="' + colorClass + '" style=\'background-image: ' + color + '; margin-bottom: 20px;\'></span><br>' + size + '</p>' );
    });
  
		$( '#buyDetailModal .btn-reset' ).click( function(e) {
      e.preventDefault();
			$( '#buyDetailModal .modal-header .close' ).click();
		});
    
    //one click link
    $( '#oneClick' ).on( 'show.bs.modal', function (e) {
      var $link = $( e.relatedTarget );
      
      $.ajax({
        url: $link.data( 'ajax-url' ),
        type: 'GET',
        dataType: "html",
        data: 'id=' + $( '.b-catalog-detail' ).attr( 'data-id' ),
        success: function(data) {
          if ( data ) {
            $( '#oneClick form' ).remove();
            $( '#oneClick .modal-header' ).after( data );
          }
        },
        error: function( a,b,c ) {
          console.log(a);
          console.log(b);
          console.log(c);
        }
      });
    });
    
    $( '#oneClick' ).delegate( 'form', 'submit', function(e) {
    
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
            $body.empty().append( '<p class="text-center">' + data.MESSAGE + '</p>' );
            $body.height( $body.find( 'p' ).height());
            
            $( '#oneClick .modal-footer .btn' ).hide();
            $( '#oneClick .modal-footer .i-gray' ).show();
            //ecommerce event trigger
            $( '#oneClick' ).trigger( 'onClickSuccess.ecommerce' );
          }
        },
        error: function( a,b,c ) {
          console.log(a);
          console.log(b);
          console.log(c);
        }
      });
    });
  
    setTimeout( function() {
      $( 'body' ).addClass( 'i-load' );
    }, 100);
    
    //subscribe form
    $( '.b-catalog-detail__subscribe-block form' ).submit( function(e) {
    
      e.preventDefault();
      var $form = $( this );
      $( '#tpid' ).val( $( '.b-catalog-detail' ).attr( 'data-id' ));
      
      $.ajax({
        url: $form.attr( 'action' ),
        type: $form.attr( 'method' ),
        dataType: "json",
        data: $form.serialize(),
        success: function(data) {
        
          if ( !data ) {
            return;
          }
          
          $form.addClass( 'hidden' );
          
          if ( data && data.STATUS === 'Y' ) {
            $form.siblings( '.b-message' ).removeClass( 'i-warning' ).removeClass( 'hidden' );
          } else if ( data && data.STATUS === 'E' && data.MESSAGE ) {
            $form.siblings( '.b-message' ).addClass( 'i-warning' ).removeClass( 'hidden' ).find( 'span' ).text( data.MESSAGE );
          }
          
          setTimeout( function() {
            $form.removeClass( 'hidden' );
            $form.siblings( '.b-message' ).removeClass( 'i-warning' ).addClass( 'hidden' );
          }, 3000);
          
        },
        error: function( a,b,c ) {
          console.log(a);
          console.log(b);
          console.log(c);
        }
      });
    });
  
    //click zoom
    $( '.b-catalog-detail__gallery .fotorama' ).on( 'fotorama:fullscreenexit', createGallery );
    
    $( '.b-catalog-detail__icons .b-icon-zoom' ).click( function() {
      
      var images = '',
          srcBigArray;
    
      try {
        srcBigArray = $activeDataDiv.data( 'big-photo' ).split( ';' );
      } catch(e) {
        srcBigArray = $activeDataDiv.data( 'photo' ).split( ';' );
      }
      
      srcBigArray.forEach( function( cur, i, arr ) {
        images += '<div><img src="' + cur + '" alt="" ></div>';     
      });
      
      if ( $( '.b-catalog-detail__gallery .fotorama' ).length ) {
        $( '.b-catalog-detail__gallery .fotorama' ).data( 'fotorama' ).destroy();
        $( '.b-catalog-detail__gallery .fotorama' ).empty().html( images );
        //video
        if ( document.getElementById( 'catalogDetailVideo' )) {
          $( '.b-catalog-detail__gallery .fotorama' ).prepend( $( '#catalogDetailVideo' ).html());
        }
        //fotorama
        $( '.b-catalog-detail__gallery .fotorama' ).fotorama().data( 'fotorama' ).requestFullScreen();
      }
      
    });
    
    function createGallery() {
      var images = '';
      var srcArray = [];
      var srcBigArray;
        
      //photo
      if ( $activeDataDiv.data( 'photo' )) {
        srcArray = $activeDataDiv.data( 'photo' ).split( ';' );
      }
      
      srcBigArray = srcArray;
      
      try {
        srcBigArray = $activeDataDiv.data( 'big-photo' ).split( ';' );
      } catch(e) {
        srcBigArray = undefined;
      }
      
      srcArray.forEach( function( cur, i, arr ) {
        if ( srcBigArray ) {
          images += '<div data-thumb="' + cur + '"><a href="' + srcBigArray[i] + '"><img src="' + cur + '" alt=""';
          if ( $( '.b-catalog-detail__gallery' ).data( 'magnifier' ) === true ) {
            images += ' data-magnify-src="' + srcBigArray[i] + '" ></a></div>';
          } else {
            images += '></a></div>';
          }
        } else {
          images += '<img src="' + cur + '" alt="" >';
        }        
      });
      
      if ( $( '.b-catalog-detail__gallery .fotorama' ).length ) {
        $( '.b-catalog-detail__gallery .fotorama' ).data( 'fotorama' ).destroy();
        $( '.b-catalog-detail__gallery .fotorama' ).empty().html( images );
        //video
        if ( document.getElementById( 'catalogDetailVideo' )) {
          $( '.b-catalog-detail__gallery .fotorama' ).prepend( $( '#catalogDetailVideo' ).html());
        }
        //fotorama
        $( '.b-catalog-detail__gallery .fotorama' )
          .on( 'fotorama:showend', function(e, fotorama, extra) {
            if ( window.matchMedia( "(min-width: 768px)" ).matches ) {
              fotorama.activeFrame.$stageFrame.find( 'img[data-magnify-src]' ).magnify();
            }            
          })
          .fotorama();
      } else {
        $( '.b-catalog-detail__gallery img[data-magnify-src]' ).magnify();
      }
      
    }
    
    $( '.b-catalog-detail__gallery' ).delegate( '.fotorama__html a', 'click', function(e) {
      e.preventDefault();
    });
    
    //products script
    
    var $dataDivs = $( '#catalogDetailData div' ),
        $activeDataDiv = $dataDivs.eq(0);
    
    //click colors
    $( '.b-catalog-detail__colors-block' ).delegate( '.b-catalog-detail__colors-item', 'click', function() {
      
      //highlite
      $( '.b-catalog-detail__colors-item' ).removeClass( 'i-active' );
      $( this ).addClass( 'i-active' );
      
      if ( $( '.b-catalog-detail__sizes-block' ).length ) {
        setDisabledSizes( this );//set disabled sizes
        setDisabledColors( $( '.b-catalog-detail__sizes-item.i-active' ));//set disabled colors
      } else {
        //show offer
        $dataDivs.each( function() {
          if ( $( '.b-catalog-detail__colors-item.i-active').length && $( '.b-catalog-detail__colors-item.i-active').css( 'backgroundImage' ).search( $( this).data( 'color-color_ref' )) !== -1 ) {
            $activeDataDiv = $( this );
            showOffer( $activeDataDiv );
          }
        });
      }
      
    });
    
    //click sizes
    $( '.b-catalog-detail__sizes-block' ).delegate( '.b-catalog-detail__sizes-item', 'click', function() {
      var $this = $( this );
    
      //highlite
      $( '.b-catalog-detail__sizes-item' ).removeClass( 'i-active' );
      $( this ).addClass( 'i-active' );
      
      //set cookie
      if ( window.Cookies ) {
        Cookies.set( 'size', $( this ).text(), { expires: 365, path: window.location.href });
      }
      
      if ( $( '.b-catalog-detail__colors-block' ).length ) {
        setDisabledColors( this );//set disabled colors
        setDisabledSizes( $( '.b-catalog-detail__colors-item.i-active' ));//set disabled sizes
      } else {
        $dataDivs.each( function() {
          if ( $( '.b-catalog-detail__sizes-item.i-active').length && ( $( this).data( 'list-sizes_shoes' )+'' ) === $( '.b-catalog-detail__sizes-item.i-active').text()) {
            $activeDataDiv = $( this );
            showOffer( $activeDataDiv );
          }
        });
      }
      
    });
    
    if ( $dataDivs.length ) {
      showAllProperties();
      showFirstOffer();
    }
    
    $( '.b-catalog-detail__size-table-link a, #sizeIcon' ).sideNav({
      menuWidth: '60%'
    });
    
    $( '#commentsIcon' ).click( function() {
      var $commentsTab = $( '.b-tabs__tab[ data-tab="comments" ]' );
      if ( $commentsTab.hasClass( 'i-active' )) {
        $.scrollTo( $( '.b-tabs' ), 500 );
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
         /*$( this ).find( 'option:eq(' + n + ')' ).attr({ selected: 'selected' });
         $( this ).find( 'option:eq(' + n + ')' )[0].setAttribute( 'selected', 'selected' );*/
         $( this ).find( 'option:eq(' + n + ')' )[0].selected=true;
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
          menuWidth: '80%'
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
      
      $dataDivs.each( function() {
        var flag = true;
        var $this = $( this );
        
        colorsArray.forEach( function( cur, i, arr ) {
          if ( !$this.data( 'color-color_ref' ) || cur === $this.data( 'color-color_ref' )) {
            flag = false;
            return;
          }
        });
        
        if ( flag && !!$( this ).data( 'color-color_ref' )) {
          colorsArray.push( $( this ).data( 'color-color_ref' ));
        }
      });
      
      if ( !colorsArray.length ) {
        $( '.b-catalog-detail__colors-block' ).next( 'hr' ).remove();
        $( '.b-catalog-detail__colors-block' ).remove();
      } else {
        colorsArray.forEach( function( cur, i, arr ) {
      
          var $item = $( '<span class="b-catalog-detail__colors-item" style="background-image: url( \'' + cur + '\' )"><span></span></span>' );
          
          var img = document.createElement('img');
          
          img.setAttribute( 'src', cur );
          img.addEventListener( 'load', function() {
            var vibrant = new Vibrant(img);
            if ( vibrant.isWhiteImage ) {
              $item.addClass( 'i-white' );
            }
          });
          
          $( '.b-catalog-detail__colors-block' ).append( $item );
        });
      }
      
      //create sizes
      $( '.b-catalog-detail__sizes-block' ).empty();
      var sizesArray = [];
      
      $dataDivs.each( function() {
        var flag = true;
        var $this = $( this );
        
        sizesArray.forEach( function( cur, i, arr ) {
          if ( !$this.data( 'list-sizes_shoes' ) || cur === $this.data( 'list-sizes_shoes' )) {
            flag = false;
            return;
          }
        });
        
        if ( flag && !!$( this ).data( 'list-sizes_shoes' )) {
          sizesArray.push( $( this ).data( 'list-sizes_shoes' ));
        }
      });
      
      if ( !sizesArray.length ) {
        $( '.b-catalog-detail__sizes-block' ).prev( 'hr:not(.i-line)' ).remove();
        $( '.b-catalog-detail__sizes-block' ).remove();
      } else {
        sizesArray.forEach( function( cur, i, arr ) {
          $( '.b-catalog-detail__sizes-block' ).append( '<span class="b-catalog-detail__sizes-item"><span>' + cur + '</span></span>' );
        });
      }
    
    }
    
    function showFirstOffer() {
      if ( $dataDivs.length === 1 ) {
        $activeDataDiv = $dataDivs;
        showOffer( $activeDataDiv );
        return;
      }
    
      //page load
      var query = {};
      
      if ( window.location.search ) {
        query = parseQuery( window.location.search );
      }
      
      if ( query.product_id && $( '#catalogDetailData div[data-id=' + query.product_id + ']' ).length ) {
        $activeDataDiv = $( '#catalogDetailData div[data-id=' + query.product_id + ']' );
        showOffer( $activeDataDiv );
      } else {
    
        //get size by default
        var sizeCookie;
        var sizeFlag = false;
        
        if ( $( '.b-catalog-detail__sizes-item:eq(0)').length ) {
          if ( window.Cookies && Cookies.get( 'size' )) {
            sizeCookie = Cookies.get( 'size' );
          } else {
            sizeCookie = $( '.b-catalog-detail__sizes-item:eq(0)').text();
          }
        
          //if there is the cookie, but there is no such offer with that size
          $( '.b-catalog-detail__sizes-item' ).each( function() {
            var $size = $( this );
            if ( !sizeFlag ) {
              if ( $size.text() === sizeCookie ) {
                sizeFlag = true;
              }
            }
          });
          
          if ( !sizeFlag ) {
            sizeCookie = $( '.b-catalog-detail__sizes-item:eq(0)').text();
          }
        }
        
        //show offer
        var flag = false;
        
        if ( $( '.b-catalog-detail__colors-item' ).length ) {
          if ( $( '.b-catalog-detail__sizes-item' ).length ) {//colors & sizes
          
            $dataDivs.each( function() {
              var $div = $( this );
              $( '.b-catalog-detail__colors-item' ).each( function() {
                var $color = $( this );
                if ( $color.css( 'backgroundImage' ).search( $div.data( 'color-color_ref' )) !== -1 && $div.data( 'list-sizes_shoes' )+''  === (sizeCookie+'') ) {
                  if ( !flag ) {
                    $activeDataDiv = $div;
                    showOffer( $activeDataDiv );
                    flag = true;
                  }
                }
              });
            });
            
          } else {//colors only
          
            $dataDivs.each( function() {
              var $div = $( this );
              $( '.b-catalog-detail__colors-item' ).each( function() {
                var $color = $( this );
                if ( $color.css( 'backgroundImage' ).search( $div.data( 'color-color_ref' )) !== -1 ) {
                  if ( !flag ) {
                    $activeDataDiv = $div;
                    showOffer( $activeDataDiv );
                    flag = true;
                  }
                }
              });
            });
            
          }
        } else {
          if ( $( '.b-catalog-detail__sizes-item' ).length ) {//sizes only
          
            $dataDivs.each( function() {
              var $div = $( this );
              if ( $div.data( 'list-sizes_shoes' )+''  === ( sizeCookie+'' )) {
                if ( !flag ) {
                  $activeDataDiv = $div;
                  showOffer( $activeDataDiv );
                  flag = true;
                }
              }
            });
            
          } else {//no colors, no sizes
            if ( !flag ) {
              $activeDataDiv = $dataDivs.eq(0);
              showOffer( $activeDataDiv );
              flag = true;
            }
          }
        }
        
      }
        
      if ( $( '.b-catalog-detail__sizes-item.i-active' ).length && $( '.b-catalog-detail__colors-item.i-active' ).length) {
        setDisabledColors( $( '.b-catalog-detail__sizes-item.i-active' ));//set disabled colors
        setDisabledSizes( $( '.b-catalog-detail__colors-item.i-active' ));//set disabled sizes
      }
        
    }
    
    var product_id = '';// id for the statistics ajax request
    
    function showOffer( $div ) {
      //id
      $( '.b-catalog-detail' ).attr({ 'data-id': $div.data( 'id' )});
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
      var srcArray = [];
      var srcBigArray;
        
      //photo
      if ( $div.data( 'photo' )) {
        srcArray = $div.data( 'photo' ).split( ';' );
      }
      
      srcBigArray = srcArray;
      
      try {
        srcBigArray = $div.data( 'big-photo' ).split( ';' );
      } catch(e) {
        srcBigArray = undefined;
      }
      
      srcArray.forEach( function( cur, i, arr ) {
        if ( srcBigArray ) {
          images += '<div data-thumb="' + cur + '"><a href="' + srcBigArray[i] + '"><img src="' + cur + '" alt=""';
          if ( $( '.b-catalog-detail__gallery' ).data( 'magnifier' ) === true ) {
            images += ' data-magnify-src="' + srcBigArray[i] + '" ></a></div>';
          } else {
            images += '></a></div>';
          }
        } else {
          images += '<img src="' + cur + '" alt="" >';
        }        
      });
      
      
      if ( $( '.b-catalog-detail__gallery .fotorama' ).length ) {
        $( '.b-catalog-detail__gallery .fotorama' ).data( 'fotorama' ).destroy();
        $( '.b-catalog-detail__gallery .fotorama' ).empty().html( images );
        //video
        if ( document.getElementById( 'catalogDetailVideo' )) {
          $( '.b-catalog-detail__gallery .fotorama' ).prepend( $( '#catalogDetailVideo' ).html());
        }
        //fotorama
        $( '.b-catalog-detail__gallery .fotorama' )
          .on( 'fotorama:showend', function(e, fotorama, extra) {
            if ( window.matchMedia( "(min-width: 768px)" ).matches ) {
              fotorama.activeFrame.$stageFrame.find( 'img[data-magnify-src]' ).magnify();
            }            
          })
          .fotorama();
      } else {
        $( '.b-catalog-detail__gallery img[data-magnify-src]' ).magnify();
      }
      
      //properties
      $( '.b-catalog-detail__props .text-muted span' ).each( function() {
        if ( $( this).attr( 'class' ).search( 'catalogDetailProperty' ) !== -1 ) {
          $( this ).parent().addClass( 'hidden' );
        }
      });
      for ( var key in $div.data()) {
        if ( key.search( 'property' ) !== -1 ) {
          $( '.catalogDetailP' + key.substring(1)).text( $div.data( key )).parent().removeClass( 'hidden' );
        }
      }
      //price
      if ( $( '.b-catalog-detail__price' ).length ) {
        if ( $div.data( 'price' )) {
          $( '.b-catalog-detail__price' ).show().text( $div.data( 'price' ) || '' );
        } else {
          $( '.b-catalog-detail__price' ).hide();
        } 
      }
      //old price
      if ( $( '.b-catalog-detail__old-price' ).length ) {
        if ( $div.data( 'old-price' )) {
          $( '.b-catalog-detail__old-price' ).show().find( 's' ).text( $div.data( 'old-price' ));
        } else {
          $( '.b-catalog-detail__old-price' ).hide();
        }
      }
      //discount
      var discountText = $( '.b-catalog-detail__benefit span' ).text();
      if ( $div.data( 'discount-diff' )) {
        $( '.b-catalog-detail__benefit' ).show().html( $div.data( 'discount-diff' ) + '<span>' + discountText + '</span>' );
      } else {
        $( '.b-catalog-detail__benefit' ).hide();
      }
      //num
      try {
        $( '#catalogDetailNum' ).text( $div.data( 'num' ));
        if ( ($div.data( 'num' )+'') === "0" ) {
          $( '.b-catalog-detail__num__y' ).addClass( 'hidden' );
          $( '.b-catalog-detail__num__n' ).removeClass( 'hidden' );
        } else {
          $( '.b-catalog-detail__num__y' ).removeClass( 'hidden' );
          $( '.b-catalog-detail__num__n' ).addClass( 'hidden' );
        }
      } catch(e) {}
      //discount icon
      try {
        $( '.b-icon-discount' ).text( $div.data( 'discount-percent' ));
      } catch(e) {}
      //stored
      try {
        window.catalogDetailStoredProducts = window.catalogDetailStoredProducts || [];
        var stored = window.catalogDetailStoredProducts.some( function( cur, index, array ) {
          return cur+'' === $div.data( 'id' )+'';
        });
        
        if ( stored ) {
          stored = 'Y';
          $( '#catalogDetailFavLink span' ).addClass( 'hidden' );
          $( '#catalogDetailFavLink span.i-stored' ).removeClass( 'hidden' );
          $( '#catalogDetailFavIcon' ).addClass( 'i-stored' );
        } else {
          stored = 'N';
          $( '#catalogDetailFavLink span' ).removeClass( 'hidden' );
          $( '#catalogDetailFavLink span.i-stored' ).addClass( 'hidden' );
          $( '#catalogDetailFavIcon' ).removeClass( 'i-stored' );
        }
        
        $( '#catalogDetailFavLink, #catalogDetailFavIcon' ).data({ stored: stored });
      } catch(e) {}
      
      //availability
      try {
        if ( $div.data( 'available' ) === 'Y' ) {
          $( '.b-catalog-detail__button-block' ).show();
          $( '.b-catalog-detail__subscribe-block' ).addClass( 'hidden' );
        } else {
          $( '.b-catalog-detail__button-block' ).hide();
        }
      } catch(e) {}
      
      //subscribe
      try {
        if ( $div.data( 'subscribe' ) === 'Y' && $div.data( 'available' ) !== 'Y' ) {
          $( '.b-catalog-detail__button-block' ).hide();
          $( '.b-catalog-detail__subscribe-block' ).removeClass( 'hidden' );
        } else if ( $div.data( 'subscribe' ) !== 'Y' && $div.data( 'available' ) !== 'Y' ) {
          $( '.b-catalog-detail__button-block' ).hide();
          $( '.b-catalog-detail__subscribe-block' ).addClass( 'hidden' );
        }
      } catch(e) {}
      
      //send statistics request
      try {
        var $data = $( '.b-statistics-data' );
        var query = {};
        var locationSearch = '?';
        
        if ( product_id === $div.data( 'id' )) {
          return;
        } else {
          //send statistics request
          product_id = $div.data( 'id' );
          
          $.ajax({
            url: $data.data( 'url' ),
            type: $data.data( 'method' ),
            dataType: "html",
            data: $data.data( 'data' ) + '&PRODUCT_ID=' + product_id,
            error: function(a, b, c) {
              if ( window.console ) {
                console.log(a);
                console.log(b);
                console.log(c);
              }
            }
          });
        }
        
        //set URL
        try {
          if ( window.location.search ) {
            query = parseQuery( window.location.search );
          }
          
          query.product_id = $div.data( 'id' );
          
          for ( var k in query ) {
            locationSearch += k + '=' + query[ k ] + '&';
          }
          
          locationSearch = String( locationSearch ).substring( 0, locationSearch.length-1 );
          
          if ( window.history ) {
            history.replaceState({}, '', locationSearch );
          }
        } catch(e) {}
      } catch(e) {}
      
    }
    
    function setDisabledColors( item ) {
      if ( !$( '.b-catalog-detail__colors-block' ).length) {
        return;
      }
      var $item = $( item );
      var size = $item.text();
      var colorsArray = [];
      
      $dataDivs.each( function() {
        var $this = $( this );
        
        if ( ($this.data( 'list-sizes_shoes' ) + '') === size ) {
          colorsArray.push({ color: $this.data( 'color-color_ref' ), available: $this.data( 'available' ), subscribe: $this.data( 'subscribe' ) });
        }
      });
      
      $( '.b-catalog-detail__colors-item' ).each( function() {
        var flag = false;
        var $item = $( this );
        colorsArray.forEach( function( cur, i, arr ) {
          if ( $item.css( 'backgroundImage' ).search( cur.color ) !== -1 && (cur.available === 'Y' || cur.subscribe === 'Y')) {
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
      if ( $( '.b-catalog-detail__colors-item.i-active' ).length && $( '.b-catalog-detail__colors-item.i-active' ).hasClass( 'i-disabled' )) {
        $( '.b-catalog-detail__colors-item.i-active' ).removeClass( 'i-active' );
        if ( $( '.b-catalog-detail__colors-item:not( .i-disabled ):eq(0)' ).length ) {
          $( '.b-catalog-detail__colors-item:not( .i-disabled ):eq(0)' ).addClass( 'i-active' );
        }
      }
      
      //show offer
      $dataDivs.each( function() {
      
        if ( $( '.b-catalog-detail__colors-item.i-active' ).length && $( '.b-catalog-detail__sizes-item.i-active').length ) {
          if ( $( '.b-catalog-detail__colors-item.i-active' ).css( 'backgroundImage' ).search( $( this).data( 'color-color_ref' )) !== -1 && ( $( this).data( 'list-sizes_shoes' )+'' ) === $( '.b-catalog-detail__sizes-item.i-active').text()) {
            $activeDataDiv = $( this );
            showOffer( $activeDataDiv );
          }
        } else if ( $( '.b-catalog-detail__colors-item.i-active').length ) {
          if ( $( '.b-catalog-detail__colors-item.i-active').css( 'backgroundImage' ).search( $( this).data( 'color-color_ref' )) !== -1 ) {
            $activeDataDiv = $( this );
            showOffer( $activeDataDiv );
          }
        } else if ( $( '.b-catalog-detail__sizes-item.i-active').length ) {
          if ( ( $( this).data( 'list-sizes_shoes' )+'' ) === $( '.b-catalog-detail__sizes-item.i-active').text() ) {
            $activeDataDiv = $( this );
            showOffer( $activeDataDiv );
          }
        }
         
      });
    }
    
    function setDisabledSizes( item ) {
      if ( !$( '.b-catalog-detail__sizes-block' ).length) {
        return;
      }
      var $item = $( item );
      var color = $item.css( 'backgroundImage' );
      var sizesArray = [];
      
      $dataDivs.each( function() {
        var $this = $( this );
        
        if ( color.search( $this.data( 'color-color_ref' )) !== -1 ) {
          sizesArray.push({ size: $this.data( 'list-sizes_shoes' ), available: $this.data( 'available' ), subscribe: $this.data( 'subscribe' ) });
        }
      });
      
      $( '.b-catalog-detail__sizes-item' ).each( function() {
      
        var flag = false;
        var flagSubscribe = false;
        var $item = $( this );
        
        sizesArray.forEach( function( cur ) {
          if ( $item.text() === ( cur.size + '' )) {
            if ( cur.available === 'Y' ) {
              flag = true;
            } else if ( cur.subscribe === 'Y' ) {
              flagSubscribe = true;
            }              
          }
        });
        
        if ( flag ) {
          $item.removeClass( 'i-disabled' );
        } else {
          $item.addClass( 'i-disabled' );
        }
          
        if ( flagSubscribe ) {
          $item.addClass( 'i-subscribe' ).removeClass( 'i-disabled' );
        } else {
          $item.removeClass( 'i-subscribe' );
        }
        
      });
      
      //set active from enabled
      if ( $( '.b-catalog-detail__sizes-item.i-active' ) && $( '.b-catalog-detail__sizes-item.i-active' ).hasClass( 'i-disabled' )) {
        $( '.b-catalog-detail__sizes-item.i-active' ).removeClass( 'i-active' );
        if ( $( '.b-catalog-detail__sizes-item:not( .i-disabled ):eq(0)' ).length ) {
          $( '.b-catalog-detail__sizes-item:not( .i-disabled ):eq(0)' ).addClass( 'i-active' );
        }
      }
      
      //show offer
      $dataDivs.each( function() {
        try {
          var background = $( '.b-catalog-detail__colors-item.i-active').css( 'backgroundImage' );
          var color = $( this).data( 'color-color_ref' );
          var size = $( this).data( 'list-sizes_shoes' )+'';
          var activeSize = $( '.b-catalog-detail__sizes-item.i-active').text();
          
          if ( background.search( color ) !== -1 && size === activeSize ) {
            $activeDataDiv = $( this );
            showOffer( $activeDataDiv );
          }
        } catch(e) {}
      });
    }
    
		function parseQuery( queryString ) {
		  var query = {};
		  var pairs = ( queryString[0] === '?' ? queryString.substr(1) : queryString ).split('&');
		  for ( var i = 0; i < pairs.length; i++ ) {
			  var pair = pairs[i].split( '=' );
			  query[ decodeURIComponent( pair[0]) ] = decodeURIComponent( pair[1] || '' );
		  }
		  return query;
		} 
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));