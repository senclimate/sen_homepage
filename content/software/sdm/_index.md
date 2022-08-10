---
# Course title, summary, and position.
linktitle: A stochastic-dynamical model (SDM) for Indian Ocean Dipole (IOD)
summary: The SDM for the IOD is a simple model to predict the IOD using seasonally modulated El Niño-Southern Oscillation (ENSO) forcing together with a seasonally modulated Indian Ocean coupled ocean-atmosphere feedback.
weight: 1

# Page metadata.
title: A stochastic-dynamical model (SDM) for Indian Ocean Dipole (IOD)
date: "2019-04-09T00:00:00Z"
lastmod: "2019-09-09T00:00:00Z"
draft: false  # Is this a draft? true/false
toc: true  # Show table of contents? true/false
type: book  # Do not modify.

# Add menu entry to sidebar.
# - name: Declare this menu item as a parent with ID `name`.
# - weight: Position of link in menu.
menu:
  sdm:
    name: The SDM for the IOD
    weight: 1
---

## Overview

In [Stuecker et al. 2017, GRL](https://doi.org/10.1002/2016GL072308) and [Zhao et al. 2019, GRL](https://doi.org/10.1029/2019GL084196), we proposed a null hypothesis framework for the IOD. The dynamical evolution of IOD SST can be determined by seasonal modulated Indian Ocean feedbacks forced by ENSO and stochastic forcings. The IOD Mode Index (DMI) tendency can be written as

$$\frac{dT}{dt}=-\lambda\left(t\right)T\left(t\right)+\alpha\left(t\right)T_\text{ENSO}\left(t\right)+\sigma_0\xi\left(t\right)$$

where $T$ is the monthly DMI, $T_\text{ENSO}\left(t\right)$ the monthly Niño-3.4 index, $\lambda\left(t\right)$ the damping rate of $T$, $\alpha\left(t\right)$ the ENSO forcing strength, $\xi\left(t\right)$ the stochastic forcing, and $\sigma_0$ the magnitude of stochastic forcing.

## Citation

The SDM for the IOD are described in the following papers, which should be referenced if you use SDM for the IOD in publications:

- Stuecker, M. F., A. Timmermann, F.-F. Jin, Y. Chikamoto, W. Zhang, A. T. Wittenberg,  E. Widiasih, **S. Zhao** (2017), Revisiting ENSO/Indian Ocean Dipole phase relationships, _Geophys. Res. Lett._, **44**(5), 2481–2492, https://doi.org/10.1002/2016GL072308
- **Zhao, S.**, F.-F. Jin, M. F. Stuecker (2019) Improved Predictability of the Indian Ocean Dipole Using Seasonally Modulated ENSO Forcing Forecasts. _Geophys. Res. Lett._, **46**(16):9980-9990, https://doi.org/10.1029/2019GL084196

We ask that you acknowledge us in your use of the SDM for the IOD in any documents or publications. Thank you!

## Availability to the code

For those finding of interest in using the [SDM for the IOD]({{< ref "software/sdm" >}}), please email me [zhaos@hawaii.edu](mailto:zhaos@hawaii.edu)) to get the model code. We would appreciated if you can briefly introduce your plan about the use of this model.
