DELETE FROM won_auctions;
DELETE FROM closed_auctions;
DELETE FROM wishlists;
DELETE FROM qas;
DELETE FROM reviews;
DELETE FROM bids;
DELETE FROM auctions;
DELETE FROM emails;
DELETE FROM bans;
DELETE FROM users;
DELETE FROM cities;
DELETE FROM reports;
DELETE FROM messages;
DELETE FROM countries;
DELETE FROM categories;


INSERT INTO "public"."categories" ("id","name") VALUES (1,'car');
INSERT INTO "public"."categories" ("id","name") VALUES (2,'laptop');
INSERT INTO "public"."categories" ("id","name") VALUES (3,'smartphone');
INSERT INTO "public"."categories" ("id","name") VALUES (4,'headphones');
INSERT INTO "public"."categories" ("id","name") VALUES (5,'motorcycle');
INSERT INTO "public"."categories" ("id","name") VALUES (6,'computer');
INSERT INTO "public"."categories" ("id","name") VALUES (7,'monitor');
INSERT INTO "public"."categories" ("id","name") VALUES (8,'television');

INSERT INTO "public"."countries" ("id","country") VALUES (1,'Kiribati');
INSERT INTO "public"."countries" ("id","country") VALUES (2,'French Southern Territories');
INSERT INTO "public"."countries" ("id","country") VALUES (3,'Ghana');
INSERT INTO "public"."countries" ("id","country") VALUES (4,'Belize');
INSERT INTO "public"."countries" ("id","country") VALUES (5,'Ethiopia');
INSERT INTO "public"."countries" ("id","country") VALUES (6,'Hungary');
INSERT INTO "public"."countries" ("id","country") VALUES (7,'United Arab Emirates');
INSERT INTO "public"."countries" ("id","country") VALUES (8,'Nigeria');
INSERT INTO "public"."countries" ("id","country") VALUES (9,'Suriname');
INSERT INTO "public"."countries" ("id","country") VALUES (10,'S. Georgia and S. Sandwich Isls.');
INSERT INTO "public"."countries" ("id","country") VALUES (11,'Iran');
INSERT INTO "public"."countries" ("id","country") VALUES (12,'Malta');
INSERT INTO "public"."countries" ("id","country") VALUES (13,'Gambia');
INSERT INTO "public"."countries" ("id","country") VALUES (14,'Portugal');
INSERT INTO "public"."countries" ("id","country") VALUES (15,'Lebanon');
INSERT INTO "public"."countries" ("id","country") VALUES (16,'Netherlands');
INSERT INTO "public"."countries" ("id","country") VALUES (17,'Kiribati');
INSERT INTO "public"."countries" ("id","country") VALUES (18,'Italy');
INSERT INTO "public"."countries" ("id","country") VALUES (19,'Mozambique');
INSERT INTO "public"."countries" ("id","country") VALUES (20,'Heard and McDonald Islands');
INSERT INTO "public"."countries" ("id","country") VALUES (21,'Brazil');
INSERT INTO "public"."countries" ("id","country") VALUES (22,'Egypt');
INSERT INTO "public"."countries" ("id","country") VALUES (23,'United States of America');
INSERT INTO "public"."countries" ("id","country") VALUES (24,'France');
INSERT INTO "public"."countries" ("id","country") VALUES (25,'Monaco');
INSERT INTO "public"."countries" ("id","country") VALUES (26,'French Southern Territories');
INSERT INTO "public"."countries" ("id","country") VALUES (27,'United Arab Emirates');
INSERT INTO "public"."countries" ("id","country") VALUES (28,'Syria');
INSERT INTO "public"."countries" ("id","country") VALUES (29,'Germany');
INSERT INTO "public"."countries" ("id","country") VALUES (30,'Nicaragua');
INSERT INTO "public"."countries" ("id","country") VALUES (31,'France');
INSERT INTO "public"."countries" ("id","country") VALUES (32,'US Minor Outlying Islands');
INSERT INTO "public"."countries" ("id","country") VALUES (33,'Russia');
INSERT INTO "public"."countries" ("id","country") VALUES (34,'Mali');
INSERT INTO "public"."countries" ("id","country") VALUES (35,'China');
INSERT INTO "public"."countries" ("id","country") VALUES (36,'Finland');
INSERT INTO "public"."countries" ("id","country") VALUES (37,'Japan');
INSERT INTO "public"."countries" ("id","country") VALUES (38,'Cameroon');
INSERT INTO "public"."countries" ("id","country") VALUES (39,'Virgin Islands (U.S.)');
INSERT INTO "public"."countries" ("id","country") VALUES (40,'Russian Federation');
INSERT INTO "public"."countries" ("id","country") VALUES (41,'Ghana');
INSERT INTO "public"."countries" ("id","country") VALUES (42,'Honduras');
INSERT INTO "public"."countries" ("id","country") VALUES (43,'Aruba');
INSERT INTO "public"."countries" ("id","country") VALUES (44,'Botswana');
INSERT INTO "public"."countries" ("id","country") VALUES (45,'Zimbabwe');
INSERT INTO "public"."countries" ("id","country") VALUES (46,'Cote D''Ivoire (Ivory Coast)');
INSERT INTO "public"."countries" ("id","country") VALUES (47,'Bahrain');
INSERT INTO "public"."countries" ("id","country") VALUES (48,'Guatemala');
INSERT INTO "public"."countries" ("id","country") VALUES (49,'Canada');
INSERT INTO "public"."countries" ("id","country") VALUES (50,'Italia');


INSERT INTO "public"."messages" ("id","subject","message","send_date") VALUES (1,'Qj8aixfPmTeMcNnAN1' ,'Another messahgedwa wdwa ','11/26/2000 10:21:00');
INSERT INTO "public"."messages" ("id","subject","message","send_date") VALUES (2,'U0ncfZbDVOHZThv2dGnDfmmZKeerlzQU6XcaMLlebWbtDw3UVuwUZpJSI8rAlfCqsr43puJ61U1NKUHAq5CENUby3zUmK7nORM3Q6Hi0eJuLOGktujJloZyqvLb55ILlAVqrkSJWK5mvXrYFMBFcSmenT81UsVc6BoVSRbjAZcOvAghHTNmvWmuY48ZRQn8r2','ZziNgQ7tHjsIIj1dGPo8VVfFwyv0YZa2f0ttLgkzkIvoOdkc6FnJk2e8fORR35WHEnQAQTIQlGC8F7OlZLgbcGwiaytQzgtAFIAsZ6JCweB5hXwFvv4lQaNdiViHe32BVcf7GRSNp8SS8ROIrA88SGoTZZmrT6jqMlfmNfhuV0yTPKUX44gkS','10/26/2009 06:19:00');
INSERT INTO "public"."messages" ("id","subject","message","send_date") VALUES (3,'huyRPnXkUEOhn3625CNS8kLmCHqiWUCUqZZyZwlKJLT7MzD4','G0qarV2iZwcXlgnS7al3eOu','07/03/2005 08:02:00');
INSERT INTO "public"."messages" ("id","subject","message","send_date") VALUES (4,'OsuIQhtwOk0bPfaX3rDXiPVYjcWshH5uPURx63GkDYz0Enw6qWsTpprnj267SXcDAA5pdKIJPCAfLjDdEy2BP0eLUeP','irYQr5kTno5GjAbgpgCG2vGJp1mjN21TMnWVgzexxOYMMdILDeogZMiFdjcyfgPc78tCfPQanscoBmsTuMnAhsPGG7nEiRDwLQ','07/04/2000 01:55:00');
INSERT INTO "public"."messages" ("id","subject","message","send_date") VALUES (5,'deX8ZPbDdpdUhyjqBD7jHaSWL2Op8UmjPPpUkgglr8hTqvTzYTELIUdUhLlWOdmKkQr3NM2xLmL2IM4fJ8e1bj6ECYRg4WOIuIQ4Xzj652ckpHA70RrWdp6VR67XD85rZkUKiZ','IB1FysKucmBpRPinp3LmtmkotBE2ZDWLUNL2IdEIXSzhvBxQkqnftuRjqZbkBP4','08/19/2012 04:51:00');
INSERT INTO "public"."messages" ("id","subject","message","send_date") VALUES (6,'fOoHZTVXph5iIOTLm716XXw624ZhltQ82jeDkzB8pew6Hv2nGvgHVDNcjIdDOnEIalOWDmCGywRGjxDbWijyoRqeaRIrZmvSbMQ82XcA5mlLL54oCnJg0pG24JOq8dRWSP38SOAj2RFrQmNah3NwYXfQrfplbDwmSHNt0xBCkRF4KZaflNIliHWMkeldqxqw01DZyMKMZJAeNKGu51xCuIm5Ofe','NKz6TbzWfyj0wnNWqNMB7lgrnjIa8BYHM4A8Q5REGvN0i3ZDEbeW000DxeAD503H42nygNk8fheRfI0QlEQ','10/29/2013 08:47:00');
INSERT INTO "public"."messages" ("id","subject","message","send_date") VALUES (7,'De5EUi6zelaVEufO2rKGZyF1wLD3Lo3JeVZKZsXGK2gocCvvJYdSegTfGz8EyTYjO2kL7Ey','bauHM21euQRZR3208LizEtZfh7LSL4HL2J',NULL);
INSERT INTO "public"."messages" ("id","subject","message","send_date") VALUES (8,'nsnstrOE1YX2YCeCvVgtRvnIF3df3tYttlwJ3gFsu1qgUWWH2RrO7q2Hcsku2y6iYVxLfRolppRUfNKbK3ZZCQ5aF3YHpH8Z5ylH86Fhe6qsYs5CtGj4g3UfzPQq03VkuRngRm8R2jxnh16gVjyFthVrzoY257lHnsOvzzdR4QsoeWhJlo','Zlqo0A2d4dgyzXzohQKEKb','10/18/2000 02:05:00');
INSERT INTO "public"."messages" ("id","subject","message","send_date") VALUES (9,'OIAxjji3gO3WjaToLM5nyzhGFBtZWqgLpJQXGMTQbf6PAmUAbGjU2Tp0pJzvEXQKdGMFTokJjcGdEL2DnUNHZfqBbME5c27WmnY1ufFqa0k77wwLriBy4i0t6Iqj1D1QiXSFoV6GR','wkrce1a7Mx8R5fUUb2Sv0GaTXxSdB6FbwxR2XAaIwsMfJVM26iwAvFwh8GMQqhfiQeNqL2ep1ZX1ZmKouex7TQKI0PEuI1VSkoIipzcwbchF6GroyEGkiINBlkREAsrKDyM2q5hkwPhvva0aaw1EXtPcXkaWAPBDmiNe2kW4Hz6YhOa3OtZPFOLcyxsPiQ07PjbEaRkMJK4feYinbXN0LoS4FQRr8aaZqjgf2iSM1oednH4tXqYFHnpe',NULL);
INSERT INTO "public"."messages" ("id","subject","message","send_date") VALUES (10,'ywlD5byLg0nJVjs3eZs5GNzjdTsGQuP3Cw','Some message , ttuut', '08/24/2007 02:48:00');


INSERT INTO "public"."reports" ("id") VALUES (1);
INSERT INTO "public"."reports" ("id") VALUES (2);
INSERT INTO "public"."reports" ("id") VALUES (3);
INSERT INTO "public"."reports" ("id") VALUES (4);
INSERT INTO "public"."reports" ("id") VALUES (5);


INSERT INTO "public"."cities" ("city","country_id") VALUES ('Nizhny Novgorod', 1);
INSERT INTO "public"."cities" ("city","country_id") VALUES ('Weifang', 1);
INSERT INTO "public"."cities" ("city","country_id") VALUES ('Taiyuan',2);
INSERT INTO "public"."cities" ("city","country_id") VALUES ('Dallas (TX)',3);
INSERT INTO "public"."cities" ("city","country_id") VALUES ('TEHRAN',4);
INSERT INTO "public"."cities" ("city","country_id") VALUES ('Pueblade Zaragoza',4);
INSERT INTO "public"."cities" ("city","country_id") VALUES ('Quezon City',5);
INSERT INTO "public"."cities" ("city","country_id") VALUES ('Fulin',5);
INSERT INTO "public"."cities" ("city","country_id") VALUES ('Kunming',5);
INSERT INTO "public"."cities" ("city","country_id") VALUES ('BUDAPEST',6);
INSERT INTO "public"."cities" ("city","country_id") VALUES ('Lisbon',14);
INSERT INTO "public"."cities" ("city","country_id") VALUES ('Faro',14);
INSERT INTO "public"."cities" ("city","country_id") VALUES ('Porto',14);
INSERT INTO "public"."cities" ("city","country_id") VALUES ('Braga',14);


-- ALL passwords are '123456'
INSERT INTO "public"."users" ("id","username","first_name","last_name","password","email","zip_code","address","registration_date","location","rating","is_administrator") VALUES (1,'a','Ross',NULL,'$2y$10$iZp1uAimUgGSJ/mqLbqoouPk5lhQQfhJWw1xzTF7/kppazpSXBogy','a@a.a','94167','31 Stewart Ave','04/04/2011 06:48:00',1,1.58,True);
INSERT INTO "public"."users" ("id","username","first_name","last_name","password","email","zip_code","address","registration_date","location","rating","is_administrator") VALUES (2,'Mads9','Marie','Katsekes','$2y$10$iZp1uAimUgGSJ/mqLbqoouPk5lhQQfhJWw1xzTF7/kppazpSXBogy','Mick.Byrnes5@telfort.cc','42767','8 Brooke Valley Drive','06/25/2013 03:26:00', 1,1.1,FALSE);
INSERT INTO "public"."users" ("id","username","first_name","last_name","password","email","zip_code","address","registration_date","location","rating","is_administrator") VALUES (3,'Richard889',NULL,'Morton','$2y$10$iZp1uAimUgGSJ/mqLbqoouPk5lhQQfhJWw1xzTF7/kppazpSXBogy','Dave.Petterson@dolfijn.dk','84063',NULL,NULL, 1,4.01,True);
INSERT INTO "public"."users" ("id","username","first_name","last_name","password","email","zip_code","address","registration_date","location","rating","is_administrator") VALUES (4,'Dave3','Isabel','Bloom','$2y$10$iZp1uAimUgGSJ/mqLbqoouPk5lhQQfhJWw1xzTF7/kppazpSXBogy','JohanDepew@libero.be','39927','4235 Serang Place','12/04/2006 00:22:00', 2,3.73,True);
INSERT INTO "public"."users" ("id","username","first_name","last_name","password","email","zip_code","address","registration_date","location","rating","is_administrator") VALUES (5,'Magnus420','Olivia','Stewart','$2y$10$iZp1uAimUgGSJ/mqLbqoouPk5lhQQfhJWw1xzTF7/kppazpSXBogy','E.King3@dolfijn.fr','73108','20 Devonshire Rd','12/06/2016 06:23:00', 2,3.21,True);
INSERT INTO "public"."users" ("id","username","first_name","last_name","password","email","zip_code","address","registration_date","location","rating","is_administrator") VALUES (6,'Sophia812','Olivia','Swaine','$2y$10$iZp1uAimUgGSJ/mqLbqoouPk5lhQQfhJWw1xzTF7/kppazpSXBogy','YLamere@excite.us',NULL,'0 Melrose Ave',NULL, 3,1.22,FALSE);
INSERT INTO "public"."users" ("id","username","first_name","last_name","password","email","zip_code","address","registration_date","location","rating","is_administrator") VALUES (7,'Tim16',NULL,'Bernstein','$2y$10$iZp1uAimUgGSJ/mqLbqoouPk5lhQQfhJWw1xzTF7/kppazpSXBogy','Trees.King@hotmail.gov','94588','991 East MacArthur','11/29/2006 04:42:00', 3,4.91,FALSE);
INSERT INTO "public"."users" ("id","username","first_name","last_name","password","email","zip_code","address","registration_date","location","rating","is_administrator") VALUES (8,'Louise00','Nahay', 'Pelosi','$2y$10$iZp1uAimUgGSJ/mqLbqoouPk5lhQQfhJWw1xzTF7/kppazpSXBogy','LindsyBrown@weboffice.no','71654','2024 Melrose Ave','11/30/2011 01:07:00', 3,3.48,False);
INSERT INTO "public"."users" ("id","username","first_name","last_name","password","email","zip_code","address","registration_date","location","rating","is_administrator") VALUES (9,'guest','guest', 'lbaw64','$2y$10$iZp1uAimUgGSJ/mqLbqoouPk5lhQQfhJWw1xzTF7/kppazpSXBogy','guest@lbaw64.com','71654','2024 Melrose Ave','11/30/2011 01:07:00', 3,3.48,False);
ALTER SEQUENCE users_id_seq RESTART WITH 10;

INSERT INTO "public"."bans" ("id","banned_id","admin","ban_start_date","ban_expiration_date","ban_reason") VALUES (1, 1, 5,'07/02/2001 04:15:00','07/11/2016 09:14:00','6LgRbEbX3RBWeGZsNIhVgaA1bXEdcfTVaNrgkjzYo3wnu8DhLgWSy4faOWd1Y8IuGLCQ2BmbfNdqZNIjwV3DyhvnkPZRlMZXfUykHWN1wY33Eb7zE86hASKPo2tIX0Cpugm1kgarlD3wvr');
INSERT INTO "public"."bans" ("id","banned_id","admin","ban_start_date","ban_expiration_date","ban_reason") VALUES (2, 1, 5,'06/05/2012 06:13:00',NULL,'bxIYx5OjvL5V6rR4AAKxxDsRuj2hB6wCe11uwNwPgwKo');


INSERT INTO "public"."emails" ("id","has_been_opened","receiver_id","sender_id") VALUES (6,False, 1, 2);
INSERT INTO "public"."emails" ("id","has_been_opened","receiver_id","sender_id") VALUES (7,False, 1, 5);
INSERT INTO "public"."emails" ("id","has_been_opened","receiver_id","sender_id") VALUES (8,False, 2, 3);
INSERT INTO "public"."emails" ("id","has_been_opened","receiver_id","sender_id") VALUES (9,True, 3, 4);
INSERT INTO "public"."emails" ("id","has_been_opened","receiver_id","sender_id") VALUES (10,True, 5, 1);


INSERT INTO "public"."auctions" ("item_name","description","starting_price","current_price","condition","publication_date","end_date","payment_type","shipping_options","shipping_cost","owner_id","category_id","city_id") VALUES ('Orange Volkswagen Polo','The Volkswagen Polo is a car produced by the German manufacturer Volkswagen since 1975. It is sold in Europe and other markets worldwide in hatchback, sedan and estate variants. The Polo has been produced in six generations. Related Volkswagen Group models include the Škoda Fabia, SEAT Ibiza and Audi A1.',0,0,'Used',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + '2 days','PayPal','No shipping',494.59,1, 1,1);

INSERT INTO "public"."auctions" ("item_name","description","starting_price","current_price","condition","publication_date","end_date","payment_type","shipping_options","shipping_cost","owner_id","category_id","city_id") VALUES ('HP Spectre x360 - 15t Touch Laptop','
Imagination meets the height of performance. This sleek laptop was engineered to deliver incredible graphics and speed to empower you when inspiration strikes. Reinvent your creative process with four unique modes and bring your vision to life with a laptop designed around you.
The pinnacle of performance
Whether it''s photo or video editing, rewrite the meaning of speed with unquestionable performance. With a quad-core processor[3] and dedicated graphics. Power through your most demanding days with long-lasting battery life[4] and HP Fast Charge.[5]
A creative revolution
Stretch creativity to its limits with our 15.6” diagonal 4K micro-edge touch display. Compatible with a digital pen[2] to evolve your vision and with a scratch-resistant Corning® Gorilla® Glass 4 – your talent has met its perfect canvas.
Smart technology. Designed around you.
We’ve designed this PC around you, with four unique modes that convert from a powerful laptop to get things done to a beautiful canvas in tablet mode. We then added an IR camera and fingerprint reader for easy and secure login.
',0,0,'Used',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + '10 hours','PayPal','No shipping',4.63, 1, 2,2);

INSERT INTO "public"."auctions" ("item_name","description","starting_price","current_price","condition","publication_date","end_date","payment_type","shipping_options","shipping_cost","owner_id","category_id","city_id") VALUES ('Samsung S8',NULL,0,0,'Used','02/19/2018 10:06:00',CURRENT_TIMESTAMP + '2 months','PayPal','No shipping',269.93, 2, 3,3);

INSERT INTO "public"."auctions" ("item_name","description","starting_price","current_price","condition","publication_date","end_date","payment_type","shipping_options","shipping_cost","owner_id","category_id","city_id") VALUES ( 'Blue Senheiser heaphones', 'Description number 7219436',0,0,'Used','05/07/2015 08:47:00','08/20/2016 10:51:00','PayPal','No shipping',95704.75, 3, 1,1);

INSERT INTO "public"."auctions" ("item_name","description","starting_price","current_price","condition","publication_date","end_date","payment_type","shipping_options","shipping_cost","owner_id","category_id","city_id") VALUES ('HP 24 inch monitor','FullHD monitor, 24 inches. LCD display',6.37,0,'Used','1/20/2018 01:06:00',CURRENT_TIMESTAMP + '1 month, 10 hours','PayPal','No shipping',NULL, 2, 7,2);

INSERT INTO "public"."auctions" ("item_name","description","starting_price","current_price","condition","publication_date","end_date","payment_type","shipping_options","shipping_cost","owner_id","category_id","city_id") VALUES ('Zo2lhsYyEMylLoYwhrtspCAkN5GSDNbAFZW5yylNX1FUnAJ54LVq8mIii5aKJqa6hfpt68FDkBfygZeaAE666lIMZ7XGQwjOQjzFTD8j1oeOywGOQbiibWJjOJF3ybiwo7hbh1It5dVByUMwFqXcQrCHqJRdfhn6cViVYKsMQjF5K8tnOjxjyQk4ynnOHm5edPpuWkY43RscZCySIWhksrmcmp7fKxB3MSW','This is a description 8815846',0, 0,'Used', '1/16/2018 10:07:00','3/16/2018 10:07:00','PayPal','No shipping',0.15, 4, 3,3);


INSERT INTO "public"."bids" ("id","bidder_id","bid_amount") VALUES (1 ,6,123);
INSERT INTO "public"."bids" ("id","bidder_id","bid_amount") VALUES (2,7,3.2);
INSERT INTO "public"."bids" ("id","bidder_id","bid_amount") VALUES (3,8,0.2);
INSERT INTO "public"."bids" ("id","bidder_id","bid_amount") VALUES (3,6,1.2);


INSERT INTO "public"."reviews" ("id","rating","description") VALUES (5,2,'Description number 3028653');
INSERT INTO "public"."reviews" ("id","rating","description") VALUES (6,3,'Description number 3261390');
INSERT INTO "public"."reviews" ("id","rating","description") VALUES (1,4,'This is a description 7010386');


INSERT INTO "public"."closed_auctions" ("id") VALUES (4);
INSERT INTO "public"."closed_auctions" ("id") VALUES (6);


INSERT INTO "public"."won_auctions" ("id","is_successful_transaction","has_winner_complained","winner_id") VALUES (6,True,False,1);


INSERT INTO "public"."qas" ("id","question","answer","auction_id","questioner_id") VALUES (1,'EnfGW8NyO6OH0yuHlv4ihFMFi0LymeDTZZwgd5KikuCrbzPafURMscr6t06pXYTtewJ0vZTvvqjZQIZSILsJbzlXjounzSoDlkfHYIwkiErzDdH0lEIY2ikuNCRB64jxoeuKGMm8qcjKUYz0fCFwsSuHi2RVQXTW3xE2jxakZTyhHWnLLfuMg2oBHAAuYhgQSZqqhwtUfBCGUZYZ82aRQziRjwv42jKMex6','ojBOa',707318,3);
INSERT INTO "public"."qas" ("id","question","answer","auction_id","questioner_id") VALUES (2,'bEfgYqkriLX0aypAYrkaWAPxgAaEcWM0Nfga5u5jPWj','J23duGx40axM7tpzQyDVwdgfwRpKHSqafibQKITo0Tjkr5yyNRCrWxRB2oCWVw7Wz',502838,2);
INSERT INTO "public"."qas" ("id","question","answer","auction_id","questioner_id") VALUES (3,'OfHrDhswL0GR3NVQC51VFRgUjZFiGQEqfcBizHyxeCSfKjl4YVxNs6KiEyCVkJrQvhU01xUHRoorGftxlN4n5iYNpfCvB0x6cuGJEmRvm17iyDZeXHJuXTd6JzbC56hKDT62ykDaJ1lZSyybDb','lCtzqQXkCD6VKnanOEvWN1CIgNoCLcGuwCugSUYbGaVvsa5qIPCqMITmgKrS4bLmkRqOAQXMxUz',584031,7);


INSERT INTO "public"."wishlists" ("auction_id","id") VALUES (1,2);
INSERT INTO "public"."wishlists" ("auction_id","id") VALUES (2,3);
INSERT INTO "public"."wishlists" ("auction_id","id") VALUES (3,1);
INSERT INTO "public"."wishlists" ("auction_id","id") VALUES (5,1);
