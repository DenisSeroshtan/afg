(function () {
  $(".input__phone").mask("+7(999) 999-9999");
  $('.js-h3').each(function() {
    var $this = $(this);
    // add span for first word
    $this.html($this.html().replace(/(\S+)\s*$/, '<span>$1</span>'));
  });

  $('.js-h2').each(function() {
    var $this = $(this);
    // add span for last word
    $this.html($this.html().replace(/^(\S+)/, '<span>$1</span>'));
  });

})();
