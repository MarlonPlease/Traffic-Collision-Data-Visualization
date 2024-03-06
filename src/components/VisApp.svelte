<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let mapData;
  let currentIndex = 0;
  let svg;

  const plotPoints = [{ longitude: -118.25, latitude: 34.05 }, { longitude: -118.2, latitude: 34.0 }];

  onMount(async () => {
    svg = d3.select('svg');
    mapData = await d3.json('map_LA.geojson');
    drawMap();
    drawPlotPoint();
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

  function drawPlotPoint() {
    const projection = d3.geoMercator()
                         .center([-118.25, 34.05])
                         .scale(41765)
                         .translate([400, 400]);

    svg.selectAll('.plot-point').remove();

    svg.selectAll('.plot-point')
       .data([plotPoints[currentIndex]])
       .enter()
       .append('circle')
       .attr('class', 'plot-point')
       .attr('cx', d => projection([d.longitude, d.latitude])[0])
       .attr('cy', d => projection([d.longitude, d.latitude])[1])
       .attr('r', 5)
       .style('fill', 'red');
  }

  function showNextPoint() {
    currentIndex = (currentIndex + 1) % plotPoints.length;
    drawPlotPoint();
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
    margin-bottom: 10px;
  }

  img, svg {
    position: absolute;
    top: 40px;
    left: 0;
  }
</style>

<div>
  <button on:click={showNextPoint}>Show Next Point</button>
  <img src="https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-118.25,34.05,9,0,0/800x800?access_token=pk.eyJ1IjoibWdhcmF5IiwiYSI6ImNsc2ZpZXZ4aTFsdzAycXBkOWpqenZyeDIifQ._PjOouLcBA5ow4qkKjQaQw" alt="Map">
  <svg width="800" height="800"></svg>
</div>
