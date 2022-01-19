import { Request, Response } from 'express';
import * as locRepo from '../repositories/locRepo';
import controller from './util/controllerUtil';


/**
 *  Edits the details of an inventory item.
 *  @param req HTTP request.
 *  @param res HTTP response.
 *  @returns success message.
*/
const addLoc = controller((req: Request, res: Response) => {
    locRepo.add(req.body.location);
    return "success";
});


/**
 *  Edits the details of an inventory item.
 *  @param req HTTP request.
 *  @param res HTTP response.
 *  @returns success message.
*/
const removeLoc = controller((req: Request, res: Response) => {
    locRepo.remove(req.body.location);
    return "success";
});


/**
 *  Returns all locations.
 *  @param req HTTP request.
 *  @param res HTTP response.
 *  @returns Array of all locations.
*/
const getAll = controller(async (req: Request, res: Response) => {
    return await locRepo.getAll();
});



export {
    addLoc,
    removeLoc,
    getAll
}