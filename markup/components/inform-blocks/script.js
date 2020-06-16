(function($) {
    "use strict";
    $(function() {
        setTimeout(function() {
            var index = 0;
            $(".b-inform-blocks").each(function() {
                if ($(this).find(".b-inform-blocks__item").length) {
                    $(this).addClass("i-animate").addClass("i-" + ++index);
                }
            });
        }, 500);
    });
})(jQuery);