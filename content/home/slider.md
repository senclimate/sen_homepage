+++
# Slider widget.
widget = "slider"
headless = true  # This file represents a page section.
active = true    # Activate this widget? true/false
weight = 1       # Order that this section will appear.

# Slide interval.
# Use `false` to disable animation or enter a time in ms, e.g. `5000` (5s).
interval = 2000

# Slide height (optional).
# E.g. `500px` for 500 pixels or `calc(100vh - 70px)` for full screen.
height = "calc(25vh - 70px)"

# Slides.
# Duplicate an `[[item]]` block to add more slides.

[[item]]
  title = "Enhanced and Explainable El Niño Predictability"
  content =  """
  <p><strong><span style='font-size: 28px; color: yellow;'><em>Our research just accepted in Nature!</em></span> </strong></p>
  <a href='publication/2024_zhaos_nature_xro/' class='btn btn-light'> Learn more 
  </a>
  <a href='https://github.com/senclimate/XRO' class='btn btn-light'>
      <i class='fab fa-github'></i> Code
  </a>
  <a href='https://doi.org/10.5281/zenodo.10951443' class='btn btn-light'>
      <i class='fas fa-cloud'></i> Dataset
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
