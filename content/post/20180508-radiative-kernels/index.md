---
title: "Radiative Kernels in Global Warming Sciences"
subtitle: ""
summary: ""
authors: ["senzhao"]

date: 2018-05-18T00:00:00Z
lastmod: 2018-05-18T00:00:00Z

math: true
diagram: true
markup: goldmark
tags: ["Radiative Kernels"]
featured: false
draft: true
comments: false  # Show comments?

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


--------------

## 1 Climate sensitivity and feedback

Climate sensitivity is the amount by which an objective measure of climate changes when one of the assumed independent variables controling the climate is varied. For exmaple, how much the global mean surface temperature, $T_s$, changes if We vary the total solar irradiance (TSI), $S_0$; however, the global mean temperature is a function of more than the TSI. Suppose it depends on a number of variables $y_i$ such as temperature, water vapor, other greenhouses, cloudiness, ice cover, land vergetation, and many others. Then the chain rule yeilds,

$$ \frac{d T_s}{d S_0} = \frac{\partial T_s}{\partial S_0} + \sum_{j=1}^{N} \frac{\partial T_s}{\partial y_i} \frac{\partial y_i}{\partial S_0} $$

The total change of surface temperature with respect to TSI is the sum of many contributions each made up of the partial derivative of surface temperature with respect to a secondary variable that controls surface temperature, times the total change of that secondary variable with respect to the TSI.

As an example, if we increase the TSI, the specific humidity of air will increase because of the dependence of saturation vapor pressure on temperature. The increase of atmospheric water vapor will in turn lead to an increase in surface temperature, because of the greenhouse effect of the added water vapor.

{{< figure src="climatefeedbacks.jpg" title="**Figure 1. Schematic diagram indicating the nature of a feedback process.** An initial climate forcing ???Q changes the energy balance and leads to an initial temperature change ???T. This temperature change causes other changes in the climate system; a change in the Planck emission of terrestrial radiation ???B<sub>v</sub>(T), a change in the water vapor content ???H<sub>2</sub>O(T), a change in the ice coverage ???Ice(T), or some other change ????????????. These changes in turn then influence the energy balance leading to a further change in the temperature. When the temperature change is such that the feedbacks balance the forcing, then the system is in a new equilibrium with a temperature change ???T<sub>eq</sub>. From Hartmann (2015)." numbered="false" lightbox="true" width="80%" >}}






## 1. ???????????????????????????

### 1.1 ???????????????

?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????Stefan???Boltzmann?????????????????????????????????

$$F^\uparrow (\infty) = \sigma T^4_e.$$

?????????????????????????????????????????????????????????????????????????????????

$$  \lambda_R = \left( \frac {\partial (\sigma T^4_e)}{\partial T_e} \right)^{-1} = (4\sigma T^3_e)^{-1} = 0.26 \text{ K (W m}^{-2})^{-1} $$ 

????????????0.25 K?????????????????????????????????1 W m<sup>-2</sup> ??????????????????????????????????????????????????????0.3?????????????????????????????????5.7 W m<sup>-2</sup>?????????????????????1 W m<sup>-2</sup>??????????????????????????????????????????????????????????????????????????????22 W m<sup>-2</sup>??????1.6%???????????????????????????????????????1 K????????????

### 1.2 ????????????

?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????CO2?????????????????????????????????????????????60%???

Clausius???Clapeyron??????

$$\frac{d e_s}{d T} = \frac{L}{T(\alpha_v - \alpha_l)}$$

![](https://www.climate.be/textbook/images/image4x03.png)
{:.image-caption}
*Figure 1. From Goosse H., P.Y. Barriat, W. Lefebvre, M.F. Loutre and V. Zunz, (2008-2010). Introduction to climate dynamics and climate modeling. Online textbook available at http://www.climate.be/textbook.*

### 1.3 ?????????????????????

??????????????????(???????????????)??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
![Lasper Rate Feedback](https://www.climate.be/textbook/images/image4x04.png)

{:.image-caption}
*Figure 2. From Goosse H., P.Y. Barriat, W. Lefebvre, M.F. Loutre and V. Zunz, (2008-2010). Introduction to climate dynamics and climate modeling. Online textbook available at http://www.climate.be/textbook.*

### 1.4 ?????????????????????

????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????(????????????0.1)?????????(????????????0.3)?????????????????????????????????(????????????0.6)?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????CO2??????????????????????????????20%???

### 1.5 ?????????

???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

------------------

## 2. ?????????




## References

{:.reference}
- Shell, K. M., J. T. Kiehl, and C. A. Shields, 2008: Using the Radiative Kernel Technique to Calculate Climate Feedbacks in NCAR???s Community Atmospheric Model. Journal of Climate, 21, 2269???2282.
- Rose Brian E. J., Armour Kyle C., Battisti David S., Feldl Nicole, & Koll Daniel D. B. (2014). The dependence of transient climate sensitivity and radiative feedbacks on the spatial pattern of ocean heat uptake. Geophysical Research Letters, 41(3), 1071???1078. [doi](https://doi.org/10.1002/2013GL058955)
