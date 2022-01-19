/* locations table */
CREATE TABLE IF NOT EXISTS locations (
    location TEXT NOT NULL PRIMARY KEY,
    num_items INT NOT NULL DEFAULT 0
);

/* inventory table */
CREATE TABLE IF NOT EXISTS inventory (
    item_id SERIAL NOT NULL PRIMARY KEY,
    ship_to TEXT NOT NULL,
    ship_from TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL
        REFERENCES locations (location)
        ON DELETE CASCADE,
    weight REAL NOT NULL
);

/* Update item count at location functions */
CREATE OR REPLACE FUNCTION add_location_count()
    RETURNS TRIGGER AS
$func$
BEGIN
    UPDATE locations
    SET num_items = num_items + 1
    WHERE location = NEW.location;
    RETURN NULL;
END;
$func$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION remove_location_count()
    RETURNS TRIGGER AS
$func$
BEGIN
    UPDATE locations
    SET num_items = num_items - 1
    WHERE location = OLD.location;
    RETURN NULL;
END;
$func$ LANGUAGE 'plpgsql';

/* triggers for updating item count at locations */
CREATE TRIGGER location_item_add
    AFTER INSERT 
    ON inventory
    FOR EACH ROW EXECUTE PROCEDURE add_location_count();

CREATE TRIGGER location_item_remove
    AFTER DELETE
    ON inventory
    FOR EACH ROW EXECUTE PROCEDURE remove_location_count();
