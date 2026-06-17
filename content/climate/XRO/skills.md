---

linktitle: "Hindcast Skills"
summary: ""
weight: 6

# Page metadata.
title: "Operational XRO Climate Forecasts"
date: "2024-08-09T00:00:00Z"
lastmod: "2024-08-09T00:00:00Z"
draft: false
toc: false  # Show table of contents? true/false
type: book  # Do not modify.

---

### XRO model 

The XRO is an e**X**tended nonlinear **R**echarge **O**scillator model for El Niño-Southern Oscillation (ENSO) and other modes of variability in the global oceans ([Zhao et al. 2024](#ref-zhao-2024)). It builds on the legacies of the Hasselmann stochastic climate model capturing upper ocean memory in sea surface temperature (SST) variability ([Hasselmann, 1976](#ref-hasselmann-1976)), and the recharge oscillator model for the oscillatory core dynamics of ENSO ([Jin, 1997](#ref-jin-1997)). It constitutes a parsimonious representation of the climate system in a reduced variable and parameter space that still captures the essential dynamics of interconnected global climate variability. For the detailed formulation of XRO model, please refer to our paper ([Zhao et al., 2024](#ref-zhao-2024)).

### Data source

Operationally, we produce 18-month forecasts using the trained XRO model based on climate mode indices from 1982–2022, with initial conditions starting in January 2023. The XRO state vectors include ENSO and other climate modes, derived from:

- **Monthly SST anomaly indices**, based on:
  - [OISST v2.1](https://psl.noaa.gov/data/gridded/data.noaa.oisst.v2.highres.html) provided by NOAA/PSL
  - [ERA5](https://doi.org/10.24381/cds.f17050d7) provided by the Copernicus Climate Change Service (C3S)
  - [ORAS5](https://doi.org/10.24381/cds.67e8eeb7) SST provided by C3S
  - [GODAS](https://psl.noaa.gov/data/gridded/data.godas.html) SST provided by NOAA/PSL

- **Monthly Warm Water Volume (WWV) index** of equatorial Pacific upper-ocean heat content, based on:
  - [TAO](https://www.pmel.noaa.gov/elnino/upper-ocean-heat-content-and-enso) data provided by NOAA/PMEL
  - [IAPv4 subsurface temperature](http://www.ocean.iap.ac.cn/ftp/cheng/IAPv4.2_IAP_Temperature_gridded_1month_netcdf) provided by Lijing Cheng at IAP, Chinese Academy of Sciences
  - [ORAS5](https://doi.org/10.24381/cds.67e8eeb7) D20 provided by C3S 
  - [GODAS](https://psl.noaa.gov/data/gridded/data.godas.html) provided by NOAA/PSL

We conduct 1000-member stochastic forecasts with the same initial conditions for each month but different stochastic forcings, See Supplementary Fig. 16 in [Zhao et al. (2024)](#ref-zhao-2024) for how we make 1000-member stochastic forecasts in details.

- Due to delays in TAO updates, the OISSTv2_IAPv4 version has been adopted for the official release starting June 2025.
- Due to delays in IAPv4 updates, the ORAS5 version has been adopted for the official release starting June 2026.


### ENSO forecast skill
![Forecast correlation skill (ACC) for Niño3.4 across model combinations derived from different SST and WWV data](/XRO_skills/XRO_Nino34_out_of_sample_skill_2012-2024.png)
**Figure 1**: Out-of-sample forecast accuracy from XRO trained on 1982–2011 data and verified over 2012–2024. Lines show correlation skill as a function of lead month for different combinations of SST and WWV datasets (e.g., `OISSTv2_godas`, `ERA5_oras5`, etc.).

![Forecast correlation skill (ACC) for Niño3.4 across model combinations derived from different SST and WWV data](/XRO_skills/XRO_Nino34_in_sample_skill_1982-2024.png)
**Figure 2**: In-sample forecast accuracy from XRO trained on 1982–2024.

### IOD forecast skill
![Forecast correlation skill (ACC) for IOD across model combinations derived from different SST and WWV data](/XRO_skills/XRO_IOD_out_of_sample_skill_2012-2024.png)
**Figure 3**: Out-of-sample forecast accuracy from XRO trained on 1982–2011 data and verified over 2012–2024. Lines show correlation skill as a function of lead month for different combinations of SST and WWV datasets (e.g., `OISSTv2_godas`, `ERA5_oras5`, etc.).

![Forecast correlation skill (ACC) for IOD across model combinations derived from different SST and WWV data](/XRO_skills/XRO_IOD_in_sample_skill_1982-2024.png)
**Figure 4**: In-sample forecast accuracy from XRO trained on 1982–2024.


### References

<ul class="references">
  <li><a id="ref-zhao-2024"></a>Zhao, S., Jin, F.-F., Stuecker, M. F., Thompson, P. R., Kug, J.-S., McPhaden, M. J., et al. (2024). Explainable El Niño predictability from climate mode interactions. <strong><em>Nature, 630</em></strong>(8018), 891–898. <a href="https://doi.org/10.1038/s41586-024-07534-6">https://doi.org/10.1038/s41586-024-07534-6</a></li>

  <li><a id="ref-jin-1997"></a>Jin, F.-F. (1997). An equatorial ocean recharge paradigm for ENSO. Part I: conceptual model. <strong><em>Journal of the Atmospheric Sciences, 54</em></strong>, 811–829. <a href="https://doi.org/10.1175/1520-0469(1997)054<0811:aeorpf>2.0.co;2">https://doi.org/10.1175/1520-0469(1997)054&lt;0811:aeorpf&gt;2.0.co;2</a></li>

  <li><a id="ref-hasselmann-1976"></a>Hasselmann, K. (1976). Stochastic climate models Part I. Theory. <strong><em>Tellus, 28</em></strong>(6), 473–485. <a href="https://doi.org/10.1111/j.2153-3490.1976.tb00696.x">https://doi.org/10.1111/j.2153-3490.1976.tb00696.x</a></li>
</ul>

<!-- {{< cite page="/publication/2024_zhaos_nature_XRO" view="3" >}}
 -->
