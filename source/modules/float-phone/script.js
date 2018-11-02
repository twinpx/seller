function FloatPhone(b) {
    function c() {
        d();
        e();
    }

    function d() {
        j.$elem = $(b);
        j.$elem.data("FloatPhone", j);
        j.scrollEvent = undefined;
        j.scrollIntervalEvent = undefined;
        j.scrollIntervalId = undefined;
        j.showTimeoutId = undefined;
        j.showTime = 3e3;
    }

    function e() {
        f();
        $(window).bind("scroll", g);
        j.$elem.find( '.b-icon-close' ).click( clickClose );
    }

    function f() {
        j.showTimeoutId = setTimeout(function() {
            h();
        }, j.showTime);
    }

    function g(a) {
        j.scrollEvent = a;
        if ( !j.scrollIntervalEvent ) {
          j.scrollIntervalEvent = a;
          clearTimeout(j.showTimeoutId);
          i();
          j.scrollIntervalId = setInterval(function() {
            return j.scrollIntervalEvent !== j.scrollEvent ? void(j.scrollIntervalEvent = j.scrollEvent) : (clearInterval(j.scrollIntervalId), j.scrollIntervalEvent = void 0, void f());
          }, 100);
        }
    }

    function h() {
      if ( window.Cookies && window.Cookies.get( 'showMessage' ) !== 'N' ) {
        j.$elem.addClass("i-visible");
      }
    }

    function i() {
      j.$elem.removeClass("i-visible");
    }
    
    function clickClose() {
      i();
      if ( window.Cookies ) {
        Cookies.set( 'showMessage', 'N', { expires: 365, path: window.location.href });
      }
    }
    
    var j = this;
    c();
}

new FloatPhone( '#b-float-phone' );