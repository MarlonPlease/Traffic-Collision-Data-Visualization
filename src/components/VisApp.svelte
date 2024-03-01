<script>
  import { onMount } from 'svelte';
  import mapboxgl from 'mapbox-gl/dist/mapbox-gl'; // Import Mapbox GL library
  import * as d3 from 'd3'; // Import D3 library

  let cleanData = [];

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

    // Initialize Mapbox GL map
    mapboxgl.accessToken = "pk.eyJ1IjoibWdhcmF5IiwiYSI6ImNsc2ZpZXZ4aTFsdzAycXBkOWpqenZyeDIifQ._PjOouLcBA5ow4qkKjQaQw";
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-118.2437, 34.0522], // Los Angeles coordinates
      zoom: 10, // Adjust the zoom level as needed
      scrollZoom: false // Disable scroll zoom
    });
  });
</script>

<style>
    #map {
    width: 100%;
    height: 350px; /* Adjust the height as needed */
    pointer-events: none; /* Allow clicks to pass through the map */
    overflow: hidden; /* Hide scrollbars */
  }
</style>

<div id="map"></div>
