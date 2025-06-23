---
# Course title, summary, and position.
linktitle: XRO
summary: XRO is an eXtended nonlinear Recharge Oscillator model for El Niño-Southern Oscillation (ENSO) and other modes of variability in the global oceans.
weight: 1

# Page metadata.
title: Extended nonlinear recharge oscillator (XRO) model
date: "2024-06-28T00:00:00Z"
lastmod: "2024-06-28T00:00:00Z"
draft: false  # Is this a draft? true/false
toc: true   # Show table of contents? true/false
type: book  # Do not modify.

image:
 focal_point: Center
 filename: "pubs/XRO_logo.png"
  
# Add menu entry to sidebar.
# - name: Declare this menu item as a parent with ID `name`.
# - weight: Position of link in menu.
---

## Overview

{{< figure library="true"  src="/pubs/Zhao2024nature_XRO.jpg" title="Schematic diagram of the XRO model" numbered="true" lightbox="true" width="100%"  lightbox-group="true">}}

The XRO is an e**X**tended nonlinear **R**echarge **O**scillator model for El Niño-Southern Oscillation (ENSO) and other modes of variability in the global oceans ([Zhao et al. 2024](#ref-zhao-2024)). It builds on the legacies of the Hasselmann stochastic climate model capturing upper ocean memory in sea surface temperature (SST) variability ([Hasselmann, 1976](#ref-hasselmann-1976)), and the recharge oscillator model for the oscillatory core dynamics of ENSO ([Jin, 1997](#ref-jin-1997)). It constitutes a parsimonious representation of the climate system in a reduced variable and parameter space that still captures the essential dynamics of interconnected global climate variability. 

The XRO model consists of a nonlinear recharge oscillator model for ENSO coupled to stochastic-deterministic models (i.e., seasonally modulated first-order autoregressive models) for the other climate modes:

$$
\frac{d}{dt} \begin{pmatrix} X_{\text{ENSO}} \\ X_M \end{pmatrix} = L \begin{pmatrix} X_{\text{ENSO}} & X_M \end{pmatrix} + \begin{pmatrix} N_{\text{ENSO}} & N_M \end{pmatrix} + \sigma_{\xi} \xi, \quad (1)
$$

$$
\frac{d\xi}{dt} = -r_{\xi} \xi + w(t), \quad (2)
$$

where 

$$
X_{\text{ENSO}} = [T_{\text{ENSO}}, h ]
$$

and 

$$
X_M = [T_{\text{NPMM}}, T_{\text{SPMM}}, T_{\text{IOB}}, T_{\text{IOD}}, T_{\text{SIOD}}, T_{\text{TNA}}, T_{\text{ATL3}}, T_{\text{SASD}}]
$$

are state vectors of ENSO and other climate modes, respectively. This model allows for two-way interactions between ENSO and the other modes.

Two indices are used to describe the oscillatory behavior of ENSO. They consist of SSTAs averaged over the Niño3.4 region (170°–120°W, 5°S–5°N) ($T_{\text{ENSO}}$) and thermocline depth anomalies averaged over the equatorial Pacific (120°E–80°W, 5°S–5°N) ($h$), i.e., the WWV index (with a constant factor of the area it covers). 

For other climate modes, we consider the SST indices of multiple climate modes (Supplementary Table 1 in [Zhao et al. 2024](#ref-zhao-2024)) that have been shown to interact with ENSO, including the North and South Pacific Meridional Modes (NPMM and SPMM) in the extratropical Pacific, the Indian Ocean Basin (IOB) mode, Indian Ocean Dipole (IOD) mode, and Southern IOD (SIOD) in the Indian Ocean, and Tropical North Atlantic (TNA) variability, Atlantic Nino (), and South Atlantic Subtropical Dipole (SASD) in the Atlantic Ocean.

We recognize the possibility of enhancing ENSO forecast skill by incorporating additional modes of variability, provided they directly interact with ENSO, exhibit substantial memory extending beyond months, and offer additional sources of variability beyond the chosen eight.

For the detailed fitting and simulations of the XRO model, please refer to our paper ([Zhao et al., 2024](#ref-zhao-2024)).

## Citation

Kindly requested to cite our paper and the code if use the XRO model in your published works.

<ul class="references">
  <li><a id="ref-zhao-2024"></a>Zhao, S., Jin, F.-F., Stuecker, M. F., Thompson, P. R., Kug, J.-S., McPhaden, M. J., et al. (2024). Explainable El Niño predictability from climate mode interactions. <strong><em>Nature, 630</em></strong>(8018), 891–898. <a href="https://doi.org/10.1038/s41586-024-07534-6">https://doi.org/10.1038/s41586-024-07534-6</a></li>
 <li><a id="ref-zhao-2024_code"></a>Zhao, S. (2024). Extended nonlinear Recharge Oscillator (XRO) model for "Explainable El Niño predictability from climate mode interactions". Zenodo.  <a href="https://doi.org/10.5281/zenodo.10681114">https://doi.org/10.5281/zenodo.10681114</a> </li>

</ul>

## Availability to the code

This XRO model code is hosted at https://github.com/senclimate/XRO. We have designed XRO to be user-friendly, aiming to be a valuable tool not only for research but also for operational forecasting and as an educational resource in the classroom. We hope that XRO proves to be both a practical and accessible tool that enhances your research and teaching experiences. If you encounter problems in running XRO or have questions, please feel free to contact Sen Zhao (zhaos@hawaii.edu) or create issues [Here](https://github.com/senclimate/XRO/issues).
