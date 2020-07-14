( function($) {

  'use strict';
  
  $( function() {
    
    if ( !window.ymaps ) {
      return;
    }
    
    ymaps.ready(function () {
      
      var $yMapShops = $( '#yMapShops' );
      
      //load placemarks
      $.ajax({
        url: $yMapShops.data( 'ajax-url' ),
        type: $yMapShops.data( 'ajax-method' ),
        dataType: "json",
        success: function( data ) {
          
          if ( data && typeof data === 'object' && data.STATUS === 'Y' && data.DATA ) {
            window.yMapPlacemarks = data.DATA;
            initMap();
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
      
      var shopsMap, clusterer, MyBalloonLayout, MyBalloonContentLayout;
      
      function initMap() {
        
        shopsMap = new ymaps.Map( 'yMapShops', {
          center: [ 55.751574, 37.573856 ],
          zoom: 12,
          controls: [ 'geolocationControl', 'zoomControl' ]
        }, {
          yandexMapDisablePoiInteractivity: true,
          searchControlProvider: 'yandex#search'
        });
        
        shopsMap.behaviors.disable( 'scrollZoom' );
        shopsMap.events.add( 'click', function (e) {
          shopsMap.balloon.close();
        });
        
        // Создание макета балуна на основе Twitter Bootstrap.
        MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="popover top">' +
                '<a class="close" href="#">&times;</a>' +
                '<div class="arrow"></div>' +
                '<div class="popover-inner">' +
                '$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]' +
                '</div>' +
                '</div>', {
                /**
                 * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                 * @function
                 * @name build
                 */
                build: function () {
                    this.constructor.superclass.build.call(this);

                    this._$element = $('.popover', this.getParentElement());

                    this.applyElementOffset();

                    this._$element.find('.close')
                        .on('click', $.proxy(this.onCloseClick, this));
                },

                /**
                 * Удаляет содержимое макета из DOM.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                 * @function
                 * @name clear
                 */
                clear: function () {
                    this._$element.find('.close')
                        .off('click');

                    this.constructor.superclass.clear.call(this);
                },

                /**
                 * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name onSublayoutSizeChange
                 */
                onSublayoutSizeChange: function () {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                    if(!this._isElement(this._$element)) {
                        return;
                    }

                    this.applyElementOffset();

                    this.events.fire('shapechange');
                },

                /**
                 * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name applyElementOffset
                 */
                applyElementOffset: function () {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth / 2),
                        top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                    });
                },

                /**
                 * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name onCloseClick
                 */
                onCloseClick: function (e) {
                    e.preventDefault();

                    this.events.fire('userclose');
                },

                /**
                 * Используется для автопозиционирования (balloonAutoPan).
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                 * @function
                 * @name getClientBounds
                 * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                 */
                getShape: function () {
                    if(!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
                    }

                    var position = this._$element.position();

                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                        ]
                    ]));
                },

                /**
                 * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
                 * @function
                 * @private
                 * @name _isElement
                 * @param {jQuery} [element] Элемент.
                 * @returns {Boolean} Флаг наличия.
                 */
                _isElement: function (element) {
                    return element && element[0] && element.find('.arrow')[0];
                }
            });

        // Создание вложенного макета содержимого балуна.
        MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
                '<div class="popover-content">$[properties.balloonContent]</div>'
        );
        
        //balloon
        /*balloonProps = {
          build: function () {
            this.constructor.superclass.build.call(this);
            this._$element = $('.b-shop-balloon', this.getParentElement());
            this.applyElementOffset();

            this._$element.find('.b-shop-balloon__close').on('click', $.proxy(this.onCloseClick, this));
          },
          clear: function () {
              this._$element.find('.b-shop-balloon__close').off('click');
              this.constructor.superclass.clear.call(this);
          },
          applyElementOffset: function () {
            this._$element.css({
              left: -(this._$element[0].offsetWidth / 2),
              top: -(this._$element[0].offsetHeight)
            });
          },
          onCloseClick: function (e) {
            e.preventDefault();
            this.events.fire('userclose');
          },
          _isElement: function (element) {
            return element && element[0] && element.find('.arrow')[0];
          }
        };*/
        
        //cluster
        var preset = 'islands#blackClusterIcons';
        if ( window.yMapPlacemarksIcons ) {
          preset = 'islands#' + yMapPlacemarksIcons;
        }
        clusterer = new ymaps.Clusterer({
          preset: preset,
          //clusterNumbers: [10],
          groupByCoordinates: false,
        });
        
        //create balloon layout
        /*balloonLayout = ymaps.templateLayoutFactory.createClass(
          '<a href="$[properties.href]" class="b-shop-balloon"><span class="b-shop-balloon__close"></span><span class="b-shop-balloon__img" style="background-image: url(\'$[properties.img]\');"></span><span class="b-shop-balloon__heading">$[properties.heading]</span></a>',
          balloonProps
        );*/
        
        //on load
        setPlacemarks();
        
        shopsMap.geoObjects.add( clusterer );
        
        //bounds
        shopsMap.setBounds( clusterer.getBounds(), { checkZoomRange: true, duration: 500 });
      }
      
      function setPlacemarks() {
        try {
          window.yMapPlacemarks.forEach( function( elem ) {
            var placemark = new ymaps.Placemark( elem.coords, {
              img: elem.img,
              heading: elem.heading,
              href: elem.href,
               balloonHeader: 'Заголовок балуна',
            balloonContent: 'Контент балуна'
            }, {
              iconLayout: 'default#image',
              iconImageHref: elem.icon,
              iconImageSize: [32, 32],
              iconImageOffset: [-16, -16],
              balloonShadow: false,
              balloonLayout: MyBalloonLayout,
              balloonContentLayout: MyBalloonContentLayout,
              balloonPanelMaxMapArea: 0
            });
            clusterer.add( placemark );
          });
        } catch(e) {
          console.log(e);
        }
      }
      
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));