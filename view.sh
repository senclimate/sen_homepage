#!/usr/bin/env bash

#module load hugo

hugo server --bind 127.0.0.1 --port 1313 --baseURL http://localhost:1313

#hugo server --panicOnWarning --disableFastRender  #--i18n-warnings


## ssh -L 1313:127.0.0.1:1313 zhaos@epekema.soest.hawaii.edu
