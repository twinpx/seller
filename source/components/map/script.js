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
      
      var shopsMap, clusterer, balloonLayout, balloonContentLayout;
      
      function initMap() {
        
        shopsMap = new ymaps.Map( 'yMapShops', {
          center: [ window.yMapPlacemarks[0].lat, window.yMapPlacemarks[0].lon ],
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
        balloonLayout = ymaps.templateLayoutFactory.createClass(
            '<a href="$[properties.href]" class="b-shop-balloon"><span class="b-shop-balloon__close"></span><span class="b-shop-balloon__img" style="background-image: url(\'$[properties.img]\');"></span><span class="b-shop-balloon__heading"><span>$[properties.heading]</span></span></a>', {
                /**
                 * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                 * @function
                 * @name build
                 */
                build: function () {
                    this.constructor.superclass.build.call(this);

                    this._$element = $('a.b-shop-balloon', this.getParentElement());

                    this.applyElementOffset();

                    this._$element.find('.b-shop-balloon__close')
                        .on('click', $.proxy(this.onCloseClick, this));
                },

                /**
                 * Удаляет содержимое макета из DOM.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                 * @function
                 * @name clear
                 */
                clear: function () {
                    this._$element.find('.b-shop-balloon__close').off('click');
                    this.constructor.superclass.clear.call(this);
                },

                /**
                 * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name onSublayoutSizeChange
                 */
                onSublayoutSizeChange: function () {
                    balloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

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
                        top: -(this._$element[0].offsetHeight)
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
                    e.stopPropagation();
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
                        return balloonLayout.superclass.getShape.call(this);
                    }

                    var position = this._$element.position();

                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight
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
                    return element && element[0];
                }
            });
        
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
        
        //on load
        setPlacemarks();
        
        shopsMap.geoObjects.add( clusterer );
        
        //bounds
        if ( window.yMapPlacemarks.length > 1 ) {
          shopsMap.setBounds( clusterer.getBounds(), { checkZoomRange: true, duration: 500 });
        }
      }
      
      function setPlacemarks() {
        try {
          window.yMapPlacemarks.forEach( function( elem ) {
            var placemark = new ymaps.Placemark( [elem.lat, elem.lon], {
              img: elem.img,
              heading: elem.heading,
              href: elem.href
            }, {
              iconLayout: 'default#image',
              iconImageHref: elem.icon,
              iconImageSize: [43, 64],
              iconImageOffset: [-22, -64],
              balloonShadow: false,
              balloonLayout: balloonLayout,
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