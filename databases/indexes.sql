DROP INDEX IF EXISTS search_auctions_idx;
DROP INDEX IF EXISTS auctions_category_idx;
DROP INDEX IF EXISTS receiver_emails_idx;

CREATE INDEX search_auctions_idx ON auctions USING GIN (search);
CREATE INDEX auctions_category_idx ON auctions USING btree(category_id);

CREATE INDEX receiver_emails_idx ON emails USING btree(receiver_id);
