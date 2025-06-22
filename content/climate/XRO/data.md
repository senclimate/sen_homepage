---

linktitle: "ENSO Forecast Data"
summary: ""
weight: 1

# Page metadata.
title: "Operational XRO Climate Forecasts"
date: "2024-08-09T00:00:00Z"
lastmod: "2024-08-09T00:00:00Z"
draft: false
toc: true  # Show table of contents? true/false
type: book  # Do not modify.


---

### 📝 XRO Niño3.4 SST anomaly monthly forecast data

Deterministic **XRO** Niño3.4 SST anomaly monthly forecasts (where stochastic forcing terms are excluded during model integration, see [Zhao et al., 2024, Nature](https://rdcu.be/dLZxC) for model formulation and details.)
- Units are in **degrees Celsius (°C)**
- Forecasts are updated monthly

---

<!-- Load SheetJS library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

<!-- Excel Table Container -->
<div id="excel-display" style="margin-top: 1em;"></div>

<!-- Styling for Excel Table -->
<style>
  #excel-display table {
    border-collapse: collapse;
    width: 100%;
    font-family: Arial, sans-serif;
    font-size: 14px;
    margin-top: 1rem;
  }

  #excel-display th, #excel-display td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  #excel-display thead tr th {
    font-weight: bold;
    background-color: #f2f2f2;
  }

  #excel-display tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  #excel-display tbody tr:hover {
    background-color: #f1f1f1;
  }

  #excel-display tbody td:first-child {
    font-weight: bold;
    background-color: #fafafa;
  }
</style>

<!-- Script -->
<script>
  async function handleFileSelect() {
    const url = '../XRO_ENSO_fcst.xlsx';  // Adjust path as needed

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const rawHTML = XLSX.utils.sheet_to_html(worksheet, { header: "", editable: false });
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawHTML, 'text/html');
      const table = doc.querySelector('table');

      // Replace first row with <th>
      const firstRow = table.rows[0];
      const thRow = document.createElement('tr');
      for (let cell of firstRow.cells) {
        const th = document.createElement('th');
        th.innerHTML = cell.innerHTML;
        thRow.appendChild(th);
      }
      table.deleteRow(0);
      const thead = document.createElement('thead');
      thead.appendChild(thRow);
      table.insertBefore(thead, table.firstChild);

      // Reverse tbody row order
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.rows);
      rows.reverse().forEach(row => tbody.appendChild(row));

      // Apply conditional formatting to cells
      for (const row of tbody.rows) {
        for (let i = 1; i < row.cells.length; i++) {
          const cell = row.cells[i];
          const val = parseFloat(cell.textContent);
          if (!isNaN(val)) {
            if (val <= -1.5) {
              cell.style.backgroundColor = '#74c0fc'; // blue
            } else if (val > -1.5 && val <= -0.5) {
              cell.style.backgroundColor = '#d0ebff'; // light blue
            } else if (val >= 0.5 && val < 1.5) {
              cell.style.backgroundColor = '#ffd6d6'; // light red
            } else if (val >= 1.5) {
              cell.style.backgroundColor = '#ff6b6b'; // red
            } else {
              cell.style.backgroundColor = '#ffffff'; // white
            }
          }
        }
      }

      // Display the final table
      document.getElementById('excel-display').appendChild(table);

    } catch (error) {
      console.error('Error loading Excel file:', error);
      document.getElementById('excel-display').innerHTML =
        "<p style='color:red;'>Failed to load forecast data. Please try again later.</p>";
    }
  }

  window.onload = handleFileSelect;
</script>

<p id="last-mod-date" style="font-style: italic; font-size: 0.9em; margin-top: 1em;"></p>

<script>
  async function showExcelLastModified() {
    const url = '../XRO_ENSO_fcst.xlsx';  // Excel file path

    try {
      const response = await fetch(url, { method: 'HEAD' });  // HEAD request only
      if (!response.ok) throw new Error('Network response was not ok');

      const lastMod = response.headers.get('Last-Modified');
      if (lastMod) {
        const date = new Date(lastMod);
        document.getElementById('last-mod-date').textContent = 
          `Forecast data last updated on: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      } else {
        document.getElementById('last-mod-date').textContent = 'Last updated date not available.';
      }
    } catch (error) {
      console.error('Error fetching last-modified header:', error);
      document.getElementById('last-mod-date').textContent = 'Error fetching update date.';
    }
  }

  showExcelLastModified();
</script>


---

### 📝 Notes:
- **Lead = 0 month** corresponds to the observed Niño3.4 anomaly (i.e., the initial condition).
- **Positive leads** (Lead = 1, 2, ...) represent forecast months after initialization.
- Warm anomalies (**El Niño**) and cold anomalies (**La Niña**) are shaded for clarity based on thresholds:
  - **Red**: ≥ +1.5 °C  
  - **Light red**: +0.5 to +1.5 °C  
  - **White**: –0.5 to +0.5 °C  
  - **Light blue**: –1.5 to –0.5 °C  
  - **Blue**: ≤ –1.5 °C
- Forecasts are most reliable within the first few leads (1–6 months), depending on the season and background state.

