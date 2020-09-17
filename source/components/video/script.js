( function($) {

  'use strict';
  
  $( function() {
    
    setTimeout( function() {
      document.querySelectorAll( '.b-video-element__container' )[0].classList.add( 'i-show' );
    }, 500 );
    
    //fade loop effect
    var checkLoadedIntervalId, fadeTimeoutId;
    
    document.querySelectorAll( '.b-video-element.i-fade-loop' ).forEach( function( videoElement ) {
      
      if ( videoElement.parentNode.classList.contains( 'swiper-slide' ) || videoElement.closest( '.swiper-slide' ).length ) {
        return;
      }
      
      var videoNode = videoElement.querySelector( 'video' );
      var cloneVideoNode = videoNode.cloneNode( true );
      videoNode.after( cloneVideoNode );
      
      fadeVideo( [ videoNode, cloneVideoNode ], cloneVideoNode);
    });
    
    function fadeVideo( videoNodes, topVideo ) {
      
      videoNodes[1].play();
      
      checkLoadedIntervalId = setInterval( function() {
        
        if ( videoNodes[1].duration ) {
          clearInterval( checkLoadedIntervalId );
          clearTimeout( fadeTimeoutId );
          
          fadeTimeoutId = setTimeout( function() {
            topVideo.classList.toggle( 'i-hide' );
            fadeVideo( videoNodes.reverse(), topVideo );
          }, ( videoNodes[1].duration - videoNodes[1].currentTime - 2) * 1000 );
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
            
            var videoElement, videoNode, videoNodes;
            
            //clone all fade-loop videos
            for ( var i = 0; i < this.slides.length; i++ ) {
              videoElement = this.slides[i].querySelector( '.b-video-element' );
              if ( videoElement && videoElement.classList.contains( 'i-fade-loop' )) {
                videoNode = videoElement.querySelector( 'video' );
                videoNode.after( videoNode.cloneNode( true ));
              }
            }
            
            //if there is video in the first slide
            videoElement = this.slides[ this.activeIndex ].querySelector( '.b-video-element' );
            if ( !videoElement ) {
              return;
            }
            
            //show text with fade in effect
            setTimeout( function() {
              videoElement.querySelector( '.b-video-element__container' ).classList.add( 'i-show' );
            }, 500 );
            
            //if it's fade-loop video
            if ( videoElement.classList.contains( 'i-fade-loop' )) {
              videoNodes = videoElement.querySelectorAll( 'video' );
              fadeVideo( [ videoNodes[0], videoNodes[1] ], videoNodes[1]);
            }
          },
          
          slideChange: function() {
            
            var video, videoElement, videoNodes;
            
            //pause all the videos in this fallery
            mySwiper.el.querySelectorAll( 'video' ).forEach( function( elem ) {
              elem.pause();
            });
            mySwiper.el.querySelectorAll( '.b-video-element__container' ).forEach( function( elem ) {
              elem.classList.remove( 'i-show' );
            });
            clearInterval( checkLoadedIntervalId );
            clearTimeout( fadeTimeoutId );
            
            //play video in the active slide
            videoElement = mySwiper.slides[ mySwiper.activeIndex ].querySelector( '.b-video-element' );
            if ( videoElement ) {
              
              if ( videoElement.classList.contains( 'i-fade-loop' )) {
                videoNodes = videoElement.querySelectorAll( 'video' );
                fadeVideo( [ videoNodes[0], videoNodes[1] ], videoNodes[1]);
                
              } else {
                video = videoElement.querySelector( 'video' );
                video.play();
                setTimeout( function() {
                  video.closest( '.b-video-element' ).querySelector( '.b-video-element__container' ).classList.add( 'i-show' );
                }, 200 );
              }
            }
            
          }
        }
      });
      
    });
    
  });

}( jQuery ));