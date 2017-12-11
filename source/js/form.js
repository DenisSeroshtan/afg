
(function (){

    $('body').on('submit', '.form', function(e) {
      e.preventDefault()
      var
          $this = $(this),
          novalid = false,
          inputs = $this.find('.input');

       for (var i = 0; i<inputs.length; i++) {
         if (!inputs[i].value) {
           novalid = true;
         }
       }

      if(novalid) {
        alert('Заполните все поля');
        return;
      }
        $.ajax({
          type: "POST",
          url: "/mail.php",
          data: $this.serialize()
        }).done(function() {
          // закрываем popup
          popup.close();

          setTimeout(function() {
            alert("Сообщение отправлено");
            $this.trigger("reset");
          }, 800);
        });

    });

})();