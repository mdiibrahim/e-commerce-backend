import express from 'express';
import { ProductController } from './product.controller';
const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.createProduct);
router.get('/:productId', ProductController.getSingleProduct);
router.put('/:productId', ProductController.updateProduct);
router.delete('/:productId', ProductController.deleteSingleProduct);

export const ProductRoutes = router;
