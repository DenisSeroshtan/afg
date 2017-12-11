var slider = (function () {
  //private variables
  var timer = 0;
  var flag = true;

  return {
    init : function (settings) {
      var _this = this;

      //добавить точки
      if (settings.dots) {
        _this.createDots();
      }
      // автопереключение слайдов
      if (settings.auto) {
        _this.autoSwitch(settings.duration);
      }
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

        _this.clearTimer(settings.duration);

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
      });
      // клик по точка
      $('.slider__dots-link').on('click', function (e) {
        e.preventDefault();

        var
            $this = $(this),
            dots = $this.closest('.slider__dots').find('.slider__dots-item'),
            activeDot = dots.filter('.active'),
            dot = $this.closest(".slider__dots-item"),
            curDotNum = dot.index(),
            direction = (activeDot.index()<curDotNum) ? 'forward' : 'backward',
            reqSlide = $this.closest('.slider').find('.slider__item').eq(curDotNum);
        _this.clearTimer(settings.duration);
        _this.moveSlide(reqSlide, direction);
      })
    },
    moveSlide: function (slide, direction) {
      var
          _this = this,
          container = slide.closest('.slider'),
          slides = container.find('.slider__item'),
          activeSlide = slides.filter('.active'),
          slideWidth = slides.width(),
          duration = 500,
          reqCssPosition = 0,
          reqSlideStrafe = 0;
      if (flag) {
        flag = false;
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

          _this.setActiveDot(container.find('.slider__dots'))

          flag = true;
        });
      }
    },

    createDots: function () {
      var
          _this = this,
          container = $('.slider');
      var
          dotsMarkup = '<li class="slider__dots-item "> \ <a class="slider__dots-link" href="#"></a> \ </li>';

      container.each(function () {
        var
            $this = $(this),
            slides = $this.find('.slider__item'),
            dotContainer = $this.find('.slider__dots');
        for( var i = 0; i < slides.length; i++){
          dotContainer.append(dotsMarkup);
        }
        _this.setActiveDot(dotContainer);
      })
    },

    setActiveDot : function (container) {
      var
          slides = container.closest('.slider__wrap').find('.slider__item');
      container.find('.slider__dots-item')
          .eq(slides.filter('.active').index())
          .addClass('active')
          .siblings()
          .removeClass('active')
    },

    autoSwitch: function (duration) {
      var
          _this = this,
          duration = duration || 5000;
      timer = setInterval(function () {
        var
            slides = $('.slider__list .slider__item'),
            activeSlide = slides.filter('.active'),
            nextSlide = activeSlide.next(),
            firstSlide = slides.first();
        if (nextSlide.length) {
          _this.moveSlide(nextSlide, 'forward');
        }else {
          _this.moveSlide(firstSlide, 'forward');
        }
      }, duration);

    },
    clearTimer : function (duration) {
      if(timer) {
        clearInterval(timer);
        this.autoSwitch(duration);
      }
    }

  }
})();

(function () {
  if(('.slider').length) {
    slider.init({
      dots: true,
      auto: true
      // duration : 2000
    });
  }
  $('.slider__item').equalHeights();
})();