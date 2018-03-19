
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
    rating integer NOT NULL CONSTRAINT rating_ck CHECK (((rating > 0) OR (rating <= 5)))
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
