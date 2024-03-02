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
      return year === 2010;
    });
  });
</script>

<style>

</style>


