#!/usr/bin/env bash

module load hugo
hugo server --panicOnWarning --disableFastRender --bind 128.171.151.93 --baseURL http://128.171.151.93/ #--i18n-warnings


#hugo server --panicOnWarning --disableFastRender  #--i18n-warnings


## ssh -L 1313:127.0.0.1:1313 zhaos@epekema.soest.hawaii.edu