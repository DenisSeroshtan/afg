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