# Leaflet-challenge
leaflet-challenge
### The leaflet challenge visualizes earthquake data from all over the world in a color coded method in order to represent the magnitude of each registered earthquake using html, javascript and css coding with the data from a json file making use of the D3 library to read in the data to plot the map.
#### Data
##### The data was obtained from the USGS GeoJson Feed, specifically the dataset of all earthquakes of the past 30 days, which is updated every minute.
##### The data was represented in json format and read in with D3 library
#### Code corrections
##### Javascript 
##### Corrections made with the Xpert learning assistant in the following lines of code:
##### 1. const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
##### attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
##### }).addTo(myMap);
##### 2. for (let i = 0; i < limits.length; i++) {
#####            let from = limits[i];
#####            let to = limits[i + 1] ? limits[i + 1] : "+";
#####            labels.push(
##### `<li><span style="background-color: ${colors[i]}"></span> ${from} - ${to} km</li>`
##### );
##### }
#####  // Join the labels into a list and add them to the div
##### div.innerHTML += "<ul>" + labels.join("") + "</ul>"; 
##### erros in syntaxis found in the loop

