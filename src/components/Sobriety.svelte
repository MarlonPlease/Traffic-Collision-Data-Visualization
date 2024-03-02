<script>
  import { onMount } from 'svelte';
  import mapboxgl from 'mapbox-gl/dist/mapbox-gl'; // Import Mapbox GL library
  import * as d3 from 'd3'; // Import D3 library

  let map; // Variable to hold the map object

  onMount(async () => {
  // Load the CSV data using D3
  const data = await d3.csv('https://raw.githubusercontent.com/MarlonPlease/Project-4-Updated/main/static/sobriety_data.csv');

  // Initialize Mapbox map
  mapboxgl.accessToken = "pk.eyJ1IjoibWdhcmF5IiwiYSI6ImNsc2ZpZXZ4aTFsdzAycXBkOWpqenZyeDIifQ._PjOouLcBA5ow4qkKjQaQw"; // Replace with your Mapbox access token
  map = new mapboxgl.Map({
    container: 'map', // HTML element ID where the map will be rendered
    style: 'mapbox://styles/mapbox/streets-v11', // Map style
    center: [-118.2437, 34.0522], // Center coordinates for Los Angeles
    zoom: 10 // Initial zoom level
  });

  // Add map controls (optional)
  map.addControl(new mapboxgl.NavigationControl());

  // Add circles for each data point
  map.on('load', () => {
    // Define the colors for each ethnicity
    const colors = {
      'Asian': 'blue',
      'Hispanic': 'red',
      'Other/Unknown': 'green',
      'Black': 'yellow',
      'White': 'purple'
      // Add more ethnicities and colors as needed
    };

    // Group data by ethnicity
    const dataByEthnicity = d3.group(data, d => d.Ethnicity);

    // Add a layer for each ethnicity
    dataByEthnicity.forEach((data, ethnicity) => {
      const layerId = `circles-${ethnicity}`;

      map.addSource(layerId, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: data.map(d => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [parseFloat(d.Longitude), parseFloat(d.Latitude)]
            }
          }))
        }
      });

      map.addLayer({
        id: layerId,
        source: layerId,
        type: 'circle',
        paint: {
          'circle-radius': 5,
          'circle-color': colors[ethnicity]
        }
      });
    });
  });
});

</script>

<style>
  #map {
    height: 400px; /* Adjust height as needed */
    width: 100%; /* Make map fill container width */
  }
</style>

<div id="map"></div>
