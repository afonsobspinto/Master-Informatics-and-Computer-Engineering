
-- auctions search ts_vector calculator
DROP TRIGGER IF EXISTS auctions_search_tsvector ON auctions;
CREATE OR REPLACE FUNCTION auctions_search_update() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.search = setweight(to_tsvector('english', NEW.item_name), 'A') || setweight(to_tsvector('english', NEW.description), 'D');
  END IF;
  IF TG_OP = 'UPDATE' THEN
    IF NEW.item_name <> OLD.item_name OR NEW.description <> OLD.description THEN
      NEW.search = setweight(to_tsvector('english', NEW.item_name), 'A') || setweight(to_tsvector('english', NEW.description), 'D');
    END IF;
  END IF;
  RETURN NEW;
END
$$ LANGUAGE 'plpgsql';


CREATE TRIGGER auctions_search_tsvector BEFORE INSERT OR UPDATE ON auctions FOR EACH ROW EXECUTE PROCEDURE auctions_search_update();

-- check if new user has not null fields

DROP TRIGGER IF EXISTS add_new_user ON users;
CREATE OR REPLACE FUNCTION fn_add_new_user() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
       IF NEW.username IS NULL THEN
          RAISE EXCEPTION 'username cannot be null';
       END IF;
       IF NEW.first_name IS NULL THEN
          RAISE EXCEPTION 'first_name cannot be null';
       END IF;
       IF NEW.last_name IS NULL THEN
          RAISE EXCEPTION 'last_name  cannot be null';
       END IF;
       IF NEW.zip_code IS NULL THEN
          RAISE EXCEPTION 'zip_code cannot be null';
       END IF;
       IF NEW.address IS NULL THEN
          RAISE EXCEPTION 'address cannot be null';
       END IF;
  END IF;
  RETURN NEW;
END
$$ LANGUAGE 'plpgsql';


CREATE TRIGGER add_new_user BEFORE INSERT OR UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE fn_add_new_user();


-- update current price on auctions after insert on bids

DROP TRIGGER IF EXISTS update_current_price ON bids;
CREATE OR REPLACE FUNCTION fn_update_current_price() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE auctions
    SET current_price = NEW.bid_amount
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END

$$ LANGUAGE 'plpgsql';


CREATE TRIGGER add_new_user AFTER INSERT ON users FOR EACH ROW EXECUTE PROCEDURE fn_update_current_price();
