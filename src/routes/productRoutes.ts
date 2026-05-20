import { Router } from 'express';
import { productController } from '../controllers/productController.js';
import { Authorize } from '../middleware/authMiddleware.js';

const routes = Router();
routes.get('/', productController.getRecords);
routes.get('/:slug', productController.getRecord);
routes.get('/category/:slug', productController.getRecordsFromCategory);
routes.post('/', Authorize, productController.createRecord);
routes.put('/:id', Authorize, productController.updateRecord);
routes.delete('/:id', Authorize, productController.deleteRecord);

export const productRoutes = routes;
