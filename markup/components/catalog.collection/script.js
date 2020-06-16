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
        $("#buyModal").on("show.bs.modal", function(e) {
            var $button = $(e.relatedTarget);
            var $element = $button.closest(".b-catalog-element");
            var title = $element.find(".b-catalog-element__title").text();
            var size = $element.find(".b-catalog-element__sizes-item.i-active").text();
            var color = $element.find(".b-catalog-element__colors-item.i-active").css("backgroundImage");
            var colorClass = $element.find(".b-catalog-element__colors-item.i-active").attr("class");
            var src;
            if ($element.find(".b-catalog-element__img").length) {
                src = $element.find(".b-catalog-element__img").css("backgroundImage");
            } else {
                src = $element.find(".fotorama__active .b-catalog-element__fotorama-img").css("backgroundImage");
            }
            $("#buyModal .b-buy-modal-img").html("<div style='background: " + src + ' no-repeat center; background-size: cover; padding-top: 130%;\' alt="">');
            $("#buyModal .b-buy-modal-text").html("<h2>" + title + '</h2><p><span class="' + colorClass + "\" style='background-image: " + color + "; margin-bottom: 20px;'></span><br>" + size + "</p>");
        });
        $("#buyModal .btn-reset").click(function(e) {
            e.preventDefault();
            $("#buyModal .modal-header .close").click();
        });
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
            $.ajax({
                url: $btn.data("ajax-url"),
                type: "GET",
                dataType: "json",
                data: "id=" + $btn.closest(".b-catalog-element").attr("data-id"),
                success: function(data) {
                    if (data && data.STATUS === "Y") {
                        $("#bx_cart_num").text(data.cart);
                    }
                },
                error: function() {}
            });
        });
        $(".b-catalog-element").each(function() {
            var $element = $(this), $colorsBlock = $element.find(".b-catalog-element__colors-block"), $sizesBlock = $element.find(".b-catalog-element__sizes-block"), $gallery = $element.find(".b-catalog-element__gallery"), $fotorama = $element.find(".b-catalog-element__gallery .b-catalog-element__fotorama"), $data = $element.find(".b-catalog-element__data div"), $img = $element.find(".b-catalog-element__img"), $imgHover = $element.find(".b-catalog-element__img-hover"), $art = $element.find(".b-catalog-element__art"), $code = $element.find(".b-catalog-element__code"), $num1 = $element.find(".b-catalog-element__num .i-1"), $num0 = $element.find(".b-catalog-element__num .i-0"), $iconDiscount = $element.find(".b-icon-discount"), $button = $element.find(".b-catalog-element__button"), $subscribe = $element.find(".b-catalog-element__subscribe"), $price = $element.find(".b-catalog-element__price"), $bottom = $element.find(".b-catalog-element__bottom");
            $colorsBlock.delegate(".b-catalog-element__colors-item", "click", function() {
                $element.find(".b-catalog-element__colors-item").removeClass("i-active");
                $(this).addClass("i-active");
                if ($element.find(".b-catalog-element__sizes-item").length) {
                    setDisabledSizes(this);
                    setDisabledColors($element.find(".b-catalog-element__sizes-item.i-active"));
                } else {
                    $data.each(function() {
                        if ($element.find(".b-catalog-element__colors-item.i-active").length && $element.find(".b-catalog-element__colors-item.i-active").css("backgroundImage").search($(this).data("color-color_ref")) !== -1) {
                            showOffer($(this));
                        }
                    });
                }
            });
            $sizesBlock.delegate(".b-catalog-element__sizes-item", "click", function() {
                var $this = $(this);
                $element.find(".b-catalog-element__sizes-item").removeClass("i-active");
                $this.addClass("i-active");
                if (window.Cookies) {
                    Cookies.set("size", $this.text(), {
                        expires: 365,
                        path: window.location.origin
                    });
                }
                if ($element.find(".b-catalog-element__colors-item").length) {
                    setDisabledColors(this);
                    setDisabledSizes($element.find(".b-catalog-element__colors-item.i-active"));
                } else {
                    $data.each(function() {
                        if ($element.find(".b-catalog-element__sizes-item.i-active").length && $(this).data("list-sizes_shoes") + "" === $element.find(".b-catalog-element__sizes-item.i-active").text()) {
                            showOffer($(this));
                        }
                    });
                }
            });
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
                $colorsBlock.empty();
                var colorsArray = [];
                $data.each(function() {
                    var flag = true;
                    var $this = $(this);
                    colorsArray.forEach(function(cur, i, arr) {
                        if (!$this.data("color-color_ref") || cur === $this.data("color-color_ref")) {
                            flag = false;
                            return;
                        }
                    });
                    if (flag && !!$(this).data("color-color_ref")) {
                        colorsArray.push($(this).data("color-color_ref"));
                    }
                });
                if (!colorsArray.length) {
                    $colorsBlock.next("hr").remove();
                    $colorsBlock.remove();
                } else {
                    colorsArray.forEach(function(cur, i, arr) {
                        var $item = $('<span class="b-catalog-element__colors-item" style="background-image: url( \'' + cur + "' )\"><span></span></span>");
                        var img = document.createElement("img");
                        img.setAttribute("src", cur);
                        img.addEventListener("load", function() {
                            var vibrant = new Vibrant(img);
                            if (vibrant.isWhiteImage) {
                                $item.addClass("i-white");
                            }
                        });
                        $colorsBlock.append($item);
                    });
                }
                $sizesBlock.empty();
                var sizesArray = [];
                $data.each(function() {
                    var flag = true;
                    var $this = $(this);
                    sizesArray.forEach(function(cur, i, arr) {
                        if (!$this.data("list-sizes_shoes") || cur === $this.data("list-sizes_shoes")) {
                            flag = false;
                            return;
                        }
                    });
                    if (flag && !!$(this).data("list-sizes_shoes")) {
                        sizesArray.push($(this).data("list-sizes_shoes"));
                    }
                });
                if (!sizesArray.length) {
                    $sizesBlock.prev("hr:not(.i-line)").remove();
                    $sizesBlock.remove();
                } else {
                    sizesArray.forEach(function(cur, i, arr) {
                        $sizesBlock.append('<span class="b-catalog-element__sizes-item"><span>' + cur + "</span></span>");
                    });
                }
            }
            function showFirstOffer() {
                if ($data.length === 1) {
                    showOffer($data);
                    return;
                }
                var sizeCookie;
                var sizeFlag = false;
                if ($element.find(".b-catalog-element__sizes-item:eq(0)").length) {
                    if (window.Cookies && Cookies.get("size")) {
                        sizeCookie = Cookies.get("size");
                    } else {
                        sizeCookie = $element.find(".b-catalog-element__sizes-item:eq(0)").text();
                    }
                    $element.find(".b-catalog-element__sizes-item").each(function() {
                        var $size = $(this);
                        if (!sizeFlag) {
                            if ($size.text() === sizeCookie) {
                                sizeFlag = true;
                            }
                        }
                    });
                    if (!sizeFlag) {
                        sizeCookie = $element.find(".b-catalog-element__sizes-item:eq(0)").text();
                    }
                }
                var flag = false;
                if ($element.find(".b-catalog-element__colors-item").length) {
                    if ($element.find(".b-catalog-element__sizes-item").length) {
                        $data.each(function() {
                            var $div = $(this);
                            $element.find(".b-catalog-element__colors-item").each(function() {
                                var $color = $(this);
                                if ($color.css("backgroundImage").search($div.data("color-color_ref")) !== -1 && $div.data("list-sizes_shoes") + "" === sizeCookie + "") {
                                    if (!flag) {
                                        showOffer($div, "onPageLoad");
                                        flag = true;
                                    }
                                }
                            });
                        });
                    } else {
                        $data.each(function() {
                            var $div = $(this);
                            $element.find(".b-catalog-element__colors-item").each(function() {
                                var $color = $(this);
                                if ($color.css("backgroundImage").search($div.data("color-color_ref")) !== -1) {
                                    if (!flag) {
                                        showOffer($div, "onPageLoad");
                                        flag = true;
                                    }
                                }
                            });
                        });
                    }
                } else {
                    if ($element.find(".b-catalog-element__sizes-item").length) {
                        $data.each(function() {
                            var $div = $(this);
                            if ($div.data("list-sizes_shoes") + "" === sizeCookie + "") {
                                if (!flag) {
                                    showOffer($div, "onPageLoad");
                                    flag = true;
                                }
                            }
                        });
                    } else {
                        if (!flag) {
                            showOffer($data.eq(0), "onPageLoad");
                            flag = true;
                        }
                    }
                }
                if ($element.find(".b-catalog-element__sizes-item.i-active").length && $element.find(".b-catalog-element__colors-item.i-active").length) {
                    setDisabledColors($element.find(".b-catalog-element__sizes-item.i-active"));
                    setDisabledSizes($element.find(".b-catalog-element__colors-item.i-active"));
                }
            }
            function showOffer($div, pageLoadFlag) {
                $element.attr({
                    "data-id": $div.data("id") + ""
                });
                $element.find(".b-catalog-element__colors-item").each(function() {
                    if ($(this).css("backgroundImage").search($div.data("color-color_ref")) !== -1) {
                        $(this).addClass("i-active");
                    }
                });
                $element.find(".b-catalog-element__sizes-item").each(function() {
                    if ($(this).text() === $div.data("list-sizes_shoes") + "") {
                        $(this).addClass("i-active");
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
            function setDisabledColors(item) {
                var $item = $(item);
                var size = $item.text();
                var colorsArray = [];
                $data.each(function() {
                    var $this = $(this);
                    if ($this.data("list-sizes_shoes") + "" === size) {
                        colorsArray.push({
                            color: $this.data("color-color_ref"),
                            available: $this.data("available"),
                            subscribe: $this.data("subscribe")
                        });
                    }
                });
                $element.find(".b-catalog-element__colors-item").each(function() {
                    var flag = false;
                    var $item = $(this);
                    colorsArray.forEach(function(cur, i, arr) {
                        if ($item.css("backgroundImage").search(cur.color) !== -1 && (cur.available === "Y" || cur.subscribe === "Y")) {
                            flag = true;
                        }
                    });
                    if (flag) {
                        $item.removeClass("i-disabled");
                    } else {
                        $item.addClass("i-disabled");
                    }
                });
                if ($element.find(".b-catalog-element__colors-item.i-active").length && $element.find(".b-catalog-element__colors-item.i-active").hasClass("i-disabled")) {
                    $element.find(".b-catalog-element__colors-item.i-active").removeClass("i-active");
                    if ($element.find(".b-catalog-element__colors-item:not( .i-disabled ):eq(0)").length) {
                        $element.find(".b-catalog-element__colors-item:not( .i-disabled ):eq(0)").addClass("i-active");
                    }
                }
                $data.each(function() {
                    if ($element.find(".b-catalog-element__colors-item.i-active").length && $element.find(".b-catalog-element__sizes-item.i-active").length) {
                        if ($element.find(".b-catalog-element__colors-item.i-active").css("backgroundImage").search($(this).data("color-color_ref")) !== -1 && $(this).data("list-sizes_shoes") + "" === $element.find(".b-catalog-element__sizes-item.i-active").text()) {
                            showOffer($(this));
                        }
                    } else if ($element.find(".b-catalog-element__colors-item.i-active").length) {
                        if ($element.find(".b-catalog-element__colors-item.i-active").css("backgroundImage").search($(this).data("color-color_ref")) !== -1) {
                            showOffer($(this));
                        }
                    } else if ($element.find(".b-catalog-element__sizes-item.i-active").length) {
                        if ($(this).data("list-sizes_shoes") + "" === $element.find(".b-catalog-element__sizes-item.i-active").text()) {
                            showOffer($(this));
                        }
                    }
                });
            }
            function setDisabledSizes(item) {
                var $item = $(item);
                var color = $item.css("backgroundImage");
                var sizesArray = [];
                $data.each(function() {
                    var $this = $(this);
                    if (color.search($this.data("color-color_ref")) !== -1) {
                        sizesArray.push({
                            size: $this.data("list-sizes_shoes"),
                            available: $this.data("available"),
                            subscribe: $this.data("subscribe")
                        });
                    }
                });
                $element.find(".b-catalog-element__sizes-item").each(function() {
                    var flag = false;
                    var flagSubscribe = false;
                    var $item = $(this);
                    sizesArray.forEach(function(cur, i, arr) {
                        if ($item.text() === cur.size + "") {
                            if (cur.available === "Y") {
                                flag = true;
                            } else if (cur.subscribe === "Y") {
                                flagSubscribe = true;
                            }
                        }
                    });
                    if (flag) {
                        $item.removeClass("i-disabled");
                    } else {
                        $item.addClass("i-disabled");
                    }
                    if (flagSubscribe) {
                        $item.addClass("i-subscribe").removeClass("i-disabled");
                    } else {
                        $item.removeClass("i-subscribe");
                    }
                });
                if ($element.find(".b-catalog-element__sizes-item.i-active").length && $element.find(".b-catalog-element__sizes-item.i-active").hasClass("i-disabled")) {
                    $element.find(".b-catalog-element__sizes-item.i-active").removeClass("i-active");
                    if ($element.find(".b-catalog-element__sizes-item:not( .i-disabled ):eq(0)").length) {
                        $element.find(".b-catalog-element__sizes-item:not( .i-disabled ):eq(0)").addClass("i-active");
                    }
                }
                $data.each(function() {
                    if ($element.find(".b-catalog-element__colors-item.i-active").length && String($element.find(".b-catalog-element__colors-item.i-active").css("backgroundImage")).search($(this).data("color-color_ref")) !== -1 && $element.find(".b-catalog-element__sizes-item.i-active").length && $(this).data("list-sizes_shoes") + "" === $element.find(".b-catalog-element__sizes-item.i-active").text()) {
                        showOffer($(this));
                    }
                });
            }
        });
        $(".b-catalog-element__img, .b-catalog-element__img-hover").lazyload();
    });
})(jQuery);