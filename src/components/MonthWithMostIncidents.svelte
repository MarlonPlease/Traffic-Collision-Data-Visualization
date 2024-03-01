<script>
  export let year;
  
  // Function to determine the month with the most incidents
  function getMonthWithMostIncidents(year) {
    // Your logic to determine the month with the most incidents for the given year
    // This could involve analyzing the data or making a request to retrieve the relevant information
    // For demonstration purposes, let's assume it returns the month as a string
    return "June"; // Placeholder value
  }
</script>

<main>
  <h2><span style="color: white; background-color: black;">In the year {year}...</span></h2>

  <p>The month with the most incidents was: {getMonthWithMostIncidents(year)}</p>
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
  
</style>
