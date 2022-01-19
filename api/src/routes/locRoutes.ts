import express from 'express';
import * as controller from '../controllers/locations';

const router = express.Router();
router.post('/add-loc', controller.addLoc);
router.post('/remove-loc', controller.removeLoc);
router.post('/get-locs', controller.getAll);


export default router;