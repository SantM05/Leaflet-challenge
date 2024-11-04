// Create map with set zoom and centered view
const myMap = L.map("map", {
    center: [20.0, 5.0],
    zoom: 1.5,
    minZoom: 1.5,
    maxZoom: 12,
    scrollWheelZoom: true
});

// Add of tile layer.
const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Earthquake data retrieval from USGS GeoJSON URL feed
const earthquakeDataUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';

// Function to determine the multiplied marker radius based on earthquake magnitude
function getRadius(magnitude) {
    return magnitude ? magnitude * 3 : 1;  
}

// Function to determine the marker color by depth from green to blue
function getColor(depth) {
    if (depth <= 10) return "#00FF00"; // green (shallow)
    else if (depth <= 30) return "#66FF66"; // light green
    else if (depth <= 50) return "#99CCFF"; // light blue
    else if (depth <= 70) return "#3399FF"; // blue
    else if (depth <= 90) return "#0066CC"; // dark blue
    else return "#0000FF"; // blue (very deep)
}

// Fetch earthquake data and plot it on the map
d3.json(earthquakeDataUrl).then(function (data) {
    // Create the GeoJSON layer
    const geojson = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: getRadius(feature.properties.mag),
                fillColor: getColor(feature.geometry.coordinates[2]), // Depth is the 3rd coordinate
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`<h3>Magnitude: ${feature.properties.mag}</h3>
                             <p>Location: ${feature.properties.place}</p>
                             <p>Depth: ${feature.geometry.coordinates[2]} km</p>`); // Depth is the 3rd coordinate
        }
    }).addTo(myMap);
    addLegend(geojson);
});

// Add a legend in topright side of the page
function addLegend(geojson) {
    let legend = L.control({ position: "topright" });

    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "info legend");
      // Updated depth limits and added more ranges
      let limits = [0, 10, 30, 50, 70, 90, 110]; // Depth limits in km
      let colors = [
          "#00FF00", // green (0-10 km)
          "#66FF66", // light green (10-30 km)
          "#99CCFF", // light blue (30-50 km)
          "#3399FF", // blue (50-70 km)
          "#0066CC", // dark blue (70-90 km)
          "#0000FF", // blue (90-110 km)
          "#00008B"  // dark blue (very deep, >110 km)
      ];
        let labels = [];

        // Header to the legend
        let legendInfo = "<h1>Earthquake Depths (in km)</h1>";
        div.innerHTML = legendInfo;

        // Loop through to create a label for the legend in each limit
        for (let i = 0; i < limits.length; i++) {
            let from = limits[i];
            let to = limits[i + 1] ? limits[i + 1] : "+";
            labels.push(
                `<li><span style="background-color: ${colors[i]}"></span> ${from} - ${to} km</li>`
            );
        }

        // Join the labels into a list and add them to the div
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return div;
    };
    legend.addTo(myMap);
}