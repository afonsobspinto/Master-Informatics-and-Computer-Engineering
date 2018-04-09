
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


-- update current price on auctions after insert on bids

DROP TRIGGER IF EXISTS update_current_price ON bids;
CREATE OR REPLACE FUNCTION fn_update_current_price() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
      IF NEW.bid_amount> (SELECT current_price FROM auctions WHERE id=NEW.id) THEN
         UPDATE auctions
         SET current_price = NEW.bid_amount
         WHERE id = NEW.id;
     END IF;
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


-- check if who is bidding is not the auctioneer

DROP TRIGGER IF EXISTS fn_check_if_bidder_is_not_auctioneer ON bids;
CREATE OR REPLACE FUNCTION fn_check_if_bidder_is_not_auctioneer() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
       IF NEW.bidder_id = (SELECT owner_id FROM auctions WHERE id = NEW.id) THEN
          RAISE EXCEPTION 'You cannot bid your own product!';
       END IF;   
  END IF;
  RETURN NEW;
END

$$ LANGUAGE 'plpgsql';


DROP TRIGGER IF EXISTS check_if_bidder_is_not_auctioneer ON bids;
CREATE TRIGGER check_if_bidder_is_not_auctioneer BEFORE INSERT ON bids FOR EACH ROW EXECUTE PROCEDURE fn_check_if_bidder_is_not_auctioneer();


-- update users rating after insert a review

DROP TRIGGER IF EXISTS fn_update_user_rating_after_review ON reviews;
CREATE OR REPLACE FUNCTION fn_update_user_rating_after_review() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE users
    SET rating = (SELECT avg(reviews.rating) FROM reviews WHERE id in (
SELECT id FROM auctions WHERE owner_id = (SELECT owner_id FROM auctions WHERE auctions.id = NEW.id)))
    WHERE id = (SELECT owner_id from auctions WHERE id = NEW.id);
  END IF;
  RETURN NEW;
END

$$ LANGUAGE 'plpgsql';


DROP TRIGGER IF EXISTS update_user_rating_after_review ON reviews;
CREATE TRIGGER update_user_rating_after_review AFTER INSERT ON reviews FOR EACH ROW EXECUTE PROCEDURE fn_update_user_rating_after_review();


-- update users rating after delete a review
DROP TRIGGER IF EXISTS update_user_rating_after_delete_review ON reviews;
CREATE OR REPLACE FUNCTION fn_update_user_rating_after_delete_review() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE users
    SET rating = (SELECT avg(reviews.rating) FROM reviews WHERE id in (
SELECT id FROM auctions WHERE owner_id = (SELECT owner_id FROM auctions WHERE auctions.id = OLD.id)))
    WHERE id = (SELECT owner_id from auctions WHERE id = OLD.id);
  END IF;
  RETURN OLD;
END

$$ LANGUAGE 'plpgsql';


CREATE TRIGGER update_user_rating_after_delete_review AFTER DELETE ON reviews FOR EACH ROW EXECUTE PROCEDURE fn_update_user_rating_after_delete_review();

