/*
var delayPreloader = new Preloader( 'color1', '.b-delay-button' );

$( '.b-black-preloader-button' ).click( function(e) {
  e.preventDefault();
  delayPreloader.append();
});
*/

window.Preloader = function( elem, type, size ) {
  var self = this;
	
	init();
	
	function init() {
		initVarsAndElems();
		handleEvents();
	}
	
	function initVarsAndElems() {
		self.$elem = $(elem);
		self.$elem.data( "object", self );
    self.$preloaderNode = $( '#circlePreloader .preloader-wrapper' );//a node to clone
    self.type = type || 'color1';
    self.size = size || '';
	}
	
	function handleEvents() {}
	
/*--- private methods ---*/

	function _append() {
    self.$preloaderNode
      .clone()
      .addClass( size )
      .find( '.spinner-layer' )
      .addClass( 'spinner-' + self.type )
      .end()
      .appendTo( self.$elem );
  }

	function _remove() {
    self.$elem.find( '.preloader-wrapper' ).remove();
  }
	
/*--- public methods ---*/
  
  this.append = function() {
    _append();
  };
  
  this.remove = function() {
    _remove();
  };
  
  
};