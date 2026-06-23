---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

linktitle: "ENSO Forecast"
summary: "Real-time climate forecasts using the eXtended nonlinear recharge oscillator (XRO) model "
weight: 1

# Page metadata.
title: Operational XRO Climate Forecasts
date: "2024-08-09T00:00:00Z"
lastmod: "2024-08-09T00:00:00Z"
draft: false  # Is this a draft? true/false
toc: false  # Show table of contents? true/false
type: book  # Do not modify.

image:
 focal_point: Center
 filename: "XRO_plume/XRO_Nino34_plumes.gif"
 maxheight: 340px

# Add menu entry to sidebar.
# - name: Declare this menu item as a parent with ID `name`.
# - weight: Position of link in menu.

---
### Niño3.4 and Relative Niño3.4 SST anomalies monthly forecast

<style>
#image-selector {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 8px;
  margin-bottom: 2px;

  background: #fafafa;
  border: 1px solid #e5e7eb;
  border-radius: 12px;

  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

  #image-selector label, #image-selector select, #image-selector button {
    margin: 0;
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ccc; /* Grey border */
    border-radius: 4px; /* Rounded corners for inputs and buttons */
  }

 button {
  background: #2563eb;
  color: white;
  border: none;

  padding: 8px 14px;
  border-radius: 8px;

  font-weight: 500;

  transition: all 0.2s ease;
}

button:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

select {
  border: 1px solid #d1d5db;
  border-radius: 8px;

  background: white;
  padding: 8px 12px;

  font-size: 15px;
}
    
  #image-display {
    text-align: center; /* Centers the content inside this div */
    padding: 10px; /* Adds some padding around the content */
  }

  #selectedImage {
    width: 99%; /* Sets the image width to 80% of its container */
    max-width: 100%; /* Ensures the image does not exceed the size of the container */
    height: auto; /* Maintains the aspect ratio of the image */
    display: block; /* Makes the image a block element to apply width and centering */
    margin: 0 auto; /* Centers the image horizontally within its container */
  }

  #imageStatus {
    color: red;
    font-size: 16px; /* Sets the font size for the status message */
  }
  .references {
    list-style: none; /* Removes default list styling */
    padding: 0; /* Removes padding */
  }

  .references li {
    margin: 0 0 10px 0; /* Adds space between items */
    padding-left: 2ch; /* Adds padding to create space for hanging indent */
    text-indent: -2ch; /* Creates hanging indent */
  }

.forecast-card {
  margin: 10px auto;
  background: white;
  border-radius: 6px;
  box-shadow:
    0 1px 3px rgba(0,0,0,0.08),
    0 4px 12px rgba(0,0,0,0.04);
  overflow: hidden;
}
</style>


<div id="image-selector">
  <label for="yearDropdown">Select the forecast:</label>
  <select id="yearDropdown" onchange="updateImage()"></select>
  <select id="monthDropdown" onchange="updateImage()"></select>
  <button onclick="changeMonth(-1)">Previous Month</button>
  <button onclick="changeMonth(1)">Next Month</button>
</div>
<div id="image-display">
<div class="forecast-card">
  <img id="selectedImage" src="" alt="Niño3.4 Forecast" style="display: none;">
</div>
<div class="forecast-card">
  <img id="selectedImage2" src="" alt="Relative Niño3.4 Forecast" style="display: none; margin-top: 20px;">
</div>
<div class="forecast-card">
  <p id="imageStatus" style="display: none;">Image unavailable for the selected date.</p>
</div>
</div>

<script>
const MONTHS = [
  ["01", "Jan"], ["02", "Feb"], ["03", "Mar"], ["04", "Apr"],
  ["05", "May"], ["06", "Jun"], ["07", "Jul"], ["08", "Aug"],
  ["09", "Sep"], ["10", "Oct"], ["11", "Nov"], ["12", "Dec"]
];

const START_YEAR = 2023;
const END_YEAR = new Date().getFullYear() + 2;

function populateYears() {
  const yearDropdown = document.getElementById("yearDropdown");
  const currentYear = new Date().getFullYear();

  for (let year = START_YEAR; year <= END_YEAR; year++) {
    yearDropdown.add(new Option(year, year));
  }

  yearDropdown.value = Math.min(currentYear, END_YEAR);
}

function populateMonths() {
  const monthDropdown = document.getElementById("monthDropdown");

  MONTHS.forEach(([value, label]) => {
    monthDropdown.add(new Option(label, value));
  });
}

function updateImage() {
  const year = document.getElementById('yearDropdown').value;
  const month = document.getElementById('monthDropdown').value;

  const img1Path = `/XRO_plume/${year}-${month}_Nino34.png`;
  const img2Path = `/RONI_plume/${year}-${month}_Nino34.png`;

  const img1 = document.getElementById('selectedImage');
  const img2 = document.getElementById('selectedImage2');
  const status = document.getElementById('imageStatus');

  img1.onload = () => { img1.style.display = 'block'; status.style.display = 'none'; };
  img1.onerror = () => { img1.style.display = 'none'; img2.style.display = 'none'; status.style.display = 'block'; };
  img1.src = img1Path;

  img2.onload = () => { img2.style.display = 'block'; };
  img2.onerror = () => { img2.style.display = 'none'; };
  img2.src = img2Path;
}

function setDefaultMonth() {
  const monthDropdown = document.getElementById("monthDropdown");

  const today = new Date();
  let month = today.getMonth();
  if (today.getDate() <= 15) {
    month = (month + 11) % 12;
  }
  monthDropdown.selectedIndex = month;
  updateImage();
}

function changeMonth(step) {
  const monthDropdown = document.getElementById("monthDropdown");
  const yearDropdown = document.getElementById("yearDropdown");

  let month = monthDropdown.selectedIndex + step;
  let year = Number(yearDropdown.value);

  if (month < 0) {
    if (year > START_YEAR) {
      year--;
      month = 11;
    } else {
      return;
    }
  }

  if (month > 11) {
    if (year < END_YEAR) {
      year++;
      month = 0;
    } else {
      return;
    }
  }

  yearDropdown.value = year;
  monthDropdown.selectedIndex = month;

  updateImage();
}

document.addEventListener("DOMContentLoaded", () => {
  populateYears();
  populateMonths();
  setDefaultMonth();
});
</script>

The plumes show monthly Niño3.4 and relative Niño3.4 SST anomaly forecasts relative to the 1991–2020 climatology. Forecasts are generated using the XRO framework and uninitializted sensitivity experiments designed to isolate the contributions of different ocean-basin SST modes to ENSO evolution.


<div style="padding:12px 16px; border-left:4px solid #0072B2; background:#f8fafc; margin-bottom:15px;">
<b>Forecast Experiments</b> 
<ul>
<li><span style="color:#0072B2;font-weight:600;"> XRO Forecast </span> — CTRL forecast </li>
<li><span style="color:#E69F00;font-weight:600;"> w/o ExPO</span> — excludes extratropical Pacific NPMM and SPMM effects.</li>
<li><span style="color:#009E73;font-weight:600;"> w/o IO+AO</span> — excludes tropical Indian and Atlantic Ocean SST variability.</li>
<li><span style="color:#CC79A7;font-weight:600;"> w/o ExPO+IO+AO</span> — excludes both ExPO and tropical IO/AO influences.</li>
</ul>
See details of uninitialized sensitivity experiments described in
<a href="https://www.nature.com/articles/s41586-024-07534-6" target="_blank" rel="noopener noreferrer">
<i>Zhao et al.</i> (2024, <i>Nature</i>) </a>
    
</div>

Differences between the CTRL forecast and the sensitivity experiments provide an estimate of the contributions of SST initial conditions in the extratropical Pacific, tropical Indian Ocean, and tropical Atlantic to the predicted evolution of ENSO.


{{% callout warning %}}
Disclaimer: 

The XRO forecast is provided for informational and academic research purposes and is not intended for production use. This website and its affiliated entities expressly disclaim any liability for decisions or actions based on the reliance on this information. Furthermore, no responsibility is assumed for any consequential, special, or similar damages resulting from such reliance.
{{% /callout %}}
