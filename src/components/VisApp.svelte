<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import * as d3 from 'd3';
  import Scroller from '@sveltejs/svelte-scroller';

  let mapData;
  export let currentIndex = 0;
  let plotPoints = [{ longitude: -118.25, latitude: 34.05 }, { longitude: -118.2, latitude: 34.0 }];

  onMount(() => {
    // Load GeoJSON data for Los Angeles
    d3.json('map_LA.geojson').then(data => {
      mapData = data;
      drawMap();
    });
  });

  function drawMap() {
    // Your existing D3 code for drawing the map
    const svg = d3.select('svg');
    const projection = d3.geoMercator()
                       .center([-118.25, 34.05])
                       .scale(41765) // Adjust the scale to zoom out
                       .translate([400, 400]);

    const path = d3.geoPath().projection(projection);

    svg.selectAll('path')
       .data(mapData.features)
       .enter()
       .append('path')
       .attr('d', path)
       .style('fill', 'white')
       .style('fill-opacity', 0.0) // Increase fill opacity to 0.8
       .style('stroke', 'steelblue')
       .style('stroke-opacity', 0.8) // Increase stroke opacity to 0.8
       .style('stroke-width', 1.5);

    // Append a circle for the current plot point
    svg.selectAll('.plot-point')
       .data([plotPoints[currentIndex]])
       .enter()
       .append('circle')
       .attr('class', 'plot-point')
       .attr('cx', d => projection([d.longitude, d.latitude])[0])
       .attr('cy', d => projection([d.longitude, d.latitude])[1])
       .attr('r', 5) // Adjust the radius as needed
       .style('fill', 'red'); // Customize the fill color
  }
  
  // Function to handle showing the next plot point
  function showNextPoint() {
    currentIndex = (currentIndex + 1) % plotPoints.length;
    drawMap();
  }
</script>

<style>
  /* Your existing CSS styles */
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;
    height: 800px;
    margin: 0 auto; /* Center horizontally */
    position: relative;
  }

  button {
    margin-bottom: 10px; /* Add some space between the button and the image */
  }

  img, svg {
    position: absolute;
    top: 40px; /* Adjust this value to position the image below the button */
    left: 0;
  }
</style>


<div>
  <button on:click={showNextPoint}>Show Next Point</button>
  <img src="https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-118.25,34.05,9,0,0/800x800?access_token=pk.eyJ1IjoibWdhcmF5IiwiYSI6ImNsc2ZpZXZ4aTFsdzAycXBkOWpqenZyeDIifQ._PjOouLcBA5ow4qkKjQaQw" alt="Map">
  <svg width="800" height="800"></svg>
</div>


