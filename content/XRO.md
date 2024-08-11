---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "XRO"
subtitle: "  "
summary: "Climate forecasts"
authors: []
tags: []
categories: []
date: 2024-08-10
lastmod: 2024-08-10
featured: false
draft: false
share: false
editable: false  # Allow visitors to edit the page? Supported by the Page, Post, and Docs content types.


# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

This page provide 

{{% callout warning %}}
Disclaimer: 
{{% /callout %}}


<style>
  #image-selector {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  #image-selector label, #image-selector select {
    margin: 0;
    font-size: 16px;
  }
</style>

<div id="image-selector">
  <button onclick="changeMonth(-1)">Previous Month</button>

  <label for="yearDropdown">Select a year:</label>
  <select id="yearDropdown" onchange="updateImage()"></select>

  <label for="monthDropdown">Select a month:</label>
  <select id="monthDropdown" onchange="updateImage()">
    <option value="01">Jan</option>
    <option value="02">Feb</option>
    <option value="03">Mar</option>
    <option value="04">Apr</option>
    <option value="05">May</option>
    <option value="06">Jun</option>
    <option value="07">Jul</option>
    <option value="08">Aug</option>
    <option value="09">Sep</option>
    <option value="10">Oct</option>
    <option value="11">Nov</option>
    <option value="12">Dec</option>
  </select>
  <button onclick="changeMonth(1)">Next Month</button>
</div>

<div id="image-display">
  <img id="selectedImage" src="" alt="Selected Image" style="max-width: 100%; display: none;">
  <p id="imageStatus" style="display: none; color: red;">Image unavailable for the selected date.</p>
</div>

<script>
  function populateYears() {
    const yearDropdown = document.getElementById('yearDropdown');
    const currentYear = new Date().getFullYear();
    for (let year = 1982; year <= 2024; year++) {
      let option = document.createElement('option');
      option.value = year;
      option.text = year;
      option.selected = (year === currentYear);
      yearDropdown.appendChild(option);
    }
  }

  function updateImage() {
    var yearDropdown = document.getElementById('yearDropdown');
    var monthDropdown = document.getElementById('monthDropdown');
    var selectedYear = yearDropdown.value;
    var selectedMonth = monthDropdown.value;
    var imagePath = '/XRO_plume/' + selectedYear + '-' + selectedMonth + '.png';

    var img = document.getElementById('selectedImage');
    var status = document.getElementById('imageStatus');

    var testImg = new Image();
    testImg.onload = function() {
      img.src = imagePath;
      img.style.display = 'block';
      status.style.display = 'none';
    };
    testImg.onerror = function() {
      img.style.display = 'none';
      status.style.display = 'block';
    };

    testImg.src = imagePath;
  }

  function setDefaultMonth() {
    const monthDropdown = document.getElementById('monthDropdown');
    const currentDate = new Date();
    const previousMonth = currentDate.getMonth(); // JavaScript months are 0-indexed
    monthDropdown.selectedIndex = previousMonth === 0 ? 11 : previousMonth - 1;
    updateImage();
  }

  function changeMonth(delta) {
    const monthDropdown = document.getElementById('monthDropdown');
    const yearDropdown = document.getElementById('yearDropdown');
    let monthIndex = monthDropdown.selectedIndex + delta;

    if (monthIndex < 0) { // If before January, wrap around to December
      monthIndex = 11;
      changeYear(-1);
    } else if (monthIndex > 11) { // If after December, wrap around to January
      monthIndex = 0;
      changeYear(1);
    }

    monthDropdown.selectedIndex = monthIndex;
    updateImage();
  }

  function changeYear(delta) {
    const yearDropdown = document.getElementById('yearDropdown');
    let yearIndex = yearDropdown.selectedIndex + delta;

    if (yearIndex >= 0 && yearIndex < yearDropdown.options.length) {
      yearDropdown.selectedIndex = yearIndex;
      updateImage();
    }
  }

  window.onload = function() {
    populateYears();
    setDefaultMonth();
  };
</script>


