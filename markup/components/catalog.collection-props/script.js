(function($) {
    "use strict";
    $(function() {
        if (String(window.location.search).search("sort=") !== -1) {
            setTimeout(function() {
                $.scrollTo($(".bj-sorting:eq(0)").offset().top - 30, 500);
            }, 1500);
        }
        if (String(window.location.search).search("PAGEN_2=") !== -1) {
            setTimeout(function() {
                $.scrollTo($(".b-catalog-collection:eq(0)").offset().top - 30, 500);
            }, 1500);
        }
        setTitle();
        function setTitle() {
            if (window.matchMedia("( min-width: 768px )").matches) {
                $(".b-catalog-element").each(function() {
                    var $this = $(this), $title = $this.find(".b-catalog-element__title");
                    if (String($title.text()).length > 40) {
                        $title.text($.trim(String($title.text()).substring(0, 39)) + "...");
                    }
                });
            } else {
                $(".b-catalog-element").each(function() {
                    var $this = $(this), $title = $this.find(".b-catalog-element__title");
                    if (String($title.text()).length > 107) {
                        $title.text($.trim(String($title.attr("title")).substring(0, 107)) + "...");
                    }
                });
            }
        }
        $("#subscribeModal").on("show.bs.modal", function(e) {
            var $link = $(e.relatedTarget);
            $.ajax({
                url: $link.data("ajax-url"),
                type: "GET",
                dataType: "html",
                data: "id=" + $link.closest(".b-catalog-element").attr("data-id"),
                success: function(data) {
                    if (data) {
                        $("#subscribeModal form").remove();
                        $("#subscribeModal .modal-header").after(data);
                    }
                },
                error: function(a, b, c) {
                    console.log(a);
                    console.log(b);
                    console.log(c);
                }
            });
        });
        $("#subscribeModal").delegate("form", "submit", function(e) {
            e.preventDefault();
            var $form = $(this);
            var $body = $("#subscribeModal .modal-body");
            $.ajax({
                url: $form.attr("action"),
                type: $form.attr("method"),
                dataType: "json",
                data: $form.serialize(),
                success: function(data) {
                    if (data && data.MESSAGE) {
                        $body.height($body.height());
                        $body.empty().append('<p class="text-center">' + data.MESSAGE + "</p>");
                        $body.height($body.find("p").height());
                        $("#subscribeModal .modal-footer .btn").hide();
                        $("#subscribeModal .modal-footer .i-gray").show();
                    }
                },
                error: function(a, b, c) {
                    console.log(a);
                    console.log(b);
                    console.log(c);
                }
            });
        });
        $(".b-catalog-element__button .btn").click(function(e) {
            e.preventDefault();
            $(".b-catalog-element__button .btn").trigger("add.ecommerce");
            var $btn = $(this);
            if ($btn.hasClass("i-gray")) {
                window.location = $btn.attr("href");
                return;
            }
            $.ajax({
                url: $btn.data("ajax-url"),
                type: "GET",
                dataType: "json",
                data: "id=" + $btn.closest(".b-catalog-element").attr("data-id"),
                success: function(data) {
                    if (data && data.STATUS === "Y") {
                        $("#bx_cart_num").text(data.cart);
                        $("#buyCatalogElementPopup").addClass("i-show");
                        setTimeout(function() {
                            $("#buyCatalogElementPopup").addClass("i-animate");
                        }, 100);
                        $btn.addClass("i-gray").find("span").toggleClass("i-show");
                    }
                },
                error: function() {}
            });
        });
        $("#buyCatalogElementPopupOpaco, .b-catalog-element-popup__close").click(function(e) {
            e.preventDefault();
            $("#buyCatalogElementPopup").removeClass("i-animate");
            setTimeout(function() {
                $("#buyCatalogElementPopup").removeClass("i-show");
            }, 500);
        });
        $(".b-catalog-element").each(function() {
            var $element = $(this), $propListBlock = $element.find(".b-catalog-element__propList-block"), $gallery = $element.find(".b-catalog-element__gallery"), $fotorama = $element.find(".b-catalog-element__gallery .b-catalog-element__fotorama"), $data = $element.find(".b-catalog-element__data div"), $activeDataDiv = $data.eq(0), $img = $element.find(".b-catalog-element__img"), $imgHover = $element.find(".b-catalog-element__img-hover"), $art = $element.find(".b-catalog-element__art"), $code = $element.find(".b-catalog-element__code"), $num1 = $element.find(".b-catalog-element__num .i-1"), $num0 = $element.find(".b-catalog-element__num .i-0"), $iconDiscount = $element.find(".b-icon-discount"), $button = $element.find(".b-catalog-element__button"), $subscribe = $element.find(".b-catalog-element__subscribe"), $price = $element.find(".b-catalog-element__price"), $bottom = $element.find(".b-catalog-element__bottom"), propList = $element.find(".b-catalog-element__data").data("prop-list"), propDB = {};
            if (typeof propList === "string") {
                propList = propList.replace(/&quot;/g, '"');
                propList = JSON.parse(propList);
            }
            if ($element.find(".b-catalog-element__data[ data-actual-item ]").length) {
                $activeDataDiv = $element.find(".b-catalog-element__data div[ data-id=" + $element.find(".b-catalog-element__data").data("actual-item") + " ]");
            }
            $propListBlock.delegate(".b-catalog-element__colors-item, .b-catalog-element__sizes-item", "click", function() {
                var $item = $(this);
                if ($item.hasClass("i-active")) {
                    return;
                }
                var blockProp = $item.parent().data("prop");
                var itemProp = $item.text() || $item.css("backgroundImage");
                var $activeItem = $item.siblings(".i-active");
                var currentid = $activeDataDiv.attr("data-id");
                var itemID;
                var propString = "";
                var propArray = [];
                for (var k in propDB[currentid]) {
                    if (blockProp === propDB[currentid][k][1]) {
                        propString = k;
                    }
                }
                propArray = String(propString).split(",");
                if ($item.hasClass("i-disabled")) {
                    var newPropIdArray = [];
                    var maxCounter = 0;
                    var obj = {};
                    for (var a in propDB) {
                        for (var s in propDB[a]) {
                            if (compareItemProp($item.attr("class"), itemProp, propDB[a][s][3]) && blockProp === propDB[a][s][1]) {
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
                                    var keyArray = String(keyString).split(",");
                                    for (var j = 0; j < propArray.length; j++) {
                                        if (keyArray.includes(propArray[j])) {
                                            counter++;
                                        }
                                    }
                                }
                            }
                            if (counter > maxCounter || maxCounter === 0) {
                                maxCounter = counter;
                                itemID = id;
                            }
                        }
                    }
                } else {
                    for (var n in propDB) {
                        for (var m in propDB[n]) {
                            if (m === propString && compareItemProp($item.attr("class"), itemProp, propDB[n][m][3])) {
                                itemID = n;
                            }
                        }
                    }
                }
                $activeDataDiv = $element.find(".b-catalog-element__data div[data-id=" + itemID + "]");
                showOffer($activeDataDiv);
                setDisabled();
            });
            function compareItemProp(cls, itemProp, prop) {
                if (cls.search("colors") !== -1) {
                    if (itemProp.search(prop) !== -1) {
                        return true;
                    }
                } else if (cls.search("sizes") !== -1) {
                    if (itemProp + "" === prop + "") {
                        return true;
                    }
                }
                return false;
            }
            var timeoutHover, timeoutHout;
            $element.hover(function() {
                if ($fotorama.length && !$fotorama.data("fotorama") && $fotorama.find(".b-catalog-element__fotorama-img").length) {
                    $fotorama.fotorama();
                }
                $bottom.show();
                clearTimeout(timeoutHover);
                clearTimeout(timeoutHout);
                timeoutHover = setTimeout(function() {
                    $element.addClass("i-hover");
                }, 0);
                if ($gallery.length && $fotorama.length && $fotorama.data("fotorama")) {
                    $fotorama.data("fotorama").startAutoplay(3e3);
                }
            }, function() {
                var $element = $(this);
                $element.removeClass("i-hover");
                clearTimeout(timeoutHover);
                clearTimeout(timeoutHout);
                timeoutHout = setTimeout(function() {
                    $bottom.hide();
                }, 500);
                if ($gallery.length && $fotorama.length && $fotorama.data("fotorama")) {
                    $fotorama.data("fotorama").stopAutoplay();
                }
            });
            if ($data.length) {
                showAllProperties();
                showFirstOffer();
            }
            function showAllProperties() {
                var propBlocks = {};
                propList.forEach(function(elem) {
                    var $propBlock;
                    var itemArray = [];
                    $data.each(function() {
                        var flag = true;
                        var $this = $(this);
                        itemArray.forEach(function(cur) {
                            if (!$this.data(elem.type + "-" + elem.code) || cur === $this.data(elem.type + "-" + elem.code)) {
                                flag = false;
                                return;
                            }
                        });
                        if (flag && !!$this.data(elem.type + "-" + elem.code)) {
                            itemArray.push($this.data(elem.type + "-" + elem.code));
                        }
                    });
                    if (itemArray.length) {
                        $propBlock = $('<div class="b-catalog-element__' + elem.code + '" data-prop="' + elem.code + '"></div>');
                        if (elem.name) {
                            $propBlock.append("<h6>" + elem.name + "</h6>");
                        }
                    } else {
                        return;
                    }
                    if (elem.type === "color") {
                        itemArray.forEach(function(cur) {
                            var $item;
                            $item = $('<span class="b-catalog-element__colors-item" style="background-image: url( \'' + cur + "' )\"><span></span></span>");
                            var img = document.createElement("img");
                            img.setAttribute("src", cur);
                            img.addEventListener("load", function() {
                                var vibrant = new Vibrant(img);
                                if (vibrant.isWhiteImage) {
                                    $item.addClass("i-white");
                                }
                            });
                            $propBlock.append($item);
                        });
                    } else if (elem.type === "list") {
                        itemArray.forEach(function(cur) {
                            var $item;
                            $item = $('<span class="b-catalog-element__sizes-item"><span>' + cur + "</span></span>");
                            $propBlock.append($item);
                        });
                    }
                    propBlocks[elem.code] = $propBlock;
                });
                for (var n in propBlocks) {
                    $propListBlock.append("<hr>").append(propBlocks[n]);
                }
            }
            function showFirstOffer() {
                if ($data.length === 1) {
                    showOffer($data);
                    return;
                }
                $data.each(function() {
                    var $div = $(this);
                    var propsObj = {};
                    propList.forEach(function(elem) {
                        var propName = [];
                        propList.forEach(function(j) {
                            if (j.code !== elem.code) {
                                propName.push($div.data(j.type + "-" + j.code));
                            }
                        });
                        propsObj[propName.join(",")] = [ elem.type, elem.code, elem.name, $div.data(elem.type + "-" + elem.code) ];
                    });
                    propDB[$div.data("id")] = propsObj;
                });
                showOffer($activeDataDiv);
                setDisabled();
            }
            function setDisabled() {
                var activeProps = {};
                var propName = [];
                var currentPropName = "";
                var propKey;
                propList.forEach(function(elem) {
                    propName = [];
                    propList.forEach(function(j) {
                        if (j.code !== elem.code) {
                            propName.push($activeDataDiv.data(j.type + "-" + j.code));
                        }
                    });
                    currentPropName = elem.code;
                    activeProps[currentPropName] = [];
                    propKey = propName.join(",");
                    for (var k in propDB) {
                        if (propDB[k][propKey]) {
                            activeProps[currentPropName].push(propDB[k][propKey][3]);
                        }
                    }
                    if (elem.type === "color") {
                        $element.find(".b-catalog-element__" + currentPropName + " .b-catalog-element__colors-item").each(function() {
                            var disabledFlag = false;
                            for (var o = 0; o < activeProps[currentPropName].length; o++) {
                                if ($(this).css("backgroundImage").search(activeProps[currentPropName][o]) !== -1) {
                                    disabledFlag = true;
                                }
                                if (disabledFlag) {
                                    break;
                                }
                            }
                            if (!disabledFlag) {
                                $(this).addClass("i-disabled");
                            } else {
                                $(this).removeClass("i-disabled");
                            }
                        });
                    } else if (elem.type === "list") {
                        $element.find(".b-catalog-element__" + currentPropName + " .b-catalog-element__sizes-item").each(function() {
                            var disabledFlag = false;
                            for (var o = 0; o < activeProps[currentPropName].length; o++) {
                                if ($(this).text() === "" + activeProps[currentPropName][o]) {
                                    disabledFlag = true;
                                }
                                if (disabledFlag) {
                                    break;
                                }
                            }
                            if (!disabledFlag) {
                                $(this).addClass("i-disabled");
                            } else {
                                $(this).removeClass("i-disabled");
                            }
                        });
                    }
                });
            }
            function showOffer($div, pageLoadFlag) {
                $element.attr({
                    "data-id": $div.data("id") + ""
                });
                propList.forEach(function(elem) {
                    if (elem.type === "color") {
                        $element.find(".b-catalog-element__" + elem.code + " .b-catalog-element__colors-item").each(function() {
                            if ($(this).css("backgroundImage").search($div.data(elem.type + "-" + elem.code)) !== -1) {
                                $(this).addClass("i-active").removeClass("i-disabled");
                            } else {
                                $(this).removeClass("i-active");
                            }
                        });
                    } else if (elem.type === "list") {
                        $element.find(".b-catalog-element__" + elem.code + " .b-catalog-element__sizes-item").each(function() {
                            if ($(this).text() === "" + $div.data(elem.type + "-" + elem.code)) {
                                $(this).addClass("i-active").removeClass("i-disabled");
                            } else {
                                $(this).removeClass("i-active");
                            }
                        });
                    }
                });
                var images = "";
                var srcArray = [];
                var pageUrl = "";
                if ($div.data("photo")) {
                    srcArray = $div.data("photo").split(";");
                }
                if ($element.find(".b-catalog-element__button .btn").length) {
                    pageUrl = $element.find(".b-catalog-element__button .btn").attr("href");
                }
                if ($img.length && srcArray[0] && srcArray[1]) {
                    if ($bottom.css("opacity") > 0) {
                        $img.css({
                            backgroundImage: "url('" + srcArray[0] + "')"
                        });
                        $imgHover.css({
                            backgroundImage: "url(" + srcArray[1] + ")"
                        });
                    } else {
                        $img.attr({
                            "data-original": srcArray[0]
                        });
                        $imgHover.attr({
                            "data-original": srcArray[1]
                        });
                    }
                } else if ($gallery.length) {
                    srcArray.forEach(function(cur, i, arr) {
                        images += '<div><a href="' + pageUrl + '" class="b-catalog-element__fotorama-img" style="background-image: url(\'' + cur + "');\" ></a></div>";
                    });
                    if ($fotorama.length) {
                        if ($fotorama.data("fotorama")) {
                            $fotorama.data("fotorama").destroy();
                        }
                        $fotorama.empty().html(images);
                        if (!pageLoadFlag && $fotorama.find(".b-catalog-element__fotorama-img").length > 1) {
                            $fotorama.fotorama();
                        }
                        if ($bottom.css("opacity") > 0 && $fotorama.data("fotorama")) {
                            $fotorama.data("fotorama").startAutoplay(3e3);
                        }
                    }
                }
                if ($num0.length && $num1.length) {
                    if ($div.data("num") !== 0) {
                        $num1.show().find("span").text($div.data("num"));
                        $num0.hide();
                    } else {
                        $num1.hide();
                        $num0.show();
                    }
                }
                if ($iconDiscount.length) {
                    if ($div.data("discount-percent")) {
                        $iconDiscount.show().text($div.data("discount-percent"));
                    } else {
                        $iconDiscount.hide();
                    }
                }
                $element.find(".b-catalog-element__props div").each(function() {
                    if (String($(this).attr("class")).search("catalogElementProperty") !== -1) {
                        $(this).addClass("hidden");
                    }
                });
                for (var key in $div.data()) {
                    if (key.search("property") !== -1) {
                        $element.find(".catalogElementP" + key.substring(1)).find("span").text($div.data(key)).parent().removeClass("hidden");
                    }
                }
                if ($price.length && $div.data("price")) {
                    if ($div.data("old-price")) {
                        $price.addClass("i-discount").empty().html("<span>" + $div.data("price") + "</span><s>" + $div.data("old-price") + "</s>");
                    } else {
                        $price.removeClass("i-discount").empty().text($div.data("price"));
                    }
                }
                if ($button.length && $subscribe.length) {
                    if ($div.data("available") === "Y") {
                        $button.show();
                        $subscribe.addClass("hidden");
                    } else {
                        $button.hide();
                    }
                    if ($div.data("subscribe") === "Y" && $div.data("available") !== "Y") {
                        $button.hide();
                        $subscribe.removeClass("hidden");
                    } else if ($div.data("subscribe") !== "Y" && $div.data("available") !== "Y") {
                        $button.hide();
                        $subscribe.addClass("hidden");
                    }
                }
            }
        });
        $(".b-catalog-element__img, .b-catalog-element__img-hover").lazyload();
    });
})(jQuery);