import * as db from 'zapatos/db';
import { conditions as dc } from 'zapatos/db';
import type * as schema from 'zapatos/schema';
import connection from './util/connection';


/**
 *  Adds an item to the inventory
 *  @param to address to send to
 *  @param from address to send to
 *  @param description description of item
 *  @param location location item is contained at
 *  @param weight weight of item in kg
 *  @returns nothing
*/
const add = (to: string, from:string, description: string, location: string, weight: number) => {
    const item: schema.inventory.Insertable = {
        ship_to: to,
        ship_from: from,
        description: description,
        location: location,
        weight: weight
    };
    db.insert('inventory', item).run(connection);
};


/**
 *  Removes an item from the inventory
 *  @param id the id of the item to remove
 *  @returns nothing
*/
const remove = (id: number) => {
    const item: schema.inventory.Whereable = {
        item_id: dc.eq(id)
    };
    db.deletes('inventory', item).run(connection);
};


/**
 *  Edits parameters of an item in the inventory
 *  @param id the id of the item to edit
 *  @param to address to send to
 *  @param from address to send to
 *  @param description description of item
 *  @param location location item is contained at
 *  @param weight weight of item in kg
 *  @returns nothing
*/
const edit = (id: number, to: string, from: string, description: string, location: string, weight: number) => {
    const item: schema.inventory.Whereable = {
        item_id: dc.eq(id)
    };
    const update: schema.inventory.Updatable = {
        ship_to: to,
        ship_from: from,
        description: description,
        location: location,
        weight: weight
    };
    db.update('inventory', update, item).run(connection);
};

/**
 *  Returns all items in the inventory
 *  @returns Promise containing all inventory items
*/
const getAll = () => {
    return db.select('inventory', {}).run(connection);
};


/**
 *  Returns single item in the inventory
 *  @returns Promise containing inventory items
*/
const get = (id: number) => {
    const item: schema.inventory.Whereable = {
        item_id: dc.eq(id)
    };
    return db.selectOne('inventory', item).run(connection);
};

export {
    add,
    remove,
    edit,
    get,
    getAll
}