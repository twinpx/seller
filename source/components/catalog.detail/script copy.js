(function ($) {
  'use strict';

  $(function () {
    //ecommerce
    $('.b-catalog-detail').trigger('detail.ecommerce');

    //mobile props
    $('.b-catalog-detail__props-slide').click(function (e) {
      $('.b-catalog-detail__props').slideToggle();
    });

    //comments form
    /*$('#collapseCommentForm').click( function() {
      $( this ).hide();
    });*/
    $('#collapseCommentForm').on('show.bs.collapse', function () {
      $('#collapseCommentButton').hide();

      $.ajax({
        url: $('#collapseCommentButton').data('ajax-url'),
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          if (data && data.SUCCESS === 'Y') {
            for (var key in data.value) {
              $('#collapseCommentForm form [name=' + key + ']').val(
                data.value[key]
              );
            }
          }
        },
        error: function () {},
      });
    });

    $('textarea.form-control').autosize();

    $('#consentModal button.btn-default:first').click(function () {
      $('#collapseCommentForm input:checkbox').prop('checked', true);
      $('#consentModal .modal-header .close').click();
      //$( '#collapseCommentForm button[ type="submit" ]' ).addClass( 'i-available' );
    });
    $('#consentModal button.btn-reset').click(function () {
      $('#collapseCommentForm input:checkbox').prop('checked', false);
      $('#consentModal .modal-header .close').click();
      //$( '#collapseCommentForm button[ type="submit" ]' ).removeClass( 'i-available' );
    });
    $('#collapseCommentForm form').submit(function (e) {
      if ($('#collapseCommentForm input:checkbox').prop('checked') === false) {
        $('#consentModal').modal('show');
      }
    });

    var json = $('#register-user-conf label').data('bx-user-consent');
    if (typeof json === 'string') {
      json = json.replace(/&quot;/g, '"');
      json = JSON.parse(json);
    }
    var sessid = $('#sessid').val();

    $('#consentModal')
      .on('show.bs.modal', function (e) {
        //blur the page
        $(this).appendTo('body');
        document.querySelector('html').classList.add('i-blur');

        $.ajax({
          url: json.actionUrl,
          type: 'GET',
          dataType: 'json',
          data: {
            id: json.id,
            sessid: sessid,
            action: 'getText',
            sec: json.sec,
          },
          success: function (data) {
            $('#consentModal .modal-body').text(data.text);
          },
          error: function () {},
        });
      })
      .on('hide.bs.modal', function () {
        //focus the page
        document.querySelector('html').classList.remove('i-blur');
      });

    //store buttons - an icon and a link
    var favPreloader = new Preloader(
      '#catalogDetailFavLink, #catalogDetailFavIcon',
      'color1',
      'x-small'
    );

    $('#catalogDetailFavLink, #catalogDetailFavIcon').click(function (e) {
      e.preventDefault();
      var $link = $(this);
      var $elems = $('#catalogDetailFavLink, #catalogDetailFavIcon');

      $.ajax({
        url: $link.data('ajax-url'),
        type: 'GET',
        dataType: 'json',
        data:
          'id=' +
          $('.b-catalog-detail').attr('data-id') +
          '&stored=' +
          $link.data('stored'),
        beforeSend: function () {
          //preloader
          favPreloader.append();
          $elems.addClass('i-preloader');
        },
        success: function (data) {
          if (data && data.STATUS === 'Y') {
            window.catalogDetailStoredProducts =
              window.catalogDetailStoredProducts || [];
            $('#catalogDetailFavLink').find('span').toggleClass('hidden');
            $('#catalogDetailFavIcon').toggleClass('i-stored');
            if ($elems.data('stored') === 'N') {
              $elems.data({ stored: 'Y' });
              window.catalogDetailStoredProducts.push(
                $('.b-catalog-detail').attr('data-id')
              );
            } else {
              $elems.data({ stored: 'N' });
              window.catalogDetailStoredProducts.forEach(function (cur) {
                if (cur === $('.b-catalog-detail').attr('data-id')) {
                  window.catalogDetailStoredProducts.pop(cur);
                }
              });
            }
            $elems.removeClass('i-preloader');
            favPreloader.remove();
            //Yandex Metrika
            if (ym && ymID) {
              ym(ymID, 'reachGoal', 'put_aside');
            }
          }
        },
        error: function () {},
      });
    });

    //buy button
    $('.b-catalog-detail__button-block .btn').click(function (e) {
      e.preventDefault();
      var $btn = $(this);

      if ($btn.hasClass('i-gray')) {
        window.location = $btn.attr('href');
        return;
      }

      $.ajax({
        url: $btn.data('ajax-url'),
        type: 'GET',
        dataType: 'json',
        data: 'id=' + $('.b-catalog-detail').attr('data-id'),
        success: function (data) {
          if (data && data.STATUS === 'Y') {
            //num of the products in the store
            //?
            $('#catalogDetailNum').text(data.num);
            $(
              'div[data-id=' + $('.b-catalog-detail').attr('data-id') + ']'
            ).data({ num: data.num });
            //num of the products in a cart
            $('#bx_cart_num').text(data.cart);

            //popup window
            $('#buyDetailPopup').appendTo('body').addClass('i-show');
            setTimeout(function () {
              $('#buyDetailPopup').addClass('i-animate');
            }, 100);

            //blur the page
            document.querySelector('html').classList.add('i-blur');

            //button transformation
            $btn
              .closest('.b-catalog-detail__button-block')
              .find('.col-sm-6:eq(0)')
              .css({ width: '100%' });
            $btn
              .closest('.b-catalog-detail__button-block')
              .find('.col-sm-6:eq(1)')
              .hide();

            $btn.addClass('i-gray').find('span').toggleClass('i-show');

            //add incart attribute to the tp
            $activeDataDiv.data({ incart: 'Y' });

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
    $('#buyDetailPopupOpaco, .b-catalog-detail-popup__close').click(function (
      e
    ) {
      e.preventDefault();
      $('#buyDetailPopup').removeClass('i-animate');

      //focus the page
      document.querySelector('html').classList.remove('i-blur');

      setTimeout(function () {
        $('#buyDetailPopup').removeClass('i-show');
      }, 500);
    });

    //one click link
    $('#oneClick')
      .on('show.bs.modal', function (e) {
        //blur the page
        $(this).appendTo('body');
        document.querySelector('html').classList.add('i-blur');

        var $link = $(e.relatedTarget);

        $.ajax({
          url: $link.data('ajax-url'),
          type: 'GET',
          dataType: 'html',
          data: 'id=' + $('.b-catalog-detail').attr('data-id'),
          success: function (data) {
            if (data) {
              $('#oneClick form').remove();
              $('#oneClick .modal-header').after(data);
            }
            //Yandex Metrika
            if (ym && ymID) {
              ym(ymID, 'reachGoal', 'goal_1click_begin');
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

    $('#oneClick').delegate('form', 'submit', function (e) {
      e.preventDefault();
      var $form = $(this);
      var $body = $('#oneClick .modal-body');

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

            $('#oneClick .modal-footer .btn').hide();
            $('#oneClick .modal-footer .i-gray').show();
            //ecommerce event trigger
            $('#oneClick').trigger('onClickSuccess.ecommerce');
            //Yandex Metrika
            if (ym && ymID) {
              ym(ymID, 'reachGoal', 'goal_1click_success'); //Покупка в 1 клик успешно завершена
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

    setTimeout(function () {
      $('body').addClass('i-load');
    }, 100);

    //subscribe form
    $('.b-catalog-detail__subscribe-block form').submit(function (e) {
      e.preventDefault();
      var $form = $(this);
      $('#tpid').val($('.b-catalog-detail').attr('data-id'));

      $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        dataType: 'json',
        data: $form.serialize(),
        success: function (data) {
          if (!data) {
            return;
          }

          $form.addClass('hidden');

          if (data && data.STATUS === 'Y') {
            $form
              .siblings('.b-message')
              .removeClass('i-warning')
              .removeClass('hidden');
          } else if (data && data.STATUS === 'E' && data.MESSAGE) {
            $form
              .siblings('.b-message')
              .addClass('i-warning')
              .removeClass('hidden')
              .find('span')
              .text(data.MESSAGE);
          }

          setTimeout(function () {
            $form.removeClass('hidden');
            $form
              .siblings('.b-message')
              .removeClass('i-warning')
              .addClass('hidden');
          }, 3000);

          //Yandex Metrika
          if (ym && ymID) {
            ym(ymID, 'reachGoal', 'subscribe_siccess');
          }
        },
        error: function (a, b, c) {
          console.log(a);
          console.log(b);
          console.log(c);
        },
      });
    });

    //click zoom
    $('.b-catalog-detail__gallery .fotorama').on(
      'fotorama:fullscreenexit',
      createGallery
    );

    $('.b-catalog-detail__icons .b-icon-zoom').click(function () {
      var images = '',
        srcBigArray;

      try {
        srcBigArray = $activeDataDiv.data('big-photo').split(';');
      } catch (e) {
        srcBigArray = $activeDataDiv.data('photo').split(';');
      }

      srcBigArray.forEach(function (cur, i, arr) {
        images += '<div><img src="' + cur + '" alt="" ></div>';
      });

      if ($('.b-catalog-detail__gallery .fotorama').length) {
        $('.b-catalog-detail__gallery .fotorama').data('fotorama').destroy();
        $('.b-catalog-detail__gallery .fotorama').empty().html(images);
        //video
        if (document.getElementById('catalogDetailVideo')) {
          $('.b-catalog-detail__gallery .fotorama').append(
            $('#catalogDetailVideo').html()
          );
        }
        //fotorama
        $('.b-catalog-detail__gallery .fotorama')
          .fotorama()
          .data('fotorama')
          .requestFullScreen();
      }
    });

    function createGallery() {
      var images = '';
      var srcArray = [];
      var srcBigArray;

      //photo
      if ($activeDataDiv.data('photo')) {
        srcArray = $activeDataDiv.data('photo').split(';');
      }

      srcBigArray = srcArray;

      try {
        srcBigArray = $activeDataDiv.data('big-photo').split(';');
      } catch (e) {
        srcBigArray = undefined;
      }

      srcArray.forEach(function (cur, i, arr) {
        if (srcBigArray) {
          images +=
            '<div data-thumb="' +
            cur +
            '"><a href="' +
            srcBigArray[i] +
            '"><img src="' +
            cur +
            '" alt=""';
          if ($('.b-catalog-detail__gallery').data('magnifier') === true) {
            images += ' data-magnify-src="' + srcBigArray[i] + '" ></a></div>';
          } else {
            images += '></a></div>';
          }
        } else {
          images += '<img src="' + cur + '" alt="" >';
        }
      });

      if ($('.b-catalog-detail__gallery .fotorama').length) {
        $('.b-catalog-detail__gallery .fotorama').data('fotorama').destroy();
        $('.b-catalog-detail__gallery .fotorama').empty().html(images);
        //video
        if (document.getElementById('catalogDetailVideo')) {
          $('.b-catalog-detail__gallery .fotorama').append(
            $('#catalogDetailVideo').html()
          );
        }
        //fotorama
        $('.b-catalog-detail__gallery .fotorama')
          .on('fotorama:showend', function (e, fotorama, extra) {
            if (window.matchMedia('(min-width: 768px)').matches) {
              fotorama.activeFrame.$stageFrame
                .find('img[data-magnify-src]')
                .magnify();
            }
          })
          .fotorama();
      } else {
        $('.b-catalog-detail__gallery img[data-magnify-src]').magnify();
      }
    }

    $('.b-catalog-detail__gallery').delegate(
      '.fotorama__html a',
      'click',
      function (e) {
        e.preventDefault();
      }
    );

    //products script

    var $dataDivs = $('#catalogDetailData div'),
      $activeDataDiv = $dataDivs.eq(0),
      //sizeCookieFlag = false,// there is no cookie for size, that means that we have never chosen size on this site
      propList = $('#catalogDetailData').data('prop-list'), //[{ type:"", code:"", name: ""}]
      propDB = {};

    //click prop
    $('#propListBlock').delegate(
      '.b-catalog-detail__colors-item, .b-catalog-detail__sizes-item',
      'click',
      function () {
        var $item = $(this);
        if ($item.hasClass('i-active')) {
          return;
        }
        var blockProp = $item.parent().data('prop');
        var itemProp = $item.text() || $item.css('backgroundImage');
        var $activeItem = $item.siblings('.i-active');
        var currentid = $('.b-catalog-detail').attr('data-id');
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
                compareItemProp($item.attr('class'), itemProp, propDB[n][m][3])
              ) {
                itemID = n;
              }
            }
          }
        }

        $activeDataDiv = $('#catalogDetailData div[data-id=' + itemID + ']');
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

    if ($dataDivs.length) {
      showAllProperties($dataDivs);
      showFirstOffer(propDB);
    }

    $('.b-catalog-detail__size-table-link a, #sizeIcon').sideNav({
      menuWidth: '60%',
      onOpen: function () {
        //blur the page
        document.querySelector('html').classList.add('i-blur');
      },
      onClose: function () {
        //focus the page
        document.querySelector('html').classList.remove('i-blur');
      },
    });

    $('#commentsIcon').click(function () {
      var $commentsTab = $('.b-tabs__tab[ data-tab="comments" ]');
      if ($commentsTab.hasClass('i-active')) {
        $.scrollTo($('.b-tabs'), 500);
      } else {
        $('.b-tabs__tab[ data-tab="comments" ]').click();
      }
    });

    $('#shareIcon').click(function () {
      $.scrollTo($('.b-catalog-detail__share'), 500);
    });

    //sizes table
    $('.b-sizes-menu__table ')
      .delegate('th', 'mouseenter', function () {
        var $tr = $(this).parent();
        var num = $tr.closest('tbody').find('tr').index($tr);
        $tr.addClass('i-hover');
        $('.b-sizes-menu__scroll tr:eq( ' + num + ' )').addClass('i-hover');
      })
      .delegate('th', 'mouseleave', function () {
        $('.b-sizes-menu__table tr.i-hover').removeClass('i-hover');
      })
      .delegate('td', 'mouseenter', function () {
        var $td = $(this);
        var $tr = $td.parent();
        var num = $tr.closest('tbody').find('tr').index($tr);
        var numTd = $tr.find('td').index($td);
        $tr.addClass('i-hover');
        $('.b-sizes-menu__th tr:eq( ' + num + ' )').addClass('i-hover');

        $td.addClass('i-active');

        $tr
          .closest('tbody')
          .find('tr')
          .each(function () {
            $(this)
              .find('td:eq( ' + numTd + ' )')
              .addClass('i-hover');
          });
      })
      .delegate('td', 'mouseleave', function () {
        $(
          '.b-sizes-menu__table tr.i-hover, .b-sizes-menu__table td.i-hover'
        ).removeClass('i-hover');
        $('.b-sizes-menu__table td.i-active').removeClass('i-active');
      })
      .delegate('td', 'click', function () {
        if ($(this).hasClass('i-clicked-active')) {
          $('.b-sizes-menu__table .i-clicked').removeClass('i-clicked');
          $('.b-sizes-menu__table .i-clicked-active').removeClass(
            'i-clicked-active'
          );
          $('.b-sizes-menu__table').removeClass('i-clicked');
        } else {
          $('.b-sizes-menu__table .i-clicked').removeClass('i-clicked');
          $('.b-sizes-menu__table .i-clicked-active').removeClass(
            'i-clicked-active'
          );

          $('.b-sizes-menu__table .i-hover')
            .addClass('i-clicked')
            .removeClass('i-hover');
          $('.b-sizes-menu__table .i-active')
            .addClass('i-clicked-active')
            .removeClass('i-active');

          $('.b-sizes-menu__table').addClass('i-clicked');
        }
      });

    //sizes table-xs
    $('.b-sizes-menu__table-xs ').delegate('select', 'change', selectSize);
    $('.b-sizes-menu__table-xs select:eq(0)').change();

    function selectSize(e) {
      var $select = $(e.target);
      var $selected = $select.find('option:selected');
      var n = $select.find('option').index($selected);
      //selects
      $('.b-sizes-menu__table-xs select ').each(function () {
        /*$( this ).find( 'option:eq(' + n + ')' ).attr({ selected: 'selected' });
         $( this ).find( 'option:eq(' + n + ')' )[0].setAttribute( 'selected', 'selected' );*/
        $(this).find('option:eq(' + n + ')')[0].selected = true;
      });
      //spans
      $('.b-sizes-menu__table-xs td span').hide();
      $('.b-sizes-menu__table-xs td').each(function () {
        $(this)
          .find('span:eq(' + n + ')')
          .show();
      });
    }

    $('#slide-size-table .side-nav__close').click(function () {
      $('#slide-size-table').sideNav('hide');
    });

    showTableBorders();
    resizeSideNav();

    $(window).bind('resize', function () {
      setTimeout(function () {
        showTableBorders();
        resizeSideNav();
      }, 100);
    });

    function resizeSideNav() {
      $('#slide-size-table').appendTo('body');

      if (
        window.matchMedia('( min-width: 992px )').matches &&
        !$('#slide-size-table').hasClass('i-60')
      ) {
        $('#slide-size-table')
          .addClass('i-60')
          .removeClass('i-80')
          .removeClass('i-95');
        $('.b-catalog-detail__size-table-link a, #sizeIcon').sideNav({
          menuWidth: '80%',
          onOpen: function () {
            //blur the page
            document.querySelector('html').classList.add('i-blur');
          },
          onClose: function () {
            //focus the page
            document.querySelector('html').classList.remove('i-blur');
          },
        });
      } else if (
        window.matchMedia('( min-width: 768px )').matches &&
        window.matchMedia('( max-width: 991px )').matches &&
        !$('#slide-size-table').hasClass('i-80')
      ) {
        $('#slide-size-table')
          .addClass('i-80')
          .removeClass('i-60')
          .removeClass('i-95');
        $('.b-catalog-detail__size-table-link a, #sizeIcon').sideNav({
          menuWidth: '80%',
          onOpen: function () {
            //blur the page
            document.querySelector('html').classList.add('i-blur');
          },
          onClose: function () {
            //focus the page
            document.querySelector('html').classList.remove('i-blur');
          },
        });
      } else if (
        window.matchMedia('(max-width: 767px)').matches &&
        !$('#slide-size-table').hasClass('i-95')
      ) {
        $('#slide-size-table')
          .addClass('i-95')
          .removeClass('i-60')
          .removeClass('i-80');
        $('.b-catalog-detail__size-table-link a, #sizeIcon').sideNav({
          menuWidth: '95%',
          onOpen: function () {
            //blur the page
            document.querySelector('html').classList.add('i-blur');
          },
          onClose: function () {
            //focus the page
            document.querySelector('html').classList.remove('i-blur');
          },
        });
      }
    }

    function showTableBorders() {
      if (
        $('.b-sizes-menu__scroll').width() <
        $('.b-sizes-menu__scroll table').width()
      ) {
        $('.b-sizes-menu__table').addClass('i-scrolled');
      } else {
        $('.b-sizes-menu__table').removeClass('i-scrolled');
      }
    }

    function showAllProperties($dataDivs) {
      //onLoad

      var propBlocks = {};

      propList.forEach(function (elem) {
        //create prop
        var $propBlock;
        var itemArray = [];

        //form item array
        $dataDivs.each(function () {
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
            '<div class="b-catalog-detail__' +
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
              '<span class="b-catalog-detail__colors-item" style="background-image: url( \'' +
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
              '<span class="b-catalog-detail__sizes-item"><span>' +
                cur +
                '</span></span>'
            );

            $propBlock.append($item);
          });
        }

        propBlocks[elem.code] = $propBlock;
      });

      for (var n in propBlocks) {
        $('#propListBlock').append('<hr>').append(propBlocks[n]);
      }
    }

    function showFirstOffer(propDB) {
      if ($dataDivs.length === 1) {
        //if there is only one offer
        $activeDataDiv = $dataDivs;
        showOffer($activeDataDiv);
        return;
      }

      //page load

      //form database propDB
      $dataDivs.each(function () {
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

      //check URL query
      var query = {};

      if (window.location.search) {
        query = parseQuery(window.location.search);
      }

      if (
        query.product_id &&
        $('#catalogDetailData div[data-id=' + query.product_id + ']').length
      ) {
        //if there is id in URL
        $activeDataDiv = $(
          '#catalogDetailData div[data-id=' + query.product_id + ']'
        );
        showOffer($activeDataDiv);
      } else {
        //show first offer in list
        $activeDataDiv = $('#catalogDetailData div:eq(0)');
        showOffer($activeDataDiv);
      }

      setDisabled();
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
          $(
            '.b-catalog-detail__' +
              currentPropName +
              ' .b-catalog-detail__colors-item'
          ).each(function () {
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
          $(
            '.b-catalog-detail__' +
              currentPropName +
              ' .b-catalog-detail__sizes-item'
          ).each(function () {
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

    var product_id = ''; // id for the statistics ajax request

    function showOffer($div) {
      //id
      $('.b-catalog-detail').attr({ 'data-id': $div.data('id') + '' });
      //props
      propList.forEach(function (elem) {
        if (elem.type === 'color') {
          $(
            '.b-catalog-detail__' +
              elem.code +
              ' .b-catalog-detail__colors-item'
          ).each(function () {
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
          $(
            '.b-catalog-detail__' + elem.code + ' .b-catalog-detail__sizes-item'
          ).each(function () {
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
      var srcBigArray;

      //photo
      if ($div.data('photo')) {
        srcArray = $div.data('photo').split(';');
      }

      srcBigArray = srcArray;

      try {
        srcBigArray = $div.data('big-photo').split(';');
      } catch (e) {
        srcBigArray = undefined;
      }

      srcArray.forEach(function (cur, i, arr) {
        if (srcBigArray) {
          images +=
            '<div data-thumb="' +
            cur +
            '"><a href="' +
            srcBigArray[i] +
            '"><img src="' +
            cur +
            '" alt=""';
          if ($('.b-catalog-detail__gallery').data('magnifier') === true) {
            images += ' data-magnify-src="' + srcBigArray[i] + '" ></a></div>';
          } else {
            images += '></a></div>';
          }
        } else {
          images += '<img src="' + cur + '" alt="" >';
        }
      });

      //gallery ratio
      var catalogDetailGalleryRatio = 100;
      var catalogDetailGalleryMaxheight = 100000;

      if ($div.data('dimensions')) {
        var catalogDetailGalleryImages = $div.data('dimensions');

        catalogDetailGalleryImages.forEach(function (val, i, arr) {
          var rat = val.width / val.height;
          if (rat < catalogDetailGalleryRatio && rat > 0.25) {
            catalogDetailGalleryRatio = rat;
            catalogDetailGalleryMaxheight = val.height;
          }
        });
      }

      if ($('.b-catalog-detail__gallery .fotorama').length) {
        $('.b-catalog-detail__gallery .fotorama').data('fotorama').destroy();
        $('.b-catalog-detail__gallery .fotorama').empty().html(images);
        //video
        if (document.getElementById('catalogDetailVideo')) {
          $('.b-catalog-detail__gallery .fotorama').append(
            $('#catalogDetailVideo').html()
          );
        }
        //fotorama
        $('.b-catalog-detail__gallery .fotorama')
          .on('fotorama:showend', function (e, fotorama, extra) {
            if (window.matchMedia('(min-width: 768px)').matches) {
              fotorama.activeFrame.$stageFrame
                .find('img[data-magnify-src]')
                .magnify();
            }
          })
          .fotorama({
            ratio: catalogDetailGalleryRatio,
            maxheight: catalogDetailGalleryMaxheight,
          });
      } else {
        $('.b-catalog-detail__gallery img[data-magnify-src]').magnify();
      }

      //properties
      $('.b-catalog-detail__props .text-muted span').each(function () {
        if ($(this).attr('class').search('catalogDetailProperty') !== -1) {
          $(this).parent().addClass('hidden');
        }
      });
      for (var key in $div.data()) {
        if (key.search('property') !== -1) {
          //$( '.catalogDetailP' + key.substring(1)).text( $div.data( key )).parent().removeClass( 'hidden' );
          $('.catalogDetailP' + key.substring(1))
            .html($div.data(key))
            .parent()
            .removeClass('hidden');
        }
      }
      //price
      if ($('.b-catalog-detail__price').length) {
        if ($div.data('price')) {
          $('.b-catalog-detail__price')
            .show()
            .text($div.data('price') || '');
        } else {
          $('.b-catalog-detail__price').hide();
        }
      }
      //old price
      if ($('.b-catalog-detail__old-price').length) {
        if ($div.data('old-price')) {
          $('.b-catalog-detail__old-price')
            .show()
            .find('s')
            .text($div.data('old-price'));
        } else {
          $('.b-catalog-detail__old-price').hide();
        }
      }
      //discount
      var discountText = $('.b-catalog-detail__benefit span').text();
      if ($div.data('discount-diff')) {
        $('.b-catalog-detail__benefit')
          .show()
          .html(
            $div.data('discount-diff') + '<span>' + discountText + '</span>'
          );
      } else {
        $('.b-catalog-detail__benefit').hide();
      }
      //num
      try {
        $('#catalogDetailNum').text($div.data('num'));
        if ($div.data('num') + '' === '0') {
          $('.b-catalog-detail__num__y').addClass('hidden');
          $('.b-catalog-detail__num__n').removeClass('hidden');
        } else {
          $('.b-catalog-detail__num__y').removeClass('hidden');
          $('.b-catalog-detail__num__n').addClass('hidden');
        }
      } catch (e) {}
      //discount icon
      try {
        $('.b-icon-discount').text($div.data('discount-percent'));
      } catch (e) {}
      //stored
      try {
        window.catalogDetailStoredProducts =
          window.catalogDetailStoredProducts || [];
        var stored = window.catalogDetailStoredProducts.some(function (
          cur,
          index,
          array
        ) {
          return cur + '' === $div.data('id') + '';
        });

        if (stored) {
          stored = 'Y';
          $('#catalogDetailFavLink span').addClass('hidden');
          $('#catalogDetailFavLink span.i-stored').removeClass('hidden');
          $('#catalogDetailFavIcon').addClass('i-stored');
        } else {
          stored = 'N';
          $('#catalogDetailFavLink span').removeClass('hidden');
          $('#catalogDetailFavLink span.i-stored').addClass('hidden');
          $('#catalogDetailFavIcon').removeClass('i-stored');
        }

        $('#catalogDetailFavLink, #catalogDetailFavIcon').data({
          stored: stored,
        });
      } catch (e) {}

      //availability
      try {
        if ($div.data('available') === 'Y') {
          $('.b-catalog-detail__button-block').show();
          $('.b-catalog-detail__subscribe-block').addClass('hidden');
        } else {
          $('.b-catalog-detail__button-block').hide();
        }
      } catch (e) {}

      //subscribe
      try {
        if ($div.data('subscribe') === 'Y' && $div.data('available') !== 'Y') {
          $('.b-catalog-detail__button-block').hide();
          $('.b-catalog-detail__subscribe-block').removeClass('hidden');
        } else if (
          $div.data('subscribe') !== 'Y' &&
          $div.data('available') !== 'Y'
        ) {
          $('.b-catalog-detail__button-block').hide();
          $('.b-catalog-detail__subscribe-block').addClass('hidden');
        }
      } catch (e) {}

      //in cart button
      try {
        var href = $('.b-catalog-detail__button-block a').attr('href');
        if (
          $div.data('incart') === 'Y' &&
          !$('.b-catalog-detail__button-block .btn').hasClass('i-gray')
        ) {
          $('.b-catalog-detail__button-block .col-sm-6').css({ width: '100%' });
          $('.b-catalog-detail__button-block .col-sm-6:eq(1)').hide();
          $('.b-catalog-detail__button-block .btn')
            .addClass('i-gray')
            .find('span')
            .toggleClass('i-show');
        } else if (
          (!$div.data('incart') || $div.data('incart') !== 'Y') &&
          $('.b-catalog-detail__button-block .btn').hasClass('i-gray')
        ) {
          $('.b-catalog-detail__button-block .col-sm-6').removeAttr('style');
          $('.b-catalog-detail__button-block .col-sm-6:eq(1)').show();
          $('.b-catalog-detail__button-block .btn')
            .removeClass('i-gray')
            .find('span')
            .toggleClass('i-show');
        }
      } catch (e) {}

      //send statistics request
      try {
        var $data = $('.b-statistics-data');
        var query = {};
        var locationSearch = '?';

        if (product_id === $div.data('id')) {
          return;
        } else {
          //send statistics request to count amount of views
          product_id = $div.data('id');

          $.ajax({
            url: $data.data('url'),
            type: $data.data('method'),
            dataType: 'html',
            data: $data.data('data') + '&PRODUCT_ID=' + product_id,
            error: function (a, b, c) {
              if (window.console) {
                console.log(a);
                console.log(b);
                console.log(c);
              }
            },
          });
        }

        //set URL
        try {
          if (window.location.search) {
            query = parseQuery(window.location.search);
          }

          query.product_id = $div.data('id');

          for (var k in query) {
            locationSearch += k + '=' + query[k] + '&';
          }

          locationSearch = String(locationSearch).substring(
            0,
            locationSearch.length - 1
          );

          if (window.history) {
            history.replaceState({}, '', locationSearch);
          }
        } catch (e) {}
      } catch (e) {}

      //set title h1
      $('h1').text($div.data('title'));
    }

    function parseQuery(queryString) {
      var query = {};
      var pairs = (queryString[0] === '?'
        ? queryString.substr(1)
        : queryString
      ).split('&');
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
      }
      return query;
    }

    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });
})(jQuery);
