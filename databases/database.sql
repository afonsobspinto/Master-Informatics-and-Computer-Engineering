DROP TABLE IF EXISTS auctions CASCADE;
DROP TABLE IF EXISTS bans CASCADE;
DROP TABLE IF EXISTS bids CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS countries CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS closed_auctions CASCADE;
DROP TABLE IF EXISTS emails CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS qas CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS wishlists CASCADE;
DROP TABLE IF EXISTS won_auctions CASCADE;

CREATE TABLE auctions (
    id serial PRIMARY KEY,
    item_name text NOT NULL,
    description text,
    starting_price real NOT NULL CONSTRAINT starting_price_ck CHECK (starting_price >0.0),
    current_price real DEFAULT null,
    condition character(25) NOT NULL,
    "publication_date" date DEFAULT ('now'::text)::date NOT NULL,
    end_date date NOT NULL CONSTRAINT end_date_ck CHECK (end_date > "publication_date"),
    payment_type character(25) NOT NULL,
    shipping_options character(25) NOT NULL,
    shipping_cost real CONSTRAINT shipping_cost_ck CHECK (shipping_cost >0.0),
    images_folder path,
    owner_id integer NOT NULL,
    category_id integer NOT NULL,
    city_id integer NOT NULL
);

CREATE TABLE bans (
    id serial PRIMARY KEY,
    banned_id integer NOT NULL,
    admin integer NOT NULL,
    "ban_start_date" date DEFAULT ('now'::text)::date NOT NULL,
    ban_expiration_date date CONSTRAINT banExpiration_ck CHECK (ban_expiration_date>"ban_start_date"),
    ban_reason text NOT NULL
);


CREATE TABLE bids (
    id integer NOT NULL PRIMARY KEY,
    bidder_id integer, --CONSTRAINT bidder_id_ck CHECK (bidder_id <> id.owner_id),
    bid_amount integer NOT NULL
);

CREATE TABLE categories (
id integer NOT NULL PRIMARY KEY,
name character(25)
);

CREATE TABLE cities (
    id integer NOT NULL PRIMARY KEY,
    city character(25) NOT NULL,
    country_id integer NOT NULL
);

CREATE TABLE countries (
    id integer NOT NULL PRIMARY KEY,
    country character(25)
);

CREATE TABLE "users" (
    id integer NOT NULL PRIMARY KEY,
    username character(25),
    first_name character(25),
    last_name character(25),
    password character(25) NOT NULL,
    email character(25) NOT NULL UNIQUE,
    zip_code character(25),
    address character(25),
    "registration_date" date DEFAULT ('now'::text)::date NOT NULL,
    profile_picture_path path,
    location integer,
    rating real CONSTRAINT rating_ck CHECK (((rating > 1.0) AND (rating <= 5.0))),
    is_administrator boolean DEFAULT false
);

CREATE TABLE closed_auctions (
    id integer NOT NULL PRIMARY KEY
);

CREATE TABLE emails (
    id integer NOT NULL PRIMARY KEY,
    "has_been_opened" boolean DEFAULT false NOT NULL,
    receiver_id integer NOT NULL,
    sender_id integer NOT NULL
);

CREATE TABLE messages (
    id serial PRIMARY KEY,
    subject text NOT NULL,
    message text NOT NULL,
    "send_date" date DEFAULT ('now'::text)::date NOT NULL
);

CREATE TABLE qas (
    id serial PRIMARY KEY,
    question text NOT NULL,
    answer text,
    auction_id integer NOT NULL,
    questioner_id integer NOT NULL
);

CREATE TABLE reports (
    id integer NOT NULL PRIMARY KEY
);

CREATE TABLE reviews (
    id integer NOT NULL PRIMARY KEY,
    rating integer NOT NULL CONSTRAINT rating_ck CHECK (((rating > 0) OR (rating <= 5))),
    description text NOT NULL
);

CREATE TABLE wishlists (
    auction_id integer NOT NULL PRIMARY KEY,
    id integer NOT NULL
);

CREATE TABLE won_auctions (
    id integer NOT NULL PRIMARY KEY,
    "is_successful_transaction" boolean DEFAULT false NOT NULL,
    "has_winner_complained" boolean DEFAULT false NOT NULL,
    winner_id integer NOT NULL
);













-- Foreign Keys

ALTER TABLE ONLY "users"
    ADD CONSTRAINT user_location_fk FOREIGN KEY (location) REFERENCES cities(id) ON UPDATE CASCADE;

ALTER TABLE ONLY cities
    ADD CONSTRAINT city_country_name_fk FOREIGN KEY (country_id) REFERENCES countries(id) ON UPDATE CASCADE;

ALTER TABLE ONLY bans
    ADD CONSTRAINT ban_banned_id_fk FOREIGN KEY (banned_id) REFERENCES "users"(id) ON UPDATE CASCADE;

ALTER TABLE ONLY bans
    ADD CONSTRAINT ban_admin_fk FOREIGN KEY (admin) REFERENCES "users"(id) ON UPDATE CASCADE;

ALTER TABLE ONLY auctions
    ADD CONSTRAINT auction_auction_owner_fk FOREIGN KEY (owner_id) REFERENCES "users"(id) ON UPDATE CASCADE;

ALTER TABLE ONLY auctions
    ADD CONSTRAINT auction_category_name_fk FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE;

ALTER TABLE ONLY auctions
    ADD CONSTRAINT auction_item_location_fk FOREIGN KEY (city_id) REFERENCES cities(id) ON UPDATE CASCADE;

ALTER TABLE ONLY bids
    ADD CONSTRAINT bid_id_fk FOREIGN KEY (id) REFERENCES auctions(id) ON UPDATE CASCADE;

ALTER TABLE ONLY bids
    ADD CONSTRAINT bid_bidder_id_fk FOREIGN KEY (bidder_id) REFERENCES "users"(id) ON UPDATE CASCADE;

ALTER TABLE ONLY qas
    ADD CONSTRAINT qa_questioner_id_fk FOREIGN KEY (questioner_id) REFERENCES "users"(id) ON UPDATE CASCADE;
 
ALTER TABLE ONLY qas
    ADD CONSTRAINT qa_id_fk FOREIGN KEY (id) REFERENCES auctions(id) ON UPDATE CASCADE;

ALTER TABLE ONLY closed_auctions
    ADD CONSTRAINT closed_auction_id_fk FOREIGN KEY (id) REFERENCES auctions(id) ON UPDATE CASCADE;

ALTER TABLE ONLY won_auctions
    ADD CONSTRAINT won_auction_id_fk FOREIGN KEY (id) REFERENCES auctions(id) ON UPDATE CASCADE;   

ALTER TABLE ONLY won_auctions
    ADD CONSTRAINT won_auction_auction_winner_fk FOREIGN KEY (winner_id) REFERENCES "users"(id) ON UPDATE CASCADE;

ALTER TABLE ONLY reviews
    ADD CONSTRAINT review_id_fk FOREIGN KEY (id) REFERENCES auctions(id) ON UPDATE CASCADE;
 
ALTER TABLE ONLY reports
    ADD CONSTRAINT report_id_message_fk FOREIGN KEY (id) REFERENCES messages(id) ON UPDATE CASCADE;

ALTER TABLE ONLY emails
    ADD CONSTRAINT email_id_message_fk FOREIGN KEY (id) REFERENCES messages(id) ON UPDATE CASCADE;

ALTER TABLE ONLY emails
    ADD CONSTRAINT email_receiver_fk FOREIGN KEY (receiver_id) REFERENCES "users"(id) ON UPDATE CASCADE;

ALTER TABLE ONLY emails
    ADD CONSTRAINT email_sender_fk FOREIGN KEY (sender_id) REFERENCES "users"(id) ON UPDATE CASCADE;

ALTER TABLE ONLY wishlists
    ADD CONSTRAINT wishlist_auction_id_fk FOREIGN KEY (auction_id) REFERENCES auctions(id) ON UPDATE CASCADE;
 
ALTER TABLE ONLY wishlists
    ADD CONSTRAINT wishlist_username_fk FOREIGN KEY (id) REFERENCES "users"(id) ON UPDATE CASCADE;
    
