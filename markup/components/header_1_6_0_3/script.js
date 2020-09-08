(function($) {
    "use strict";
    $(function() {
        $(".bj-nav-button, #nav-button-xs").sideNav({
            onOpen: function() {
                document.querySelector("html").classList.add("i-blur");
            },
            onClose: function() {
                document.querySelector("html").classList.remove("i-blur");
            }
        });
    });
})(jQuery);