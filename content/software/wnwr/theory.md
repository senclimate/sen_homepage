---
title: Theoretical basis for stationary Rossby wave propagation
linktitle: 
toc: true
type: book
date: "2019-05-05T00:00:00+01:00"
draft: false
menu:
  wnwr:
#    parent: Overview
    name: Theory
    weight: 1

# Prev/next pager order (if `docs_section_pager` enabled in `params.toml`)
weight: 1
---

-------------

## 1 Classic theory on zonal basic flow $\bar{u} = \bar{u}(y), \bar{v} = 0$

The classical Rossby wave propagation theory ([Hoskins and Karoly 1981](https://doi.org/10.1175/1520-0469(1981)038<1179:TSLROA>2.0.CO;2)) begin with a nondivergent barotropic vorticity equation linearized about $\bar{u} = \bar{u}(y)$ on a Mercator projection of a sphere takes the form

$$ \left(  \frac{\partial}{\partial t} + \bar{u}_m \frac{\partial}{\partial x} \right) \nabla_M^2 \psi' + \bar{\beta}_m \frac{\partial \psi' }{\partial x} = 0 $$

where $\bar{u}_m = \frac{u}{\cos \varphi}$ is the ambient zonal wind and

$$
\bar{\beta}_m = \frac{2 \Omega \cos^2 \varphi}{a} - \frac{\cos\varphi}{a^2} \frac{\partial}{\partial \varphi} \left[ \frac{1}{\cos\varphi} \frac{\partial \bar{u} \cos\varphi }{\partial \varphi} \right]
$$

is the meridional gradient of the absolute vorticity in the Mercator projection.

The **dispersion relation** is

$$ \omega = \bar{u}_m k - \frac{ \bar{\beta}_m k }{k^2+l^2} $$

where $\omega$ is the frequency of the disturbances; $k$  and $l$ are zonal and meridional wavenumbers, respectively. The latitudinal distribution of the meridional wavenumber $l$ can be calculated for a given zonal wavenumber $k$ for the stationary wave ($\omega =0$), yielding
$$ l^2(\varphi) = K_s^2 - k^2$$
where $K_s$ is the stationary wavenumber, defined as $K_s = \sqrt{{\bar{\beta}_m}/{\bar{u}_m}}$.

**The stationary waves can propagate if the flow is westerly ($\bar{u}_m$ positive) with positive meridional absolute vorticity gradient ($\bar{\beta}_m$ positive)**. The case with easterly flow and negative $\bar{\beta}_m$ is usually not considered since it is rare in the real atmosphere.



Please refer to  and [Hoskins and Ambrizzi (1993)](https://doi.org/10.1175/1520-0469(1993)050<1661:RWPOAR>2.0.CO;2) for the details.

[Hoskins and Ambrizzi (1993)](https://doi.org/10.1175/1520-0469(1993)050<1661:RWPOAR>2.0.CO;2) suggested that the classic theory for zonally averaged flow can be applied to a realistic longitudinally varying flow by considering the local latitudinal zonal wind profile; i.e., by replacing $\bar{\beta}_m(\varphi)$ and $\bar{u}_m(\varphi)$ in the expression of stationary wavenumber with the local flow state $\bar{\beta}_m(\lambda, \varphi)$ and $\bar{u}_m(\lambda, \varphi)$ separately to obtain the local stationary wavenumber $K_s(\lambda, \varphi)$. This extension is based on the assumptions that (1) meridional flow and the zonal absolute vorticity gradient may be neglected to a first order approximation compared with zonal flow and the meridional absolute vorticity gradient, respectively; and (2) the meridional wavelength is greater than or equal to the zonal wavelength.


<span style="color:ORANGERED">Many interhemispheric teleconnections cannot be understood via the classic stationary Rossby wave theory (see discussions in [Zhao et al. 2015]({{< ref "/publication/2015_zhaos_jc_app/index.md" >}})).</span>

-------------

## 2 Rossby wave theory on a horizontally non-uniform flow $\bar{u} = \bar{u}(x, y), \bar{v} = \bar{v}(x, y)$

The **dispersion relation** describing the propagation characteristics of perturbations can be derived from the linearized barotropic non-divergent vorticity equation on a time-mean slowly varying basic state with the WKB approximation ([Karoly 1983](https://doi.org/10.1016/0377-0265(83)90013-1), [Li and Nathan 1997](https://doi.org/10.1175/1520-0469(1997)054<0332:EOLFTF>2.0.CO;2), [Li et al. 2015]({{< ref "/publication/2015_lyj_jas_wave/index.md" >}}), [Zhao et al. 2015]({{< ref "/publication/2015_zhaos_jc_app/index.md" >}})) as

$$ \omega = \bar{u}_m k+\bar{v}_m l + \frac{ \bar{q}_x l - \bar{q}_y k }{k^2+l^2} $$

where $\bar{u}_m = \frac{u}{\cos \varphi}, \bar{v}_m = \frac{v}{\cos \varphi}$ are the zonal and meridional component of the basic flow under Mercator projection, $\bar{q}_x$ and $\bar{q}_y$ are the gradient of the basic state absolute vorticity $\bar{q}=2\Omega \sin⁡ \varphi + \nabla^2 \bar{\psi}$ along the longitude and latitude, $k, l, \omega$ are the zonal wavenumber, meridional wavenumber, and the angular frequency, respectively.

Using the **dispersion relation** and kinematic wave theory (Whitham 1960; Bühler 2009) gives the following ray tracing equations
$$\frac{D_g k}{Dt}=-k\frac{∂\bar{u}_m}{∂x}-l\frac{∂\bar{v}_m}{∂x}-\frac{l \frac{∂^2\bar{q}}{∂x^2}-k\frac{∂^2\bar{q}}{∂x∂y}}{K^2}$$
$$\frac{D_g l}{Dt}=-k\frac{∂\bar{u}_m}{∂y}-l\frac{∂\bar{v}_m}{∂y}-\frac{l \frac{∂^2\bar{q}}{∂x∂y}-k\frac{∂^2\bar{q}}{∂y^2}}{K^2}$$
$$\frac{D_g x}{Dt}=u_g=\bar{u}_m+\frac{(k^2-l^2)\frac{∂\bar{q}}{∂y}-2kl\frac{∂\bar{q}}{∂x}}{K^4}$$
$$\frac{D_g y}{Dt}=v_g=\bar{v}_m+\frac{2kl\frac{∂\bar{q}}{∂y}+(k^2-l^2)\frac{∂\bar{q}}{∂x}}{K^4}$$
where the local group velocity vector ${c}_g=\left(u_g,v_g\right)$ and $\frac{D_g}{Dt}=\partial/\partial t+{c}_g\bullet\nabla$ represents the derivative along group velocity rays.

See [Li et al. (2015)]({{< ref "/publication/2015_lyj_jas_wave/index.md" >}}) and [Zhao et al. (2015)]({{< ref "/publication/2015_zhaos_jc_app/index.md" >}}) for details of Rossby wave propagation behaviors on a horizontally non-uniform flow.
