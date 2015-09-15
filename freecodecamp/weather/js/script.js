$( document ).ready(function() {
  var url = 'http://api.openweathermap.org/data/2.5/weather?zip=71302,us&APPID=2c7a348a299f1b964829631168ac51ae';
  
  var refresh = function() {
    $.getJSON(url, function( data ) {
      var items = [];
  //  $.each( data["main"], function( key, val ) {
  //    items.push( "<li id='" + key + "'>" + key + ": " + val + "</li>" );
  //  });

      $.each( data, function( key, val ) {
        items.push( "<li id='" + key + "'>" + key + ": " + val + "</li>" );
      });

      $( "<ul/>", {
        html: items.join( "" )
      }).appendTo( ".output" );
      
      $('.loc').text(data["name"] + ", " + data["sys"]["country"]);
      $('.lat-lon').text('Latitude: ' + data["coord"]["lat"] + ", Longitude: " + data["coord"]["lon"]);
    });
  };
  
  refresh();
});