
CREATE TABLE auction (
    id_auction integer NOT NULL,
    itemName character(25) NOT NULL,
    startingPrice real NOT NULL CONSTRAINT startingPrice _ck CHECK (startingPrice >0.0),
    currentPrice real DEFAULT null,
    condition character(25) NOT NULL,
    publicationDate date DEFAULT Today NOT NULL,
    endDate date NOT NULL CONSTRAINT endDate _ck CHECK (endDate > publicationDate),
    paymentType character(25) NOT NULL,
    shippingOptions" character(25) NOT NULL,
    shippingCost real CONSTRAINT shippingCost_ck CHECK (shippingCost >0.0),
    imagesFolder path,
    auction_owner character(25) NOT NULL,
    category_name character(25) NOT NULL,
    itemLocation character(25) NOT NULL
);


CREATE TABLE ban (
    id_ban integer NOT NULL,
    banned_user character(25) NOT NULL,
    admin character(25) NOT NULL,
    banStartDate date DEFAULT Today,
    banExpirationDate date CONSTRAINT banExpiration_ck CHECK (banExpiration>banStartDate),
    banReason text NOT NULL
);


CREATE TABLE bid (
    id_auction integer NOT NULL,
    bidder_username character(25) CONSTRAINT bidder_username_ck CHECK (bidder_username < > id_auction.auction_owner),
    bidAmount integer NOT NULL
);


CREATE TABLE category (
    name character(25)
);

CREATE TABLE city (
    id_city integer NOT NULL,
    city character(25) NOT NULL,
    country_name character(25) NOT NULL
);

CREATE TABLE country (
    country character(25)
);

CREATE TABLE user (
    username character(25),
    firstName character(25),
    lastName character(25),
    password character(25) NOT NULL,
    email character(25) NOT NULL,
    zip-code character(25),
    address character(25),
    registrationDate date DEFAULT Today NOT NULL,
    profilePicturePath path,
    location character(1),
    rating real CONSTRAINT rating_ck CHECK (((rating > 1.0) AND (rating <= 5.0))),
    is_administrator boolean DEFAULT false
);
CREATE TABLE closed_auction (
    id_auction integer NOT NULL
);

CREATE TABLE email (
    id_message integer NOT NULL,
    "hasBeenOpened" boolean DEFAULT false NOT NULL,
    receiver character(25)[] NOT NULL,
    sender character(25)[] NOT NULL
);

CREATE TABLE message (
    id_message serial NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    "sendDate" date DEFAULT ('now'::text)::date NOT NULL
);

CREATE TABLE qa (
    id_qa serial NOT NULL,
    question text NOT NULL,
    answer text,
    id_auction integer NOT NULL,
    questioner_username character(25)[] NOT NULL
);

CREATE TABLE report (
    id_message integer NOT NULL
);

CREATE TABLE review (
    id_auction integer NOT NULL,
    rating integer NOT NULL CONSTRAINT rating_ck CHECK (((rating > 0) OR (rating <= 5))),
    description text NOT NULL
);

CREATE TABLE wishlist (
    auction_id integer NOT NULL,
    username character(25)[] NOT NULL
);

CREATE TABLE won_auction (
    id_auction integer NOT NULL,
    "isSuccessfulTransaction" boolean DEFAULT false NOT NULL,
    "hasWinnerComplained" boolean DEFAULT false NOT NULL,
    auction_winner character(25)[] NOT NULL
);


-- Primary Keys and Uniques

ALTER TABLE ONLY auction 
	ADD CONSTRAINT auction_pkey PRIMARY KEY (id_auction);

ALTER TABLE ONLY ban 
	ADD CONSTRAINT ban_pkey PRIMARY KEY (id_ban);

ALTER TABLE ONLY bid 
	ADD CONSTRAINT bid_pkey PRIMARY KEY (id_auction);

ALTER TABLE ONLY category 
	ADD CONSTRAINT category_pkey PRIMARY KEY (name);

ALTER TABLE ONLY city 
	ADD CONSTRAINT city_pkey PRIMARY KEY (username);

ALTER TABLE ONLY country 
	ADD CONSTRAINT country_pkey PRIMARY KEY (country);

ALTER TABLE ONLY user
    ADD CONSTRAINT user_email_key UNIQUE (email);

ALTER TABLE ONLY user
	ADD CONSTRAINT user_pkey PRIMARY KEY (username);

ALTER TABLE ONLY closed_auction
    ADD CONSTRAINT closed_auction_pkey PRIMARY KEY (id_auction);

ALTER TABLE ONLY message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id_message);

ALTER TABLE ONLY report
    ADD CONSTRAINT report_pkey PRIMARY KEY (id_message);

ALTER TABLE ONLY qa
    ADD CONSTRAINT qa_pkey PRIMARY KEY (id_qa);

ALTER TABLE ONLY review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id_auction);

ALTER TABLE ONLY wishlist
    ADD CONSTRAINT wishlist_pkey PRIMARY KEY (auction_id, username);

ALTER TABLE ONLY won_auction
    ADD CONSTRAINT won_auction_pkey PRIMARY KEY (id_auction);


-- Foreign Keys

ALTER TABLE ONLY user
	ADD CONSTRAINT user_location_fk FOREIGN KEY (location) REFERENCES city(id_city) ON UPDATE CASCADE;

ALTER TABLE ONLY city
	ADD CONSTRAINT city_country_name_fk FOREIGN KEY (country_name) REFERENCES country(country) ON UPDATE CASCADE;

ALTER TABLE ONLY ban
	ADD CONSTRAINT ban_banned_user_fk FOREIGN KEY (banned_user) REFERENCES user(username) ON UPDATE CASCADE;

ALTER TABLE ONLY ban
	ADD CONSTRAINT ban_admin_fk FOREIGN KEY (admin) 
REFERENCES user(username) ON UPDATE CASCADE;

ALTER TABLE ONLY auction
	ADD CONSTRAINT auction_auction_owner_fk FOREIGN KEY (auction_owner) 
REFERENCES user(username) ON UPDATE CASCADE;

ALTER TABLE ONLY auction
	ADD CONSTRAINT auction_category_name_fk FOREIGN KEY (category_name) 
REFERENCES category(name) ON UPDATE CASCADE;

ALTER TABLE ONLY auction
	ADD CONSTRAINT auction_itemLocation_fk FOREIGN KEY (itemLocation) 
REFERENCES city(id_city) ON UPDATE CASCADE;

ALTER TABLE ONLY bid
	ADD CONSTRAINT bid_id_auction_fk FOREIGN KEY (id_auction) 
REFERENCES auction(id_auction) ON UPDATE CASCADE;

ALTER TABLE ONLY bid
	ADD CONSTRAINT bid_bidder_username_fk FOREIGN KEY (bidder_username) 
REFERENCES user(username) ON UPDATE CASCADE;

ALTER TABLE ONLY qa
    ADD CONSTRAINT qa_questioner_username_fk FOREIGN KEY (questioner_username) REFERENCES user(username) ON UPDATE CASCADE;
 
ALTER TABLE ONLY qa
    ADD CONSTRAINT qa_id_auction_fk FOREIGN KEY (id_auction) REFERENCES auction(id_auction) ON UPDATE CASCADE;

ALTER TABLE ONLY closed_auction
    ADD CONSTRAINT closed_auction_id_auction_fk FOREIGN KEY (id_auction) REFERENCES auction(id_auction) ON UPDATE CASCADE;

ALTER TABLE ONLY won_auction
    ADD CONSTRAINT won_auction_id_auction_fk FOREIGN KEY (id_auction) REFERENCES auction(id_auction) ON UPDATE CASCADE;   

ALTER TABLE ONLY won_auction
    ADD CONSTRAINT won_auction_auction_winner_fk FOREIGN KEY (auction_winner) REFERENCES user(username) ON UPDATE CASCADE; 

ALTER TABLE ONLY review
    ADD CONSTRAINT review_id_auction_fk FOREIGN KEY (id_auction) REFERENCES auction(id_auction) ON UPDATE CASCADE;
 
ALTER TABLE ONLY report
    ADD CONSTRAINT report_id_message_fk FOREIGN KEY (id_message) REFERENCES message(id_message) ON UPDATE CASCADE;

ALTER TABLE ONLY email
    ADD CONSTRAINT email_id_message_fk FOREIGN KEY (id_message) REFERENCES message(id_message) ON UPDATE CASCADE;

ALTER TABLE ONLY email
    ADD CONSTRAINT email_receiver_fk FOREIGN KEY (receiver) REFERENCES user(username) ON UPDATE CASCADE; 

ALTER TABLE ONLY email
    ADD CONSTRAINT email_sender_fk FOREIGN KEY (sender) REFERENCES user(username) ON UPDATE CASCADE; 

ALTER TABLE ONLY wishlist
    ADD CONSTRAINT wishlist_auction_id_fk FOREIGN KEY (auction_id) REFERENCES auction(id_auction) ON UPDATE CASCADE;
 
ALTER TABLE ONLY wishlist
    ADD CONSTRAINT wishlist_username_fk FOREIGN KEY (username) REFERENCES user(username) ON UPDATE CASCADE; 
