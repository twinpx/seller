!function(a){"use strict";a(function(){a(".b-catalog-detail__icons .b-icon-zoom").click(function(){a(".b-catalog-detail__gallery .fotorama").data("fotorama").requestFullScreen()}),a(".b-catalog-detail__colors-item").click(function(){a(".b-catalog-detail__colors-item").removeClass("i-active"),a(this).addClass("i-active")}),a(".b-catalog-detail__sizes-item").click(function(){a(".b-catalog-detail__sizes-item").removeClass("i-active"),a(this).addClass("i-active")}),a(".b-catalog-detail__size-table-link a, #sizeIcon").sideNav({menuWidth:"60%"}),a("#commentsIcon").click(function(){a('.b-tabs__tab[ data-tab="comments" ]').hasClass("i-active")?a.scrollTo(a(".b-tabs__nav__menu"),500):a('.b-tabs__tab[ data-tab="comments" ]').click()}),a("#shareIcon").click(function(){a.scrollTo(a(".b-catalog-detail__share"),500)})})}(jQuery);