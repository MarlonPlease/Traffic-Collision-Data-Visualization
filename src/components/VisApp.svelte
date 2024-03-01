<script>
  import { onMount } from 'svelte';
  import mapboxgl from 'mapbox-gl/dist/mapbox-gl'; // Import Mapbox GL library
  import * as d3 from 'd3'; // Import D3 library

  let cleanData = [];
  let randomCoordinates = [];

  onMount(async () => {
    const res = await fetch('traffic_collision_data.csv'); 
    const csv = await res.text();
    cleanData = d3.csvParse(csv, d3.autoType);

    function extractYear(dateString) {
      return parseInt(dateString.split('/')[2]); // Assuming date format is MM/DD/YYYY
    }
    
    cleanData = cleanData.filter(row => {
      const year = extractYear(row['Date Occurred']);
      return year >= 2010 && year <= 2019;
    });

    console.log("First 5 tuples:", cleanData.slice(0, 5));

    // Assuming cleanData is your array of traffic collision incidents
    const filteredData = cleanData.filter(item => {
      const year = new Date(item['Date Occurred']).getFullYear();
      return item['Victim Descent'] === 'H' && year === 2010;
    });

    // Extracting location coordinates of filtered incidents
const locationCoordinates = filteredData.map(item => {
    const [longitude, latitude] = item['Location'].match(/\(([^)]+)\)/)[1].split(',').map(Number);
    return [latitude, longitude]; // Reverse the order of coordinates
});


    // Shuffle locationCoordinates array
    const shuffledCoordinates = locationCoordinates.sort(() => Math.random() - 0.5);

    // Take the first 100 coordinates
    randomCoordinates = shuffledCoordinates.slice(0, 2000);

    // Output random coordinates to the console
    console.log(randomCoordinates);








    // Initialize Mapbox GL map
    mapboxgl.accessToken = "pk.eyJ1IjoibWdhcmF5IiwiYSI6ImNsc2ZpZXZ4aTFsdzAycXBkOWpqenZyeDIifQ._PjOouLcBA5ow4qkKjQaQw";
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-118.2437, 34.0522], // Los Angeles coordinates
      zoom: 10, // Adjust the zoom level as needed
      scrollZoom: false // Disable scroll zoom
    });

    // Add markers for each random location coordinate
    randomCoordinates.forEach(coord => {
      new mapboxgl.Marker()
        .setLngLat(coord)
        .addTo(map);
    });
  });
</script>

<style>
  #map {
    width: 100%;
    height: 350px; /* Adjust the height as needed */
    
    overflow: hidden; /* Hide scrollbars */
  }
</style>

<div id="map"></div>

