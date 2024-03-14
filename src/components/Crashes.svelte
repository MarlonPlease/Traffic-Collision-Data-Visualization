<script>
import { onMount } from 'svelte';
import * as d3 from 'd3';

let selectedMonth = 0; // January
let incidentsData = [];
let allData = [];

async function loadData() {
  // Load data
  allData = await d3.csv('https://raw.githubusercontent.com/MarlonPlease/Project-4-Clone/main/static/sobriety_data.csv');
}

onMount(async () => {
  await loadData();
  updateDataAndChart();
  // Manually update the month information when the page loads
  updateMonth({ target: { value: selectedMonth.toString() } });
});

function updateDataAndChart() {
  // Parse dates
  const parseDate = d3.timeParse("%Y-%m-%d");

  // Filter data for the selected month
  const filteredData = allData.filter(d => {
    const date = parseDate(d['Date Occurred']);
    return date.getMonth() === selectedMonth;
  });

  // Aggregate data by counting incidents for each day in the selected month
  const aggregatedData = d3.rollup(filteredData, v => v.length, d => {
    const date = parseDate(d['Date Occurred']);
    return new Date(2000, date.getMonth(), date.getDate()); // Use a fixed year
  });

  // Convert aggregated data to array of objects
  incidentsData = Array.from(aggregatedData, ([date, count]) => ({ date, count })).sort((a, b) => a.date - b.date);

  // Create the line chart
  createLineChart(incidentsData);
}
  function createLineChart(data) {
    d3.select("#chart").html("");
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

    // X scale (days of the month)
const x = d3.scaleTime()
  .domain([new Date(2000, selectedMonth, 1), new Date(2000, selectedMonth + 1, 0)]) // Fixed domain from the 1st to the last day of the selected month
  .range([0, width]);

    // Y scale (count of incidents)
    const y = d3.scaleLinear()
      .domain([0, 15])
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
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%d")));

    // Append y-axis
    svg.append("g")
      .call(d3.axisLeft(y));

    // Append month label
    svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 10) // Position the label below the x-axis
    .attr("text-anchor", "middle")
    .text(getMonthName(selectedMonth));
  }

  function getMonthName(monthIndex) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[monthIndex];
}
function getMonthInfo(monthIndex) {
  const monthInfo = [
    "January: New Years Day had the most crashes in the month of January.",
    "February: President's Day falls on the 3rd monday of February.",
    // ... other months ...
  ];
  return monthInfo[monthIndex];
}

  function updateMonth(event) {
  selectedMonth = +event.target.value; // Convert string to number
  updateDataAndChart();
  // Update the month information
  const monthInfo = getMonthInfo(selectedMonth);
  document.getElementById('monthInfo').textContent = monthInfo;
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

<select bind:value={selectedMonth} on:change={updateMonth}>
  <option value="0">January</option>
  <option value="1">February</option>
  <option value="2">March</option>
  <option value="3">April</option>
  <option value="4">May</option>
  <option value="5">June</option>
  <option value="6">July</option>
  <option value="7">August</option>
  <option value="8">September</option>
  <option value="9">October</option>
  <option value="10">November</option>
  <option value="11">December</option>
  <!-- ... other months ... -->
</select>





<div id="chart"></div>
<p id="monthInfo"></p>

