DROP INDEX IF EXISTS username_users_idx;
DROP INDEX IF EXISTS search_auctions_idx;

CREATE INDEX username_users_idx ON users USING hash(username);

CREATE INDEX search_auctions_idx ON auctions USING GIN (search);
