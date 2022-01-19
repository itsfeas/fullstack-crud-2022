import * as db from 'zapatos/db';
import { conditions as dc } from 'zapatos/db';
import type * as schema from 'zapatos/schema';
import connection from './util/connection';


/**
 *  Adds a location to the db
 *  @param location location item can be stored at
 *  @returns nothing
*/
const add = (location: string) => {
    const locWhere: schema.locations.Insertable = {
        location: location
    };
    db.insert('locations', locWhere).run(connection);
};


/**
 *  Removes a location
 *  @param location string containing location
 *  @returns nothing
*/
const remove = (location: string) => {
    const locWhere: schema.locations.Whereable = {
        location: dc.eq(location)
    };
    db.deletes('locations', locWhere).run(connection);
};


/**
 *  Returns all locations in the db
 *  @returns Promise containing all location entries
*/
const getAll = () => {
    return db.select('locations', {}).run(connection);
};


/**
 *  Returns single location entry from the db
 *  Currently not in use
 *  @returns Promise containing location entry
*/
const get = (location: string) => {
    const locWhere: schema.locations.Whereable = {
        location: dc.eq(location)
    };
    return db.select('locations', locWhere).run(connection);
};

export {
    add,
    remove,
    get,
    getAll
}