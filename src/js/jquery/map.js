$(document).ready(function() {
  $('.js-map').each(function(index, el) {
    var adr = $(this).attr('data-address-for-map');

    function init() {
      var myGeocoder = ymaps.geocode(adr);
      myGeocoder.then(
        function(res) {
          var coord = res.geoObjects.get(0).geometry.getCoordinates();
          var myMap = new ymaps.Map(el, {
            center: coord,
            zoom: 14
          });
          myMap.controls.add(
            new ymaps.control.ZoomControl()
          );
          var myPlacemark = new ymaps.Placemark(coord, {
            balloonContentHeader: adr
          }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/icons/marker.svg',
            iconImageSize: [45, 40],
          });
          myMap.behaviors.disable('scrollZoom');
          myMap.geoObjects.add(myPlacemark);
        },
        function(err) {

        }
      );
    }
    ymaps.ready(init);
  });
});
