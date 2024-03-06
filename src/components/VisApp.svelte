<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  
  let mapData;

  onMount(() => {
    // Load GeoJSON data for Los Angeles
    d3.json('map_LA.geojson').then(data => {
      mapData = data;
      drawMap();
    });
  });

  function drawMap() {
    // Your D3 code to draw the map goes here
    const svg = d3.select('svg');
    const projection = d3.geoMercator()
                       .center([-118.25, 34.05])
                       .scale(50000) // Adjust the scale to zoom out
                       .translate([400, 400]);

    const path = d3.geoPath().projection(projection);

    svg.selectAll('path')
       .data(mapData.features)
       .enter()
       .append('path')
       .attr('d', path)
       .style('fill', 'steelblue')
       .style('stroke', 'white')
       .style('stroke-width', 0.5);
  }
</script>

<style>
  /* Add your CSS styles here */
</style>

<svg width="800" height="800">
  <img src="https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-118.25,34.05,9,0,0/800x800?access_token=pk.eyJ1IjoibWdhcmF5IiwiYSI6ImNsc2ZpZXZ4aTFsdzAycXBkOWpqenZyeDIifQ._PjOouLcBA5ow4qkKjQaQw" alt="Map">
</svg>
