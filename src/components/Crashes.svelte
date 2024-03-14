<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let incidentsData = [];

  onMount(async () => {
    // Load data
    const data = await d3.csv('https://raw.githubusercontent.com/MarlonPlease/Project-4-Clone/main/static/sobriety_data.csv');
    
    // Parse dates
    const parseDate = d3.timeParse("%Y-%m-%d");

    // Filter data for January
    const januaryData = data.filter(d => {
      const date = parseDate(d['Date Occurred']);
      return date.getMonth() === 0; // January is represented by month 0
    });

    // Aggregate data by counting incidents for each day in January
    const aggregatedData = d3.rollup(januaryData, v => v.length, d => {
      const date = parseDate(d['Date Occurred']);
      return new Date(2000, date.getMonth(), date.getDate()); // Use a fixed year
    });

    // Convert aggregated data to array of objects
    incidentsData = Array.from(aggregatedData, ([date, count]) => ({ date, count })).sort((a, b) => a.date - b.date);

    // Create the line chart
    createLineChart(incidentsData);
  });

  function createLineChart(data) {
    // Set up dimensions for the chart
    const margin = { top: 20, right: 30, bottom: 50, left: 40 }; // Increased bottom margin to accommodate the label
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Append SVG to the DOM
    const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X scale (days of January)
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([0, width]);

    // Y scale (count of incidents)
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .nice()
      .range([height, 0]);

    // Line generator
    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.count));

    // Append the line to the chart
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // Append x-axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Append y-axis
    svg.append("g")
      .call(d3.axisLeft(y));

    // Append month label
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10) // Position the label below the x-axis
      .attr("text-anchor", "middle")
      .text("January");
  }
</script>

<style>
  svg {
    font-family: Arial, sans-serif;
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }

  .axis text {
    font-size: 12px;
  }
</style>

<div id="chart"></div>
