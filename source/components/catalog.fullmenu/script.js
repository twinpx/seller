(function ($) {
  'use strict';

  $(function () {
    document
      .querySelectorAll('.b-catalog-full-menu__icon')
      .forEach(function (icon) {
        icon.addEventListener('click', function (e) {
          e.preventDefault();
          $(
            icon
              .closest('.b-catalog-full-menu')
              .querySelector('.b-catalog-full-menu__content')
          ).slideToggle();
        });
      });
  });
})(jQuery);
