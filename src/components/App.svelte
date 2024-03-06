<script>
    import Scroller from '@sveltejs/svelte-scroller';
    import VisApp from '../components/VisApp.svelte';
    import Ethnicity from '../components/Ethnicity.svelte';
    import Basic_Information from '../components/Basic Information.svelte';
    import MonthWithMostIncidents from './MonthWithMostIncidents.svelte';

    let plotPoint = { longitude: -118.25, latitude: 34.05 };

    let index, offset, progress;
    
     
</script>


<main>
    <Basic_Information />
    <hr>
    <Ethnicity />
    <hr>
    <VisApp />
    <hr>
<Scroller top="{0.2}" bottom="{0.8}" bind:index bind:offset bind:progress>
    <div slot="background">
        <p style="text-align: right; margin-right: 20px;">Section {index + 1} is currently active.</p>
    </div>
    <div slot="foreground">
        <section><MonthWithMostIncidents year="2010" /></section>
        <section><MonthWithMostIncidents year="2011" /></section>
        <section><MonthWithMostIncidents year="2012" /></section>
        <section><MonthWithMostIncidents year="2013" /></section>
        <section><MonthWithMostIncidents year="2014" /></section>
        <section><MonthWithMostIncidents year="2015" /></section>
        <section><MonthWithMostIncidents year="2016" /></section>
        <section><MonthWithMostIncidents year="2017" /></section>
        <section><MonthWithMostIncidents year="2018" /></section>
        <section><MonthWithMostIncidents year="2019" /></section>     
    </div>
</Scroller>
    <hr>
</main>




<style>
    @import url('https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400..700&display=swap');
    
    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');


    :root {
        --color-bg: white;
        --color-outline: #B3F0FF;
        --color-shadow: hsla(7, 100%, 50%, 0.5);
        --color-text: black;
    }

    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    

    main {
        height: 100%;
        display: grid;
        place-content: center;
        text-align: center;
        font-family: "Kode Mono", monospace;
        font-weight: 400;
        line-height: 2;
        font-size: 20px;
        color: var(--color-text);
        background-color: var(--color-bg);
    }


    input,
    button {
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
        font-size: 24px;
        width: 100%;
    }


    h1 {
        font-family: "Kode Mono", monospace;
        font-weight: 400;
        font-size: 52px;
        line-height: 2;
        background-color: red; 
        color: black; 
        padding: 10px; 
    }

    h2 {
        text-align: left;
    font-family: "Kode Mono", monospace;
    font-weight: 400;
    font-size: 42px;
    line-height: 2;
    color: black;
    }
    p {
        text-align: left;
    font-family: "Kode Mono", monospace;
    font-weight: 400;
    font-size: 32 px;
    line-height: 2;
    color: black;
    }
    section {
        font-family: "Kode Mono", monospace;
        font-weight: 400;
        font-size: 52px;
        line-height: 2;
        color: black; 
        padding: 10px; 
        height: 100vh;
    }
    hr {
    height: 5px; /* Adjust the thickness as needed */
    border: none;
    background: linear-gradient(to right, red, red); /* Gradient from top to bottom */
    margin: 20px 0; /* Adjust margin as needed */
}


</style>

