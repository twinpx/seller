( function($) {

  'use strict';
  
  $( function() {
  
    $( "#seller-tuner-icon" ).sideNav({
      onOpen: function( elem ) {
        $( '.b-seller-tuner' ).addClass( 'i-open' );
        setTimeout( function() {
          $( '.b-seller-tuner__content .i-active' ).addClass( 'i-anim' );
        }, 400);
        //$( '.b-seller-tuner__menu, .b-seller-tuner__content' ).niceScroll();
      },
      onClose: function() {
        $( '.b-seller-tuner' ).removeClass( 'i-open' );
        $( '.b-seller-tuner__content .i-anim' ).removeClass( 'i-anim' );
      }
    });
  
    //Cookie
    function setCookie( name, subname, value ) {
      var cookie = Cookies.get( 'tunerStyles' ) || '{}';
      cookie = JSON.parse( cookie );
      
      if ( typeof cookie[ name ] === 'object' ) {
        cookie[ name ][ subname] = value;
      } else {
        cookie[ name ] = value;
      }
      
      Cookies.set( 'tunerStyles', JSON.stringify( cookie ));
    }
      
    //colorpicker
    var colorpickerComponents = { preview: true, hue: true, interaction: { input: true, clear: true, save: true } };
    var colorpickerStrings = { save: 'Сохранить', clear: 'Очистить' };
    
    //colorpicker colors
    var pickrColors = Pickr.create({
        el: '.b-seller-tuner__colors .b-colorpicker div',
        default: 'f5f5f5',
        onSave: function( hsva ) {
          if ( hsva ) {
            var color = hsva.toRGBA();
            //highlite
            $( '#seller-tuner .b-seller-tuner__colors .b-seller-tuner__block .b-item' ).removeClass( 'i-active' );
            
            //ajax
            colorAjax( color.toString().split(' ').join(''));
            
            //is dark
            if ( ( color[0] * 0.8 + color[1] + color[2] * 0.2) / 510 * 100 < 50 ) {
              $( '.b-seller-tuner__colors .pcr-button' ).addClass( 'i-dark' );
            } else {
              $( '.b-seller-tuner__colors .pcr-button' ).removeClass( 'i-dark' );
            }
          } else {//reset
            
            //ajax
            var defaultColor = $( '.b-seller-tuner__colors .b-colorpicker' ).data( 'default' );
            colorAjax( defaultColor );
            
            $( '.b-seller-tuner__colors .pcr-button' ).css({ background: '#' + defaultColor });
            
            //is dark
            if (( parseInt( defaultColor.substring( 0,2 )) * 0.8 + parseInt( defaultColor.substring( 2,4 )) + parseInt( defaultColor.substring( 4,6 )) * 0.2) / 510 * 100 < 50 ) {
              $( '.b-seller-tuner__colors .pcr-button' ).addClass( 'i-dark' );
            } else {
              $( '.b-seller-tuner__colors .pcr-button' ).removeClass( 'i-dark' );
            }
          }
        },

        components: colorpickerComponents,
        strings: colorpickerStrings
    });
    $( '.b-seller-tuner__colors .pcr-button' ).css({ background: '#' + $( '.b-seller-tuner__colors .b-colorpicker' ).data( 'default' )});
    $( '.b-seller-tuner__colors .pcr-result' ).val( '#' + $( '.b-seller-tuner__colors .b-colorpicker' ).data( 'default' ));
    
    //colorpicker tags
    var pickrDiscount = Pickr.create({
        el: '.i-discount .b-colorpicker div',
        default: 'ea4b4b',
        onSave: function( hsva ) {
          //remove bg
          $( '.i-discount .b-colorpicker' ).css({ background: 'transparent' });
          
          if ( hsva ) {
            var color = hsva.toRGBA();
            
            //ajax
            discountAjax( color.toString().split(' ').join(''));
            
            //is dark
            if ( ( color[0] * 0.8 + color[1] + color[2] * 0.2) / 510 * 100 < 50 ) {
              $( '.i-discount .pcr-button' ).addClass( 'i-dark' );
            } else {
              $( '.i-discount .pcr-button' ).removeClass( 'i-dark' );
            }
          } else {//reset
            
            //ajax
            discountAjax( 'ea4b4b' );
            
            $( '.i-discount .pcr-button' ).removeClass( 'i-dark' );
          }
        },

        components: colorpickerComponents,
        strings: colorpickerStrings
    });
    
    var pickrHit = Pickr.create({
        el: '.i-hit .b-colorpicker div',
        default: 'ea4b4b',
        onSave: function( hsva ) {
          //remove bg
          $( '.i-hit .b-colorpicker' ).css({ background: 'transparent' });
          
          if ( hsva ) {
            var color = hsva.toRGBA();
            
            //ajax
            discountAjax( color.toString().split(' ').join(''));
            
            //is dark
            if ( ( color[0] * 0.8 + color[1] + color[2] * 0.2) / 510 * 100 < 50 ) {
              $( '.i-hit .pcr-button' ).addClass( 'i-dark' );
            } else {
              $( '.i-hit .pcr-button' ).removeClass( 'i-dark' );
            }
          } else {//reset
            
            //ajax
            discountAjax( 'ea4b4b' );
            
            $( '.i-hit .pcr-button' ).removeClass( 'i-dark' );
          }
        },

        components: colorpickerComponents,
        strings: colorpickerStrings
    });
  
    //tabs
    $( '.b-seller-tuner__menu a' ).click( function(e) {
      e.preventDefault();
      
      //highlight
      $( '.b-seller-tuner__menu a' ).removeClass( 'i-active' );
      $( this ).addClass( 'i-active' );
      
      //show tab
      $( '.b-seller-tuner__content [data-tab]' ).removeClass( 'i-active' ).removeClass( 'i-anim' );
      var $tab = $( '.b-seller-tuner__content [data-tab=' + $( this ).attr( 'href' ) + ']' );
      $tab.addClass( 'i-active' );
      setTimeout( function() {
        $tab.addClass( 'i-anim' );
      }, 50);
    });
    
    //Colors
    $( '#seller-tuner .b-seller-tuner-close' ).click( function(e) {
      e.preventDefault();
      $('#seller-tuner-icon').sideNav( 'hide' );
    });
    
    $( '#seller-tuner .b-seller-tuner__colors .b-seller-tuner__block .b-item' ).click( function(e) {
      e.preventDefault();
      
      var $color = $( this );
      
      //highlite
      $( '#seller-tuner .b-seller-tuner__colors .b-seller-tuner__block .b-item' ).removeClass( 'i-active' );
      $color.addClass( 'i-active' );
      
      //ajax
      colorAjax( $color.css( 'backgroundColor' ).split( ' ' ).join( '' ));
    });
    
    function colorAjax( color ) {
      //send info
      $.ajax({
        url: '/components/tuner/color.json',
        type: 'GET',
        dataType: "json",
        data: "color=" + color,
        success: function(data) {
          if ( data && data.STATUS && data.STATUS === 'Y' ) {
            $( 'head' ).append( '<style class="tuner">' + data.RESULT + '</style>' );
            setCookie( 'color', undefined, color );
            //input value
            $( '#global-color' ).val( color );
          }
        },
        error: function( a, b, c ) {
          if ( window.console ) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        }
      });
    }
    
    function tagAjax( color ) {
      //send info
      $.ajax({
        url: '/components/tuner/tags.json',
        type: 'GET',
        dataType: "json",
        data: "color=" + color,
        success: function(data) {
          if ( data && data.STATUS && data.STATUS === 'Y' ) {
            $( 'style.tuner-tags' ).remove();
            $( 'head' ).append( '<style class="tuner-tags">' + data.RESULT + '</style>' );
            //setCookie( 'color', undefined, color );
            //input value
            $( '#global-discount-color' ).val( color );
          }
        },
        error: function( a, b, c ) {
          if ( window.console ) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        }
      });
    }
    
    //Font
    $( '#seller-tuner .b-seller-tuner__fonts .b-seller-tuner__block div' ).click( function(e) {
      e.preventDefault();
      
      var $font = $( this );
      var font = $font.text();
      
      //highlite
      $( '#seller-tuner .b-seller-tuner__fonts .b-seller-tuner__block div' ).removeClass( 'i-active' );
      $font.addClass( 'i-active' );
      
      $.ajax({
        url: '/components/tuner/font.json',
        type: 'GET',
        dataType: "json",
        data: "font=" + font,
        success: function( data ) {
          if ( data && data.STATUS && data.STATUS === 'Y' ) {
            $( 'head' ).append( '<style>' + data.RESULT + '</style>' );
            setCookie( 'font', undefined, font );
            //input value
            $( '#global-font' ).val( font );
          }
        },
        error: function( a, b, c ) {
          if ( window.console ) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        }
      });
    });
    
    //Tags
    /*$( '#seller-tuner .b-tag-color' ).click( function(e) {
      e.preventDefault();
      
      var $tag = $( this );
      var color = $tag.css( 'backgroundColor' ).split( ' ' ).join( '' );
      
      //highlite
      $( '#seller-tuner .b-tag-color' ).removeClass( 'i-active' );
      $tag.addClass( 'i-active' );
      
      $.ajax({
        url: '/components/tuner/tags.json',
        type: 'GET',
        dataType: "json",
        data: "discount=" + color,
        success: function( data ) {
          if ( data && data.STATUS && data.STATUS === 'Y' ) {
            $( 'head' ).append( '<style>' + data.RESULT + '</style>' );
            setCookie( 'tags', 'discount', color );
            //input value
            $( '#global-discount-color' ).val( color );
          }
        },
        error: function( a, b, c ) {
          if ( window.console ) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        }
      });
    });*/
    
    //Headers
    $( '.b-seller-tuner__headers .b-seller-tuner__img' ).click( function(e) {
      e.preventDefault();
      $( '#headers' ).val( $( this ).data( 'value' ));
      $( '#seller-tuner form' ).submit();
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));