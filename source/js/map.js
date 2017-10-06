(function() {

  ymaps.ready(init);
  var myMap,
      myPlacemark;
  function init() {
    myMap = new ymaps.Map("map", {
      center: [55.68400557, 37.55745700],
      zoom: 16,
      controls: ["zoomControl"]
    });
    myPlacemark = new ymaps.Placemark([55.68400557, 37.55745700], {
      hintContent: 'S&Mitler',
      balloonContent: 'г. Москва, ул. Ивана Бабушкина, 22с1'
    },
        {
      iconLayout: 'default#image',
      iconImageHref: 'assets/img/metka.svg',
      iconImageSize: [28, 36],
      iconImageOffset: [-10, -35]
    });

    myMap.behaviors.disable(['scrollZoom']);
    myMap.geoObjects.add(myPlacemark);

  }
})();
