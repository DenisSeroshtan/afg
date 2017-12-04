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
// анимация svg
var draw = (function(){
  // privat
  var flag = true;

  return {
    init: function (obj) {
      var svg = $(obj.svg);
      var that = this;
      for(var i = 1; i<=svg.length; i++){
        that.initSvg(i);
      }
      $(document).on('scroll', function () {
        var
            blHeightTop = $(obj.block).offset().top,
            currentWinHeight = $(this).scrollTop();

        if (currentWinHeight >= blHeightTop) {
          if (flag) {
            that.animate(1);
            flag = false;
          }
        }
      });
    },
    initSvg: function(ndx) {
      ndx = ndx || " ";
      var svg = $('#draw-svg-'+ndx);
      var item = svg.prev();
      var th = this;

      return svg.drawsvg({
        duration: 600,
        easing: 'linear',
        callback: function () {

          var path = svg.find('path');
          path.css({
            fillOpacity: 1
          });
          setTimeout(function () {
            item.addClass('active');
          }, 100);
            th.animate(++ndx);
        }
      });
    },
    animate : function (ndx) {
      var mySVG = this.initSvg(ndx);
      mySVG.drawsvg('animate');
    }
  }

})();
$(function () {
    if($(".work__svg-bg").length) {
      draw.init({
        svg: ".work__svg-bg",
        block: ".work"
      });
    }
})
var slider = (function () {

  return {
    init : function () {
      var _this = this;
      $('.slider__arr').on('click', function (e) {
        e.preventDefault();

        var
            $this = $(this),
            slides = $this.closest('.slider').find('.slider__item'),
            activeSlide = slides.filter('.active'),
            nextSlide = activeSlide.next(),
            prevSlide = activeSlide.prev(),
            firstSlide = slides.first(),
            lastSlide = slides.last();
        if ( $this.hasClass("slider__arr-next")) {
          if (nextSlide.length) {
            _this.moveSlide(nextSlide, 'forward');
          }else {
            _this.moveSlide(firstSlide, 'forward');
          }
        }else {
          if (prevSlide.length) {
            _this.moveSlide(prevSlide, 'backward');
          }else {
            _this.moveSlide(lastSlide, 'backward');
          }

        }
      })
    },
    moveSlide: function (slide, direction) {
      var
          container = slide.closest('.slider'),
          slides = container.find('.slider__item'),
          activeSlide = slides.filter('.active'),
          slideWidth = slides.width(),
          duration = 500,
          reqCssPosition = 0,
          reqSlideStrafe = 0;
      if (direction === "forward") {
        reqCssPosition = slideWidth;
        reqSlideStrafe = - slideWidth;
      }else if (direction === "backward"){
        reqCssPosition = - slideWidth;
        reqSlideStrafe =  slideWidth;
      }
      slide.css('left', reqCssPosition).addClass('inslide');

      var movebleSlide = slides.filter('.inslide');
      activeSlide.animate({
        left: reqSlideStrafe}, duration);
      movebleSlide.animate({left: 0}, duration, function () {
        var $this = $(this);
        slides.css("left", 0).removeClass('active');
        $this.toggleClass('inslide active')
      });
    }
  }
})();
$(function () {
    if(('.slider').length) {
      slider.init();
    }
    $('.slider__item').equalHeights();
})