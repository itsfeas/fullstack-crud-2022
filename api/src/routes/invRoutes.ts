import express from 'express';
import * as controller from '../controllers/inventory';

const router = express.Router();
router.post('/add-item', controller.addItem);
router.post('/remove-item', controller.removeItem);
router.post('/edit-item', controller.editItem);
router.post('/get-items', controller.getAll);


export default router;