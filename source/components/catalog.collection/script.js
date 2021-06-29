(function ($) {
  'use strict';

  $(function () {
    if (!$('.b-catalog-section').data('landingpage')) {
      //scroll to sort
      if (String(window.location.search).search('sort=') !== -1) {
        setTimeout(function () {
          $.scrollTo($('.bj-sorting:eq(0)').offset().top - 30, 500);
        }, 1500);
      }

      //scroll to paginator
      if (String(window.location.search).search('PAGEN_2=') !== -1) {
        setTimeout(function () {
          $.scrollTo($('.b-catalog-collection:eq(0)').offset().top - 30, 500);
        }, 1500);
      }
    }

    //set title
    setTitle();
    function setTitle() {
      if (window.matchMedia('( min-width: 768px )').matches) {
        //desktop
        $('.b-catalog-element').each(function () {
          var $this = $(this),
            $title = $this.find('.b-catalog-element__title');

          if (String($title.text()).length > 40) {
            $title.text($.trim(String($title.text()).substring(0, 39)) + '...');
          }

          /*if ( $this.closest( 'div[class *= col-sm]' ).is( '.col-sm-2' ) && String( $title.text()).length > 24 ) {
            $title.text( $.trim( String( $title.text()).substring( 0, 24 )) + '...' );
          } else if ( $this.closest( 'div[class *= col-sm]' ).is( '.col-sm-3' ) && String( $title.text()).length > 33 ) {
            $title.text( $.trim( String( $title.text()).substring( 0, 33 )) + '...' );
          } else if ( $this.closest( 'div[class *= col-sm]' ).is( '.col-sm-4' ) && String( $title.text()).length > 56 ) {
            $title.text( $.trim( String( $title.text()).substring( 0, 56 )) + '...' );
          } else if ( $this.closest( 'div[class *= col-sm]' ).is( '.col-sm-6' ) && String( $title.text()).length > 119 ) {
            $title.text( $.trim( String( $title.text()).substring( 0, 119 )) + '...' );
          }*/
        });
      } else {
        //mobile
        $('.b-catalog-element').each(function () {
          var $this = $(this),
            $title = $this.find('.b-catalog-element__title');

          if (String($title.text()).length > 107) {
            $title.text(
              $.trim(String($title.attr('title')).substring(0, 107)) + '...'
            );
          }
        });
      }
    }

    //subscribe modal
    $('#subscribeModal')
      .on('show.bs.modal', function (e) {
        //blur the page
        $(this).appendTo('body');
        document.querySelector('html').classList.add('i-blur');

        var $link = $(e.relatedTarget);

        $.ajax({
          url: $link.data('ajax-url'),
          type: 'GET',
          dataType: 'html',
          data: 'id=' + $link.closest('.b-catalog-element').attr('data-id'),
          success: function (data) {
            if (data) {
              $('#subscribeModal form').remove();
              $('#subscribeModal .modal-header').after(data);
            }
          },
          error: function (a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);
          },
        });
      })
      .on('hide.bs.modal', function () {
        //focus the page
        document.querySelector('html').classList.remove('i-blur');
      });

    $('#subscribeModal').delegate('form', 'submit', function (e) {
      e.preventDefault();
      var $form = $(this);
      var $body = $('#subscribeModal .modal-body');

      $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        dataType: 'json',
        data: $form.serialize(),
        success: function (data) {
          if (data && data.MESSAGE) {
            $body.height($body.height());
            $body
              .empty()
              .append('<p class="text-center">' + data.MESSAGE + '</p>');
            $body.height($body.find('p').height());

            $('#subscribeModal .modal-footer .btn').hide();
            $('#subscribeModal .modal-footer .i-gray').show();

            //Yandex Metrika
            if (ym && ymID) {
              ym(ymID, 'reachGoal', 'subscribe_siccess');
            }
          }
        },
        error: function (a, b, c) {
          console.log(a);
          console.log(b);
          console.log(c);
        },
      });
    });

    //buy button
    $('.b-catalog-element__button .btn').click(function (e) {
      e.preventDefault();

      var $btn = $(this);
      var $element = $btn.closest('.b-catalog-element');

      if ($btn.hasClass('i-gray')) {
        window.location = $btn.attr('href');
        return;
      }

      $.ajax({
        url: $btn.data('ajax-url'),
        type: 'GET',
        dataType: 'json',
        data: 'id=' + $element.attr('data-id'),
        success: function (data) {
          if (data && data.STATUS === 'Y') {
            //num of the products in a cart
            $('#bx_cart_num').text(data.cart);

            //buy modal window
            $('#buyCatalogElementPopup').appendTo('body').addClass('i-show');
            setTimeout(function () {
              $('#buyCatalogElementPopup').addClass('i-animate');
            }, 100);

            //blur the page
            document.querySelector('html').classList.add('i-blur');

            //button transformation
            $btn.addClass('i-gray').find('span').toggleClass('i-show');

            //add incart attribute to the tp
            $element
              .find(
                '.b-catalog-element__data div[ data-id=' +
                  $element.attr('data-id') +
                  ' ]'
              )
              .data({ incart: 'Y' });

            //ecommerce
            $('.b-catalog-element__button .btn').trigger('add.ecommerce');
            //Yandex Metrika
            if (ym && ymID) {
              ym(ymID, 'reachGoal', 'goal_basket_add');
            }
          }
        },
        error: function () {},
      });
    });

    //popup window
    $('#buyCatalogElementPopupOpaco, .b-catalog-element-popup__close').click(
      function (e) {
        e.preventDefault();
        $('#buyCatalogElementPopup').removeClass('i-animate');

        //focus the page
        document.querySelector('html').classList.remove('i-blur');

        setTimeout(function () {
          $('#buyCatalogElementPopup').removeClass('i-show');
        }, 500);
      }
    );

    //elements
    $('.b-catalog-element').each(function () {
      var $element = $(this),
        $propListBlock = $element.find('.b-catalog-element__propList-block'),
        $gallery = $element.find('.b-catalog-element__gallery'),
        $fotorama = $element.find(
          '.b-catalog-element__gallery .b-catalog-element__fotorama'
        ),
        $data = $element.find('.b-catalog-element__data div'),
        $activeDataDiv = $data.eq(0),
        $img = $element.find('.b-catalog-element__img'),
        $imgHover = $element.find('.b-catalog-element__img-hover'),
        $art = $element.find('.b-catalog-element__art'),
        $code = $element.find('.b-catalog-element__code'),
        $num1 = $element.find('.b-catalog-element__num .i-1'),
        $num0 = $element.find('.b-catalog-element__num .i-0'),
        $iconDiscount = $element.find('.b-icon-discount'),
        $button = $element.find('.b-catalog-element__button'),
        $subscribe = $element.find('.b-catalog-element__subscribe'),
        $price = $element.find('.b-catalog-element__price'),
        $bottom = $element.find('.b-catalog-element__bottom'),
        propList = $element.find('.b-catalog-element__data').data('prop-list'), //[{ type:"", code:"", name: ""}]
        propDB = {};

      if (typeof propList === 'string') {
        propList = propList.replace(/&quot;/g, '"');
        propList = JSON.parse(propList);
      }

      if (
        $element.find('.b-catalog-element__data[ data-actual-item ]').length
      ) {
        $activeDataDiv = $element.find(
          '.b-catalog-element__data div[ data-id=' +
            $element.find('.b-catalog-element__data').data('actual-item') +
            ' ]'
        );
      }

      //click colors
      /*$colorsBlock.delegate( '.b-catalog-element__colors-item', 'click', function() {
        
        //highlite
        $element.find( '.b-catalog-element__colors-item' ).removeClass( 'i-active' );
        $( this ).addClass( 'i-active' );
        
        if ( $element.find( '.b-catalog-element__sizes-item' ).length ) {
          setDisabledSizes( this );//set disabled sizes
          setDisabledColors( $element.find( '.b-catalog-element__sizes-item.i-active' ));//set disabled colors
        } else {
          //show offer
          $data.each( function() {
            if ( $element.find( '.b-catalog-element__colors-item.i-active').length && $element.find( '.b-catalog-element__colors-item.i-active').css( 'backgroundImage' ).search( $( this).data( 'color-color_ref' )) !== -1 ) {
              showOffer( $( this ));
            }
          });
        }
      });*/

      //click sizes
      /*$sizesBlock.delegate( '.b-catalog-element__sizes-item', 'click', function() {
        var $this = $( this );
      
        //highlite
        $element.find( '.b-catalog-element__sizes-item' ).removeClass( 'i-active' );
        $this.addClass( 'i-active' );
        
        //set cookie
        if ( window.Cookies ) {
          Cookies.set( 'size', $this.text(), { expires: 365, path: window.location.origin });
        }
        
        if ( $element.find( '.b-catalog-element__colors-item' ).length ) {  
          setDisabledColors( this );//set disabled colors
          setDisabledSizes( $element.find( '.b-catalog-element__colors-item.i-active' ));//set disabled sizes
        } else {
          //show offer
          $data.each( function() {
            if ( $element.find( '.b-catalog-element__sizes-item.i-active').length && ( $( this).data( 'list-sizes_shoes' )+'' ) === $element.find( '.b-catalog-element__sizes-item.i-active').text()) {
              showOffer( $( this ));
            }
          });
        }
        
      });*/

      //click prop
      $propListBlock.delegate(
        '.b-catalog-element__colors-item, .b-catalog-element__sizes-item',
        'click',
        function () {
          var $item = $(this);
          if ($item.hasClass('i-active')) {
            return;
          }
          var blockProp = $item.parent().data('prop');
          var itemProp = $item.text() || $item.css('backgroundImage');
          var $activeItem = $item.siblings('.i-active');
          var currentid = $activeDataDiv.attr('data-id');
          var itemID;
          var propString = '';
          var propArray = [];

          for (var k in propDB[currentid]) {
            if (blockProp === propDB[currentid][k][1]) {
              propString = k;
            }
          }

          propArray = String(propString).split(',');

          if ($item.hasClass('i-disabled')) {
            var newPropIdArray = [];
            var maxCounter = 0;
            var obj = {};
            for (var a in propDB) {
              //find all tp with the same value of this prop
              for (var s in propDB[a]) {
                if (
                  compareItemProp(
                    $item.attr('class'),
                    itemProp,
                    propDB[a][s][3]
                  ) &&
                  blockProp === propDB[a][s][1]
                ) {
                  obj = {};
                  obj[a] = propDB[a];
                  newPropIdArray.push(obj);
                }
              }
            }
            for (var i = 0; i < newPropIdArray.length; i++) {
              for (var id in newPropIdArray[i]) {
                var counter = 0;
                for (var keyString in newPropIdArray[i][id]) {
                  if (newPropIdArray[i][id][keyString][1] === blockProp) {
                    var keyArray = String(keyString).split(',');
                    for (var j = 0; j < propArray.length; j++) {
                      if (keyArray.includes(propArray[j])) {
                        counter++; //count the amount of props similar with the current tp
                      }
                    }
                  }
                }
                if (counter > maxCounter || maxCounter === 0) {
                  maxCounter = counter;
                  itemID = id;
                  /*if ( counter === ( propList.length - 2 )) {//it's better to find how to do the break of the loop 'for'
                  break;
                }*/
                }
              }
            }
          } else {
            for (var n in propDB) {
              for (var m in propDB[n]) {
                if (
                  m === propString &&
                  compareItemProp(
                    $item.attr('class'),
                    itemProp,
                    propDB[n][m][3]
                  )
                ) {
                  itemID = n;
                }
              }
            }
          }

          $activeDataDiv = $element.find(
            '.b-catalog-element__data div[data-id=' + itemID + ']'
          );
          showOffer($activeDataDiv);
          setDisabled();
        }
      );

      function compareItemProp(cls, itemProp, prop) {
        // important - compare background via search
        if (cls.search('colors') !== -1) {
          if (itemProp.search(prop) !== -1) {
            return true;
          }
        } else if (cls.search('sizes') !== -1) {
          if (itemProp + '' === prop + '') {
            return true;
          }
        }
        return false;
      }

      var timeoutHover, timeoutHout;

      $element.hover(
        function () {
          //init fotorama
          if (
            $fotorama.length &&
            !$fotorama.data('fotorama') &&
            $fotorama.find('.b-catalog-element__fotorama-img').length
          ) {
            $fotorama.fotorama();
          }

          //slide effect
          $bottom.show();
          clearTimeout(timeoutHover);
          clearTimeout(timeoutHout);
          timeoutHover = setTimeout(function () {
            $element.addClass('i-hover');
          }, 0);

          //gallery autoplay
          if (
            $gallery.length &&
            $fotorama.length &&
            $fotorama.data('fotorama')
          ) {
            $fotorama.data('fotorama').startAutoplay(3000);
          }
        },
        function () {
          //slideEffect
          var $element = $(this);
          $element.removeClass('i-hover');
          clearTimeout(timeoutHover);
          clearTimeout(timeoutHout);
          timeoutHout = setTimeout(function () {
            $bottom.hide();
          }, 500);

          //gallery autoplay
          if (
            $gallery.length &&
            $fotorama.length &&
            $fotorama.data('fotorama')
          ) {
            $fotorama.data('fotorama').stopAutoplay();
          }
        }
      );

      if ($data.length) {
        showAllProperties();
        showFirstOffer();
      }

      function showAllProperties() {
        //onLoad

        var propBlocks = {};

        propList.forEach(function (elem) {
          //create prop
          var $propBlock;
          var itemArray = [];

          //form item array
          $data.each(function () {
            var flag = true;
            var $this = $(this);

            itemArray.forEach(function (cur) {
              if (
                !$this.data(elem.type + '-' + elem.code) ||
                cur === $this.data(elem.type + '-' + elem.code)
              ) {
                flag = false;
                return;
              }
            });

            if (flag && !!$this.data(elem.type + '-' + elem.code)) {
              itemArray.push($this.data(elem.type + '-' + elem.code));
            }
          });

          if (itemArray.length) {
            $propBlock = $(
              '<div class="b-catalog-element__' +
                elem.code +
                '" data-prop="' +
                elem.code +
                '"></div>'
            );
            if (elem.name) {
              $propBlock.append('<h6>' + elem.name + '</h6>');
            }
          } else {
            return;
          }

          //create items
          if (elem.type === 'color') {
            itemArray.forEach(function (cur) {
              var $item;

              $item = $(
                '<span class="b-catalog-element__colors-item" style="background-image: url( \'' +
                  cur +
                  '\' )"><span></span></span>'
              );

              //check white
              var img = document.createElement('img');

              img.setAttribute('src', cur);
              img.addEventListener('load', function () {
                var vibrant = new Vibrant(img);
                if (vibrant.isWhiteImage) {
                  $item.addClass('i-white');
                }
              });

              $propBlock.append($item);
            });
          } else if (elem.type === 'list') {
            itemArray.forEach(function (cur) {
              var $item;
              $item = $(
                '<span class="b-catalog-element__sizes-item"><span>' +
                  cur +
                  '</span></span>'
              );

              $propBlock.append($item);
            });
          }

          propBlocks[elem.code] = $propBlock;
        });

        for (var n in propBlocks) {
          $propListBlock.append('<hr>').append(propBlocks[n]);
        }
      }

      function showFirstOffer() {
        if ($data.length === 1) {
          showOffer($data);
          return;
        }

        //page load

        //form database propDB
        $data.each(function () {
          var $div = $(this);
          var propsObj = {};

          propList.forEach(function (elem) {
            var propName = [];

            propList.forEach(function (j) {
              if (j.code !== elem.code) {
                propName.push($div.data(j.type + '-' + j.code));
              }
            });
            propsObj[propName.join(',')] = [
              elem.type,
              elem.code,
              elem.name,
              $div.data(elem.type + '-' + elem.code),
            ];
          });

          propDB[$div.data('id')] = propsObj;
        });

        showOffer($activeDataDiv);
        setDisabled();

        /*//get size by default
        var sizeCookie;
        var sizeFlag = false;
        if ( $element.find( '.b-catalog-element__sizes-item:eq(0)').length ) {
          if ( window.Cookies && Cookies.get( 'size' )) {
            sizeCookie = Cookies.get( 'size' );
          } else {
            sizeCookie = $element.find( '.b-catalog-element__sizes-item:eq(0)').text();
          }
        
          //if there is the cookie, but there is no such offer with that size
          $element.find( '.b-catalog-element__sizes-item' ).each( function() {
            var $size = $( this );
            if ( !sizeFlag ) {
              if ( $size.text() === sizeCookie ) {
                sizeFlag = true;
              }
            }
          });
          
          if ( !sizeFlag ) {
            sizeCookie = $element.find( '.b-catalog-element__sizes-item:eq(0)').text();
          }
        }
        
        //show offer
        var flag = false;
        
        if ( $element.find( '.b-catalog-element__colors-item' ).length ) {
          if ( $element.find( '.b-catalog-element__sizes-item' ).length ) {//colors & sizes
          
            $data.each( function() {
              var $div = $( this );
              $element.find( '.b-catalog-element__colors-item' ).each( function() {
                var $color = $( this );
                if ( $color.css( 'backgroundImage' ).search( $div.data( 'color-color_ref' )) !== -1 && $div.data( 'list-sizes_shoes' )+''  === (sizeCookie+'') ) {
                  if ( !flag ) {
                    showOffer( $div, 'onPageLoad' );
                    flag = true;
                  }
                }
              });
            });
            
          } else {//colors only
          
            $data.each( function() {
              var $div = $( this );
              $element.find( '.b-catalog-element__colors-item' ).each( function() {
                var $color = $( this );
                if ( $color.css( 'backgroundImage' ).search( $div.data( 'color-color_ref' )) !== -1 ) {
                  if ( !flag ) {
                    showOffer( $div, 'onPageLoad' );
                    flag = true;
                  }
                }
              });
            });
            
          }
        } else {
          if ( $element.find( '.b-catalog-element__sizes-item' ).length ) {//sizes only
          
            $data.each( function() {
              var $div = $( this );
              if ( $div.data( 'list-sizes_shoes' )+''  === ( sizeCookie+'' )) {
                if ( !flag ) {
                  showOffer( $div, 'onPageLoad' );
                  flag = true;
                }
              }
            });
            
          } else {//no colors, no sizes
            if ( !flag ) {
              showOffer( $data.eq(0), 'onPageLoad' );
              flag = true;
            }
          }
        }
        
        if ( $element.find( '.b-catalog-element__sizes-item.i-active' ).length && $element.find( '.b-catalog-element__colors-item.i-active' ).length) {
          setDisabledColors( $element.find( '.b-catalog-element__sizes-item.i-active' ));//set disabled colors
          setDisabledSizes( $element.find( '.b-catalog-element__colors-item.i-active' ));//set disabled sizes
        }*/
      }

      function setDisabled() {
        //set disabled
        var activeProps = {};
        var propName = [];
        var currentPropName = '';
        var propKey;

        //find active props array
        propList.forEach(function (elem) {
          //elem = { type:"", code:"", name: ""}

          propName = [];

          propList.forEach(function (j) {
            //j = { type:"", code:"", name: ""}
            if (j.code !== elem.code) {
              propName.push($activeDataDiv.data(j.type + '-' + j.code)); //propName=['45','свежий','2.jpg','лен']
            }
          });

          currentPropName = elem.code; //'tyu9'
          activeProps[currentPropName] = []; //{'tyu9':[]}
          propKey = propName.join(','); //'45,свежий,2.jpg,лен'

          for (var k in propDB) {
            if (propDB[k][propKey]) {
              //find all tp with the same set of props ('45,свежий,2.jpg,лен')
              activeProps[currentPropName].push(propDB[k][propKey][3]); //{'tyu9':['1.jpg','3.jpg']}
            }
          }

          //highlight disabled
          if (elem.type === 'color') {
            $element
              .find(
                '.b-catalog-element__' +
                  currentPropName +
                  ' .b-catalog-element__colors-item'
              )
              .each(function () {
                var disabledFlag = false;
                for (var o = 0; o < activeProps[currentPropName].length; o++) {
                  if (
                    $(this)
                      .css('backgroundImage')
                      .search(activeProps[currentPropName][o]) !== -1
                  ) {
                    disabledFlag = true;
                  }
                  if (disabledFlag) {
                    break;
                  }
                }
                if (!disabledFlag) {
                  $(this).addClass('i-disabled');
                } else {
                  $(this).removeClass('i-disabled');
                }
              });
          } else if (elem.type === 'list') {
            $element
              .find(
                '.b-catalog-element__' +
                  currentPropName +
                  ' .b-catalog-element__sizes-item'
              )
              .each(function () {
                var disabledFlag = false;
                for (var o = 0; o < activeProps[currentPropName].length; o++) {
                  if ($(this).text() === '' + activeProps[currentPropName][o]) {
                    disabledFlag = true;
                  }
                  if (disabledFlag) {
                    break;
                  }
                }
                if (!disabledFlag) {
                  $(this).addClass('i-disabled');
                } else {
                  $(this).removeClass('i-disabled');
                }
              });
          }
        });
      }

      function showOffer($div, pageLoadFlag) {
        //id
        $element.attr({ 'data-id': $div.data('id') + '' });
        //props
        propList.forEach(function (elem) {
          if (elem.type === 'color') {
            $element
              .find(
                '.b-catalog-element__' +
                  elem.code +
                  ' .b-catalog-element__colors-item'
              )
              .each(function () {
                if (
                  $(this)
                    .css('backgroundImage')
                    .search($div.data(elem.type + '-' + elem.code)) !== -1
                ) {
                  $(this).addClass('i-active').removeClass('i-disabled');
                } else {
                  $(this).removeClass('i-active');
                }
              });
          } else if (elem.type === 'list') {
            $element
              .find(
                '.b-catalog-element__' +
                  elem.code +
                  ' .b-catalog-element__sizes-item'
              )
              .each(function () {
                if (
                  $(this).text() ===
                  '' + $div.data(elem.type + '-' + elem.code)
                ) {
                  $(this).addClass('i-active').removeClass('i-disabled');
                } else {
                  $(this).removeClass('i-active');
                }
              });
          }
        });

        //gallery
        var images = '';
        var srcArray = [];
        var pageUrl = '';

        //photo
        if ($div.data('photo')) {
          srcArray = $div.data('photo').split(';');
        }

        //btn
        if ($element.find('.b-catalog-element__button .btn').length) {
          pageUrl = $element
            .find('.b-catalog-element__button .btn')
            .attr('href');
        }

        if ($img.length && srcArray[0]) {
          srcArray[1] = srcArray[1] || srcArray[0];
          if ($bottom.css('opacity') > 0) {
            $img.css({ backgroundImage: "url('" + srcArray[0] + "')" });
            $imgHover.css({ backgroundImage: 'url(' + srcArray[1] + ')' });
          } else {
            $img.attr({ 'data-original': srcArray[0] });
            $imgHover.attr({ 'data-original': srcArray[1] });
          }
        } else if ($gallery.length) {
          srcArray.forEach(function (cur, i, arr) {
            images +=
              '<div><a href="' +
              pageUrl +
              '" class="b-catalog-element__fotorama-img" style="background-image: url(\'' +
              cur +
              '\');" ></a></div>';
          });
          if ($fotorama.length) {
            if ($fotorama.data('fotorama')) {
              $fotorama.data('fotorama').destroy();
            }
            $fotorama.empty().html(images);
            if (
              !pageLoadFlag &&
              $fotorama.find('.b-catalog-element__fotorama-img').length > 1
            ) {
              $fotorama.fotorama();
            }
            if ($bottom.css('opacity') > 0 && $fotorama.data('fotorama')) {
              $fotorama.data('fotorama').startAutoplay(3000);
            }
          }
        }

        //num
        if ($num0.length && $num1.length) {
          if ($div.data('num') !== 0) {
            $num1.show().find('span').text($div.data('num'));
            $num0.hide();
          } else {
            $num1.hide();
            $num0.show();
          }
        }

        //discount icon
        if ($iconDiscount.length) {
          if ($div.data('discount-percent')) {
            $iconDiscount.show().text($div.data('discount-percent'));
          } else {
            $iconDiscount.hide();
          }
        }

        //properties
        $element.find('.b-catalog-element__props div').each(function () {
          if (
            String($(this).attr('class')).search('catalogElementProperty') !==
            -1
          ) {
            $(this).addClass('hidden');
          }
        });
        for (var key in $div.data()) {
          if (key.search('property') !== -1) {
            $element
              .find('.catalogElementP' + key.substring(1))
              .find('span')
              .text($div.data(key))
              .parent()
              .removeClass('hidden');
          }
        }

        //price
        if ($price.length && $div.data('price')) {
          if ($div.data('old-price')) {
            $price
              .addClass('i-discount')
              .empty()
              .html(
                '<span>' +
                  $div.data('price') +
                  '</span><s>' +
                  $div.data('old-price') +
                  '</s>'
              );
          } else {
            //price
            $price.removeClass('i-discount').empty().text($div.data('price'));
          }
        }

        if ($button.length && $subscribe.length) {
          //availability
          if ($div.data('available') === 'Y') {
            $button.show();
            $subscribe.addClass('hidden');
          } else {
            $button.hide();
          }

          //subscribe
          if (
            $div.data('subscribe') === 'Y' &&
            $div.data('available') !== 'Y'
          ) {
            $button.hide();
            $subscribe.removeClass('hidden');
          } else if (
            $div.data('subscribe') !== 'Y' &&
            $div.data('available') !== 'Y'
          ) {
            $button.hide();
            $subscribe.addClass('hidden');
          }
        }

        //in cart button
        try {
          if (
            $div.data('incart') === 'Y' &&
            !$button.find('.btn').hasClass('i-gray')
          ) {
            $button
              .find('.btn')
              .addClass('i-gray')
              .find('span')
              .toggleClass('i-show');
          } else if (
            (!$div.data('incart') || $div.data('incart') !== 'Y') &&
            $button.find('.btn').hasClass('i-gray')
          ) {
            $button
              .find('.btn')
              .removeClass('i-gray')
              .find('span')
              .toggleClass('i-show');
          }
        } catch (e) {}
      }
    });

    $('.b-catalog-element__img, .b-catalog-element__img-hover').lazyload();

    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });
})(jQuery);
