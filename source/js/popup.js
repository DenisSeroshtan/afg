
function Popup(obj) { // make prototype
  var popup = this;

  var overlay = document.createElement('div');
  var modal = document.createElement('div');
  var btnClose = document.createElement('div');
  var modalContent = document.createElement('div');

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


  this.resize = function () {
    // расчет высоты overlay по высоте body
    var b = document.querySelector('body');
    var bH = b.offsetHeight;
    popup.overlay.style.height = bH + "px";
  };
  popup.resize();
  //изменение высоты overlay при изменение размера окна
  window.onresize = popup.resize;

  this.trigger = document.querySelectorAll(obj.trigger);

  this.open = function (cont) {
    if (obj.content !== undefined) {
      cont = document.querySelector(obj.content).innerHTML
    }

    // выравнивание по вертикали
    var wH= document.documentElement.clientHeight;
    // var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    popup.modal.style.top = wH/2+"px";
    popup.modalContent.innerHTML = cont;

    popup.overlay.classList.add('showed');
    popup.modal.classList.add('showed');

  };
//		popup.btn.addEventListener('click', openPopup.bind(this, cont), false);
  this.close = function () {
    popup.overlay.classList.remove('showed');
    popup.modal.classList.remove('showed');
    popup.modal.style.top = 0;

  };
  // применяем настройки по ключам объекта
  if (obj.trigger !== undefined) {
    for(var i = 0; i<this.trigger.length; i++) {
      this.trigger[i].addEventListener('click', function(e){
        e.preventDefault();
        if (this.hasAttribute('data-popup')) {
          var link = this.getAttribute('data-popup');
          var form = document.querySelector(link);
          popup.open(form.innerHTML);
        }
        popup.open();

      })
    }
  }

  popup.btnClose.onclick = popup.close;
  popup.overlay.onclick = popup.close;

}
var popup = new Popup({
  content: ".header-mid__right",
  trigger: ".section__bottom .btn"
});
(function () {

  var buttons = document.querySelectorAll(".section__bottom .btn");
  for (var k = 0; k<buttons.length; k++) {
    buttons[k].onclick = function (e) {
      e.preventDefault();
      var text = this.innerHTML;
      var title = document.querySelector('.form__title');
      title.innerHTML = text;
    }
  }
}());

