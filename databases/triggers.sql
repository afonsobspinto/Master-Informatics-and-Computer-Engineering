
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
