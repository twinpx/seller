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
            var shopsMap, clusterer, balloonProps, balloonLayout;
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
                balloonProps = {
                    build: function() {
                        this.constructor.superclass.build.call(this);
                        this._$element = $(".b-shop-balloon", this.getParentElement());
                        this.applyElementOffset();
                        this._$element.find(".b-shop-balloon__close").on("click", $.proxy(this.onCloseClick, this));
                    },
                    clear: function() {
                        this._$element.find(".b-shop-balloon__close").off("click");
                        this.constructor.superclass.clear.call(this);
                    },
                    applyElementOffset: function() {
                        this._$element.css({
                            left: -(this._$element[0].offsetWidth / 2),
                            top: -this._$element[0].offsetHeight
                        });
                    },
                    onCloseClick: function(e) {
                        e.preventDefault();
                        this.events.fire("userclose");
                    },
                    _isElement: function(element) {
                        return element && element[0] && element.find(".arrow")[0];
                    }
                };
                var preset = "islands#blackClusterIcons";
                if (window.yMapPlacemarksIcons) {
                    preset = "islands#" + yMapPlacemarksIcons;
                }
                clusterer = new ymaps.Clusterer({
                    preset: preset,
                    groupByCoordinates: false
                });
                balloonLayout = ymaps.templateLayoutFactory.createClass('<a href="$[properties.href]" class="b-shop-balloon"><span class="b-shop-balloon__close"></span><span class="b-shop-balloon__img" style="background-image: url(\'$[properties.img]\');"></span><span class="b-shop-balloon__heading">$[properties.heading]</span></a>', balloonProps);
                $(".b-map__nav-item.i-active").each(function() {
                    setPlacemarks($(this).data("tab"));
                });
                shopsMap.geoObjects.add(clusterer);
                shopsMap.setBounds(clusterer.getBounds(), {
                    checkZoomRange: true,
                    duration: 500
                });
            }
            $(".b-map__nav-item, .b-map .dropdown-menu a").click(function(e) {
                var $item = $(this);
                var $map = $(this).closest(".b-map");
                clusterer.removeAll();
                if ($item.hasClass("b-map__nav-item")) {
                    if ($map.data("singletab")) {
                        $map.find(".b-map__nav-item").removeClass("i-active");
                    }
                    $item.toggleClass("i-active");
                    $(".b-map__nav-item.i-active").each(function() {
                        setPlacemarks($(this).data("tab"));
                    });
                } else if ($item.is("a")) {
                    e.preventDefault();
                    e.stopPropagation();
                    if ($item.data("tab") === "all") {
                        $map.find(".dropdown-menu a").each(function() {
                            setPlacemarks($(this).data("tab"));
                        });
                    } else {
                        setPlacemarks($item.data("tab"));
                    }
                }
                shopsMap.setBounds(clusterer.getBounds(), {
                    checkZoomRange: true,
                    duration: 500
                });
            });
            function setPlacemarks(tab) {
                if (!tab) {
                    return;
                }
                try {
                    window.yMapPlacemarks[tab].forEach(function(elem) {
                        var placemark = new ymaps.Placemark(elem.coords, {
                            img: elem.img,
                            heading: elem.heading,
                            href: elem.href,
                            balloonContent: "цвет <strong>воды пляжа бонди</strong>"
                        }, {
                            iconLayout: "default#image",
                            iconImageHref: elem.icon,
                            iconImageSize: [ 32, 32 ],
                            iconImageOffset: [ -16, -16 ],
                            balloonShadow: false,
                            balloonContentLayout: balloonLayout
                        });
                        clusterer.add(placemark);
                    });
                } catch (e) {}
            }
        });
    });
})(jQuery);