( function($) {

  'use strict';
  
  $( function() {
    
    setTimeout( function() {
      $( '.b-shop-detail' ).addClass( 'i-loaded' );
    }, 500);

    //gallery
    var swiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      preloadImages: false,
      lazy: {
        loadPrevNext: true
      },
      watchSlidesVisibility: true,
      on: {
        init: function () {
          this.$el.find( 'img' )[0].onload = function() {
            
            //map
            ymaps.ready( function () {
              var shopDetailMap = new ymaps.Map( 'shopDetailMapID', {
                center: window.shopDetailMapCoords,
                zoom: window.shopDetailMapZoom || 9,
                controls: ['typeSelector', 'zoomControl']
              }, {
                  // Зададим опции для элементов управления.
                  typeSelectorFloat: 'left',
                  zoomControlSize: 'small'
              }),
              
              shopDetailPlacemark = new ymaps.Placemark( shopDetailMap.getCenter(), {}, {
                  // Опции.
                  // Необходимо указать данный тип макета.
                  iconLayout: 'default#image',
                  // Своё изображение иконки метки.
                  iconImageHref: window.shopDetailMapBalloonHref,
                  // Размеры метки.
                  iconImageSize: [43, 64],
                  // Смещение левого верхнего угла иконки относительно
                  // её "ножки" (точки привязки).
                  iconImageOffset: [-22, -64]
              });

              shopDetailMap.geoObjects.add( shopDetailPlacemark );
              
              //disable scrollZoom
              shopDetailMap.behaviors.disable( 'scrollZoom' );
              shopDetailMap.events.add( 'click', function() {
                shopDetailMap.behaviors.enable( 'scrollZoom' );
              });
                
              //disable drag for mobile
              if ( window.matchMedia( '(max-width: 1024px)' ).matches ) {
                shopDetailMap.behaviors.disable('drag');
              }
              
            });
    
          };
          //$( '.b-shops' ).addClass( 'i-swiper-init' );
        },
      }
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));