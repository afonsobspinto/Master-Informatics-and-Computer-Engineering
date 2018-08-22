DROP INDEX IF EXISTS search_auctions_idx;
CREATE INDEX search_auctions_idx ON auctions USING GIN (search);

DROP INDEX IF EXISTS category_auctions_idx;
CREATE INDEX category_auctions_idx ON auctions USING btree(category_id);

DROP INDEX IF EXISTS receiver_emails_idx;
CREATE INDEX receiver_emails_idx ON emails USING btree(receiver_id);

DROP INDEX IF EXISTS recent_auctions_idx;
CREATE INDEX recent_auctions_idx ON auctions USING btree(publication_date);

DROP INDEX IF EXISTS ending_soon_auctions_idx;
CREATE INDEX ending_soon_auctions_idx ON auctions USING btree(end_date);

DROP INDEX IF EXISTS auction_qa_idx;
CREATE INDEX auction_qa_idx ON qas USING btree(auction_id);

DROP INDEX IF EXISTS owner_auction_idx;
CREATE INDEX owner_auction_idx ON auctions USING hash(owner_id);

DROP INDEX IF EXISTS bannee_bans_idx;
CREATE INDEX bannee_bans_idx ON bans USING hash(banned_id);

DROP INDEX IF EXISTS date_messages_idx;
CREATE INDEX date_messages_idx ON messages USING btree(send_date);