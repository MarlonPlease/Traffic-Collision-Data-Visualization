<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let mapData;
  let svg;
  let currentYear = 2010;
  let filteredData = [];
  let data

  onMount(async () => {
    svg = d3.select('svg');
    mapData = await d3.json('map_LA.geojson');
     data = await d3.csv('https://raw.githubusercontent.com/MarlonPlease/Project-4-Updated/main/static/Ethnicity.csv');

    filteredData = data.filter(d => {
      const year = new Date(d['Date Occurred']).getFullYear();
      return year === currentYear;
    });

    drawMap();
    drawPlotPoints();
  });

  function drawMap() {
    const projection = d3.geoMercator()
                         .center([-118.25, 34.05])
                         .scale(41765)
                         .translate([400, 400]);

    const path = d3.geoPath().projection(projection);

    svg.selectAll('path')
       .data(mapData.features)
       .enter()
       .append('path')
       .attr('d', path)
       .style('fill', 'white')
       .style('fill-opacity', 0.0)
       .style('stroke', 'steelblue')
       .style('stroke-opacity', 0.8)
       .style('stroke-width', 1.5);
  }

  function drawPlotPoints() {
    const projection = d3.geoMercator()
                         .center([-118.25, 34.05])
                         .scale(41765)
                         .translate([400, 400]);

    svg.selectAll('.plot-point').remove();

    svg.selectAll('.plot-point')
       .data(filteredData)
       .enter()
       .append('circle')
       .attr('class', 'plot-point')
       .attr('cx', d => projection([parseFloat(d['Longitude']), parseFloat(d['Latitude'])])[0])
       .attr('cy', d => projection([parseFloat(d['Longitude']), parseFloat(d['Latitude'])])[1])
       .attr('r', 5)
       .style('fill', 'red')
       .style('fill-opacity', 0.35);
  }

  function updateYear(event) {
    currentYear = parseInt(event.target.value);
    filteredData = data.filter(d => {
      const year = new Date(d['Date Occurred']).getFullYear();
      return year === currentYear;
    });

    drawPlotPoints();
  }
</script>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;
    height: 800px;
    margin: 0 auto;
    position: relative;
    
    
  }

  button {
    margin: 10px;
  }

  img, svg {
    position: absolute;
    top: 80px;
    left: 0;
  }

  .slider {
    width: 800px;
  }

  main {margin: 10px;}

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
<main>
<h2>Traffic Collision Incidents by Year</h2>
<input class="slider" type="range" min="2010" max="2019" step="1" bind:value={currentYear} on:input={updateYear} />
  <span>{currentYear}</span>

<div>
  <img src="https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-118.25,34.05,9,0,0/800x800?access_token=pk.eyJ1IjoibWdhcmF5IiwiYSI6ImNsc2ZpZXZ4aTFsdzAycXBkOWpqenZyeDIifQ._PjOouLcBA5ow4qkKjQaQw" alt="Map">
  <svg width="800" height="800"></svg>
</div>


</main >