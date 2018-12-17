# Changelog
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

## Iteration 5
In this sprint, we focused on wrapping up the core mechanics of the application, correctly linking the database to the application and overall polishing the application. Also, the project gained a new name 'RoutineGo' and logo.

[`#12`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/12) Added tutorial cards   
[`#23`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/23), [`#96`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/96) Routines now have a periodicity parameter added to it Routines can now be sorted by parents  
[`#92`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/92) Pipelines should now run as expected (checking both Django and Jest)  
[`#84`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/84) Routines now have a periodicity parameter added to it  
[`#26`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/26) Activities may now be removed from routines
[`#94`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/94) Image paths are now URL instead of file paths to accommodate the database  
[`#31`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/31), [`#86`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/86) Sounds can now be toggled on and off  
[`#90`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/90) The database is correctly created and populated  
[`#76`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/76), [`#99`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/99), [`#95`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/95), [`#105`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/105), [`#109`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/109), [`#101`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/101), [`#106`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/106), [`#107`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/107) The application now interacts with the database, storing and fetch its information from Django  
[`#77`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/77) Parents may now invalidate activities performed by their children  
[`#24`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/24) Children's activities are now logged and displayed on the parent area  
[`#79`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/79) Activities which are completed or failed have matching sounds to better identify these situations  
[`#88`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/88) Confettis now drop on routine completion  
[`#82`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/82) Completing a routine now grants extra stars  
[`#89`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/89) Fixed a subtraction sign on activity timer countdown  
[`#78`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/78) Fixed a formatting bug which occasionally occurred on the reward modal  
[`#80`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/80) Instead of text, failed activities now sport a frowny face for better identification  
[`#51`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/51) Parents are prompted with their password on attempted parent area access  
[`#97`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/97) Parents may now add custom rewards on level-up  
[`#17`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/17) Parents may now add default activities to their routines  
[`#6`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/6), [`#5`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/5) It's now possible to create and remove children from your account  
[`#83`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/83) Children may now buy items and customize their avatars!  
[`#100`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/100) Session is now remembered if the user has previously logged in  
[`#102`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/102) Added spinners so users are presented with some sort of feedback while fetching data from database  
[`#108`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/108) The application now has a brand new name and icon!  
[`#85`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/85) The 'clean room' activity has been deemed obsolete and been deleted  
[`#81`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/81) Parents may now delete custom activities  
[`#103`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/103) Added an about and licenses page  
[`#58`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/58) The database now feeds new routines to a child based on whether a new day dawned  
[`#110`](https://gitlab.com/feup-tbs/ldso18-19/t4g2/issues/110) Test coverage has been largely improved