
L.mapbox.accessToken = 'pk.eyJ1Ijoid2ViZ2lzIiwiYSI6ImNqMW9qcGFseDAxM3gyd3BpeXI5Z2t4dnoifQ.eupIYbTkAg8_0xqMmXgCJw';
var map = L.mapbox.map('map-realtime', 'mapbox.streets')
.setView([10.6,106.689444], 9);

// Read Location to data.json
$.getJSON( "Public/realtime/data.json", function( data ) {
    var arrayMarker = [] ;
    $.each(data, function(k, v){
        var k = k ;
        var description = `<div>
        <p style="font-weight:bold">${v.name}</p>
        <p>Lat: ${v.y}<p>
        <p>Long: ${v.x}<p>
        </div>`;

        // Render marker
        var marker = L.mapbox.featureLayer([{
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [v.x,v.y]
            },
            properties: {
                description:description ,
                'marker-color': '#f86767',
                'marker-size': 'small'
            },
           
        }]).addTo(map);
        marker.indexChange = v.indexChange;
        arrayMarker.push(marker);

        // Defaul display Popup
        if(v.name == "Quận 5"){
         marker.eachLayer(function(m) {
            console.log(m) ;
            m.openPopup();
        }); }else{console.log("Not Found");}
    });

    // Call Chart
    for( var i = 0 ; i < arrayMarker.length ; i++ ){
        arrayMarker[i].on("click",function(e){
            AddChart('pm', this.indexChange);
            AddChart('no', this.indexChange);
            AddChart('no2', this.indexChange);
            AddChart('so2', this.indexChange);
            AddChart('o3', this.indexChange);
            AddChart('gio', this.indexChange);
        })
    };
}); 





