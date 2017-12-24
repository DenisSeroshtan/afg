window.onload = function() {
  var preloader = document.querySelector('.preloader');
  var anim = document.querySelector('.cssload-thecube');

   function fade (elem, t, callback){
     var op = 1;
     var t = t || 100;
     var step = 0.11;
     var callback = callback || function(){};
     var timer = setInterval(function () {
       op -= step;
       if (op <= 0) {
         clearInterval(timer);
         elem.style.opacity = 0;
         elem.style.display = "none";

         callback()

       } else elem.style.opacity = op;

     }, t);
   }
  //animation preloader
  fade(anim, 50, function() {
    fade(preloader, 50)
  });
};

(function(){
 //smooth scroll
  $('a[href^="#js"]').on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(target).offset().top + 10
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

  $(document).on('click', function (e) {
    var $this = $(e.target);
    var slideMenu = $('.nav__list');
    var wWidth = $(window).outerWidth();
    if (!$this.closest('.nav').length && wWidth<=1100) {
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




