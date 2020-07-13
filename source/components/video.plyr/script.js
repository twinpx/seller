( function($) {

  'use strict';
  
  $( function() {
    
    //local
    var player = new Plyr( '#player', {
      controls: false,
      autoplay: true,
      muted: true
    });

    player.on( 'canplay', function(e) {
      $( '.b-plyr' ).addClass( 'i-canplay' );
    });
    
    //youtube iframe
    var playerYt = new Plyr( '#playerYt', {
      controls: false,
      autoplay: true,
      muted: true
    });

    playerYt.on( 'ready', function(e) {
      $( '.b-plyr-yt' ).addClass( 'i-canplay' );
      playerYt.play();
    });
    
    //youtube div
    var player2 = new Plyr( '#player2', {
      controls: false,
      autoplay: true,
      muted: true
    });
    
    player2.on( 'ready', function(e) {
      player2.play();
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));