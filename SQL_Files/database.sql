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

CREATE TABLE categories (
    id integer NOT NULL PRIMARY KEY,
    name character(50)
);

CREATE TABLE countries (
    id integer NOT NULL PRIMARY KEY,
    country character(50)
);

CREATE TABLE cities (
    id integer NOT NULL PRIMARY KEY,
    city character(50) NOT NULL,
    country_id integer NOT NULL REFERENCES countries(id) ON UPDATE CASCADE
);


CREATE TABLE "users" (
    id integer NOT NULL PRIMARY KEY,
    username character(50),
    first_name character(50),
    last_name character(50),
    password character(50) NOT NULL,
    email character(50) NOT NULL UNIQUE,
    zip_code character(25),
    address character(50),
    "registration_date" timestamp DEFAULT CURRENT_TIMESTAMP,
    profile_picture_path character(250),
    location integer REFERENCES cities(id) ON UPDATE CASCADE,
    rating real CONSTRAINT rating_ck CHECK (((rating > 1.0) AND (rating <= 5.0))),
    is_administrator boolean DEFAULT false
);

CREATE TABLE auctions (
    id serial PRIMARY KEY,
    item_name text NOT NULL,
    description text,
    starting_price real NOT NULL CONSTRAINT starting_price_ck CHECK (starting_price >0.0),
    current_price real DEFAULT 0.0,
    condition character(50) NOT NULL,
    CONSTRAINT condition CHECK ((condition = ANY (ARRAY['New'::text, 'Used'::text, 'Not Working'::text]))),
    "publication_date" timestamp DEFAULT CURRENT_TIMESTAMP,
    end_date timestamp NOT NULL CONSTRAINT end_date_ck CHECK (end_date > "publication_date"),
    payment_type character(25) NOT NULL,
    shipping_options character(25) NOT NULL,
    CONSTRAINT payment_type CHECK ((payment_type = ANY (ARRAY['PayPal'::text, 'Credit Card'::text, 'Bank Transfer'::text, 'Other'::text]))),
    CONSTRAINT shipping_options CHECK ((shipping_options = ANY (ARRAY['Domestic Shipping'::text, 'International Shipping'::text, 'No shipping'::text]))),
    shipping_cost real CONSTRAINT shipping_cost_ck CHECK (shipping_cost >0.0),
    images_folder character(250),
    owner_id integer NOT NULL REFERENCES "users"(id) ON UPDATE CASCADE,
    category_id integer NOT NULL REFERENCES categories(id) ON UPDATE CASCADE,
    city_id integer NOT NULL REFERENCES cities(id) ON UPDATE CASCADE,
    search tsvector
);




CREATE TABLE bans (
    id serial PRIMARY KEY,
    banned_id integer NOT NULL REFERENCES "users"(id) ON UPDATE CASCADE,
    admin integer NOT NULL REFERENCES "users"(id) ON UPDATE CASCADE,
    "ban_start_date" timestamp DEFAULT CURRENT_TIMESTAMP,
    ban_expiration_date timestamp CONSTRAINT banExpiration_ck CHECK (ban_expiration_date>"ban_start_date"),
    ban_reason text NOT NULL
);


CREATE TABLE bids (
    id integer NOT NULL PRIMARY KEY REFERENCES auctions(id) ON UPDATE CASCADE,
    bidder_id integer REFERENCES "users"(id) ON UPDATE CASCADE, --CONSTRAINT bidder_id_ck CHECK (bidder_id <> id.owner_id),
    bid_amount real NOT NULL
);



CREATE TABLE messages (
    id serial PRIMARY KEY,
    subject text NOT NULL,
    message text NOT NULL,
    "send_date" timestamp DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE closed_auctions (
    id integer NOT NULL PRIMARY KEY REFERENCES auctions(id) ON UPDATE CASCADE
);

CREATE TABLE emails (
    id integer NOT NULL PRIMARY KEY REFERENCES messages(id) ON UPDATE CASCADE,
    "has_been_opened" boolean DEFAULT false NOT NULL,
    receiver_id integer NOT NULL REFERENCES "users"(id) ON UPDATE CASCADE,
    sender_id integer NOT NULL REFERENCES "users"(id) ON UPDATE CASCADE
);



CREATE TABLE qas (
    id serial PRIMARY KEY REFERENCES auctions(id) ON UPDATE CASCADE,
    question text NOT NULL,
    answer text,
    auction_id integer NOT NULL,
    questioner_id integer NOT NULL REFERENCES "users"(id) ON UPDATE CASCADE
);

CREATE TABLE reports (
    id integer NOT NULL PRIMARY KEY REFERENCES messages(id) ON UPDATE CASCADE
);

CREATE TABLE reviews (
    id integer NOT NULL PRIMARY KEY REFERENCES auctions(id) ON UPDATE CASCADE,
    rating integer NOT NULL CONSTRAINT rating_ck CHECK (((rating >= 0) OR (rating <= 5))),
    description text NOT NULL
);

CREATE TABLE wishlists (
    auction_id integer NOT NULL PRIMARY KEY REFERENCES auctions(id) ON UPDATE CASCADE,
    id integer NOT NULL REFERENCES "users"(id) ON UPDATE CASCADE
);

CREATE TABLE won_auctions (
    id integer NOT NULL PRIMARY KEY REFERENCES closed_auctions(id) ON UPDATE CASCADE,
    "is_successful_transaction" boolean DEFAULT false NOT NULL,
    "has_winner_complained" boolean DEFAULT false NOT NULL,
    winner_id integer NOT NULL REFERENCES "users"(id) ON UPDATE CASCADE
);


