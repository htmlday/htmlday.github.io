// display events count and atendees count
var data = {};

var totalEvents = $('#total-events'),
    totalAtendees = $('#total-atendees'),
    events = $('.event');
var atendeeCount = 0;
for ( var i = 0, len = events.length; i < len; i++ ) {
  atendeeCount += 0 | $(events[i]).find('.event-atendee').text();
}

data.length = events.length;
data.atendees = atendeeCount;
// totalEvents.text(events.length);
// totalAtendees.text(atendeeCount);

var geocoder = new google.maps.Geocoder();
data.events = [];
for ( var i = 0, len = events.length; i < len; i++ ) {
  var evtData = {};
  var evt = $(events[i]);
  evtData.id = evt[0].id;
  evtData.name = evt.find('.event-title').text();
  evtData.address = evt.find('.address').text();
  evtData.image = evt.find('.event-logo').attr('src');
  evtData.location = {};
  evtData.location.lat = evt.find('.event-lat').text();
  evtData.location.lng = evt.find('.event-lng').text();
  data.events.push(evtData);
}
//copy(data);
