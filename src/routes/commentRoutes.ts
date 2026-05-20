import { Router } from 'express';
import { Authorize } from '../middleware/authMiddleware.js';
import { commentController } from '../controllers/commentController.js';

const routes = Router();
routes.get('/:productId', commentController.getRecords);
routes.post('/', Authorize, commentController.createRecord);
routes.delete('/:id', Authorize, commentController.deleteRecord);

export const commentRoutes = routes;
