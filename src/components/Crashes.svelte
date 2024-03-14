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
    "January: New Years Day had the most crashes in the month of January. January 1st has The is the most incidents for sobriety reasons in the dataset.",
    "February: President's Day falls on the 3rd Monday of February which might be the reason for the small peak near the 20th of the month.",
    "March: St. Patrick's Day falls on the 17th of March. Many higher education institutions have a spring break during the month in the Los Angeles area.",
    "April: Many higher education institutions have a spring break during the month in the Los Angeles area.",
    "May: There appears to be a slight peak around the 5th of May and near Memorial Day, which falls on the last Monday of May. Mother's Day is the on the second Sunday in May, which may explain the peak near the 13th of the month.",
    "June: Father's Day ways on the second Sunday of June, which might explain the peak near the 16th of the month. It remains unclear why there was a peak near the 26th.",
    "July: It remains unclear why there was a small peak near the 21st. It cannot be attributed to Indepence Day, which falls on the 4th of every July.",
    "August: It remains unclear why there was a small peak near the 6th, 14th, and 19th.",
    "September: It remains unclear why there was a small peak near the 9th.",
    "October: It remains unclear why there was a small peak near the 4th and 7th. It cannot be attributed to Halloween, which falls near the end of the month on the last day of October.",
    "November: Veterans Day falls on the 11th of the month. It remains unclear why there was a small peak near the 16th; It cannot be attributed to Thanksgiving, which falls near the end of the month on the last Thursday of November. However, we can observe peaks around Thanksgiving.",
    "December: There is a peak near Christmas, which falls near the 25th.",
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
  // Update the month name in the span element
  document.getElementById('monthName').textContent = getMonthName(selectedMonth);
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
<main>
<input type="range" min="0" max="11" bind:value={selectedMonth} on:input={updateMonth} />
<span id="monthName">{getMonthName(selectedMonth)}</span>






<div id="chart"></div>
<p id="monthInfo"></p>
</main>
