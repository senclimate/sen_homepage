---
title: "Radiative Kernels in Global Warming Sciences"
subtitle: ""
summary: "Radiative Kernels in Global Warming Sciences"
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

{{< figure src="climatefeedbacks.jpg" title="**Figure 1. Schematic diagram indicating the nature of a feedback process.** An initial climate forcing ∆Q changes the energy balance and leads to an initial temperature change ∆T. This temperature change causes other changes in the climate system; a change in the Planck emission of terrestrial radiation ∆B<sub>v</sub>(T), a change in the water vapor content ∆H<sub>2</sub>O(T), a change in the ice coverage ∆Ice(T), or some other change ∆⋅⋅⋅. These changes in turn then influence the energy balance leading to a further change in the temperature. When the temperature change is such that the feedbacks balance the forcing, then the system is in a new equilibrium with a temperature change ∆T<sub>eq</sub>. From Hartmann (2015)." numbered="false" lightbox="true" width="80%" >}}






## 1. 基本的辐射反馈过程

### 1.1 普朗克反馈

根据普朗克定律，地球表面发射出去的辐射与温度有关，温度越高，发射出去的辐射越强。这说明普朗克反馈是控制地球表面温度重要的负反馈过程。由Stefan–Boltzmann定律，地球表面发射的为

$$F^\uparrow (\infty) = \sigma T^4_e.$$

如果忽略温度对反照率的影响，那么地球将像黑体那样冷却，

$$  \lambda_R = \left( \frac {\partial (\sigma T^4_e)}{\partial T_e} \right)^{-1} = (4\sigma T^3_e)^{-1} = 0.26 \text{ K (W m}^{-2})^{-1} $$ 

这表明，0.25 K表面温度的增加即会造成1 W m<sup>-2</sup> 地球能量平衡中的损失。在平均反照率为0.3的情况下，总太阳辐射为5.7 W m<sup>-2</sup>的变化可以造成1 W m<sup>-2</sup>地球能量平衡的变化。如果仅考虑普朗克反馈，总太阳辐射22 W m<sup>-2</sup>时或1.6%的变化才能造成地球表面温度1 K的变化。

### 1.2 水汽反馈

大气的水汽反馈。温度增加使蒸发加强，致使大气中水汽量增加，增加的水汽将产生更强的温室效应。计算表明，它将使由于CO2加倍引起的全球平均温度升高增加60%。

Clausius–Clapeyron方程

$$\frac{d e_s}{d T} = \frac{L}{T(\alpha_v - \alpha_l)}$$

![](https://www.climate.be/textbook/images/image4x03.png)
{:.image-caption}
*Figure 1. From Goosse H., P.Y. Barriat, W. Lefebvre, M.F. Loutre and V. Zunz, (2008-2010). Introduction to climate dynamics and climate modeling. Online textbook available at http://www.climate.be/textbook.*

### 1.3 温度递减率反馈

大气温度结构(温度递减率)反馈。尤其是大气中水汽含量改变后，大气温度结构将发生变化，从而影响大气长波向外空的辐射量和温室效应。
![Lasper Rate Feedback](https://www.climate.be/textbook/images/image4x04.png)

{:.image-caption}
*Figure 2. From Goosse H., P.Y. Barriat, W. Lefebvre, M.F. Loutre and V. Zunz, (2008-2010). Introduction to climate dynamics and climate modeling. Online textbook available at http://www.climate.be/textbook.*

### 1.4 冰雪反照率反馈

冰和雪的表面是太阳辐射的强烈反射体。反照率即是这种反射能力的度量。如果具有低反照率的海面(反照率为0.1)或陆面(反照率为0.3)被高反照率的海冰或冰雪(反照率≥0.6)所覆盖，地表所吸收的太阳辐射将不到原先的一半，因而地表进一步变冷，反之亦然。这是冰雪反照率的正反馈过程。它会使CO2加倍产生的增温再增加20%。

### 1.5 云反馈

云对辐射有强烈的吸收、反射或放射作用，这称作云的反馈。云的反馈作用十分复杂，其反馈强度和符号决定于云的具体种类，云的高度，光学性质等，但基本上可以分为两类作用。云对太阳辐射可以产生反射作用，将其中入射到云表面的一部分辐射反射回太空，减少气候系统获得的总入射能量，因而具有降温作用。另一方面云能吸收云下地表和大气放射的长波辐射，与温室气体的作用一样，能减少地面向空间的热量损失，从而使云下大气层温度增加。

------------------

## 2. 辐合核




## References

{:.reference}
- Shell, K. M., J. T. Kiehl, and C. A. Shields, 2008: Using the Radiative Kernel Technique to Calculate Climate Feedbacks in NCAR’s Community Atmospheric Model. Journal of Climate, 21, 2269–2282.
- Rose Brian E. J., Armour Kyle C., Battisti David S., Feldl Nicole, & Koll Daniel D. B. (2014). The dependence of transient climate sensitivity and radiative feedbacks on the spatial pattern of ocean heat uptake. Geophysical Research Letters, 41(3), 1071–1078. [doi](https://doi.org/10.1002/2013GL058955)
