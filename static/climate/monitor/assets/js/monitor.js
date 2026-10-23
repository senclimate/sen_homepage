/* Climate Monitor: data-only JSON -> browser-side Plotly figures. */
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('copyright-year');
  if (year) year.textContent = String(new Date().getFullYear());
});

(() => {
  const root = document.getElementById('climate-monitor');
  if (!root) return;
  const daily = root.dataset.frequency === 'day';
  const datasets = root.dataset.datasets.split(',');
  const dataBase = root.dataset.base || '../data/';
  const methodsHref = root.dataset.methodsHref || '../methods/';
  const products = (root.dataset.products || (daily ? 'sst' : 'sst')).split(',');
  const productDatasets = product => product === 'd20' ? ['ORAS5'] : datasets;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monthOptions = months.map((month,index) => `<option value="${index+1}">${month}</option>`).join('');
  const palettes = {
    tab20_distinct: [
      '#941C12','#ff9896','#EF8733','#ffbb78','#bcbd22','#dbdb8d','#c49c94',
      '#e377c2','#f7b6d2','#c5b0d5','#aec7e8','#98df8a','#2ca02c',
      '#9edae5','#17becf','#1f77b4','#8c564b','#9467bd',
      '#7f7f7f','#c7c7c7'
    ],
    tab20: [
      '#1f77b4','#aec7e8','#ff7f0e','#ffbb78','#2ca02c',
      '#98df8a','#d62728','#ff9896','#9467bd','#c5b0d5',
      '#8c564b','#c49c94','#e377c2','#f7b6d2','#7f7f7f',
      '#c7c7c7','#bcbd22','#dbdb8d','#17becf','#9edae5'
    ],
    tab20b: [
      '#393b79','#5254a3','#6b6ecf','#9c9ede','#637939',
      '#8ca252','#b5cf6b','#cedb9c','#8c6d31','#bd9e39',
      '#e7ba52','#e7cb94','#843c39','#ad494a','#d6616b',
      '#e7969c','#7b4173','#a55194','#ce6dbd','#de9ed6'
    ],
    tab20c: [
      '#3182bd','#6baed6','#9ecae1','#c6dbef','#e6550d',
      '#fd8d3c','#fdae6b','#fdd0a2','#31a354','#74c476',
      '#a1d99b','#c7e9c0','#756bb1','#9e9ac8','#bcbddc',
      '#dadaeb','#636363','#969696','#bdbdbd','#d9d9d9'
    ],
    original: ['#B2182B','#2166AC','#E69F00','#7A5AA6','#009E73','#D55E00','#0072B2','#CC79A7'],
    tableau: ['#4E79A7','#F28E2B','#E15759','#76B7B2','#59A14F','#EDC948','#B07AA1','#FF9DA7','#9C755F','#BAB0AC'],
    vibrant: ['#E41A1C','#377EB8','#4DAF4A','#984EA3','#FF7F00','#A65628','#F781BF','#999999'],
    dark: ['#1B9E77','#D95F02','#7570B3','#E7298A','#66A61E','#E6AB02','#A6761D','#666666'],
    pastel: ['#8DD3C7','#FDB462','#B3DE69','#FCCDE5','#80B1D3','#FB8072','#BC80BD','#CCEBC5'],
    cool: ['#0072B2','#009E73','#56B4E9','#332288','#44AA99','#88CCEE','#117733','#6699CC']
  };
  const state = {
    product:products[0],dataset:datasets[0],index:'Nino34',mode:'raw',view:'seasonal',
    method:'noaa',phase:'all',strength:'All',classificationDataset:datasets[0],palette:'tab20_distinct',
    highlighted:new Set(),filter:'all',yearSpan:2,windowPreset:'24',
    startMonth:1,endMonth:12,endYearOffset:1,
    indices:['sst:OISSTv2:Nino34']
  };
  const panelConfigs = new Map([['sst:OISSTv2:Nino34',{id:'sst:OISSTv2:Nino34',product:'sst',dataset:'OISSTv2',index:'Nino34'}]]);
  const panelSources = new Map();
  const palette = palettes[state.palette].slice();
  // Assign colors on selection, not while plotting. Existing assignments never shift.
  const highlightColors = new Map();
  let nextColorIndex = 0;
  function yearColor(year) {
    if (!highlightColors.has(year)) {
      highlightColors.set(year, palette[nextColorIndex % palette.length]);
      nextColorIndex++;
    }
    return highlightColors.get(year);
  }
  function selectYear(year) {
    if (state.highlighted.has(year)) return;
    state.highlighted.add(year);
    yearColor(year);
  }
  function unselectYear(year) {
    state.highlighted.delete(year);
    highlightColors.delete(year);
  }
  function clearYears() {
    state.highlighted.clear();
    highlightColors.clear();
    nextColorIndex = 0;
  }
  function applyPalette(name) {
    // Keep existing year colors unchanged; new selections use the new palette.
    palette.splice(0, palette.length, ...(palettes[name] || palettes.tab20_distinct));
    nextColorIndex = 0;
    draw();
  }
  const cache = new Map();
  const option = (value, label=value) => `<option value="${value}">${label}</option>`;
  root.innerHTML = `
    <div class="cm-workspace">
      <aside class="cm-sidebar" aria-label="Climate Monitor controls">
        <div class="cm-sidebar-head">
          <div class="cm-kicker">Panel Control</div>
          <h3>Data &amp; display</h3>
          <p class="cm-sidebar-intro">Choose a dataset, index, and display mode to explore the latest climate signal.</p>
        </div>
        <div class="cm-control-group">
          <div class="cm-toolbar">
            ${products.length>1?`<label>Data product<select id="cm-product">${products.map(p=>option(p,p==='sst'?'SST indices':p==='d20'?'ORAS5 D20 / WWV':p)).join('')}</select></label>`:''}
            <label>Dataset<select id="cm-dataset">${productDatasets(state.product).map(d=>option(d)).join('')}</select></label>
            <label>Top climate index<select id="cm-index"></select></label>
            <label>Data mode<select id="cm-mode">${(daily
              ?[['raw','Raw SST'],['anomaly','Daily anomaly'],['anomaly_5day','5-day running anomaly'],['climatology','Daily climatology']]
              :[['raw','Raw SST'],['anomaly','Anomaly'],['detrended','Detrended anomaly'],['seasonal_cycle','Seasonal cycle']]
            ).map(x=>option(...x)).join('')}</select></label>
            <label>Chart view<select id="cm-view">${[['seasonal','Year-by-year'],['timeline','Historical timeline']].map(x=>option(...x)).join('')}</select></label>
            <label>Year span<select id="cm-year-span">${(daily
              ?[['1','12 months (Jan–Dec)'],['2','24 months (Jan–Dec +1)']]
              :[['12','Jan to Dec (12 months)'],['24','Jan to next Dec (24 months)'],['jun-dec-next','Jun to next Dec (19 months)'],['custom','Custom range']]
            ).map(x=>option(...x)).join('')}</select></label>
            <div id="cm-custom-window" ${daily?'hidden':''}>
              <label>Start month<select id="cm-start-month">${monthOptions}</select></label>
              <label>End month<select id="cm-end-month">${monthOptions}</select></label>
              <label>End year<select id="cm-end-year">${[['0','Same year'],['1','Next year']].map(x=>option(...x)).join('')}</select></label>
            </div>
            <label>Highlight colors<select id="cm-palette">${[
              ['tab20_distinct','Tab20 Distinct (20)'],['tab20','Matplotlib Tab20 (20)'],
              ['tab20b','Matplotlib Tab20b (20)'],['tab20c','Matplotlib Tab20c (20)'],
              ['tableau','Tableau (10)'],['original','Original (8)'],
              ['vibrant','Vibrant (8)'],['dark','Dark (8)'],
              ['pastel','Pastel (8)'],['cool','Cool (8)']
            ].map(x=>option(...x)).join('')}</select></label>
            <div id="cm-palette-preview" class="cm-palette-preview" aria-label="Palette color preview"></div>
          </div>
        </div>
        <a id="cm-download" class="cm-download cm-sidebar-download" download aria-label="Download JSON">
          <span class="cm-download-icon" aria-hidden="true">↓</span>
          <span>Download JSON</span>
        </a>

      </aside>

      <main class="cm-main">
        <div id="cm-status" role="status"></div>
        <div id="cm-panels" class="cm-panels" aria-label="Climate index panels"></div>
        <div class="cm-panel-actions">
          <label>Panel product<select id="cm-add-product">${products.map(p=>option(p,p==='sst'?'SST indices':p==='d20'?'ORAS5 D20 / WWV':p)).join('')}</select></label>
          <label>Panel dataset<select id="cm-add-dataset"></select></label>
          <label>Panel index<select id="cm-add-index" aria-label="Index to add"></select></label>
          <button type="button" id="cm-add-panel">+ Add panel</button>
        </div>
      </main>
      <aside class="cm-year-sidebar" aria-label="Highlighted year controls">
          <div class="cm-control-group cm-year-panel" id="cm-year-panel">
            <h3>Highlight years</h3>
            <button type="button" class="cm-mobile-toggle" id="cm-years-toggle" aria-expanded="false" aria-controls="cm-year-panel">Show year controls</button>
            <p class="cm-sub">Click a curve or choose years below</p>
            <div class="cm-year-legend" aria-label="Year classification legend"><span><i class="cm-legend-swatch cm-legend-neutral"></i>Neutral</span><span><i class="cm-legend-swatch cm-legend-el-nino"></i>El Niño</span><span><i class="cm-legend-swatch cm-legend-la-nina"></i>La Niña</span></div>
            <div class="cm-toolbar cm-enso-toolbar">
              <label>ENSO phase<select id="cm-phase">${[['all','All years'],['el_nino','El Niño'],['la_nina','La Niña']].map(x=>option(...x)).join('')}</select></label>
              <label>Event strength<select id="cm-strength">${['All','Weak','Moderate','Strong','Very Strong'].map(x=>option(x)).join('')}</select></label>
              <label>Classification<select id="cm-method">${[['noaa','NOAA running climatology'],['detrend','Quadratic detrend + 21-year climatology']].map(x=>option(...x)).join('')}</select></label>
              <label>Highlight dataset<select id="cm-classification-dataset">${datasets.map(d=>option(d)).join('')}</select></label>
              <label>Find year<input id="cm-search" inputmode="numeric" placeholder="e.g. 1997" /></label>
            </div>
            <div class="cm-actions">
              <button type="button" id="cm-highlight-filtered">Highlight filtered</button>
              <button type="button" id="cm-recent">Last 5 years</button>
              <button type="button" id="cm-clear">Clear</button>
            </div>
            <div id="cm-count" aria-live="polite"></div>
            <div id="cm-years" class="cm-years" aria-label="Select years"></div>
            <p class="cm-note">ENSO classifications depend on the selected dataset (<a href="${methodsHref}#enso-event-classification">See Methods</a>).</p>
          </div>
      </aside>
    </div>`;
  const el = id => root.querySelector('#'+id);
  const mobileQuery = window.matchMedia('(max-width: 760px)');
  let lastMobileLayout = mobileQuery.matches;
  function setMobilePanel(panel, button, open) {
    panel.classList.toggle('cm-mobile-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'Hide year controls' : 'Show year controls';
    if (mobileQuery.matches) {
      panel.querySelectorAll(':scope > :not(h3):not(.cm-mobile-toggle)')
        .forEach(child => { child.hidden = !open; });
    }
  }
  function initializeMobilePanels() {
    const years = el('cm-year-panel');
    const yearsButton = el('cm-years-toggle');
    if (!years || !yearsButton) return;
    setMobilePanel(years, yearsButton, false);
  }
  function resizePlots() {
    root.querySelectorAll('.cm-index-plot').forEach(plot => {
      if (window.Plotly && plot.data) window.Plotly.Plots.resize(plot);
    });
  }
  function refreshAfterMobileToggle() {
    requestAnimationFrame(() => {
      resizePlots();
      requestAnimationFrame(resizePlots);
    });
  }
  initializeMobilePanels();
  el('cm-years-toggle').addEventListener('click', () => {
    const button = el('cm-years-toggle');
    setMobilePanel(el('cm-year-panel'), button, button.getAttribute('aria-expanded') !== 'true');
    refreshAfterMobileToggle();
  });
  window.addEventListener('resize', () => {
    const isMobile = mobileQuery.matches;
    if (isMobile !== lastMobileLayout) {
      lastMobileLayout = isMobile;
      draw();
    } else {
      resizePlots();
    }
  });
  const setStatus = s => {el('cm-status').textContent = s;};
  const getURL = () => `${dataBase}${state.dataset}_${daily?'day_ssti':state.product==='d20'?'mon_d20i':'mon_ssti'}.json`;
  const getClassificationURL = () => `${dataBase}${state.classificationDataset}_classify_enso.json`;
  const dataURL = (product,dataset) => `${dataBase}${dataset}_${daily?'day_ssti':product==='d20'?'mon_d20i':'mon_ssti'}.json`;
  async function getData(product=state.product,dataset=state.dataset) {
    const url = dataURL(product,dataset);
    if (!cache.has(url)) {
      const response = await fetch(url);
      if (!response.ok) throw Error(`${response.status} loading ${url}. Generate JSON first.`);
      cache.set(url, await response.json());
    }
    return cache.get(url);
  }
  const panelId = (product,dataset,index) => `${product}:${dataset}:${index}`;
  const panelConfig = id => panelConfigs.get(id);
  const panelSource = id => panelSources.get(id) || json;
  async function getClassification(dataset=state.classificationDataset) {
    const url = `${dataBase}${dataset}_classify_enso.json`;
    if (!cache.has(url)) {
      const response = await fetch(url);
      if (!response.ok) throw Error(`${response.status} loading ${url}. Generate ENSO classifications first.`);
      cache.set(url, await response.json());
    }
    return cache.get(url);
  }
  let json;
  let classification;
  let dailyDatesByYear = new Map();
  const plotClickAttached = new WeakSet();
  let selectionInitialized = false;
  const allYears = (source=json) => [...new Set(source.time.map(d=>Number(d.slice(0,4))))].sort((a,b)=>a-b);
  function indexDailyDates() {
    dailyDatesByYear = new Map();
    if (!daily) return;
    for (const date of json.time) {
      const year = Number(date.slice(0,4));
      const month = Number(date.slice(5,7));
      const day = Number(date.slice(8,10));
      const dayIndex = dayOfYear(month,day);
      if (dayIndex < 0) continue;
      if (!dailyDatesByYear.has(year)) dailyDatesByYear.set(year,Array(365).fill(null));
      dailyDatesByYear.get(year)[dayIndex] = date;
    }
  }
  function dailyHoverDates(year) {
    const dates = Array(365 * state.yearSpan).fill(null);
    for (let offset=0; offset<state.yearSpan; offset++) {
      const yearDates = dailyDatesByYear.get(year+offset);
      if (!yearDates) continue;
      yearDates.forEach((date,day)=>{ dates[offset*365+day]=date; });
    }
    return dates;
  }
  const phaseEvents = () => classification?.methods?.[state.method]?.[state.phase] || null;
  const eventRecords = () => phaseEvents()?.events || [];
  const eventForYear = year => {
    const method = classification?.methods?.[state.method];
    for (const phase of ['el_nino','la_nina']) {
      const phaseData = method?.[phase];
      const record = phaseData?.events?.find(event => Number(event.start_winter) === year);
      if (record) return { ...record, phase };
      if (phaseData?.years?.some(eventYear => Number(eventYear) === year)) {
        return { start_winter:year, phase };
      }
    }
    return null;
  };
  const isClimatologyMode = () => daily
    ? state.mode === 'climatology'
    : state.mode === 'seasonal_cycle';
  const formatUnits = units => units === 'degC' ? '°C' : (units || '');
  const metadataFor = (source,index) => source.metadata.variables?.[index]
    || source.metadata.index_definitions?.[index] || {};
  const unitsFor = (source,index) => formatUnits(metadataFor(source,index).units);
  function wrapAxisTitle(text, maxLength=42) {
    const words = text.split(' ');
    const lines = [];
    let line = '';
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (line && next.length > maxLength) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    if (line) lines.push(line);
    return lines.join('<br>');
  }
  function filteredYears() {
    const years = allYears();
    if (state.phase === 'all' || !classification) return years;
    return years.filter(year => eventRecords().some(event => {
      if (Number(event.start_winter) !== year) return false;
      if (state.strength !== 'All' && event.strength !== state.strength) return false;
      return true;
    }));
  }
  function renderYears() {
    const available = new Set(filteredYears());
    const search = el('cm-search').value.trim();
    const years = allYears().reverse().filter(y => available.has(y) && String(y).includes(search));
    const eventKind = year => {
      const event = eventForYear(year);
      if (event?.phase === 'el_nino') return 'el-nino';
      if (event?.phase === 'la_nina') return 'la-nina';
      return 'neutral';
    };
    el('cm-years').innerHTML = years.map(y=>{
      const active=state.highlighted.has(y);
      const event=eventForYear(y);
      const strength=event?.strength;
      return `<button type="button" class="cm-year cm-year-${eventKind(y)} ${active?'selected':''}" data-year="${y}" aria-pressed="${active}" title="${strength||'Neutral year · click to highlight'}">${y}</button>`;
    }).join('') || '<span class="cm-note">No matching years</span>';
    el('cm-count').textContent = `${state.highlighted.size} highlighted · ${years.length} listed`;
  }
  function seriesByYear(source,index, mode) {
    const data = source.data[index]?.[mode];
    if (!data) return new Map();
    const byYear = new Map();
    source.time.forEach((date,i)=>{
      const yr = Number(date.slice(0,4));
      const month = Number(date.slice(5,7));
      const day = daily ? Number(date.slice(8,10)) : 1;
      const idx = daily ? dayOfYear(month,day) : month-1;
      if (idx < 0) return;
      if (!byYear.has(yr)) byYear.set(yr, Array(daily?365:12).fill(null));
      byYear.get(yr)[idx] = data[i];
    });
    return byYear;
  }
  function dayOfYear(month,day) {
    if (month===2 && day===29) return -1;
    const d = Date.UTC(2001,month-1,day)-Date.UTC(2001,0,1);
    return Math.round(d/86400000);
  }
  function windowMonths() {
    const start = state.startMonth - 1;
    const end = state.endYearOffset * 12 + state.endMonth - 1;
    return Array.from({length:end-start+1},(_,offset)=>{
      const monthOffset = start + offset;
      return {month:monthOffset%12,yearOffset:Math.floor(monthOffset/12)};
    });
  }
  function setWindowPreset(preset) {
    state.windowPreset = preset;
    if (preset === '12') {
      state.startMonth=1;state.endMonth=12;state.endYearOffset=0;
    } else if (preset === '24') {
      state.startMonth=1;state.endMonth=12;state.endYearOffset=1;
    } else if (preset === 'jun-dec-next') {
      state.startMonth=6;state.endMonth=12;state.endYearOffset=1;
    }
    el('cm-custom-window').hidden = preset !== 'custom';
    el('cm-start-month').value=String(state.startMonth);
    el('cm-end-month').value=String(state.endMonth);
    el('cm-end-year').value=String(state.endYearOffset);
    const sameYearOption = el('cm-end-year').querySelector('option[value="0"]');
    sameYearOption.disabled=state.endMonth<state.startMonth;
    if (sameYearOption.disabled && state.endYearOffset===0) {
      state.endYearOffset=1;
      el('cm-end-year').value='1';
    }
  }
  // Collect complete calendar years once. A year may be incomplete, including the latest year.
  function yearCurves(source,index, mode) {
    const byYear = seriesByYear(source,index, mode);
    const monthsInWindow = daily ? [] : windowMonths();
    const pointsPerYear = daily ? 365 : monthsInWindow.length;
    const length = daily ? pointsPerYear * state.yearSpan : pointsPerYear;
    const result = new Map();
    for (const year of allYears(source)) {
      const y = Array(length).fill(null);
      if (daily) {
        for (let offset = 0; offset < state.yearSpan; offset++) {
          const source = byYear.get(year + offset);
          if (source) y.splice(offset * pointsPerYear, pointsPerYear, ...source);
        }
      } else {
        monthsInWindow.forEach(({month,yearOffset},i)=>{
          y[i] = byYear.get(year+yearOffset)?.[month] ?? null;
        });
      }
      result.set(year, y);
    }
    return result;
  }
  function makeTraces(source,index) {
    const mode = state.mode;
    const monthsInWindow = daily ? [] : windowMonths();
    const pointsPerYear = daily ? 365 : monthsInWindow.length;
    const pointCount = daily ? pointsPerYear * state.yearSpan : pointsPerYear;
    const units = unitsFor(source,index);
    const xs = Array.from({length:pointCount}, (_,i) => i+1);
    const clim = source.climatology[index] || [];
    const repeatedClim = daily
      ? Array.from({length:state.yearSpan},()=>clim).flat()
      : monthsInWindow.map(({month})=>clim[month]);
    if (isClimatologyMode()) {
      return [{type:'scatter',mode:'lines',name:`${source.metadata.climatology_period} climatology`,x:xs.slice(0,repeatedClim.length),y:repeatedClim,
        line:{color:'#B2182B',width:3},hovertemplate:`%{y:.2f} ${units}<extra>Climatology</extra>`}];
    }
    const map = yearCurves(source,index, mode);
    const bg = [], fg = [];
    for (const [year,y] of map) {
      const active = state.highlighted.has(year);
      const color = active ? yearColor(year) : null;
      const trace = {type:'scatter',mode:'lines',name:String(year),x:xs,y,
        meta:{year,kind:'year'},showlegend:active,connectgaps:false,
        line:{color:active?color:'#b7c1ca',width:active?3.3:1.15},
        opacity:active?1:0.4,
        ...(daily?{customdata:dailyHoverDates(year)}:{}),
        hovertemplate:daily
          ?`%{customdata}<br>%{y:.2f} ${units}<extra></extra>`
          :`${year} · %{x}<br>%{y:.2f} ${units}<extra></extra>`};
      (active?fg:bg).push(trace);
    }
    if (mode === 'raw') {
      bg.push({type:'scatter',mode:'lines',name:'Climatology',showlegend:true,
        x:xs.slice(0,repeatedClim.length),y:repeatedClim,
        line:{color:'#333',width:2,dash:'dash'}});
    }
    return [...bg,...fg];
  }
  function timelineTraces(source,index) {
    if (isClimatologyMode()) return makeTraces(source,index);
    const values=source.data[index]?.[state.mode]||[];
    const units = unitsFor(source,index);
    const base={type:'scatter',mode:'lines',name:'Historical record',x:source.time,y:values,
      ...(daily?{customdata:source.time}:{}),
      meta:{kind:'timeline'},
      line:{color:'#66758A',width:1.7},
      hovertemplate:daily?`%{customdata}<br>%{y:.2f} ${units}<extra></extra>`:`%{x}<br>%{y:.2f} ${units}<extra></extra>`};
    const selected=[...state.highlighted];
    return [base,...selected.map((year,i)=>({type:'scatter',mode:'markers',name:String(year),
      meta:{year,kind:'year'},showlegend:true,
      x:source.time.filter(t=>Number(t.slice(0,4))===year),
      y:values.filter((_,j)=>Number(source.time[j].slice(0,4))===year),
      marker:{color:yearColor(year),size:6},
      hovertemplate:`%{x}<br>%{y:.2f} ${units}<extra></extra>`}))];
  }
  function latestPointTrace(source,index,seasonal) {
    if (isClimatologyMode()) return null;
    const values = source.data[index]?.[state.mode] || [];
    let sourceIndex = -1;
    for (let i = Math.min(values.length,source.time.length) - 1; i >= 0; i--) {
      if (values[i] !== null && Number.isFinite(values[i])) {
        sourceIndex = i;
        break;
      }
    }
    if (sourceIndex < 0) return null;

    const date = source.time[sourceIndex];
    const value = values[sourceIndex];
    const units = unitsFor(source,index);
    const latestYear = Number(date.slice(0,4));
    // Show the latest marker only while its year is highlighted.
    if (!state.highlighted.has(latestYear)) return null;
    const markerColor = yearColor(latestYear);
    let x = date;
    if (seasonal) {
      const [year,month,day] = date.split('-').map(Number);
      if (daily) {
        x = dayOfYear(month,day) + 1;
      } else {
        const monthOffset = windowMonths().findIndex(item => item.month === month - 1 && item.yearOffset === 0);
        if (monthOffset < 0) return null;
        x = monthOffset + 1;
      }
    }
    const textPosition = seasonal && typeof x === 'number'
      ? (x > (daily ? 365 * state.yearSpan : windowMonths().length) * 0.65
        ? 'middle left' : 'middle right')
      : 'middle left';
    return {
      type:'scatter',mode:'markers+text',name:'Latest observation',showlegend:false,
      x:[x],y:[value],text:[`${date}<br>${value.toFixed(2)} ${units}`],
      textposition:textPosition,cliponaxis:true,
      marker:{color:markerColor,size:9,line:{color:'#fff',width:1.5}},
      textfont:{family:'Arial, sans-serif',size:11,color:markerColor},
      hovertemplate:`${date}<br>%{y:.2f} ${units}<extra>Latest observation</extra>`
    };
  }
  async function downloadTightSvg(graph,filename,header={},padding=8) {
    const dataUrl=await Plotly.toImage(graph,{format:'svg'});
    const svgText=await fetch(dataUrl).then(response=>response.text());
    const svgDocument=new DOMParser().parseFromString(svgText,'image/svg+xml');
    const svg=svgDocument.documentElement;
    if (svg.querySelector('parsererror')) throw new Error('Plotly returned an invalid SVG');

    // SVG getBBox() only works reliably while the image is in the document.
    const measuringHost=document.createElement('div');
    Object.assign(measuringHost.style,{
      position:'fixed',left:'-100000px',top:'0',visibility:'hidden',pointerEvents:'none'
    });
    const measuringSvg=document.importNode(svg,true);
    measuringHost.appendChild(measuringSvg);
    document.body.appendChild(measuringHost);

    try {
      const canvasWidth=measuringSvg.width.baseVal.value;
      const canvasHeight=measuringSvg.height.baseVal.value;
      const isCanvasBackground=rect=>
        Number(rect.getAttribute('x')||0)===0 &&
        Number(rect.getAttribute('y')||0)===0 &&
        Math.abs(Number(rect.getAttribute('width'))-canvasWidth)<1 &&
        Math.abs(Number(rect.getAttribute('height'))-canvasHeight)<1;

      // Ignore Plotly's full-page paper rectangle when measuring visible content.
      [...measuringSvg.querySelectorAll(':scope > rect')]
        .filter(isCanvasBackground)
        .forEach(rect=>{ rect.style.display='none'; });

      const box=measuringSvg.getBBox();
      const x=box.x-padding;
      const y=box.y-padding;
      const width=box.width+padding*2;
      const headerHeight=header.title ? 40 : 0;
      const height=box.height+padding*2+headerHeight;
      if (!(width>0 && height>0)) throw new Error('Unable to measure SVG contents');

      const croppedY=y-headerHeight;
      svg.setAttribute('viewBox',`${x} ${croppedY} ${width} ${height}`);
      svg.setAttribute('width',width);
      svg.setAttribute('height',height);

      // Keep the white paper background, but crop it to the new canvas.
      [...svg.querySelectorAll(':scope > rect')]
        .filter(isCanvasBackground)
        .forEach(rect=>{
          rect.setAttribute('x',x);
          rect.setAttribute('y',croppedY);
          rect.setAttribute('width',width);
          rect.setAttribute('height',height);
        });

      if (header.title) {
        const svgNs='http://www.w3.org/2000/svg';
        const group=document.createElementNS(svgNs,'g');
        const title=document.createElementNS(svgNs,'text');
        title.setAttribute('x',String(x+width/2));
        title.setAttribute('y',String(y-23));
        title.setAttribute('text-anchor','middle');
        title.setAttribute('font-family','Arial, sans-serif');
        title.setAttribute('font-size','17');
        title.setAttribute('font-weight','700');
        title.setAttribute('fill','#263746');
        title.textContent=header.title;
        group.appendChild(title);

        const metadata=document.createElementNS(svgNs,'text');
        metadata.setAttribute('x',String(x+width/2));
        metadata.setAttribute('y',String(y-8));
        metadata.setAttribute('text-anchor','middle');
        metadata.setAttribute('font-family','Arial, sans-serif');
        metadata.setAttribute('font-size','12');
        metadata.setAttribute('fill','#718094');
        const dataset=document.createElementNS(svgNs,'tspan');
        dataset.setAttribute('font-weight','700');
        dataset.textContent=header.dataset;
        metadata.appendChild(dataset);
        metadata.appendChild(document.createTextNode(` · Data coverage: ${header.coverage} · Climatology period: ${header.climatology}`));
        group.appendChild(metadata);
        svg.insertBefore(group,svg.firstChild);
      }
    } finally {
      measuringHost.remove();
    }

    const output=new XMLSerializer().serializeToString(svgDocument);
    const blobUrl=URL.createObjectURL(new Blob([output],{type:'image/svg+xml;charset=utf-8'}));
    const link=document.createElement('a');
    link.href=blobUrl;
    link.download=`${filename}.svg`;
    link.click();
    setTimeout(()=>URL.revokeObjectURL(blobUrl),1000);
  }
  function draw() {
    if (!json || !window.Plotly) return;
    const mobile = mobileQuery.matches;
    const seasonal=state.view==='seasonal'||isClimatologyMode();
    root.dataset.view = seasonal ? 'seasonal' : 'timeline';
    const perYear = daily ? 365 : 12;
    const span = state.yearSpan;
    const monthsInWindow = daily ? [] : windowMonths();
    const pointCount = daily ? perYear * span : monthsInWindow.length;
    const windowRevision = daily
      ? `daily-${span}`
      : `monthly-${state.startMonth}-${state.endMonth}-${state.endYearOffset}`;
    const tickvals = daily
      ? Array.from({length:span},(_,y)=>[1,32,60,91,121,152,182,213,244,274,305,335].map(v=>v+y*365)).flat()
      : Array.from({length:pointCount},(_,i)=>i+1);
    const ticktext = daily
      ? Array.from({length:span},(_,y)=>months.map(m=>y?`${m} +${y}`:m)).flat()
      : monthsInWindow.map(({month,yearOffset})=>yearOffset?`${months[month]} +${yearOffset}`:months[month]);
    const container = el('cm-panels');
    // Keep the same plot DOM nodes across redraws so Plotly events stay attached.
    const existing = new Map([...container.querySelectorAll('.cm-index-panel')]
      .map(panel => [panel.dataset.index, panel]));
    const ordered = [];
    for (const id of state.indices) {
      let panel = existing.get(id);
      if (!panel) {
        panel = document.createElement('section');
        panel.className = 'cm-index-panel';
        panel.dataset.index = id;
        panel.innerHTML = `<div class="cm-index-plot"></div>
          <div class="cm-index-panel-foot">
            <button type="button" class="cm-remove-panel" aria-label="Remove panel">− Remove</button>
          </div>`;
      }
      panel.querySelector('.cm-remove-panel').disabled = state.indices.length === 1;
      ordered.push(panel);
    }
    container.replaceChildren(...ordered);
    for (const id of state.indices) {
      const config = panelConfig(id);
      const source = panelSource(id);
      const index = config.index;
      const plot = container.querySelector(`.cm-index-panel[data-index="${id}"] .cm-index-plot`);
      const variable = metadataFor(source,index);
      const indexName = variable.long_name || source.metadata.index_names?.[index] || index;
      const datasetName = source.metadata.dataset || config.dataset;
      const coverage = `${source.time[0]} – ${source.time.at(-1)}`;
      const climatology = source.metadata.climatology_period || '1991-2020';
      const units = variable.units ? ` (${variable.units})` : '';
      const quantity = variable.kind === 'SST' ? 'Temperature'
        : variable.kind === 'WWV' ? 'WWV'
        : variable.kind === 'windstress' ? 'Wind stress'
        : indexName;
      const modeQuantity = state.mode === 'raw' ? quantity
        : state.mode === 'detrended' ? `${quantity} detrended anomaly`
        : isClimatologyMode() ? `${quantity} climatology`
        : `${quantity} anomaly`;
      const traces = seasonal ? makeTraces(source,index) : timelineTraces(source,index);
      const latestTrace = latestPointTrace(source,index,seasonal);
      if (latestTrace) traces.push(latestTrace);
      const layout={template:'plotly_white',autosize:true,
        height:mobile?(daily?500:(seasonal?520:500)):(daily?460:(seasonal?480:460)),
        margin:mobile?{l:58,r:8,t:58,b:96}:{l:105,r:28,t:76,b:145},
        paper_bgcolor:'#fff',plot_bgcolor:'#fff',
        font:{family:'Arial, sans-serif',size:mobile?11:13,color:'#263746'},
        title:{text:`<b>${indexName}</b>`,
          x:0.5,xref:'container',y:0.93,yref:'container',
          xanchor:'center',yanchor:'top',font:{family:'Arial, sans-serif',size:mobile?14:17,color:'#263746'}},
        xaxis:seasonal?{
          title:{text:daily
            ?(span===2?'Month (Year 0 → Year +1)':'Day of year')
            :`Month (${months[monthsInWindow[0].month]} Year 0 → ${months[monthsInWindow.at(-1).month]} Year +${monthsInWindow.at(-1).yearOffset})`,
            font:{family:'Arial, sans-serif',size:mobile?11:14,color:'#34495A'},standoff:mobile?10:18},
          tickmode:'array',tickvals,ticktext,tickangle:pointCount>12?-50:0,
          tickfont:{family:'Arial, sans-serif',size:mobile?9:12,color:'#526170'},
          range:[0.5,pointCount+0.5],gridcolor:'#EEF1F4',gridwidth:0.7,automargin:true,
          ticks:'outside',ticklen:5,tickwidth:1.2,tickcolor:'#536575',
          showline:true,linecolor:'#536575',linewidth:1.4,mirror:false}:
          {title:{text:'Year',font:{family:'Arial, sans-serif',size:mobile?11:14,color:'#34495A'},standoff:mobile?10:18},
            type:'date',tickfont:{family:'Arial, sans-serif',size:mobile?9:12,color:'#526170'},
            gridcolor:'#EEF1F4',gridwidth:0.7,automargin:true,
            ticks:'outside',ticklen:5,tickwidth:1.2,tickcolor:'#536575',
            showline:true,linecolor:'#536575',linewidth:1.4,mirror:false},
        yaxis:{title:{text:wrapAxisTitle(`${modeQuantity}${units}`, mobile?30:42),
            font:{family:'Arial, sans-serif',size:mobile?11:14,color:'#34495A'},standoff:mobile?7:14},
          tickfont:{family:'Arial, sans-serif',size:mobile?9:12,color:'#526170'},
          automargin:true,gridcolor:'#E7EBEF',gridwidth:0.8,
          zeroline:true,zerolinecolor:'#7D8995',zerolinewidth:1.2,
          ticks:'outside',ticklen:5,tickwidth:1.2,tickcolor:'#536575',
          showline:true,linecolor:'#536575',linewidth:1.4,mirror:false},
        shapes:seasonal&&(daily?span===2:monthsInWindow.some(item=>item.yearOffset>0))?[{type:'line',xref:'x',yref:'paper',
          x0:daily?perYear+0.5:monthsInWindow.findIndex(item=>item.yearOffset>0)+0.5,
          x1:daily?perYear+0.5:monthsInWindow.findIndex(item=>item.yearOffset>0)+0.5,y0:0,y1:1,
          line:{color:'#A7B2BF',width:1,dash:'dot'}}]:[],
        legend:{orientation:'h',x:0,xanchor:'left',y:mobile?-0.28:-0.32,yanchor:'top',maxheight:0.2,
          font:{size:mobile?9:12,color:'#34495A'},bgcolor:'rgba(255,255,255,0)',borderwidth:0},
        annotations:[{text:`<b>${datasetName}</b> · Data coverage: ${coverage} · Climatology period: ${climatology}`,
          x:0.5,xref:'paper',y:1.01,yref:'paper',xanchor:'center',yanchor:'bottom',
          showarrow:false,align:'center',bgcolor:'rgba(255,255,255,.78)',borderpad:3,
          font:{family:'Arial, sans-serif',size:mobile?9:12,color:'#718094'}},
          {text:'Image credit: Sen Zhao, SOEST, University of Hawaiʻi at Mānoa',
          x:0.99,xref:'paper',y:0.01,yref:'paper',xanchor:'right',yanchor:'bottom',
          showarrow:false,align:'right',bgcolor:'rgba(255,255,255,.78)',borderpad:3,
          font:{family:'Arial, sans-serif',size:mobile?8:10,color:'#7A8794'}}],
        hovermode:'closest',
        datarevision:`${state.mode}-${state.view}-${Date.now()}`,
        uirevision:`${config.product}-${config.dataset}-${index}-${state.mode}-${state.view}-${windowRevision}`};
      Plotly.react(plot,traces,layout,
        {responsive:true,displaylogo:false,showSendToCloud:false,
          toImageButtonOptions:{format:'png',scale:3,filename:`ClimateMonitor_${config.dataset}_${index}_${state.mode}`},
          modeBarButtonsToRemove:[
            'select2d','lasso2d','zoomIn2d','zoomOut2d','autoScale2d',
            'toggleSpikelines','hoverClosestCartesian','hoverCompareCartesian',
          ],
          modeBarButtonsToAdd:[{
            name:'downloadSvg',title:'Download SVG',
            icon:{width:1000,height:1000,path:'M450 100h100v350h150L500 650 300 450h150V100z M200 750h600v100H200z'},
            click:graph=>downloadTightSvg(graph,`ClimateMonitor_${config.dataset}_${index}_${state.mode}`)
              .catch(error=>console.error('SVG download failed:',error))
          }]})
        .then(() => {
          if (plotClickAttached.has(plot)) return;
          plot.on('plotly_click', event => {
            const point = event.points?.[0];
            if (!point || isClimatologyMode()) return;
            const trace = point.data;
            let year = Number(trace.meta?.year);
            if (trace.meta?.kind === 'timeline') {
              year = Number(String(point.x).slice(0, 4));
            } else if (trace.meta?.kind !== 'year') return;
            if (!Number.isInteger(year) || !allYears().includes(year)) return;
            toggleHighlight(year);
          });
          plot.on('plotly_legendclick', event => {
            const trace = event.data || plot.data[event.curveNumber];
            const year = Number(trace?.meta?.year);
            if (trace?.meta?.kind !== 'year' || !Number.isInteger(year)) return;
            toggleHighlight(year);
            return false;
          });
          plotClickAttached.add(plot);
        })
        .catch(error => console.error('Plotly rendering error:', error));
    }
  }
  async function addPanel(product,dataset,index) {
    const id = panelId(product,dataset,index);
    if (state.indices.includes(id)) return;
    const source = await getData(product,dataset);
    panelConfigs.set(id,{id,product,dataset,index});
    panelSources.set(id,source);
    state.indices.push(id);
    syncPanelControls();
    draw();
  }
  async function syncPanelControls() {
    const addProduct = el('cm-add-product')?.value || state.product;
    const availableDatasets = productDatasets(addProduct);
    const addDataset = el('cm-add-dataset');
    const previousDataset = addDataset?.value;
    const selectedDataset = availableDatasets.includes(previousDataset)
      ? previousDataset : availableDatasets[0];
    if (addDataset) {
      addDataset.innerHTML = availableDatasets.map(dataset=>option(dataset)).join('');
      addDataset.value = selectedDataset || '';
    }
    const dataset = addDataset?.value || selectedDataset;
    const select = el('cm-add-index');
    const addButton = el('cm-add-panel');
    if (!dataset) {
      select.innerHTML = '';
      addButton.disabled = true;
      return;
    }
    let source;
    try {
      source = await getData(addProduct,dataset);
    } catch (error) {
      select.innerHTML = '';
      addButton.disabled = true;
      setStatus(`Unable to load panel source: ${error.message}`);
      return;
    }
    const available = source.metadata.indices.filter(index => !state.indices.includes(panelId(addProduct,dataset,index)));
    select.innerHTML = available.map(index => option(index, source.metadata.index_names?.[index] || index)).join('');
    addButton.disabled = !available.length;
    const first = panelConfig(state.indices[0]);
    el('cm-index').value = first?.index || '';
  }
  function toggleHighlight(year) {
    if (state.highlighted.has(year)) unselectYear(year);
    else selectYear(year);
    renderYears();
    draw();
  }
  function latestLabel(source,index) {
    // Seasonal cycle has no individual latest observation: show the latest raw SST.
    const mode = isClimatologyMode() ? 'raw' : state.mode;
    const values = source.data[index]?.[mode] || [];
    for (let i = Math.min(values.length, source.time.length) - 1; i >= 0; i--) {
      if (values[i] !== null && Number.isFinite(values[i])) {
        const [year,month] = source.time[i].split('-').map(Number);
        const suffix = isClimatologyMode() ? ' (raw)' : '';
        const units = unitsFor(source,index);
        if (daily) return `Latest ${source.time[i]} : ${values[i].toFixed(2)} ${units}${suffix}`;
        return `Latest ${months[month-1]} ${year} : ${values[i].toFixed(2)} ${units}${suffix}`;
      }
    }
    return 'Latest unavailable';
  }
  async function load() {
    setStatus('Loading climate data…');
    try {
      json=await getData();
      indexDailyDates();
      el('cm-download').href=getURL();
      const indices=json.metadata.indices;
      el('cm-index').innerHTML=indices.map(v=>option(v,json.metadata.index_names?.[v]||v)).join('');
      const oldFirst=panelConfig(state.indices[0]);
      const firstIndex=oldFirst && indices.includes(oldFirst.index) ? oldFirst.index : (indices.includes('Nino34') ? 'Nino34' : indices[0]);
      const firstId=panelId(state.product,state.dataset,firstIndex);
      panelConfigs.set(firstId,{id:firstId,product:state.product,dataset:state.dataset,index:firstIndex});
      panelSources.set(firstId,json);
      state.indices[0]=firstId;
      const extraIds=state.indices.slice(1);
      await Promise.all(extraIds.map(async id=>{
        const config=panelConfig(id);
        if (!config) return;
        try { panelSources.set(id,await getData(config.product,config.dataset)); }
        catch { state.indices=state.indices.filter(value=>value!==id); panelConfigs.delete(id); }
      }));
      state.index=firstIndex;
      await syncPanelControls();
      state.classificationDataset=state.dataset;
      classification=await getClassification(state.classificationDataset).catch(()=>null);
      if (!classification) {
        const fallback=datasets.find(dataset=>dataset!==state.dataset);
        if (fallback) { state.classificationDataset=fallback; classification=await getClassification(fallback).catch(()=>null); }
      }
      const years=allYears();
      for (const year of [...state.highlighted]) {
        if (!years.includes(year)) unselectYear(year);
      }
      if (!selectionInitialized) {
        years.slice(-1).forEach(selectYear);
        selectionInitialized=true;
      }
      el('cm-year-panel').hidden=false;
      el('cm-classification-dataset').value=state.classificationDataset;
      el('cm-phase').disabled=!classification;
      el('cm-strength').disabled=!classification;
      el('cm-method').disabled=!classification;
      if (!classification) {state.phase='all';el('cm-phase').value='all';}
      setStatus('');renderYears();draw();
    } catch(err) {setStatus(`Unable to load dataset: ${err.message}`);console.error(err);}
  }
  for (const [id,key] of [['cm-dataset','dataset'],['cm-mode','mode'],
    ['cm-view','view'],['cm-phase','phase'],['cm-strength','strength'],
    ['cm-method','method']]) {
    el(id).addEventListener('change',async e=>{
      state[key]=e.target.value;
      if (key==='dataset') await load();
      else {if(['phase','strength','method'].includes(key))renderYears();draw();}
    });
  }
  if (!daily && products.length > 1) {
    el('cm-product').addEventListener('change',async e=>{
      state.product=e.target.value;
      const available=productDatasets(state.product);
      if (!available.includes(state.dataset)) state.dataset=available[0];
      el('cm-dataset').innerHTML=available.map(d=>option(d)).join('');
      el('cm-dataset').value=state.dataset;
      el('cm-add-product').value=state.product;
      await syncPanelControls();
      await load();
    });
  }
  el('cm-add-product').addEventListener('change',()=>syncPanelControls());
  el('cm-add-dataset').addEventListener('change',()=>syncPanelControls());
  el('cm-classification-dataset').addEventListener('change',async e=>{
    state.classificationDataset=e.target.value;
    try {
      classification=await getClassification(state.classificationDataset);
      renderYears();draw();
    } catch(err) {setStatus(`Unable to load classification: ${err.message}`);console.error(err);}
  });
  el('cm-index').addEventListener('change', e => {
    const index = e.target.value;
    const currentId = state.indices[0];
    const current = panelConfig(currentId);
    if (!current || current.index === index) return;
    const nextId = panelId(current.product,current.dataset,index);
    const existing = state.indices.indexOf(nextId);
    if (existing >= 0) {
      // Selecting an index already shown below swaps the two panel positions.
      state.indices[existing] = currentId;
      state.indices[0] = nextId;
      panelConfigs.set(currentId,current);
      panelSources.set(currentId,json);
    } else {
      state.indices[0] = nextId;
      panelConfigs.delete(currentId);
      panelSources.delete(currentId);
    }
    panelConfigs.set(nextId,{id:nextId,product:current.product,dataset:current.dataset,index});
    panelSources.set(nextId,json);
    state.index = index;
    syncPanelControls(); draw();
  });
  el('cm-add-panel').addEventListener('click', async () => {
    const product=el('cm-add-product').value;
    const dataset=el('cm-add-dataset').value;
    const index=el('cm-add-index').value;
    if (product && dataset && index) await addPanel(product,dataset,index);
  });
  el('cm-panels').addEventListener('click', e => {
    const btn = e.target.closest('.cm-remove-panel');
    if (!btn || state.indices.length <= 1) return;
    const id = btn.closest('.cm-index-panel').dataset.index;
    state.indices = state.indices.filter(v => v !== id);
    panelConfigs.delete(id);
    panelSources.delete(id);
    state.index = panelConfig(state.indices[0])?.index;
    syncPanelControls(); draw();
  });
  function updatePalettePreview() {
    el('cm-palette-preview').innerHTML = palette.map(color =>
      `<span class="cm-palette-swatch" style="background:${color}" title="${color}"></span>`
    ).join('');
  }
  el('cm-palette').value = state.palette;
  el('cm-palette').addEventListener('change', e => {
    state.palette = e.target.value;
    applyPalette(state.palette);
    updatePalettePreview();
  });
  updatePalettePreview();
  el('cm-year-span').value = daily ? String(state.yearSpan) : state.windowPreset;
  if (!daily) setWindowPreset(state.windowPreset);
  el('cm-year-span').addEventListener('change',e=>{
    if (daily) {
      state.yearSpan=Number(e.target.value);
    } else {
      setWindowPreset(e.target.value);
    }
    draw();
  });
  for (const [id,key] of [['cm-start-month','startMonth'],['cm-end-month','endMonth'],['cm-end-year','endYearOffset']]) {
    el(id).addEventListener('change',e=>{
      state[key]=Number(e.target.value);
      setWindowPreset('custom');
      draw();
    });
  }
  el('cm-search').addEventListener('input',renderYears);
  el('cm-years').addEventListener('click',e=>{
    const btn=e.target.closest('[data-year]');if(!btn)return;
    const year=Number(btn.dataset.year);
    toggleHighlight(year);
  });
  el('cm-clear').addEventListener('click',()=>{clearYears();renderYears();draw();});
  el('cm-highlight-filtered').addEventListener('click',()=>{
    filteredYears().forEach(selectYear);renderYears();draw();
  });
  el('cm-recent').addEventListener('click',()=>{
    allYears().slice(-5).forEach(selectYear);renderYears();draw();
  });
  load();
})();
