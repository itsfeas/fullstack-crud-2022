import express from 'express';
import * as controller from '../controllers/inventory';

const router = express.Router();
router.post('/item', controller.addItem);
router.delete('/item', controller.removeItem);
router.put('/item', controller.editItem);
router.get('/item', controller.getAll);


export default router;