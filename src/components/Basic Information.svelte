<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3'; // Import D3 library

  let isLoading = true;
  let tempData = [];
  let averageAge = 0;
  let datasetSize = 0; // Variable to store the size of the dataset
  let yearCounts = {}; // Object to store counts for each year
  let currentYear = 2010; // Initialize the current year

  let svg;
  let margin = { top: 20, right: 20, bottom: 30, left: 40 };
  let width = 960 - margin.left - margin.right;
  let height = 500 - margin.top - margin.bottom;

  onMount(async () => {
    const res = await fetch('traffic_collision_data.csv');
    const csv = await res.text();
    tempData = d3.csvParse(csv, d3.autoType);

    // Function to extract year from date string
    function extractYear(dateString) {
      return parseInt(dateString.split('/')[2]); // Assuming date format is MM/DD/YYYY
    }

    // Filter data to include only years from 2010 to 2019
    tempData = tempData.filter(row => {
      const year = extractYear(row['Date Occurred']);
      return year >= 2010 && year <= 2019;
    });

    // Calculate the total sum of ages
    const totalAgeSum = tempData.reduce((sum, row) => {
      if (row['Victim Age']) {
        return sum + row['Victim Age'];
      } else {
        return sum;
      }
    }, 0);

    // Calculate the total number of victims
    const totalVictims = tempData.filter(row => row['Victim Age']).length;

    // Calculate the average age
    averageAge = totalAgeSum / totalVictims;

    // Calculate the size of the dataset
    datasetSize = tempData.length;

    // Count incidents for each year
    tempData.forEach(row => {
      const year = extractYear(row['Date Occurred']);
      if (yearCounts[year]) {
        yearCounts[year]++;
      } else {
        yearCounts[year] = 1;
      }
    });

    isLoading = false;

    // Call the function to render the bar graph
    renderBarGraph();
  });

function renderBarGraph() {
    // Remove existing SVG
    d3.select("#barGraph").selectAll("svg").remove();

    // Append new SVG
    svg = d3.select("#barGraph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Data for the bar graph
    let data = Object.keys(yearCounts).map(year => ({ year: parseInt(year), count: yearCounts[year] }));

    // Define a linear color scale based on the count of traffic collisions
    let colorScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count) / 3, 2 * d3.max(data, d => d.count) / 3, d3.max(data, d => d.count)])
      .range(["white", "white", "blue", "red"]);

    // X scale
    let x = d3.scaleBand()
      .domain(data.map(d => d.year))
      .range([0, width])
      .padding(0.1);

    // Y scale
    let y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .nice()
      .range([height, 0]);

    // X axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Y axis
    svg.append("g")
      .call(d3.axisLeft(y));

    // Bars
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.year))
      .attr("y", height) // Start bars from the bottom
      .attr("width", x.bandwidth())
      .attr("height", 0) // Start bars with zero height
      .attr("fill", d => colorScale(d.count)) // Set fill color based on count using color scale
      .transition() // Apply transition to the bars
      .duration(1500) // Set duration of transition in milliseconds
      .delay((d, i) => i * 100) // Set delay for each bar to create a stagger effect
      .attr("y", d => y(d.count))
      .attr("height", d => height - y(d.count));

   // Add text labels to the bars
  // Calculate bar width and half bar width
  let barWidth = x.bandwidth();
  let halfBarWidth = barWidth / 2;
  let verticalTextOffsetY = 30;
// Add vertical text labels
// Add vertical text labels
// Add vertical text labels
// Add vertical text labels
svg.selectAll('.label')
    .data(data)
    .enter()
    .append('text')
    .attr('x', (d) => x(d.year) + halfBarWidth - 250 ) // Set initial x position to the final position
    .attr('y', d => y(d.count) + 5 ) // Set initial y position to the final position
    .text(d => d.count.toLocaleString())
    .attr('transform', d => `rotate(-90 ${x(d.year) + halfBarWidth} ${y(d.count)})`) // Set initial rotation
    .attr('class', 'label')
    .attr('text-anchor', 'middle')
    .style('font-family', "'Kode Mono', monospace")
    .style('font-weight', '400')
    .style('font-size', '24px')
    .style('fill', 'white')
    .transition() // Apply transition to the text
    .duration(1500) // Set duration of transition in milliseconds
    .delay((d, i) => i * 100) // Set delay for each text to create a stagger effect
    .attr('y', d => y(d.count) + 5) // Transition the 'y' attribute to its final position, adjusting it lower
    .attr('x', (d) => x(d.year) + halfBarWidth - 75); // Transition the 'x' attribute to its final position







    // Add hover effect to display value on mouseover
svg.selectAll(".bar")
  .on("mouseover", function(d) {
    d3.select(this).attr("fill", "orange");
    var associatedLabel = svg.select(`#label-${d.year}`);
    associatedLabel.style('fill', 'white');
  })
  .on("mouseout", function(d) {
    d3.select(this)
      .transition()
      .duration(500)
      .delay((d, i) => i * 100)
      .attr("fill", d => colorScale(d.count));
    var associatedLabel = svg.select(`#label-${d.year}`);
    associatedLabel.style('fill', 'black');
    svg.selectAll(".hover-text").remove();
  });


}


</script>

<main>
  {#if isLoading}
    <h2>Loading CSV file...</h2>
  {:else}
    <h2>In the 2010's decade...</h2>
    <p>There were a total of <span style="background-color:  #66FFCC ;">{datasetSize}</span> Traffic Collision Incidents between the years 2010 and 2019. 
    The average reported age during this time period was <span style="background-color:  #66FFCC ;">{averageAge.toFixed(2)}</span> years old.</p>
  {/if}
  <!-- Container for the bar graph -->
  <div id="barGraph"></div>
</main>

<style>
  body {
    display: flex;
    justify-content: center;
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
  p {
    text-align: left;
    font-family: "Kode Mono", monospace;
    font-weight: 400;
    font-size: 18px;
    line-height: 2;
    color: black;
    padding: 10px;
  }
  svg {
    font: 10px sans-serif;
  }
  .bar:hover {
    fill: orange;
  }
  .axis {
    shape-rendering: crispEdges;
  }
  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
  }
  .hover-text {
    font-size: 12px;
    fill: black;
  }
</style>
