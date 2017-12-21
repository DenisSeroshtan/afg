
function Popup(obj) { // prototype
  var popup = this;

  var overlay = document.createElement('div');
  var modal = document.createElement('div');
  var btnClose = document.createElement('div');
  var modalContent = document.createElement('div');

  var body = document.querySelector("body");
  var duration = obj.duration || 4000;
  // создаем элементы DOM при загрузке документа
  document.body.insertBefore(overlay, document.body.children[0]);
  overlay.className = "overlay";

  document.body.insertBefore(modal, document.body.children[1]);
  modal.className = "modal";

  modal.insertBefore(btnClose, modal.children[0]);
  btnClose.className = "close";

  modal.insertBefore(modalContent, modal.children[1]);
  modalContent.className = "content";

  this.overlay = document.querySelector(".overlay");
  this.modal = document.querySelector(".modal");
  this.modalContent = document.querySelector(".modal .content");
  this.btnClose = document.querySelector(".modal .close");
  this.trigger = document.querySelectorAll(obj.trigger);

  this.resize = function () {
    // расчет высоты overlay по высоте body
    var bH = body.offsetHeight;
    popup.overlay.style.height = bH + "px";
  };
  popup.resize();

  //изменение высоты overlay при изменение размера окна
  window.onresize = popup.resize;

  this.open = function (cont) {
    if (obj.content) {
      cont = document.querySelector(obj.content).innerHTML
    } else if (cont) {
      cont =  document.querySelector(cont).innerHTML
    } else {
      cont = "здесь должен быть контент"
    }


    // выравнивание по вертикали
    var wH= document.documentElement.clientHeight;
    // var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    popup.modal.style.top = wH/2+"px";
    popup.modalContent.innerHTML = cont;

    popup.overlay.classList.add('showed');
    popup.modal.classList.add('showed');

    body.style.overflow = 'hidden';

  };
  this.close = function () {
    popup.overlay.classList.remove('showed');
    popup.modal.classList.remove('showed');
    popup.modal.style.top = 0;
    body.style.overflow = 'visible';

  };
  if (obj.auto) {
    setTimeout(function () {
      popup.open()
    }, duration)
  }
  // применяем настройки по ключам объекта
  if (this.trigger) {
    for(var i = 0; i<this.trigger.length; i++) {
      this.trigger[i].addEventListener('click', function(e){
        e.preventDefault();
        // проверям наличие ссылки на popup
        if (this.hasAttribute('data-popup')) {
          var link = this.getAttribute('data-popup');
          var form = document.querySelector(link);
          popup.open(form.innerHTML);
        }else{
          popup.open();
        }
      })
    }
  }

  popup.btnClose.onclick = popup.close;
  popup.overlay.onclick = popup.close;

}
var popup = new Popup({
  content: ".header-mid__right",
  trigger: ".section__bottom .btn"
  // auto: true
  // duration: 12000
});

(function () {
  // меняем заголовки в popup
  var buttons = popup.trigger;
  for (var k = 0; k<buttons.length; k++) {
    buttons[k].addEventListener('click', function (e) {
      e.preventDefault();
      var text = this.innerHTML;
      var title = document.querySelector('.form__title');
      title.innerHTML = text;
    })
  }
}());

