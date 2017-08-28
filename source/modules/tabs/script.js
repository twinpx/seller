  $.fn.tabs = function() {
    return this.each( function() {
      var self = this,
          $this = $( self ),
          $tabs = $this.find( '.b-tabs__tab' ),
          $items = $this.find( '.b-tabs__i' ),
          $decor = $this.find( '.b-tabs__decor' ),
          $top = $this.find( '.b-tabs__nav__top span' ),
          $menu = $this.find( '.b-tabs__nav__menu' ),
          popFlag = false;
         
      if ( window.matchMedia( "(min-width: 768px)" ).matches ) {
        $tabs.each( function() {
          var $this = $( this );
          var width = $this.outerWidth();
          $this.width( width ).css({ paddingLeft: 0, paddingRight: 0 });
        });
      }
          
      $tabs.click( clickTab );
      moveDecor( $tabs.eq(0) );
      locationTab();
      
      $( window ).resize( function() {
        $tabs.each( function() {
          var $this = $( this );
          if ( $this.hasClass( 'i-active' )) {
            moveDecor( $this );
          }
        });
      });
      
      window.onpopstate = function( event ) {
        popFlag = true;
        if ( event.state ) {
          $tabs.filter( '[data-tab=' + event.state.tab + ']' ).click();
        } else {
          $tabs.eq(0).click();
        }
      };
      
      function clickTab(e) {
        var $this = $( e.target );
        e.preventDefault();
        
        if ( $this.hasClass( 'i-active' )) {
          return;
        }
        
        highlightTab( $this );
        moveDecor( $this );
        showItem( $this );
        setUrl( $this );
        setText( $this );
        $.scrollTo( $menu, 500);
      }
      
      function setText( $tab ) {
        $top.text( $tab.text());
      }
      
      function setUrl( $tab ) {
        if ( !window.history ) {
          return;
        }
        var tab = $tab.data( 'tab' ),
            url = "?tab=" + tab;
        
        if ( !popFlag ) {
          window.history.pushState( {tab: tab}, "page 2", url );
        }
        
        popFlag = false;
      }
      
      function showItem( $tab ) {
        var tab = $tab.data( 'tab' );
        $this.find( '.b-tabs__i' ).each( function() {
          var $item = $( this );
          if ( $item.data( 'tab' ) === tab ) {
            $items.removeClass( 'i-active' );
            $item.addClass( 'i-active' );
            if ( $item.find( '.fotorama' ).length ) {
              $item.find( '.fotorama' ).data('fotorama').resize({ width: "100%" });
            }
          }
        });
      }
      
      function moveDecor( $tab ) {
        $decor.css({
          left: $tab.position().left + 'px',
          width: $tab.outerWidth()
        });
      }
      
      function highlightTab( $tab ) {
        $tabs.removeClass( 'i-active' );
        $tab.addClass( 'i-active' );
      }
      
      function locationTab() {
        var tab = String( window.location.search ).match( /tab=([-_a-z]+)/ );
        
        if ( !tab ) {
          return;
        }
        
        tab = tab[1];
        
        var evt = {
          target: $tabs.filter( '[data-tab=' + tab + ']' ),
          preventDefault: function() {}
        };
        
        clickTab( evt );
      }
    });
  };
  
  $( '.b-tabs:not(.i-links)' ).tabs();
  
  $( '.b-tabs.i-links' ).each( function() {
    var $this = $( this );
    var $decor = $this.find( '.b-tabs__decor' );
    var $tab = $this.find( '.b-tabs__tab.i-active' );
    $decor.css({
      left: $tab.position().left + 'px',
      width: $tab.outerWidth()
    });
  });
  
  $( '.b-tabs__nav__top, .b-tabs__nav__menu svg' ).click( function() {
		$( '.b-tabs__nav__top' ).slideToggle();
		$( '.b-tabs__nav__menu' ).slideToggle();
	});