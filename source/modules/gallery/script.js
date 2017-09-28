if ( $.fn.fotorama ) {
  $('.fotorama').fotorama({
    thumbwidth: 65,
    thumbheight: 65
  });
}

if ( $.fn.zoomple ) {
  setTimeout( function() {
    $('img.zoomple').zoomple();
  }, 1000 );
}