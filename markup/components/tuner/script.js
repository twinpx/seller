( function($) {

  'use strict';
  
  $( function() {
    
    //Cookies.remove( 'sellerTuner' );
  
    //set niceScroll
    $( '.b-seller-tuner__menu, .b-seller-tuner__content' ).niceScroll({
      cursorcolor: "#dddddd",
      cursorwidth: "7px",
      railoffset: "100px"
    });
    
    //open close tuner
    $( "#seller-tuner-icon" ).sideNav({
      onOpen: function( elem ) {
        
        //blur the page
        document.querySelector( 'html' ).classList.add( 'i-blur' );
        
        $( '.b-seller-tuner' ).addClass( 'i-open' );
        setTimeout( function() {
          $( '.b-seller-tuner__content .i-active' ).addClass( 'i-anim' );
        }, 400);
        setTimeout( function() {
          $( '#seller-tuner' ).removeClass( 'i-no-transition' );
        }, 500);
        //set the cookie
        //Cookies.set( 'tunerOpen', 'Y' );
        //open tab
        /*if ( Cookies.get( 'tunerTab' )) {
          $( '.b-seller-tuner__menu a[href=' + Cookies.get( 'tunerTab' ) + ']' ).click();
        }*/
        //scroll
        if ( Cookies.get( 'tunerScroll' )) {
          $( '.b-seller-tuner__content' ).scrollTo( Cookies.get( 'tunerScroll' ));
        }
      },
      onClose: function() {
        
        //focus the page
        document.querySelector( 'html' ).classList.remove( 'i-blur' );
        
        $( '.b-seller-tuner' ).removeClass( 'i-open' );
        $( '.b-seller-tuner__content .i-anim' ).removeClass( 'i-anim' );
        //set the cookie
        //Cookies.set( 'tunerOpen', 'N' );
        
        //reset colors and fonts
        /*$( 'style[ class^=tuner ]' ).remove();
        $( '.b-seller-tuner__colors-1, .b-seller-tuner__colors-2' ).find( '.i-active' ).removeClass( 'i-active' )
          .end().find( '.i-default' ).addClass( 'i-active' );
        $( '.b-seller-tuner__fonts' ).find( '.i-active' ).removeClass( 'i-active' )
          .end().find( '.i-default' ).addClass( 'i-active' );
          
        $( '.b-seller-tuner__colors-1, .b-seller-tuner__colors-2 .pcr-button' ).css({ background: '#' + $( '.b-seller-tuner__colors-1, .b-seller-tuner__colors-2 .b-colorpicker' ).data( 'default' )});
        $( '.b-seller-tuner__colors-1, .b-seller-tuner__colors-2 .pcr-result' ).val( '#' + $( '.b-seller-tuner__colors-1, .b-seller-tuner__colors-2 .b-colorpicker' ).data( 'default' ));
        
        $( '.b-seller-tuner__tags .b-item' ).each( function() {
          var $item = $( this );
          $item.find( '.pcr-button' ).css({ background: '#' + $item.find( '.b-colorpicker' ).data( 'default' )});
          $item.find( '.pcr-result' ).val( '#' + $item.find( '.b-colorpicker' ).data( 'default' ));
        });*/
      }
    });
    
    //if the tuner panel should be visible
    //the browser gets tuner with the class 'i-no-transition'
    if ( $( '#seller-tuner' ).hasClass( 'i-no-transition' )) {//here we can check the cookie
      $( '#seller-tuner-icon' ).sideNav( 'show' );
    }
    
    //set tuner panel when page loaded
    /*var cookie = Cookies.get( 'sellerTuner' ) || '{}';
    cookie = JSON.parse( cookie );
    if ( cookie.open === 'Y' ) {
      $( "#seller-tuner-icon" ).sideNav( 'show' );
    }*/
  
    //Cookie
    /*function setCookie( name, subname, value ) {
      var cookie = Cookies.get( 'sellerTuner' ) || '{}';
      cookie = JSON.parse( cookie );
      
      if ( typeof cookie[ name ] === 'object' ) {
        cookie[ name ][ subname] = value;
      } else {
        cookie[ name ] = value;
      }
      
      Cookies.set( 'sellerTuner', JSON.stringify( cookie ));
    }*/
      
    //colorpicker
    var colorpickerComponents = { preview: true, hue: true, interaction: { input: true, clear: true, save: true } };
    var colorpickerStrings = window.colorpickerStrings || { save: 'Сохранить', clear: 'Очистить' };
    
    $( '.b-seller-tuner__colors-1 .b-colorpicker, .b-seller-tuner__colors-2 .b-colorpicker' ).click( function() {
      var $globalColor = $( this );
      
      if ( ( $globalColor.offset().left - $( '.b-seller-tuner__content' ).offset().left) < 180 ) {
        $globalColor.find( '.pcr-app' ).css({ left: -1*($globalColor.offset().left - $( '.b-seller-tuner__content' ).offset().left) + 'px' });
        
      } else if ( ($( '.b-seller-tuner__content' ).offset().left+$( '.b-seller-tuner__content' ).width() - ($globalColor.offset().left+$globalColor.width())) < 180 ) {
        $globalColor.find( '.pcr-app' ).css({ left: -1*(370-($( '.b-seller-tuner__content' ).offset().left+$( '.b-seller-tuner__content' ).width() - $globalColor.offset().left)) + 'px' });
      }
    });
    
    $( '.b-tag-color' ).click( function() {
      var $tagColor = $( this );
      var $item = $tagColor.closest( '.b-item' );
      
      if ( ($item.offset().left - $( '.b-seller-tuner__content' ).offset().left) < 180 ) {
        $tagColor.find( '.pcr-app' ).css({ left: -1*($item.offset().left - $( '.b-seller-tuner__content' ).offset().left) + 'px' });
        
      } else if ( ($( '.b-seller-tuner__content' ).offset().left+$( '.b-seller-tuner__content' ).width() - ($item.offset().left+$item.width())) < 180 ) {
        $tagColor.find( '.pcr-app' ).css({ left: -1*(370-($( '.b-seller-tuner__content' ).offset().left+$( '.b-seller-tuner__content' ).width() - $item.offset().left)) + 'px' });
      }
    });
    
    //colorpicker colors
    if ( $( '.b-seller-tuner__colors-1 .b-colorpicker div' ).length ) {
      var setColorpicker1Flag = true;
      var pickrColors1 = Pickr.create({
          el: '.b-seller-tuner__colors-1 .b-colorpicker div',
          defaultRepresentation: 'HEX',
          default: $( '.b-seller-tuner__colors-1 .b-colorpicker' ).data( 'default' ),
          onSave: function( hsva ) {
            
            var color;
            
            if ( setColorpicker1Flag && hsva ) {//when load the page
              color = hsva.toRGBA();
              if ( ( color[0] * 0.8 + color[1] + color[2] * 0.2) / 510 * 100 < 50 ) {
                $( '.b-seller-tuner__colors-1 .pcr-button' ).addClass( 'i-dark' );
              } else {
                $( '.b-seller-tuner__colors-1 .pcr-button' ).removeClass( 'i-dark' );
              }
            } else if ( !setColorpicker1Flag ) {//when press Save or Clear
              
              var url = $( '.b-seller-tuner__colors-1' ).data( 'ajax-url' );
              var method = $( '.b-seller-tuner__colors-1' ).data( 'ajax-method' );
              
              if ( hsva ) {//press Save
                color = hsva.toRGBA();
                //highlite
                $( '#seller-tuner .b-seller-tuner__colors-1 .b-seller-tuner__block .b-item' ).removeClass( 'i-active' );
                
                //ajax
                colorAjax( hsva.toHEX().toString().substr(1), url, method, $( '#global-color-1' ));
                
                //is dark
                if ( ( color[0] * 0.8 + color[1] + color[2] * 0.2) / 510 * 100 < 50 ) {
                  $( '.b-seller-tuner__colors-1 .pcr-button' ).addClass( 'i-dark' );
                } else {
                  $( '.b-seller-tuner__colors-1 .pcr-button' ).removeClass( 'i-dark' );
                }
              } else {//press Clear
                
                //ajax
                var defaultColor = $( '.b-seller-tuner__colors-1 .b-colorpicker' ).data( 'default' );
                colorAjax( defaultColor, url, method, $( '#global-color-1' ));
                
                $( '.b-seller-tuner__colors-1 .pcr-button' ).css({ background: '#' + defaultColor });
                
                //is dark
                if (( parseInt( defaultColor.substring( 0,2 )) * 0.8 + parseInt( defaultColor.substring( 2,4 )) + parseInt( defaultColor.substring( 4,6 )) * 0.2) / 510 * 100 < 50 ) {
                  $( '.b-seller-tuner__colors-1 .pcr-button' ).addClass( 'i-dark' );
                } else {
                  $( '.b-seller-tuner__colors-1 .pcr-button' ).removeClass( 'i-dark' );
                }
              }
            }
            
            setColorpicker1Flag = false;
          },

          components: colorpickerComponents,
          strings: colorpickerStrings
      });
    }
    
    if ( $( '.b-seller-tuner__colors-2 .b-colorpicker div' ).length ) {
      var setColorpicker2Flag = true;
      var pickrColors2 = Pickr.create({
          el: '.b-seller-tuner__colors-2 .b-colorpicker div',
          defaultRepresentation: 'HEX',
          default: $( '.b-seller-tuner__colors-2 .b-colorpicker' ).data( 'default' ),
          onSave: function( hsva ) {
            
            var color;
            
            if ( setColorpicker2Flag && hsva ) {//when load the page
              color = hsva.toRGBA();
              if ( ( color[0] * 0.8 + color[1] + color[2] * 0.2) / 510 * 100 < 50 ) {
                $( '.b-seller-tuner__colors-2 .pcr-button' ).addClass( 'i-dark' );
              } else {
                $( '.b-seller-tuner__colors-2 .pcr-button' ).removeClass( 'i-dark' );
              }
            } else if ( !setColorpicker2Flag ) {
            
              var url = $( '.b-seller-tuner__colors-2' ).data( 'ajax-url' );
              var method = $( '.b-seller-tuner__colors-2' ).data( 'ajax-method' );
              
              if ( hsva ) {//press Save
                color = hsva.toRGBA();
                //highlite
                $( '#seller-tuner .b-seller-tuner__colors-2 .b-seller-tuner__block .b-item' ).removeClass( 'i-active' );
                
                //ajax
                colorAjax( hsva.toHEX().toString().substr(1), url, method, $( '#global-color-2' ));
                
                //is dark
                if ( ( color[0] * 0.8 + color[1] + color[2] * 0.2) / 510 * 100 < 50 ) {
                  $( '.b-seller-tuner__colors-2 .pcr-button' ).addClass( 'i-dark' );
                } else {
                  $( '.b-seller-tuner__colors-2 .pcr-button' ).removeClass( 'i-dark' );
                }
              } else {//press Clear
                
                //ajax
                var defaultColor = $( '.b-seller-tuner__colors-2 .b-colorpicker' ).data( 'default' );
                colorAjax( '#' + defaultColor, url, method, $( '#global-color-2' ));
                
                $( '.b-seller-tuner__colors-2 .pcr-button' ).css({ background: '#' + defaultColor });
                
                //is dark
                if (( parseInt( defaultColor.substring( 0,2 )) * 0.8 + parseInt( defaultColor.substring( 2,4 )) + parseInt( defaultColor.substring( 4,6 )) * 0.2) / 510 * 100 < 50 ) {
                  $( '.b-seller-tuner__colors-2 .pcr-button' ).addClass( 'i-dark' );
                } else {
                  $( '.b-seller-tuner__colors-2 .pcr-button' ).removeClass( 'i-dark' );
                }
              }
            }
            
            setColorpicker2Flag = false;
          },

          components: colorpickerComponents,
          strings: colorpickerStrings
      });
    }
    
    //colorpicker tags
    var setColorpickerTagFlag = [];
    $( '.b-seller-tuner__tags .b-item' ).each( function( index ) {
      var $item = $( this );
      var tagName = $item.data( 'tag' );
      var $input = $item.find( 'input:hidden' );
      
      if ( $( '.b-seller-tuner__tags .b-item.i-' + tagName + ' .b-colorpicker div' ).length ) {
        setColorpickerTagFlag[ index ] = true;
        var pickrDiscount = Pickr.create({
          el: '.b-seller-tuner__tags .b-item.i-' + tagName + ' .b-colorpicker div',
          defaultRepresentation: 'HEX',
          default: $item.find( '.b-colorpicker' ).data( 'default' ),
          onSave: function( hsva ) {
            
            if ( !setColorpickerTagFlag[ index ] ) {
              
              //remove bg
              $( '.b-seller-tuner__tags .i-' + tagName +' .b-colorpicker' ).css({ background: 'transparent' });
              
              var url = $( '.b-seller-tuner__tags' ).data( 'ajax-url' );
              var method = $( '.b-seller-tuner__tags' ).data( 'ajax-method' );
              
              if ( hsva ) {
                var color = hsva.toRGBA();
                
                //ajax
                tagAjax( hsva.toHEX().toString().substr(1), tagName, url, method, $input );
                
                //is dark
                if ( ( color[0] * 0.8 + color[1] + color[2] * 0.2) / 510 * 100 < 50 ) {
                  $( '.b-seller-tuner__tags .i-' + tagName +' .pcr-button' ).addClass( 'i-dark' );
                } else {
                  $( '.b-seller-tuner__tags .i-' + tagName +' .pcr-button' ).removeClass( 'i-dark' );
                }
              } else {//reset
                
                //ajax
                var defaultColor = $( '.i-' + tagName +' .b-colorpicker' ).data( 'default' );
                tagAjax( '#' + defaultColor, tagName, url, method, $input );
                
                $( '.b-seller-tuner__tags .i-' + tagName +' .pcr-button' ).css({ background: '#' + defaultColor });
                
                //is dark
                if (( parseInt( defaultColor.substring( 0,2 )) * 0.8 + parseInt( defaultColor.substring( 2,4 )) + parseInt( defaultColor.substring( 4,6 )) * 0.2) / 510 * 100 < 50 ) {
                  $( '.b-seller-tuner__tags .i-' + tagName +' .pcr-button' ).addClass( 'i-dark' );
                } else {
                  $( '.b-seller-tuner__tags .i-' + tagName +' .pcr-button' ).removeClass( 'i-dark' );
                }
              }
            }
            
            setColorpickerTagFlag[ index ] = false;
          },

          components: colorpickerComponents,
          strings: colorpickerStrings
        });
      }
    });
  
    //tabs
    $( '.b-seller-tuner__menu a' ).click( function(e) {
      e.preventDefault();
      
      //highlight
      $( '.b-seller-tuner__menu a' ).removeClass( 'i-active' );
      $( this ).addClass( 'i-active' );
      
      //show tab
      $( '.b-seller-tuner__content [data-tab]' ).removeClass( 'i-active' ).removeClass( 'i-anim' );
      var tab = $( this ).attr( 'href' );
      var $tab = $( '.b-seller-tuner__content [data-tab=' + tab + ']' );
      $tab.addClass( 'i-active' );
      setTimeout( function() {
        $tab.addClass( 'i-anim' );
      }, 50);
      
      //set the cookie
      //Cookies.set( 'tunerTab', tab );
    });
    
    //Colors
    $( '#seller-tuner .b-seller-tuner-close' ).click( function(e) {
      e.preventDefault();
      $('#seller-tuner-icon').sideNav( 'hide' );
    });
    
    $( '#seller-tuner .b-seller-tuner__colors-1 .b-seller-tuner__block .b-item, #seller-tuner .b-seller-tuner__colors-2 .b-seller-tuner__block .b-item' ).click( function(e) {
      e.preventDefault();
      
      var $color = $( this );
      var $section = $color.closest( 'section' );
      
      //highlite
      $( this ).closest( '.b-seller-tuner__block' ).find( '.b-item' ).removeClass( 'i-active' );
      $color.addClass( 'i-active' );
      
      //ajax
      colorAjax( $color.data( 'color' ), $section.data( 'ajax-url' ), $section.data( 'ajax-method' ), $section.find( 'input[ name^="global-color" ]' ));
    });
    
    function colorAjax( color, url, method, $input ) {
      //send info
      $.ajax({
        url: url || '/bitrix/components/bejetstore/tuner/ajax.php',
        type: method || 'GET',
        dataType: "json",
        data: $input.attr( 'name' ) + "=" + color,
        success: function(data) {
          if ( data && data.RELOAD && data.RELOAD === 'Y' ) {
            document.location.reload( true );
          } else if ( data && data.STATUS && data.STATUS === 'Y' ) {
            $( 'style.tuner-color' ).remove();
            $( 'body' ).append( '<style class="tuner-color">' + data.RESULT + '</style>' );
            //setCookie( 'color', undefined, color );
            //input value
            $input.val( color );
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
    
    function tagAjax( color, tagName, url, method, $input ) {
      //send info
      $.ajax({
        url: url || '/bitrix/components/bejetstore/tuner/ajax.php',
        type: method || 'GET',
        dataType: "json",
        data: $input.attr( 'name' ) + "=" + color,
        success: function(data) {
          if ( data && data.RELOAD && data.RELOAD === 'Y' ) {
            document.location.reload( true );
          } else if ( data && data.STATUS && data.STATUS === 'Y' ) {
            $( 'style.tuner-tags' ).remove();
            $( 'body' ).append( '<style class="tuner-tags">' + data.RESULT + '</style>' );
            //setCookie( 'color', undefined, color );
            //input value
            $( '#global-' + tagName + '-color' ).val( color );
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
    
    //Font, font-size
    $( '#seller-tuner .b-seller-tuner__fonts .b-seller-tuner__block div, #seller-tuner .b-seller-tuner__font-size .b-seller-tuner__block div' ).click( function(e) {
      e.preventDefault();
      
      var $fontSize = $( this );
      var fontSize = $fontSize.data( 'font-size' ) || $fontSize.text();
      var $input = $fontSize.closest( '.b-seller-tuner__block' ).find( 'input:hidden' );
      var $section = $fontSize.closest( '[class^=b-seller-tuner__font]' );
      var cls = 'font-size';
      if ( $section.is( '.b-seller-tuner__fonts' )) {
        cls = 'fonts';
      }
      
      //highlite
      $section.find( 'div' ).removeClass( 'i-active' );
      $fontSize.addClass( 'i-active' );
      
      $.ajax({
        url: $section.data( 'ajax-url' ) || '/bitrix/components/bejetstore/tuner/ajax.php',
        type: $section.data( 'ajax-method' ) || 'GET',
        dataType: "json",
        data: $input.attr( 'name' ) + "=" + fontSize,
        success: function( data ) {
          if ( data && data.RELOAD && data.RELOAD === 'Y' ) {
            //set tab
            Cookies.set( 'tunerTab', $( '.b-seller-tuner__content .i-active[data-tab]' ).data( 'tab' ));
            //set scroll
            Cookies.set( 'tunerScroll', $( '.b-seller-tuner__content' ).scrollTop());
            document.location.reload( true );
          } else if ( data && data.STATUS && data.STATUS === 'Y' ) {
            $( 'style.tuner-' + cls ).remove();
            $( 'body' ).append( '<style class="tuner-' + cls + '">' + data.RESULT + '</style>' );
            $input.val( fontSize );
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
    
    //Screen width
    $( '#seller-tuner .b-seller-tuner__screen-width .b-seller-tuner__block div' ).click( function(e) {
      e.preventDefault();
      
      var $screenWidth = $( this );
      var screenWidth = String( $screenWidth.text()).split( ' ' ).join( '' );
      var $input = $screenWidth.closest( '.b-seller-tuner__block' ).find( 'input:hidden' );
      var $section = $screenWidth.closest( '[class^=b-seller-tuner__screen-width]' );
      
      //highlite
      $section.find( 'div' ).removeClass( 'i-active' );
      $screenWidth.addClass( 'i-active' );
      
      $.ajax({
        url: $section.data( 'ajax-url' ) || '/bitrix/components/bejetstore/tuner/ajax.php',
        type: $section.data( 'ajax-method' ) || 'GET',
        dataType: "json",
        data: $input.attr( 'name' ) + "=" + screenWidth,
        success: function( data ) {
          if ( data && data.RELOAD && data.RELOAD === 'Y' ) {
            //set tab
            Cookies.set( 'tunerTab', $( '.b-seller-tuner__content .i-active[data-tab]' ).data( 'tab' ));
            //set scroll
            Cookies.set( 'tunerScroll', $( '.b-seller-tuner__content' ).scrollTop());
            document.location.reload( true );
          } else if ( data && data.STATUS && data.STATUS === 'Y' ) {
            $( 'style.tuner-width' ).remove();
            $( 'body' ).append( '<style class="tuner-width">' + data.RESULT + '</style>' );
            $input.val( screenWidth );
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
        url: '/bitrix/components/bejetstore/tuner/ajax.php',
        type: 'GET',
        dataType: "json",
        data: "discount=" + color,
        success: function( data ) {
          if ( data && data.STATUS && data.STATUS === 'Y' ) {
            $( 'body' ).append( '<style>' + data.RESULT + '</style>' );
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
      
      var $section = $( '.b-seller-tuner__headers' ),
          $input = $( '#headers' ),
          header = $( this ).data( 'value' );
          
      $input.val( header );
      
      $.ajax({
        url: $section.data( 'ajax-url' ) || '/bitrix/components/bejetstore/tuner/ajax.php',
        type: $section.data( 'ajax-method' ) || 'GET',
        dataType: "json",
        data: $input.attr( 'name' ) + "=" + header,
        success: function( data ) {
          if ( data && data.RELOAD && data.RELOAD === 'Y' ) {
            document.location.reload( true );
          }/* else if ( data && data.STATUS && data.STATUS === 'Y' ) {
            //for the future likely possibility 
          }*/
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
    
    //positioning invisible colorpicker
    setTimeout( function() {
      $( '.b-seller-tuner__colors-1 .b-colorpicker, .b-seller-tuner__colors-2 .b-colorpicker' ).each( function() {
        var $colorpicker = $( this );
        
        if ( ( $colorpicker.offset().left - $( '.b-seller-tuner__content' ).offset().left) < 180 ) {
          $colorpicker.find( '.pcr-app' ).css({ left: -1*($colorpicker.offset().left - $( '.b-seller-tuner__content' ).offset().left) + 'px' });
          
        } else if ( ($( '.b-seller-tuner__content' ).offset().left+$( '.b-seller-tuner__content' ).width() - ($colorpicker.offset().left+$colorpicker.width())) < 180 ) {
          $colorpicker.find( '.pcr-app' ).css({ left: -1*(370-($( '.b-seller-tuner__content' ).offset().left+$( '.b-seller-tuner__content' ).width() - $colorpicker.offset().left)) + 'px' });
        }
      });
      
      $( '.b-tag-color' ).each( function() {
        var $tagColor = $( this );
        var $item = $tagColor.closest( '.b-item' );
        
        if ( ($item.offset().left - $( '.b-seller-tuner__content' ).offset().left) < 180 ) {
          $tagColor.find( '.pcr-app' ).css({ left: -1*($item.offset().left - $( '.b-seller-tuner__content' ).offset().left) + 'px' });
          
        } else if ( ($( '.b-seller-tuner__content' ).offset().left+$( '.b-seller-tuner__content' ).width() - ($item.offset().left+$item.width())) < 180 ) {
          $tagColor.find( '.pcr-app' ).css({ left: -1*(370-($( '.b-seller-tuner__content' ).offset().left+$( '.b-seller-tuner__content' ).width() - $item.offset().left)) + 'px' });
        }
      });
    }, 2000);
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));