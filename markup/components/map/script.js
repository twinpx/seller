(function($) {
    "use strict";
    $(function() {
        if (!window.ymaps) {
            return;
        }
        ymaps.ready(function() {
            var $yMapShops = $("#yMapShops");
            $.ajax({
                url: $yMapShops.data("ajax-url"),
                type: $yMapShops.data("ajax-method"),
                dataType: "json",
                success: function(data) {
                    if (data && typeof data === "object" && data.STATUS === "Y" && data.DATA) {
                        window.yMapPlacemarks = data.DATA;
                        initMap();
                    }
                },
                error: function(a, b, c) {
                    if (window.console) {
                        console.log(a);
                        console.log(b);
                        console.log(c);
                    }
                }
            });
            var shopsMap, clusterer, balloonLayout, balloonContentLayout;
            function initMap() {
                shopsMap = new ymaps.Map("yMapShops", {
                    center: [ 55.751574, 37.573856 ],
                    zoom: 12,
                    controls: [ "geolocationControl", "zoomControl" ]
                }, {
                    yandexMapDisablePoiInteractivity: true,
                    searchControlProvider: "yandex#search"
                });
                shopsMap.behaviors.disable("scrollZoom");
                shopsMap.events.add("click", function(e) {
                    shopsMap.balloon.close();
                });
                balloonLayout = ymaps.templateLayoutFactory.createClass('<a href="$[properties.href]" class="b-shop-balloon"><span class="b-shop-balloon__close"></span><span class="b-shop-balloon__img" style="background-image: url(\'$[properties.img]\');"></span><span class="b-shop-balloon__heading">$[properties.heading]</span></a>', {
                    build: function() {
                        this.constructor.superclass.build.call(this);
                        this._$element = $("a.b-shop-balloon", this.getParentElement());
                        this.applyElementOffset();
                        this._$element.find(".b-shop-balloon__close").on("click", $.proxy(this.onCloseClick, this));
                    },
                    clear: function() {
                        this._$element.find(".b-shop-balloon__close").off("click");
                        this.constructor.superclass.clear.call(this);
                    },
                    onSublayoutSizeChange: function() {
                        balloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
                        if (!this._isElement(this._$element)) {
                            return;
                        }
                        this.applyElementOffset();
                        this.events.fire("shapechange");
                    },
                    applyElementOffset: function() {
                        this._$element.css({
                            left: -(this._$element[0].offsetWidth / 2),
                            top: -this._$element[0].offsetHeight
                        });
                    },
                    onCloseClick: function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.events.fire("userclose");
                    },
                    getShape: function() {
                        if (!this._isElement(this._$element)) {
                            return balloonLayout.superclass.getShape.call(this);
                        }
                        var position = this._$element.position();
                        return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([ [ position.left, position.top ], [ position.left + this._$element[0].offsetWidth, position.top + this._$element[0].offsetHeight ] ]));
                    },
                    _isElement: function(element) {
                        return element && element[0];
                    }
                });
                var preset = "islands#blackClusterIcons";
                if (window.yMapPlacemarksIcons) {
                    preset = "islands#" + yMapPlacemarksIcons;
                }
                clusterer = new ymaps.Clusterer({
                    preset: preset,
                    groupByCoordinates: false
                });
                setPlacemarks();
                shopsMap.geoObjects.add(clusterer);
                shopsMap.setBounds(clusterer.getBounds(), {
                    checkZoomRange: true,
                    duration: 500
                });
            }
            function setPlacemarks() {
                try {
                    window.yMapPlacemarks.forEach(function(elem) {
                        var placemark = new ymaps.Placemark([ elem.lat, elem.lon ], {
                            img: elem.img,
                            heading: elem.heading,
                            href: elem.href
                        }, {
                            iconLayout: "default#image",
                            iconImageHref: elem.icon,
                            iconImageSize: [ 43, 64 ],
                            iconImageOffset: [ -22, -64 ],
                            balloonShadow: false,
                            balloonLayout: balloonLayout,
                            balloonPanelMaxMapArea: 0
                        });
                        clusterer.add(placemark);
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        });
    });
})(jQuery);