( function($) {

  'use strict';
  
  $( function() {
    
    setTimeout( function() {
      document.querySelectorAll( '.b-video-element__container' )[0].classList.add( 'i-show' );
    }, 500 );
    
    //fade loop effect
    document.querySelectorAll( '.b-video-element.i-fade-loop' ).forEach( function( videoElement ) {
      
      var videoNodes = videoElement.querySelectorAll( 'video' );
      videoNodes[0].classList.add( 'i-hide' );
      
      fadeVideo( [ videoNodes[0], videoNodes[1], videoElement ]);
    });
    
    function fadeVideo( videoNodes, videoElement ) {
      
      videoNodes[1].classList.remove( 'i-hide' );
      videoNodes[1].play();
      
      var checkLoadedIntervalId = setInterval( function() {
        if ( videoNodes[1].duration ) {
          
          clearInterval( checkLoadedIntervalId );
          
          setTimeout( function() {
            videoElement.append( videoNodes[1]);
            setTimeout( function() {
              videoNodes[1].classList.add( 'i-hide' );
            }, 2000 );
            
            videoNodes[0].classList.remove( 'i-hide' );
            
            fadeVideo( videoNodes.reverse());
          }, ( videoNodes[1].duration - 2) * 1000 );
        }
      }, 100 );
      
    }
    
    //if there is a gallery
    document.querySelectorAll( '.swiper-container' ).forEach( function( swiperContainer ) {
      
      var mySwiper = new Swiper( swiperContainer, {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          init: function() {
            setTimeout( function() {
              mySwiper.slides[ mySwiper.activeIndex ].querySelector( '.b-video-element__container' ).classList.add( 'i-show' );
            }, 500 );
          },
          slideChange: function() {
            var video;
            for ( var i = 0; i < mySwiper.slides.length; i++ ) {
              video = mySwiper.slides[i].querySelector( 'video' );
              if ( video ) {
                video.pause();
                video.closest( '.b-video-element' ).querySelector( '.b-video-element__container' ).classList.remove( 'i-show' );
              }
            }
            
            video = mySwiper.slides[ mySwiper.activeIndex ].querySelector( 'video' );
            if ( video ) {
              video.play();
              setTimeout( function() {
                video.closest( '.b-video-element' ).querySelector( '.b-video-element__container' ).classList.add( 'i-show' );
              }, 200 );
            }
          }
        }
      });
      
    });
    
    
  });

}( jQuery ));