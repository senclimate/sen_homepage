+++
# Slider widget settings
widget = "slider"
headless = true     # Indicates this is a page section.
active = true       # Enables the slider section.
weight = 1          # Determines display order of this widget section.

# Slide settings
interval = 5000     # Interval between slides in ms (5000ms = 5s).
height = "calc(40vh - 70px)"  # Slide height.


[[item]]
  title = "Operational XRO climate forecasts online"
  content = """
<p><strong><span style='font-size: 16px; color: yellow;'><em>
Real-time forecasts of ENSO and other climate modes using the eXtended nonlinear Recharge Oscillator (XRO)
</em></span></strong></p>
<a href='https://senzhao.netlify.app/climate/xro/' class='btn btn-light' style='font-size: 12px; padding: 5px 5px; color: black; background-color: #e0ffff; border-color: #40e0d0;'><i class='fas fa-signal'></i> Forecast Dashboard</a>
<a href='https://github.com/senclimate/XRO' class='btn btn-light' style='font-size: 12px; padding: 5px 5px; color: black; background-color: #afeeee; border-color: #00ced1;'><i class='fab fa-github'></i> Code</a>
<a href='https://doi.org/10.1038/s41586-024-07534-6' class='btn btn-light' style='font-size: 12px; padding: 5px 5px; color: black; background-color: #f0e68c; border-color: #ffd700;'><i class='fas fa-globe'></i> Paper</a>
"""
  align = "center"
  overlay_color = "#1453b4"
  overlay_filter = 0.95
  overlay_img = "BigIsland_2.jpg"


# Slide 1: Nature publication announcement
[[item]]
  title = "Our research just published in Nature!"
  content = """
<p><strong><span style='font-size: 16px; color: yellow;'><em>
<a href="publication/2024_zhaos_nature_xro" style="color: yellow;">El Niño forecasts extended to 18 months with physics-based model</a>
</em></span></strong></p>
<a href='https://www.nature.com/articles/s41586-024-07534-6' class='btn btn-light' style='font-size: 12px; padding: 5px 5px; color: black; background-color: #f0e68c; border-color: #ffd700;'><i class='fas fa-globe'></i> Online</a>
<a href='https://rdcu.be/dLZxC' class='btn btn-light' style='font-size: 12px; padding: 5px 5px; color: black; background-color: #98fb98; border-color: #32cd32;'><i class='fas fa-file-pdf'></i> PDF</a>
<a href='https://rdcu.be/dPm1w' class='btn btn-light' style='font-size: 12px; padding: 5px 5px; color: black; background-color: #98fb98; border-color: #32cd32;'><i class='fas fa-file-pdf'></i> Research Briefing</a>
<a href='https://github.com/senclimate/XRO' class='btn btn-light' style='font-size: 12px; padding: 5px 5px; color: black; background-color: #afeeee; border-color: #00ced1;'><i class='fab fa-github'></i> Code</a>
<a href='https://www.soest.hawaii.edu/soestwp/announce/news/el-nino-forecasts-18-months/' class='btn btn-light' style='font-size: 12px; padding: 5px 5px; color: black; background-color: #ffb6c1; border-color: #ff69b4;'><i class='fas fa-newspaper'></i> SOEST News</a>
<a href='https://paper.sciencenet.cn/htmlpaper/2024/6/202462717022913106082.shtm' class='btn btn-light' style='font-size: 12px; padding: 5px 5px; color: black; background-color: #add8e6; border-color: #87ceeb;'>科学网</a>
"""
  align = "center"
  overlay_color = "#1453b4"
  overlay_filter = 0.95
  overlay_img = "BigIsland_2.jpg"

# Slide 2: NSF funding announcement
[[item]]
  title = "Our proposal secures funding from the U.S. NSF"
  content = """
<p><strong><span style='font-size: 16px; color: yellow;'><em>
Dynamics and predictability of coastal El Niño events, and implications for ENSO diversity
</em></span></strong></p>
<a href='https://www.christinakaramperidou.com/' class='btn btn-light'>Lead PI C. Karamperidou</a>
<a href='https://senzhao.netlify.app/cv_sen.pdf' class='btn btn-light'>co-PI S. Zhao</a>
"""
  align = "center"
  overlay_color = "#1453b4"
  overlay_filter = 0.95
  overlay_img = "BigIsland_2.jpg"

# Optional third slide: ClimateState (currently commented out)
# [[item]]
#   title = "ClimateState"
#   content = """
# <p><strong><span style='color: yellow;'><em>A library designed for visualizing the state of climate in atmosphere and ocean!</em></span></strong></p>
# <a href='https://senclimate.github.io/climatestate/' class='btn btn-light'><i class="fa-regular fa-house"></i> Learn more</a>
# <a href='https://github.com/senclimate/climatestate' class='btn btn-light'><i class='fab fa-github'></i> Code</a>
# """
#   align = "center"
#   overlay_color = "#145A32"
#   overlay_filter = 0.5
#   overlay_img = ""  # Optional image.

+++

## <a href='https://doi.org/10.5281/zenodo.10951443' class='btn btn-light' style='font-size: 12px; padding: 5px 5px; color: black; background-color: #d8bfd8; border-color: #dda0dd;'><i class='fas fa-cloud'></i> Dataset</a>
