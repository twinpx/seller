(function($) {
    "use strict";
    $(function() {
        var uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;
        $(".basket-item-property-scu-image .basket-item-scu-item-inner").each(function() {
            var $item = $(this);
            var src = String($item.css("backgroundImage")).match(uri_pattern);
            var img = document.createElement("img");
            img.setAttribute("src", src);
            img.addEventListener("load", function() {
                var vibrant = new Vibrant(img);
                if (vibrant.isWhiteImage) {
                    $item.addClass("i-white");
                }
            });
        });
    });
})(jQuery);