+++

# ─── Slider widget settings ───────────────────────────────────────────────────

widget   = "slider"
headless = true   # Page section, not a standalone page
active   = true
weight   = 1

# ─── Slide carousel settings ──────────────────────────────────────────────────

interval = 6000                        # Auto-advance interval in ms
height   = "calc(50vh - 70px)"        # Slide height (accounts for navbar)

# ─── Shared button style (inject via custom CSS in assets/css/custom.css) ─────
#
#   .slide-btn          – base pill button
#   .slide-btn-pdf      – green  (PDF)
#   .slide-btn-data     – cyan   (Data / Dataset)
#   .slide-btn-code     – teal   (GitHub / Code)
#   .slide-btn-news     – pink   (Press / News)
#   .slide-btn-person   – blue   (PI / Person)
#   .slide-btn-journal  – gold   (Journal article)
#
# Add to assets/css/custom.css:
#
#   .slide-btn {
#     font-size: 12px; padding: 5px 10px; border-radius: 20px;
#     font-weight: 600; border-width: 1.5px; margin: 3px 2px;
#     display: inline-flex; align-items: center; gap: 5px;
#     transition: filter 0.15s ease;
#   }
#   .slide-btn:hover { filter: brightness(0.92); }
#   .slide-btn-pdf    { color:#000; background:#98fb98; border-color:#32cd32; }
#   .slide-btn-data   { color:#000; background:#e0ffff; border-color:#40e0d0; }
#   .slide-btn-code   { color:#000; background:#afeeee; border-color:#00ced1; }
#   .slide-btn-news   { color:#000; background:#ffb6c1; border-color:#ff69b4; }
#   .slide-btn-person { color:#000; background:#add8e6; border-color:#87ceeb; }
#   .slide-btn-journal{ color:#000; background:#f0e68c; border-color:#ffd700; }
#   .slide-btn-dataset{ color:#000; background:#d8bfd8; border-color:#dda0dd; }

# ─────────────────────────────────────────────────────────────────────────────
# Slide 2 – Operational XRO real-time forecasts (with plume figure)
# ─────────────────────────────────────────────────────────────────────────────

[[item]]
  title   = "Operational XRO forecasts — updated monthly"
  align   = "center"
  overlay_color  = "rgba(10, 40, 100, 1.0)"
  overlay_filter = 1.0
  overlay_img    = ""

  content = """
  
{{< latest_xro_forecast >}}
<!-- 
<a href='climate/xro/data/'
   class='btn btn-light slide-btn slide-btn-data'>
  <i class='fas fa-database'></i> Forecast Data
</a>
<a href='https://github.com/senclimate/XRO'
   class='btn btn-light slide-btn slide-btn-code'>
  <i class='fab fa-github'></i> XRO Code
</a> -->

"""


# ─────────────────────────────────────────────────────────────────────────────
# Slide 1 – Nature Communications 2025: Climate whiplash & El Niño
# ─────────────────────────────────────────────────────────────────────────────

[[item]]
  title   = "Climate whiplash effects due to rapidly intensifying El Niño cycles"
  align   = "center"
  overlay_color  = "rgba(20, 83, 180, 0.55)"
  overlay_filter = 0.0
  overlay_img    = "ENSO-states-viz.jpg"

  content = """
<p><strong><span style='font-size:16px; color:#ffe066;'><em>
  <a href="publication/2025_stuecker_nc/" style="color:#ffe066;">
    Our research comes out in Nature Communications
  </a>
</em></span></strong></p>

<a href='https://www.nature.com/articles/s41467-025-64619-0.pdf'
   class='btn btn-light slide-btn slide-btn-pdf'>
  <i class='fas fa-file-pdf'></i> PDF
</a>
<a href='https://climatedata.ibs.re.kr/data/papers/stuecker-et-al-2025-nature-communications'
   class='btn btn-light slide-btn slide-btn-data'>
  <i class='fas fa-database'></i> Data
</a>
<a href='https://github.com/senclimate/xphasesync'
   class='btn btn-light slide-btn slide-btn-code'>
  <i class='fab fa-github'></i> xphasesync
</a>
<a href='https://github.com/senclimate/xentropy'
   class='btn btn-light slide-btn slide-btn-code'>
  <i class='fab fa-github'></i> xentropy
</a>
<a href='https://www.soest.hawaii.edu/soestwp/announce/news/climate-whiplash-intensifying-el-nino/'
   class='btn btn-light slide-btn slide-btn-news'>
  <i class='fas fa-newspaper'></i> SOEST News
</a>
<a href='https://ibsclimate.org/news/climate-whiplash-effects-due-to-rapidly-intensifying-el-nino-cycles/'
   class='btn btn-light slide-btn slide-btn-news'>
  <i class='fas fa-newspaper'></i> IBS News
</a>
"""



# ─────────────────────────────────────────────────────────────────────────────
# Slide 3 – Nature 2024: El Niño forecasts extended to 18 months
# ─────────────────────────────────────────────────────────────────────────────

[[item]]
  title   = "El Niño forecasts extended to 18 months with a physics-based model"
  align   = "center"
  overlay_color  = "#1453b4"
  overlay_filter = 0.95
  overlay_img    = "BigIsland_2.jpg"

  content = """
<p><strong><span style='font-size:16px; color:#ffe066;'><em>
  <a href="publication/2024_zhaos_nature_xro" style="color:#ffe066;">
    Our research published in <em>Nature</em>
  </a>
</em></span></strong></p>

<a href='https://www.nature.com/articles/s41586-024-07534-6'
   class='btn btn-light slide-btn slide-btn-journal'>
  <i class='fas fa-globe'></i> Online
</a>
<a href='https://rdcu.be/dLZxC'
   class='btn btn-light slide-btn slide-btn-pdf'>
  <i class='fas fa-file-pdf'></i> PDF
</a>
<a href='https://rdcu.be/dPm1w'
   class='btn btn-light slide-btn slide-btn-pdf'>
  <i class='fas fa-file-pdf'></i> Research Briefing
</a>
<a href='https://github.com/senclimate/XRO'
   class='btn btn-light slide-btn slide-btn-code'>
  <i class='fab fa-github'></i> Code
</a>
<a href='https://www.soest.hawaii.edu/soestwp/announce/news/el-nino-forecasts-18-months/'
   class='btn btn-light slide-btn slide-btn-news'>
  <i class='fas fa-newspaper'></i> SOEST News
</a>
<a href='https://www.nsf.gov/news/scientists-extend-el-nino-forecasts-18-months'
   class='btn btn-light slide-btn slide-btn-news'>
  <i class='fas fa-newspaper'></i> NSF Stories
</a>
<a href='https://cpo.noaa.gov/new-model-enhances-el-nino-southern-oscillation-enso-forecasting/'
   class='btn btn-light slide-btn slide-btn-news'>
  <i class='fas fa-newspaper'></i> NOAA News
</a>
"""

# ─────────────────────────────────────────────────────────────────────────────
# Slide 4 – NSF funding: coastal El Niño proposal
# ─────────────────────────────────────────────────────────────────────────────

[[item]]
  title   = "Our coastal El Niño proposal secures funding from the U.S. NSF"
  align   = "center"
  overlay_color  = "#1453b4"
  overlay_filter = 0.95
  overlay_img    = "BigIsland_3.jpg"

  content = """
<p><strong><span style='font-size:16px; color:#ffe066;'><em>
  Dynamics and predictability of coastal El Niño events,<br>
  and implications for ENSO diversity
</em></span></strong></p>

<a href='https://www.christinakaramperidou.com/'
   class='btn btn-light slide-btn slide-btn-person'>
  <i class='fas fa-user'></i> Lead PI: C. Karamperidou
</a>
<a href='cv_sen.pdf'
   class='btn btn-light slide-btn slide-btn-person'>
  <i class='fas fa-user'></i> co-PI: S. Zhao
</a>
"""

# ─────────────────────────────────────────────────────────────────────────────
# Slide 5 (optional) – ClimateState library  [uncomment to activate]
# ─────────────────────────────────────────────────────────────────────────────

# [[item]]
#   title   = "ClimateState – visualizing the state of the atmosphere & ocean"
#   align   = "center"
#   overlay_color  = "#145A32"
#   overlay_filter = 0.5
#   overlay_img    = ""
#
#   content = """
# <p><strong><span style='font-size:16px; color:#ffe066;'><em>
#   A Python library for interactive climate state visualization
# </em></span></strong></p>
# <a href='https://senclimate.github.io/climatestate/'
#    class='btn btn-light slide-btn slide-btn-journal'>
#   <i class='fas fa-house'></i> Learn More
# </a>
# <a href='https://github.com/senclimate/climatestate'
#    class='btn btn-light slide-btn slide-btn-code'>
#   <i class='fab fa-github'></i> Code
# </a>
# """

+++

<a href='https://doi.org/10.5281/zenodo.10951443' class='btn btn-light slide-btn slide-btn-dataset'><i class='fas fa-cloud'></i> Dataset</a>