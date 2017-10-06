
(function (){
  var form = $(".form")

  form.validate({
    focusCleanup: true,
    focusInvalid: false,
    rules :{
      name : {
        required: true,
        minlength: 3,
        maxlength: 40
      },
      phone : {
        required: true
      },
      услуга : {
        required: true
      }
    },
    messages: {

      name: {
        required: "Это поле обязательно для заполнения",
        minlength: "Имя должно содержать минимум 3 символа",
        maxlength: "Максимальное число символо - 40",
      },
      phone: {
        required: "Это поле обязательно для заполнения"
      },
      услуга : {
        required: ""
      }
    },
    submitHandler: function() {
      setTimeout(function () {
        $(".select").trigger("refresh"); //reset form styler
      },1);
    },
    invalidHandler : function(){
      setTimeout(function () {
        $(".select").trigger("refresh"); //reset form styler
      },1);
    }
  });

    form.submit(function() {
      var $this = $(this);
      var validForm =  $this.valid();
      var activeClass = $this.prevAll(".success");

      if (validForm){ //check validation form
        $.ajax({
          type: "POST",
          url: "/mail.php",
          data: $this.serialize()
        }).done(function() {
          activeClass.addClass("active")
              .hide()
              .fadeIn();
          setTimeout(function() {
            activeClass.fadeOut(400, function(){
              $(this).removeClass("active");
            });
            $this.trigger("reset");
          }, 2000);
        });
      }
      return false;
    });

  $(".jq-select__trigger").on("click", function () {
    var $this = $(this);
    var arrow = $this.find(".jq-selectbox__trigger-arrow");
    if (!arrow.hasClass("up")) {
      arrow.addClass("up");
    }
    else {
      arrow.removeClass("up");
    }
  });

  // phone mask
  $(".input__phone").mask("+7(999) 999-9999");
 // style select
  $(".select").styler({
    selectPlaceholder: "Выберите услугу",
    selectSmartPositioning: false,
    onSelectOpened: function () {
      // к открытому селекту добавляется обводка
      $(this).css({
        'outline' : '1px solid #BA9856'
      });
      $(this).find(".jq-selectbox__trigger-arrow").addClass("up");
    },
    onSelectClosed: function () {
      $(this).css('outline', 'none');
      $(this).find(".jq-selectbox__trigger-arrow").removeClass("up");
    }

  });


})();