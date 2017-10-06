(function(){
 //show btn scroll to top
  $(document).scroll(function () {
    var currentHeight = $(this).scrollTop(),
        hHeader = $('#js-header').height(),
        top = $('.top');
    if (currentHeight > hHeader) {
      top.addClass('active')
    }
    else {
      top.removeClass('active')
    }
  })
 //smooth scroll
  $('a[href^="#js"]').on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 'slow', 'swing');
  });


})();
