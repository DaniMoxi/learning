$( document ).ready(function() {
  var url = 'http://api.openweathermap.org/data/2.5/weather?zip=70808,us&units=imperial&APPID=2c7a348a299f1b964829631168ac51ae';
  
  var refresh = function() {
    $.getJSON(url, function( data ) {
      var items = [];
  //  $.each( data["main"], function( key, val ) {
  //    items.push( "<li id='" + key + "'>" + key + ": " + val + "</li>" );
  //  });

//      $.each( data, function( key, val ) {
//        if ( typeof val === 'object' ) {
//          items.push("<li>"+key+'</li><ul>');
//          $.each( data[key], function( key2, val2 ) {
//            items.push( "<li>" + key2 + ": " + val2 + "</li>" );
//          }); 
//          items.push('</ul>');
//        } else {
//          items.push( "<li>" + key + ": " + val + "</li>" );
//        }
//      });
//
//      $( "<ul/>", {
//        html: items.join( "" )
//      }).appendTo( ".output" );
      
      //Update location div
      
      $('.loc').append(data["name"] + ", " + data["sys"]["country"]);
      $('.lat-lon').append('Latitude: ' + data["coord"]["lat"] + ", Longitude: " + data["coord"]["lon"]);
      
      var image_URL = 'http://openweathermap.org/img/w/' + data["weather"]['0']['icon'] + '.png' 
      $('#weather-icon').attr('src', image_URL);
      $('#description').text(data['weather']['0']['description']);
      $('.weather-data ul').append( '<li>' + 'Temperature: ' + data['main']['temp'] + '&degF</li>' +
                                    '<li>' + 'Humidity: ' + data['main']['humidity'] + '%</li>' +
                                    '<li>' + 'Cloudiness: ' + data['clouds']['all'] + '%</li>' );
    });
  };
  
  refresh();
});