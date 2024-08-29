---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

linktitle: "Forecast data"
summary: "Climate hindicasts and forecasts using the Extended nonlinear recharge oscillator (XRO) model "
weight: 1

# Page metadata.
title: XRO Niño3.4 monthly forecast data
date: "2024-08-09T00:00:00Z"
lastmod: "2024-08-09T00:00:00Z"
draft: false  # Is this a draft? true/false
toc: false  # Show table of contents? true/false
# type: book  # Do not modify.

# Add menu entry to sidebar.
# - name: Declare this menu item as a parent with ID `name`.
# - weight: Position of link in menu.


---

## 
Deterministic **XRO** forecast in which the stochastic forcing terms are neglected during the integration (See details in Zhao et al. 2024)


<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>


<div id="excel-display"></div>


<script>
  function handleFileSelect() {
    const url = '../XRO_ENSO_fcst.xlsx'; // Replace with the actual path to your Excel file

    fetch(url)
      .then(response => response.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const htmlString = XLSX.utils.sheet_to_html(worksheet);

        document.getElementById('excel-display').innerHTML = htmlString;
      })
      .catch(error => console.error('Error fetching the Excel file:', error));
  }

  window.onload = handleFileSelect;
</script>