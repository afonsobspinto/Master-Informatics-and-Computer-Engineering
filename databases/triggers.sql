
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


CREATE TRIGGER update_current_price AFTER INSERT ON bids FOR EACH ROW EXECUTE PROCEDURE fn_update_current_price();


-- check if is admin who is banning 

DROP TRIGGER IF EXISTS check_if_is_admin ON bans;
CREATE OR REPLACE FUNCTION fn_check_if_is_admin() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
       IF NEW.admin IN (SELECT users.id FROM users, bans WHERE users.id=bans.admin AND users.is_administrator is FALSE) THEN
          RAISE EXCEPTION 'You are not administrator! You dont have permissions to ban!';
       END IF; 
  END IF;
  RETURN NEW;
END
$$ LANGUAGE 'plpgsql';


CREATE TRIGGER check_if_is_admin BEFORE INSERT ON bans FOR EACH ROW EXECUTE PROCEDURE fn_check_if_is_admin();


-- check if who is bidding is not an admin

DROP TRIGGER IF EXISTS fn_add_bid_only_if_not_admin_banned ON bids;
CREATE OR REPLACE FUNCTION fn_add_bid_only_if_not_admin_banned() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.bidder_id IN (SELECT users.id FROM users, bids WHERE users.id= NEW.bidder_id AND users.is_administrator = true) THEN
    RAISE EXCEPTION 'You are an administrator! You cant bid';
    END IF;
  END IF;
  RETURN NEW;
END

$$ LANGUAGE 'plpgsql';


CREATE TRIGGER fn_add_bid_only_if_not_admin_banned BEFORE INSERT ON bids FOR EACH ROW EXECUTE PROCEDURE fn_add_bid_only_if_not_admin_banned();
