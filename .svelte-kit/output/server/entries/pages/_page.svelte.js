import { c as create_ssr_component, d as add_attribute, e as escape, v as validate_component } from "../../chunks/ssr.js";
import "d3";
import "mapbox-gl/dist/mapbox-gl.js";
const handlers = [];
if (typeof window !== "undefined") {
  const run_all = () => handlers.forEach((fn) => fn());
  window.addEventListener("scroll", run_all);
  window.addEventListener("resize", run_all);
}
if (typeof IntersectionObserver !== "undefined") {
  const map = /* @__PURE__ */ new Map();
  new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        const update = map.get(entry.target);
        const index = handlers.indexOf(update);
        if (entry.isIntersecting) {
          if (index === -1)
            handlers.push(update);
        } else {
          update();
          if (index !== -1)
            handlers.splice(index, 1);
        }
      });
    },
    {
      rootMargin: "400px 0px"
      // TODO why 400?
    }
  );
}
const css$4 = {
  code: 'div.svelte-hy3wrd{display:flex;flex-direction:column;align-items:center;width:800px;height:800px;margin:0 auto;position:relative}img.svelte-hy3wrd,svg.svelte-hy3wrd{position:absolute;top:80px;left:0}.slider.svelte-hy3wrd{width:800px}main.svelte-hy3wrd{margin:10px}p.svelte-hy3wrd{text-align:left;font-family:"Kode Mono", monospace;font-weight:400;font-size:32 px;line-height:2;color:black}h2.svelte-hy3wrd{text-align:left;font-family:"Kode Mono", monospace;font-weight:400;font-size:42px;line-height:1;color:black;padding:10px}',
  map: null
};
const VisApp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentYear = 2010;
  $$result.css.add(css$4);
  return `<main class="svelte-hy3wrd"><h2 class="svelte-hy3wrd" data-svelte-h="svelte-9qdjfe">Traffic Collision Incidents by Year</h2> <p class="svelte-hy3wrd" data-svelte-h="svelte-uhzvwz">There previous section left us wondering why the coordinates formed a specific shape...</p> <p class="svelte-hy3wrd" data-svelte-h="svelte-57bhol">Here are the boundaries delineating the jurisdiction of LA City.
    It&#39;s evident from scrolling through the years that the majority of collision incident plot points remain within these jurisdictional boundaries.
    It&#39;s apparent that the clusters of coordinates predominantly occur around highways and boulevards, 
    indicating hotspots of activity.
    <a href="https://geohub.lacity.org/datasets/lahub::city-boundary/about">The boundary is according to the LACity.org datasets website.</a></p> <input class="slider svelte-hy3wrd" type="range" min="2010" max="2019" step="1"${add_attribute("value", currentYear, 0)}> <span>${escape(currentYear)}</span> <div class="svelte-hy3wrd" data-svelte-h="svelte-1nvm9cs"><img src="https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-118.25,34.05,9,0,0/800x800?access_token=pk.eyJ1IjoibWdhcmF5IiwiYSI6ImNsc2ZpZXZ4aTFsdzAycXBkOWpqenZyeDIifQ._PjOouLcBA5ow4qkKjQaQw" alt="Map" class="svelte-hy3wrd"> <svg width="800" height="800" class="svelte-hy3wrd"></svg></div></main>`;
});
const css$3 = {
  code: '#map.svelte-o02u7t{height:550px;width:100%;margin-bottom:20px}h2.svelte-o02u7t{text-align:left;font-family:"Kode Mono", monospace;font-weight:400;font-size:42px;line-height:1;color:black;padding:10px}p.svelte-o02u7t{text-align:left;font-family:"Kode Mono", monospace;font-weight:400;font-size:32 px;line-height:2;color:black}.checkbox-grid.svelte-o02u7t{display:grid;grid-template-columns:repeat(auto-fit, minmax(100px, 1fr));grid-gap:10px;padding:10px;border:3px solid #ccc;border-radius:5px}',
  map: null
};
const Ethnicity = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let Asian = true;
  let Hispanic = true;
  let Other = true;
  let Black = true;
  let White = true;
  let Native = true;
  $$result.css.add(css$3);
  return `<main><h2 class="svelte-o02u7t" data-svelte-h="svelte-15lgabl">Demographic Data of Traffic Collision Incidents during the 2010&#39;s</h2> <p class="svelte-o02u7t" data-svelte-h="svelte-1gzuhnh">Why the funny shape? 
    The coordinates form a shape that resemble the map of the jurisdiction of LAPD.</p> <p class="svelte-o02u7t" data-svelte-h="svelte-55nufb">Why are other cities not reported? 
    The LAPD does not police all the cities of LA County.</p> <p class="svelte-o02u7t" data-svelte-h="svelte-1da8iae">Will the ethnic demographics of traffic collisions change for the 2020&#39;s decade? 
    Who knows.</p> <p class="svelte-o02u7t" data-svelte-h="svelte-1s02t7n">Below are coordinates from the dataset involving Traffic Collision Incidents categorized by reported ethnicity.</p> <div id="checkbox-container" class="checkbox-grid svelte-o02u7t"> <label><input type="checkbox"${add_attribute("checked", Asian, 1)}> Asian</label> <label><input type="checkbox"${add_attribute("checked", Native, 1)}> Native</label> <label><input type="checkbox"${add_attribute("checked", Hispanic, 1)}> Hispanic</label> <label><input type="checkbox"${add_attribute("checked", Other, 1)}> Other/Unknown</label> <label><input type="checkbox"${add_attribute("checked", Black, 1)}> Black</label> <label><input type="checkbox"${add_attribute("checked", White, 1)}> White</label></div>  <div id="map" class="svelte-o02u7t"></div> </main>`;
});
const css$2 = {
  code: 'h2.svelte-18fpiyc{text-align:left;font-family:"Kode Mono", monospace;font-weight:400;font-size:42px;line-height:1;color:black;padding:10px}p.svelte-18fpiyc{text-align:left;font-family:"Kode Mono", monospace;font-weight:400;font-size:18px;line-height:2;color:black;padding:10px}',
  map: null
};
const Basicu20Information = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<main>${`<h2 class="svelte-18fpiyc" data-svelte-h="svelte-1cq7ety">Loading CSV file...</h2>`}  <div id="barGraph"></div> </main>`;
});
const css$1 = {
  code: 'p.svelte-18tvisx{text-align:left;font-family:"Kode Mono", monospace;font-weight:400;font-size:32 px;line-height:2;color:black}h2.svelte-18tvisx{text-align:left;font-family:"Kode Mono", monospace;font-weight:400;font-size:42px;line-height:1;color:black;padding:10px}',
  map: null
};
function getMonthName(monthIndex) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return monthNames[monthIndex];
}
const Crashes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedMonth = 0;
  $$result.css.add(css$1);
  return `<main><h2 class="svelte-18tvisx" data-svelte-h="svelte-b3s2kc">Traffic Incidents Involving Sobriety by Month</h2> <p class="svelte-18tvisx" data-svelte-h="svelte-1oeokws">The dataset includes MO Codes (modus operandi),
    which are shorthand descriptions for what happened in a crime incident. 
    MO Code 3801 specifically denotes &quot;Sobriety&quot; incidents.
    The data is unclear about what constitutes &quot;sobriety,&quot; including whether it refers to being under the influence of alcohol, or if includes being under the influence of drug use.</p> <p class="svelte-18tvisx" data-svelte-h="svelte-17ztsyk">All the incidents from 2010 to 2019 were subsequently sorted by month.</p> <div style="display: flex; justify-content: center; width: 100%;"><div style="width: 400px"><input type="range" min="0" max="11" style="width: 100%"${add_attribute("value", selectedMonth, 0)}> <span id="monthName">${escape(getMonthName(selectedMonth))}</span></div></div> <div id="chart"></div> <p id="monthInfo" class="svelte-18tvisx"></p></main>`;
});
const css = {
  code: `@import url('https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400..700&display=swap');@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');:root{--color-bg:white;--color-outline:#B3F0FF;--color-shadow:hsla(7, 100%, 50%, 0.5);--color-text:black}.svelte-1sqsinn,.svelte-1sqsinn::before,.svelte-1sqsinn::after{margin:0;padding:0;box-sizing:border-box}main.svelte-1sqsinn{height:100%;display:grid;place-content:center;text-align:center;font-family:"Kode Mono", monospace;font-weight:400;line-height:2;font-size:20px;color:var(--color-text);background-color:var(--color-bg)}h2.svelte-1sqsinn{text-align:left;font-family:"Kode Mono", monospace;font-weight:400;font-size:42px;line-height:2;color:black}p.svelte-1sqsinn{text-align:left;font-family:"Kode Mono", monospace;font-weight:400;font-size:32 px;line-height:2;color:black}hr.svelte-1sqsinn{height:5px;border:none;background:linear-gradient(to right, red, red);margin:20px 0}`,
  map: null
};
const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="svelte-1sqsinn">${validate_component(Basicu20Information, "Basic_Information").$$render($$result, {}, {}, {})} <hr class="svelte-1sqsinn"> <p class="svelte-1sqsinn" data-svelte-h="svelte-2y9esz">...but does ethnicity play a part/affect in collisions? Lets take a look...</p> <hr class="svelte-1sqsinn"> ${validate_component(Ethnicity, "Ethnicity").$$render($$result, {}, {}, {})} <hr class="svelte-1sqsinn"> ${validate_component(VisApp, "VisApp").$$render($$result, {}, {}, {})} <hr style="width: 50%; margin: 0; border: none; height: 5px; background: linear-gradient(to right, white, white);" class="svelte-1sqsinn"> <br class="svelte-1sqsinn"> <hr style="background: linear-gradient(to right, white, white);" class="svelte-1sqsinn"> <hr style="background: linear-gradient(to right, white, white);" class="svelte-1sqsinn"> <hr class="svelte-1sqsinn"> ${validate_component(Crashes, "Crashes").$$render($$result, {}, {}, {})} <hr class="svelte-1sqsinn"> <h2 class="svelte-1sqsinn" data-svelte-h="svelte-k0dq07">Takeaway</h2> <p class="svelte-1sqsinn" data-svelte-h="svelte-1et5u80">The frequency and locations of car collisions are crucial in LA, the largest US metro area, highlighting the need for awareness. 
    As LA prepares for the 2028 Olympics, understanding collision hotspots aids in planning metro stations. 
    Our visualization effectively illustrates car crash trends in LA throughout the 2010s.</p> <hr class="svelte-1sqsinn"> </main>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(App, "App").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
