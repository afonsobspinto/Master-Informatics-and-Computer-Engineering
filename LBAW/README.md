## LBAW - GROUP1764   
   
Project developed for FEUP's LBAW course.
   
### Theme: 6. Online Auctions   

It is intended to develop an information system with a web interface to support an online auction service. Any registered user can place items up for auction or bid on items available. The system should automatically manage the bidding deadlines and determine the winning bid. System managers are allowed to stop auction block accounts or delete content.

[![LBAW](https://i.imgur.com/uZKO08L.png)](https://vimeo.com/272700034)
   
### Run Locally:
1. `composer install`
2. `docker compose-up`
3. `php artisan storage:link`
4. `./compile-assets`
5. `./reset_pictures`
6. `./reset_db`
7. `php artisan serve`
   
 
### Elements:   
 * Afonso Bernardino da Silva Pinto, up201503316@fe.up.pt
 * Cristiana Maria Monteiro Ribeiro, up201305188@fe.up.pt
 * Rostyslav Khoptiy, up201506219@fe.up.pt	
 * Tomás Sousa Oliveira, up201504746@fe.up.pt
