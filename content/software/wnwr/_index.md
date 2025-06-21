---
# Course title, summary, and position.
linktitle: Rossby Wave Number and Wave Ray (WNWR) Package
summary: WNWR is a software package for inverstigating the Rossby wave propagation in a horizontally non-uniform flow.
weight: 2

# Page metadata.
title: Rossby Wave Number and Wave Ray (WNWR) Package
date: "2019-04-09T00:00:00Z"
lastmod: "2019-09-09T00:00:00Z"
draft: false  # Is this a draft? true/false
toc: true  # Show table of contents? true/false
type: book  # Do not modify.

image:
 focal_point: Center
 filename: "pubs/Rossby_wave_in_a_superflow.png"
 maxheight: 220px

# Add menu entry to sidebar.
# - name: Declare this menu item as a parent with ID `name`.
# - weight: Position of link in menu.
menu:
  wnwr:
    name: Rossby wave number and wave ray tracing package
    weight: 1
---

{{< toc hide_on="xl" >}}

## Overview

WNWR is a software package for inverstigating the Rossby wave propagation in a **horizontally non-uniform basic flow (includes both U and V)**. The package code is written in Fortran 90 language.

The WNWR package refines the Rossby wave theory to a **horizontally non-uniform basic flow**, extends the classic Rossby wave theory which only consider zonal basic flow ([Hoskins and Karoly 1981](https://doi.org/10.1175/1520-0469(1981)038<1179:TSLROA>2.0.CO;2); [Hoskins and Ambrizzi 1993](https://doi.org/10.1175/1520-0469(1993)050<1661:RWPOAR>2.0.CO;2)). The new theory is valuable to understand the atmospheric teleconnections between the tropics and extra-tropics, and between the Northern Hemisphere and Southern Hemisphere, especially the linkages across the easterlies. It has been used to examine the energy dispersion trajectory associated the atmospheric teleconnections in many published papers (see [Applications]({{< ref "software/wnwr/application" >}})).

## Citation

The WNWR package are described in the following papers, which should be referenced if you use WNWR package in publications:

{{< cite page="/publication/2015_lyj_jas_wave" view="4" >}}

{{< cite page="/publication/2015_zhaos_jc_app" view="4" >}}

<!-- - Li, Y., J. Li, F. Jin, S. Zhao. 2015: [Interhemispheric propagation of the stationary Rossby waves in a horizontally non-uniform basic flow](https://doi.org/10.1175/JAS-D-14-0239.1). _J. Atmos. Sci._, **72**, 3233-3256
- Zhao, S., J. Li, and Y. Li (2015), [Dynamics of an interhemispheric teleconnection across the critical latitude through a southerly duct during boreal winter](https://doi.org/10.1175/JCLI-D-14-00425.1), _J. Climate_, **28**, 7437-7456
- Li, Y., and J. Li, 2012: Propagation of planetary waves in the horizontal non-uniform basic ﬂow (in Chinese). _Chin. J. Geophys._, **55**, 361–371 -->

We ask that you acknowledge us in your use of the WNWR package in any documents or publications. This may be done by including text in acknowledgement such as "**We are grateful to Prof. Jianping Li, Dr. Yanjie Li, and Dr. Sen Zhao making the Rossby wave tracing code readily available.**" Thank you!

<!-- ## Purpose
- Theoretical interpretation of the physic mechanism of some atmospheric teleconnections
- Influence of the ambient flow on Rossby wave propagation, for example. the meridional shift of the jet stream, zonal shift of the jet streamfunction
- Role of meridional basic flow on the interaction of the Northern Hemisphere (NH) and the Southern Hemisphere (SH), tropics and extratropics.
- The temporal variability of Rossby wave propagation.
- A verification of the wave energy dispersion pathways
 -->

## Availability to the code

For those finding of interest in using the [WNWR package]({{< ref "software/wnwr" >}}), please ask Prof. Jianping Li (Email: [ljp@ouc.edu.cn](mailto:ljp@ouc.edu.cn)) or myself (Email: [zhaos@hawaii.edu](mailto:zhaos@hawaii.edu)) to get the package code. We would appreciated if you can briefly introduce your plan about the use of this package.
