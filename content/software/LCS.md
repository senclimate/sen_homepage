---
# Course title, summary, and position.
linktitle: LCS
summary: "A linear continuously stratified ocean model on the WKBJ approximation"
weight: 6

# Page metadata.
title: A linear continuously stratified (LCS) ocean model 
date: "2025-06-22T00:00:00Z"
lastmod: "2025-06-22T00:00:00Z"
draft: false
toc: false
type: book

image:
  focal_point: Center
  filename: "pubs/LCS_logo.png"
  maxheight: 250px

# Add menu entry to sidebar.
---

LCS ocean model is a dynamical ocean model, which is basically McCreary's (1981) linear continuously stratified ocean model, extended to all tropical oceans with a more realistic coastline and a space-dependent background stratification (see model fomulations in Text S1 of [Zhao et al. 2021](https://agupubs.onlinelibrary.wiley.com/action/downloadSupplement?doi=10.1029%2F2020GL092335&file=2020GL092335-sup-0001-Supporting+Information+SI-S01.pdf)). The shallow water equations are solved separately for each baroclinic mode, and the total solution is the linear sum of low-order baroclinic modes. It has been shown that the stratified model with two (or more) baroclinic modes performs significantly better than the 1.5-layer reduced gravity model. Using both local vertical modes and spatially varying wind projection coefficients based on the WKBJ approximation gives a noticeably more realistic sea level and current structure.

## Citation

The LCS package is described in the follow paper, which should be referenced if you use the LCS model in publications:

{{< cite page="/publication/2021_zhaos_grl_cptsub" view="4" >}}


## Availability of the code

If you are interested in using the [LCS]({{< ref "software/lcs" >}}) model, please email me at [zhaos@hawaii.edu](mailto:zhaos@hawaii.edu) with a brief description of your intended use.