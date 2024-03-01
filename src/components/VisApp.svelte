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

    map.on('style.load', () => {
      // Remove existing circle layers (if any)
      const existingLayers = map.getStyle().layers;
      existingLayers.forEach(layer => {
        if (layer.id.startsWith('circle-')) {
          map.removeLayer(layer.id);
        }
      });

      // Add circles for each random location coordinate
      randomCoordinates.forEach(coord => {
        // Check if the layer already exists before adding it
        const layerId = 'circle-' + coord.join('-');
        if (!map.getLayer(layerId)) {
          map.addLayer({
            'id': layerId, // Unique layer ID
            'type': 'circle',
            'source': {
              'type': 'geojson',
              'data': {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': coord
                }
              }
            },
            'paint': {
              'circle-color': '#8B4513', // Circle color
              'circle-radius': 10, // Circle radius (adjust as needed)
              'circle-opacity': 1 // Circle opacity
            }
          });
        }
      });

      // Add heatmap layer
      map.addLayer({
        'id': 'randomCoordinates-heat',
        'type': 'heatmap',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': randomCoordinates.map(coord => {
              return {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': coord
                }
              };
            })
          }
        },
        'maxzoom': 15,
        'paint': {
          // Heatmap color stops
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(33,102,172,0)',
            0.2,
            'rgb(103,169,207)',
            0.4,
            'rgb(209,229,240)',
            0.6,
            'rgb(253,219,199)',
            0.8,
            'rgb(239,138,98)',
            1,
            'rgb(178,24,43)'
          ],
          // Heatmap radius
          'heatmap-radius': 35,
          // Heatmap intensity
          'heatmap-intensity': 1,
          'heatmap-opacity': 0.7 
        }
      });
    });
  });
</script>

<style>
  #map {
    width: 100%;
    height: 450px; /* Adjust the height as needed */
    overflow: hidden; /* Hide scrollbars */
  }
</style>

<div id="map"></div>
