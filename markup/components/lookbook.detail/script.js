(function($) {
    "use strict";
    $(function() {
<<<<<<< HEAD
=======
        $(".b-catalog-detail__gallery").delegate(".fotorama__html a", "click", function(e) {
            e.preventDefault();
        });
>>>>>>> 32491bdf5bc82696ce078a061cbcc5ebe78df709
        var $div = $("#lookbookDetailData");
        var images = "";
        var srcArray = [];
        var srcBigArray;
        if ($div.data("photo")) {
            srcArray = $div.data("photo").split(";");
        }
        srcBigArray = srcArray;
        try {
            srcBigArray = $div.data("big-photo").split(";");
        } catch (e) {
            srcBigArray = undefined;
        }
        srcArray.forEach(function(cur, i, arr) {
            if (srcBigArray) {
                images += '<div data-thumb="' + cur + '"><a href="' + srcBigArray[i] + '"><img src="' + cur + '" alt=""';
                if ($(".b-catalog-detail__gallery").data("magnifier") === true) {
                    images += ' data-magnify-src="' + srcBigArray[i] + '" ></a></div>';
                } else {
                    images += "></a></div>";
                }
            } else {
                images += '<img src="' + cur + '" alt="" >';
            }
        });
        var catalogDetailGalleryRatio = 100;
        var catalogDetailGalleryMaxheight = 1e5;
        if ($div.data("dimensions")) {
            var catalogDetailGalleryImages = $div.data("dimensions");
            catalogDetailGalleryImages.forEach(function(val, i, arr) {
                var rat = val.width / val.height;
                if (rat < catalogDetailGalleryRatio && rat > .25) {
                    catalogDetailGalleryRatio = rat;
                    catalogDetailGalleryMaxheight = val.height;
                }
            });
        }
        if ($(".b-catalog-detail__gallery .fotorama").length) {
            $(".b-catalog-detail__gallery .fotorama").data("fotorama").destroy();
            $(".b-catalog-detail__gallery .fotorama").empty().html(images);
            if (document.getElementById("catalogDetailVideo")) {
                $(".b-catalog-detail__gallery .fotorama").append($("#catalogDetailVideo").html());
            }
            $(".b-catalog-detail__gallery .fotorama").on("fotorama:showend", function(e, fotorama, extra) {
                if (window.matchMedia("(min-width: 768px)").matches) {
                    fotorama.activeFrame.$stageFrame.find("img[data-magnify-src]").magnify();
                }
            }).fotorama({
                ratio: catalogDetailGalleryRatio,
                maxheight: catalogDetailGalleryMaxheight
            });
        } else {
            $(".b-catalog-detail__gallery img[data-magnify-src]").magnify();
        }
    });
})(jQuery);