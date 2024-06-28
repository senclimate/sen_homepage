+++
# Slider widget.
widget = "slider"
headless = true  # This file represents a page section.
active = true    # Activate this widget? true/false
weight = 1       # Order that this section will appear.

# Slide interval.
# Use `false` to disable animation or enter a time in ms, e.g. `5000` (5s).
interval = 5000

# Slide height (optional).
# E.g. `500px` for 500 pixels or `calc(100vh - 70px)` for full screen.
height = "calc(40vh - 70px)"

# Slides.
# Duplicate an `[[item]]` block to add more slides.

[[item]]
  title = "Our research just published in Nature! "
  content =  """
<p><strong><span style='font-size: 16px; color: yellow;'><em> <a href="publication/2024_zhaos_nature_xro" style="color: yellow;">El Niño forecasts extended to 18 months with physics-based model</a> </em></span> </strong></p>
<a href='https://www.nature.com/articles/s41586-024-07534-6' class='btn btn-light' style='font-size: 12px; padding: 5px 5px; color: black; background-color: #f0e68c; border-color: #ffd700;'>
    Online
</a>
<a href='https://rdcu.be/dLZxC' class='btn btn-light' style='font-size: 12px; padding: 5px 5px; color: black; background-color: #98fb98; border-color: #32cd32;'>
    PDF
</a>
<a href='https://doi.org/10.5281/zenodo.10681114' class='btn btn-light' style='font-size: 12px; padding: 5px 5px; color: black; background-color: #afeeee; border-color: #00ced1;'>
    <i class='fab fa-github'></i>Code
</a>
<a href='https://doi.org/10.5281/zenodo.10951443' class='btn btn-light' style='font-size: 12px; padding: 5px 5px; color: black; background-color: #d8bfd8; border-color: #dda0dd;'>
    <i class='fas fa-cloud'></i>Dataset
</a>
<a href='https://www.soest.hawaii.edu/soestwp/announce/news/el-nino-forecasts-18-months/' class='btn btn-light' style='font-size: 12px; padding: 5px 5px; color: black; background-color: #ffb6c1; border-color: #ff69b4;'>
    SOEST news
</a>
<a href='https://paper.sciencenet.cn/htmlpaper/2024/6/202462717022913106082.shtm' class='btn btn-light' style='font-size: 12px; padding: 5px 5px; color: black; background-color: #add8e6; border-color: #87ceeb;'>
    科学网
</a>

  """
  align = "center"  # Choose `center`, `left`, or `right`.

  # Overlay a color or image (optional).
  #   Deactivate an option by commenting out the line, prefixing it with `#`.
  # overlay_color = "#145A32"  # An HTML color value.
  # overlay_filter = 0.9  # Darken the image. Value in range 0-1.
  
  overlay_color = "#1453b4"
  overlay_filter = 0.95
  overlay_img = "BigIsland_2.jpg"  # Image path relative to your `static/img/` folder.

  # # Call to action button (optional).
  # #   Activate the button by specifying a URL and button label below.
  # #   Deactivate by commenting out parameters, prefixing lines with `#`.
  # cta_label = "See our paper"
  # cta_url = "https://sourcethemes.com/academic/"
  # cta_icon_pack = "fas"
  # cta_icon = "github"

# [[item]]
#  title = "Our proposal secures funding from the U.S. NSF"
#  content =  """
#  <p><strong><span style='font-size: 16px; color: yellow;'><em>Dynamics and predictability of coastal El Nino events, and implications for ENSO diversity </em></span> </strong></p>
#  <a href='https://www.christinakaramperidou.com/' class='btn btn-light'> Lead PI C. Karamperidou 
#  </a>
#  <a href='https://senzhao.netlify.app/cv_sen.pdf' class='btn btn-light'> co-PI S. Zhao
#  </a>
#  """
#  align = "center"  # Choose `center`, `left`, or `right`.

#  # Overlay a color or image (optional).
#  #   Deactivate an option by commenting out the line, prefixing it with `#`.
#  # overlay_color = "#145A32"  # An HTML color value.
#  # overlay_filter = 0.9  # Darken the image. Value in range 0-1.
  
#  overlay_color = "#1453b4"
#  overlay_filter = 0.95
#  overlay_img = "BigIsland_2.jpg"  # Image path relative to your `static/img/` folder.

#  # # Call to action button (optional).
#  # #   Activate the button by specifying a URL and button label below.
#  # #   Deactivate by commenting out parameters, prefixing lines with `#`.
#  # cta_label = "See our paper"
#  # cta_url = "https://sourcethemes.com/academic/"
#  # cta_icon_pack = "fas"
#  # cta_icon = "github"


# [[item]]
#   title = "ClimateState"
#   content =  """
#   <p><strong><span style='color: yellow;'><em>A library designed for visualizing the state of climate in atmosphere and ocean!</em></span> </strong></p>
#   <a href='https://senclimate.github.io/climatestate/' class='btn btn-light'>
#       <i class="fa-regular fa-house"></i> Learn more
#   </a>
#   <a href='https://github.com/senclimate/climatestate' class='btn btn-light'>
#       <i class='fab fa-github'></i> Code
#   </a>
#   """
#   align = "center"  # Choose `center`, `left`, or `right`.
#   overlay_color = "#145A32"
#   overlay_filter = 0.5
#   overlay_img = ""  # Image path relative to your `static/img/` folder.


  
+++
