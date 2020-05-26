// Declare constants
var myLat = 34.0522;
var myLon = -118.2437;
var areaRadiusKM = 200;
var areaRadiusMeters = areaRadiusKM * 1000;
var minMag = 1.5;

// Find today and yesterday's date so we can check the last 24 hours...
var today = new Date();
var todayDateString = "2020-05-23" // today.toISOString().split('T')[0];
var yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
var yesterdayDateString = "2020-05-10" //  yesterday.toISOString().split('T')[0];

// Adjust zoom to fit circle size
if (areaRadiusKM <= 200) {
    var defaultZoom = 7;
} else if (200 < areaRadiusKM && areaRadiusKM <= 300) {
 var defaultZoom = 6;
} else if (areaRadiusKM > 300) {
 var defaultZoom = 5;
}

//Code for changing the pins
var homePin = L.icon({
    iconUrl: 'pin.png',
    iconSize: [32, 46],
    iconAnchor: [15, 45],
    popupAnchor: [0, -46],
});

var pin1 = L.icon({
    iconUrl: 'pin1.png',
    iconSize: [32, 46],
    iconAnchor: [15, 45],
    popupAnchor: [0, -46],
});

var pin2 = L.icon({
    iconUrl: 'pin2.png',
    iconSize: [32, 46],
    iconAnchor: [15, 45],
    popupAnchor: [0, -46],
});

var pin3 = L.icon({
    iconUrl: 'pin3.png',
    iconSize: [32, 46],
    iconAnchor: [15, 45],
    popupAnchor: [0, -46],
});

var pin4 = L.icon({
    iconUrl: 'pin4.png',
    iconSize: [32, 46],
    iconAnchor: [15, 45],
    popupAnchor: [0, -46],
});

var pin6 = L.icon({
    iconUrl: 'pin6.png',
    iconSize: [32, 46],
    iconAnchor: [15, 45],
    popupAnchor: [0, -46],
});

var pin8 = L.icon({
    iconUrl: 'pin8.png',
    iconSize: [32, 46],
    iconAnchor: [15, 45],
    popupAnchor: [0, -46],
});

var pin10 = L.icon({
    iconUrl: 'pin10.png',
    iconSize: [32, 46],
    iconAnchor: [15, 45],
    popupAnchor: [0, -46],
});


function reloadMap() {
    // LEAFLET MAP
    mymap = L.map('mapid').setView([myLat, myLon], defaultZoom);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	    maxZoom: 19,
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
    }).addTo(mymap);

    // Home marker
    var marker = L.marker([myLat, myLon], {icon: homePin}).addTo(mymap);

    // Begin USGS API fetch
    console.log("*** EARTHQUAKES - Fetching data from USGS...");

    // Fetch seismic data and add pins to map

    fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${yesterdayDateString}&endtime=${todayDateString}&latitude=${myLat}&longitude=${myLon}&maxradiuskm=${areaRadiusKM}`, {
        "method": "GET",
    })
    .then(usgs => {
        return usgs.json();
    }) 
    .then(usgs => {
        console.log("*** EARTHQUAKES - Response received from USGS...");
        console.log(usgs);

        var usgsCount = usgs.features.length;
        var sigCount = 0;
        var earthquakeListDiv = document.getElementById("earthquakelist");

        for (i=0; i<usgsCount; i++) {
            let mag = usgs.features[i].properties.mag;
            let time = usgs.features[i].properties.time;
            let date = new Date(time);
            dateString = date.toString().split(' GMT')[0];

            // Forget the small Earthquakes
            if (mag < minMag ) {
                continue;
            }
            sigCount++;
            lon = usgs.features[i].geometry.coordinates[0];
            lat = usgs.features[i].geometry.coordinates[1];
            depth = usgs.features[i].geometry.coordinates[2];

            // Change color based on magnitude
            if (mag <= 1) {
                newMarker = L.marker([lat, lon],{icon: pin1}).addTo(mymap)
                    // Copy for the popup.
                    .bindPopup(`<a href="${usgs.features[i].properties.url}" target="_blank" rel="noopener">${dateString} - ${usgs.features[i].properties.title}</a>`)
                // Copy for the earthquake list
                earthquakeListDiv.insertAdjacentHTML('afterBegin', `<a href="${usgs.features[i].properties.url}" target="_blank" rel="noopener" style="color: #FFE6A3"><p>${dateString} - ${usgs.features[i].properties.title}</p></a>`);
            } else if (mag > 1 && mag <= 2) {
                newMarker = L.marker([lat, lon],{icon: pin2}).addTo(mymap)
                    // Copy for the popup.
                    .bindPopup(`<a href="${usgs.features[i].properties.url}" target="_blank" rel="noopener">${dateString} - ${usgs.features[i].properties.title}</a>`)
                // Copy for the earthquake list
                earthquakeListDiv.insertAdjacentHTML('afterBegin', `<a href="${usgs.features[i].properties.url}" target="_blank" rel="noopener" style="color: #FFD462"><p>${dateString} - ${usgs.features[i].properties.title}</p></a>`);
            } else if (mag > 2 && mag <= 3) {
                newMarker = L.marker([lat, lon],{icon: pin3}).addTo(mymap)
                    // Copy for the popup.
                    .bindPopup(`<a href="${usgs.features[i].properties.url}" target="_blank" rel="noopener">${dateString} - ${usgs.features[i].properties.title}</a>`)
                // Copy for the earthquake list
                earthquakeListDiv.insertAdjacentHTML('afterBegin', `<a href="${usgs.features[i].properties.url}" target="_blank" rel="noopener" style="color: #FC8F49"><p>${dateString} - ${usgs.features[i].properties.title}</p></a>`);
            }else if (mag > 3 && mag <= 4) {
                newMarker = L.marker([lat, lon],{icon: pin4}).addTo(mymap)
                    // Copy for the popup.
                    .bindPopup(`<a href="${usgs.features[i].properties.url}" target="_blank" rel="noopener"><p>* ${dateString} - ${usgs.features[i].properties.title}</p></a>`)
                // Copy for the earthquake list
                earthquakeListDiv.insertAdjacentHTML('afterBegin', `<a href="${usgs.features[i].properties.url}" target="_blank" rel="noopener" style="color: #FC7D49"><p>${dateString} - ${usgs.features[i].properties.title}</p></a>`);
            } else if (mag > 4 && mag <= 6) {
                newMarker = L.marker([lat, lon],{icon: pin6}).addTo(mymap)
                    // Copy for the popup.
                    .bindPopup(`<a href="${usgs.features[i].properties.url}" target="_blank" rel="noopener"><p>* ${dateString} - ${usgs.features[i].properties.title}</p></a>`)
                // Copy for the earthquake list
                earthquakeListDiv.insertAdjacentHTML('afterBegin', `<a href="${usgs.features[i].properties.url}" target="_blank" rel="noopener" style="color: #CF423C"><p>${dateString} - ${usgs.features[i].properties.title}</p></a>`);
            } else if (mag > 6 && mag <= 8) {
                newMarker = L.marker([lat, lon],{icon: pin8}).addTo(mymap)
                    // Copy for the popup.
                    .bindPopup(`<a href="${usgs.features[i].properties.url}" target="_blank" rel="noopener"><p>* ${dateString} - ${usgs.features[i].properties.title}</p></a>`)
                // Copy for the earthquake list
                earthquakeListDiv.insertAdjacentHTML('afterBegin', `<a href="${usgs.features[i].properties.url}" target="_blank" rel="noopener" style="color: #7A1631"><p>${dateString} - ${usgs.features[i].properties.title}</p></a>`);
            } else if (mag > 8) {
                newMarker = L.marker([lat, lon],{icon: pin10}).addTo(mymap)
                    // Copy for the popup.
                    .bindPopup(`<a href="${usgs.features[i].properties.url}" target="_blank" rel="noopener"><p>* ${dateString} - ${usgs.features[i].properties.title}</p></a>`)
                // Copy for the earthquake list
                earthquakeListDiv.insertAdjacentHTML('afterBegin', `<a href="${usgs.features[i].properties.url}" target="_blank" rel="noopener" style="color: #3F0B1B"><p>${dateString} - ${usgs.features[i].properties.title}</p></a>`);
            }

            //snewMarker = L.marker([lat, lon]).addTo(mymap)
                // Copy for the popup.
                //.bindPopup(`<a href="${usgs.features[i].properties.url}" target="_blank" rel="noopener"><p>* ${dateString} - ${usgs.features[i].properties.title}</p></a>`)
            // Copy for the earthquake list
            //earthquakeListDiv.insertAdjacentHTML('afterBegin', `<a href="${usgs.features[i].properties.url}" target="_blank" rel="noopener"><p>* ${dateString} - ${usgs.features[i].properties.title}</p></a>`);
        }
        // Copy for the synopsis
        earthquakeListDiv.insertAdjacentHTML('afterBegin', `<p id="update">There were ${usgsCount} earthquakes within ${areaRadiusKM} kilometers of the specified location between ${yesterdayDateString} and ${todayDateString}, ${sigCount} of which were above magnitude ${minMag}.</p>`);

    })
    .catch(err => {
        console.log(err);
    });


    // Highlight the searched area
    var circle = L.circle([myLat, myLon], {
        color: 'white',
        opacity: 0.5,
        fillColor: 'white',
        fillOpacity: 0.3,
        radius: areaRadiusMeters
    }).addTo(mymap);

}

function buttonClick() {
    myLat = document.getElementById("myLat").value;
    myLon = document.getElementById("myLon").value;
    areaRadiusKM = document.getElementById("areaRadiusKM").value;
    areaRadiusMeters = areaRadiusKM * 1000;
    minMag = document.getElementById("minMag").value;
    yesterdayDateString = document.getElementById("startingDate").value;
    todayDateString = document.getElementById("endingDate").value;
    mymap.remove();
    reloadMap();
}

reloadMap();



// var whitePin = L.icon({
//     iconUrl: 'PinWhite.png',
//     iconSize: [30, 39],
//     iconAnchor: [9, 30],
//     popupAnchor: [-3, -30],
// });