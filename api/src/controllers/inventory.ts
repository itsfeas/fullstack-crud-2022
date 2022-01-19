import { Request, Response } from 'express';
import * as invRepo from '../repositories/invRepo';
import controller from './util/controllerUtil';

/**
 *  Adds an item to the inventory.
 *  @param req HTTP request.
 *  @param res HTTP response.
 *  @returns success message.
*/
const addItem = controller((req: Request, res: Response) => {
    const params = req.body;
    invRepo.add(
        params.to,
        params.from,
        params.params.description,
        params.location,
        params.weight
    );
    return "success";
});


/**
 *  Removes an item from the inventory.
 *  @param req HTTP request.
 *  @param res HTTP response.
 *  @returns success message.
*/
const removeItem = controller((req: Request, res: Response) => {
    const params = req.body;
    invRepo.remove(params.id);
    return "success";
});


/**
 *  Edits the details of an inventory item.
 *  @param req HTTP request.
 *  @param res HTTP response.
 *  @returns success message.
*/
const editItem = controller((req: Request, res: Response) => {
    const params = req.body;
    invRepo.edit(
        params.id,
        params.to,
        params.from,
        params.params.description,
        params.location,
        params.weight
    );
    return "success";
});

/**
 *  Returns all inventory items.
 *  @param req HTTP request.
 *  @param res HTTP response.
 *  @returns Array of all inventory items.
*/
const getAll = controller(async (req: Request, res: Response) => {
    return await invRepo.getAll();
});



export {
    addItem,
    removeItem,
    editItem,
    getAll
}