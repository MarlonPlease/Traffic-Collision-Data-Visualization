<script>
  import { onMount } from 'svelte';
  import mapboxgl from 'mapbox-gl/dist/mapbox-gl'; // Import Mapbox GL library
  import * as d3 from 'd3'; // Import D3 library

  let map; // Variable to hold the map object
  let Asian = true; // Initial visibility for Asian
  let Hispanic = true; // Initial visibility for Hispanic
  let Other = true; // Initial visibility for Other/Unknown
  let Black = true; // Initial visibility for Black
  let White = true; // Initial visibility for White
  let Native = true; // Initial visibility for Native
  let circleSize = 3; // Initial circle size
  let circleOpacity = 0.6; // Initial circle opacity

  onMount(async () => {
    // Load the CSV data using D3
    const data = await d3.csv('https://raw.githubusercontent.com/MarlonPlease/Project-4-Updated/main/static/Ethnicity.csv');

    // Initialize Mapbox map
    mapboxgl.accessToken = "pk.eyJ1IjoibWdhcmF5IiwiYSI6ImNsc2ZpZXZ4aTFsdzAycXBkOWpqenZyeDIifQ._PjOouLcBA5ow4qkKjQaQw"; // Replace with your Mapbox access token
    map = new mapboxgl.Map({
      container: 'map', // HTML element ID where the map will be rendered
      style: 'mapbox://styles/mapbox/light-v11', // Map style
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
        'Hispanic': 'green',
        'Other/Unknown': 'orange',
        'Black': 'yellow',
        'White': 'red',
        'Native': 'purple'
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
            'circle-radius': circleSize,
            'circle-color': colors[ethnicity],
            'circle-opacity': circleOpacity
          },
          layout: {
            'visibility': 'visible' // Initially set visibility to visible
          }
        });
      });
    });
  });

  // Watch for changes in the checkbox values
  $: {
    if (map && map.loaded()) {
      map.setLayoutProperty('circles-Asian', 'visibility', Asian ? 'visible' : 'none');
      map.setLayoutProperty('circles-Native', 'visibility', Native ? 'visible' : 'none');
      map.setLayoutProperty('circles-Hispanic', 'visibility', Hispanic ? 'visible' : 'none');
      map.setLayoutProperty('circles-Other/Unknown', 'visibility', Other ? 'visible' : 'none');
      map.setLayoutProperty('circles-Black', 'visibility', Black ? 'visible' : 'none');
      map.setLayoutProperty('circles-White', 'visibility', White ? 'visible' : 'none');
    }
  }
</script>
<main>
  
    <h2>Demographics of Traffic Collision during the 2010's</h2>
  <!-- Container for the bar graph -->
  <div id="map"></div>
</main>


<style>
  #map {
    height: 500px; /* Adjust height as needed */
    width: 100%; /* Make map fill container width */
  }
  h2 {
    text-align: left;
    font-family: "Kode Mono", monospace;
    font-weight: 400;
    font-size: 42px;
    line-height: 1;
    color: black;
    padding: 10px;
  }
</style>



<!-- Add checkboxes for each ethnicity -->
<label><input type="checkbox" bind:checked={Asian}> Asian</label>
<label><input type="checkbox" bind:checked={Native}> Native</label>
<label><input type="checkbox" bind:checked={Hispanic}> Hispanic</label>
<label><input type="checkbox" bind:checked={Other}> Other/Unknown</label>
<label><input type="checkbox" bind:checked={Black}> Black</label>
<label><input type="checkbox" bind:checked={White}> White</label>

