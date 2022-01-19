import express from 'express';
import * as controller from '../controllers/locations';

const router = express.Router();
router.post('/location', controller.addLoc);
router.delete('/location', controller.removeLoc);
router.get('/location', controller.getAll);


export default router;