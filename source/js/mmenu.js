
  (function() {
      var $menu = $("#my-menu").mmenu({
        extensions: [
          'theme-black',
          'effect-menu-slide',
          'pagedim-black'
        ],
        navbar: {
          title: '<img src="assets/img/logo-1.svg" alt="Салон красоты Смитлер">'
        },
        offCanvas: {
          position  : 'right'
        }
      });
      var $icon = $(".hamburger");
      var API = $menu.data( "mmenu" );

      API.bind( "open:finish", function() {
        setTimeout(function() {
          $icon.addClass( "is-active" );
        }, 300);
      });
      API.bind( "close:finish", function() {
        setTimeout(function() {
          $icon.removeClass( "is-active" );
        }, 300);
      });

}());
