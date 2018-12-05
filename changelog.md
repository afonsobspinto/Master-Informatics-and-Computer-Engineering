# Changelog
![Issues Open](https://img.shields.io/badge/issues-open_37-54cc1f.svg) ![Issues Closed](https://img.shields.io/badge/issues-closed_55-d7af23.svg) ![Downloads](https://img.shields.io/badge/downloads-0_total-54cc1f.svg) ![Version](https://img.shields.io/badge/version-0.4.0-54cc1f.svg) ![Coverage](https://img.shields.io/badge/coverage-65%25-yellowgreen.svg)

## Iteration 4
In this sprint we implemented a first version of the Parent user side of the application where the a parent may manage the setting of the app according to his/her child needs. We also fixed some bugs and improved the feel of the Child user side of the application. And so, we come to conclusion of the following issues:

[`#1`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/1) Implemented a Screen to register an account
[`#2`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/2) Implemented a Screen to log into an account
[`#49`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/49) Implemented feedback patterns when an activity is nearing finish time
[`#50`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/50) Implemented beep sounds to sign activity near finishing time
[`#52`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/52), [`#52`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/10) Added an animation for completed activity thumbnails in the post activity modal
[`#53`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/53) Added a modal that shows a reward when a child completes a level
[`#55`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/55) Changed the timer in activity so it counts down instead of up, this way the player has a better sence of the remaining time
[`#56`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/56) Implemented a screen where a parent user can costumize the parameters of a costum activity
[`#57`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/57) Added a new default afternoon routine, alongside the already existing morning and night ones
[`#60`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/60) Fixed typo 'trabalhos para casa'
[`#61`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/61) Moved every setting from the "blue buttons screen" to a new general settings tab inside the parent area, thus rendering the placeholder screen no longer necessary
[`#62`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/62) Fixed camera and gallery photo uploading
[`#63`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/63) Implemented a screen where a parent user can manage the routines of a child
[`#64`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/64) Added a tab footer in which the user may choose between different screens
[`#71`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/71) Updated the styling of the create new activity screen

As for the technical side, we improved pipeline aesthetics and efficiency so that it can also meet the virtualized development environment requirements. Settled up digital ocean droplet with two different servers and databases (prod and staging). And we improved test coverage. So we closed:

[`#65`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/65) Included Expo in pipelines
[`#66`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/66) Added Django to pipelines
[`#67`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/67) Completed docker dev enviroment
[`#68`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/68) Changed tests to use enzyme framework for snapshot rendering and wrote tests for Redux related code
[`#69`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/69) Fixed expo publish
[`#70`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/70) Changed data base host to Digital Ocean Droplet
[`#72`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/72) Improved test coverage to 65%, where the remaining 35 are not being tested because they are not considered to be in a complete state yet

Also closed issues [`#3`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/3), [`#16`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/16), [`#28`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/28), [`#33`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/33), [`#34`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/34), [`#36`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/36) and [`#39`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/39) as they were deemed not worthy of development because they don't fit in the PO's vision of the finished product.
