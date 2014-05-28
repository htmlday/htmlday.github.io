(function(){

  // scroll
  $(document).on('click', 'a[href^=#]', function(e){
    var link = $(this),
        target = $(link.attr('href'));
    if ( target.length === 1 ) {
      e.preventDefault();
      $('body').animate({scrollTop: target.offset().top}, 400);
    }
  });

  // display events count and atendees count
  // var totalEvents = $('#total-events'),
  //     totalAtendees = $('#total-atendees'),
  //     events = $('.event');
  // var atendeeCount = 0;
  // for ( var i = 0, len = events.length; i < len; i++ ) {
  //   atendeeCount += 0 | $(events[i]).find('.event-atendee').text();
  // }
  // totalEvents.text(events.length);
  // totalAtendees.text(atendeeCount);

  $('#total-events').text(data.length);
  $('#total-atendees').text(data.atendees);

  if ( window.matchMedia("(max-width: 601px)").matches ) {
    return;
  }
  // create map
  // detault settings
  var DEFAULT_LAT = 38.925229,
      DEFAULT_LNG = 136.713867,
      DEFAULT_ZOOM = 5,
      ICON_IMAGE = 'images/googlemaps_marker.png',
      ICON_SHADOW_IMAGE = 'images/googlemaps_marker_shadow.png';
  var mapOptions = {
    center: new google.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
    zoom: DEFAULT_ZOOM,
    minZoom: DEFAULT_ZOOM,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // put event markers
  var markers = [];
  var activeInfo, activeMarker;
  // for ( var i = 0, len = events.length; i < len; i++ ) {
  //   (function(evt){
  //     setTimeout(function() {
  //       createMarker(evt);
  //     }, (i * 200) + 1000);
  //   })($(events[i]));
  // }
  var events = data.events;
  for ( var i = 0, len = events.length; i < len; i++ ) {
    (function(evt){
      setTimeout(function() {
        createMarker(evt);
      }, (i * 200) + 1000);
    })(events[i]);
  }

  function createMarker(evt) {
    var evtName = evt.name,
        evtLat = evt.location.lat,
        evtLng = evt.location.lng,
        content = createContentHTML(evt);
    // console.count('event');
    // console.log(evtName,evtLat,evtLng);
    var mkOptions = {
      icon: ICON_IMAGE,
      shadow: ICON_SHADOW_IMAGE,
      title: evtName,
      position: new google.maps.LatLng(evtLat, evtLng),
      animation: google.maps.Animation.DROP,
      map: map
    };
    var info = new google.maps.InfoWindow({
        content: content
    });
    var mk = new google.maps.Marker(mkOptions);
    (function(infoWin, marker){
      google.maps.event.addListener(marker, 'click', function() {
        if ( activeInfo && activeMarker ) {
          activeInfo.close();
          activeMarker.setAnimation(null);
        }
        infoWin.open(map, marker);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        activeInfo = infoWin;
        activeMarker = marker;
      });
      google.maps.event.addListener(infoWin,'closeclick',function(){
        marker.setAnimation(null);
      });
    })(info, mk);
  }

  function createContentHTML(evt) {
    var wrapper = $('<div>'),
        inner = $('<div class="map-info">'),
        logo = $('<img class="map-logo">').attr('src', evt.image),
        name = $('<p class="map-title">').text(evt.name),
        link = $('<p class="map-link">').append($('<a class="from-map">詳しく見る</a>').attr('href', '#' + evt.id));
    inner.append(logo);
    inner.append(name);
    inner.append(link);

    return wrapper.append(inner).html();
  }

  // function setMarker(evtName, evtAdds, map) {
  //   gc.geocode({ address : evtAdds }, function(results, status){
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       var latLng = results[0].geometry.location;
  //       var mkOptions = {
  //         // icon:
  //         title: evtName,
  //         position: new google.maps.LatLng(latLng.lat(), latLng.lng()),
  //         map: map
  //       };
  //       var mk = new google.maps.Marker(mkOptions);
  //       console.log(evtName, evtAdds, latLng.lat(), latLng.lng());
  //     } else {
  //       console.log(evtName, evtAdds, 'geocorde failure');
  //     }
  //   });
  // }

  // map.setCenter(new google.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG));
  window.map = map;
})();