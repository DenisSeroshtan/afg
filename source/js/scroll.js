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
  });
 //smooth scroll
  $('a[href^="#js"]').on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 'slow', 'swing');
  });

})();
(function () { // dropdown menu
  $('.hamburger').on('click', function(e){
    e.preventDefault();
    var $this = $(this);
    var menu = $this.attr('href');

    $(menu).slideToggle(400, function (){
      var th = $(this);

      if (th.css('display') === 'none'){
        th.removeAttr('style');
      }
    });
    $this.toggleClass('is-active');

  });
  // закрыти меню по клику на любом месте страницы

  $(document).on('click', function (e) {
    var $this = $(e.target);
    var slideMenu = $('.nav__list');

    if (!$this.closest('.nav').length) {
      slideMenu.slideUp(400, function (){
        var th = $(this);
        if (th.css('display') === 'none'){
          th.removeAttr('style');
        }
      });
      $(".hamburger").removeClass('is-active');

    }
  });

})();





