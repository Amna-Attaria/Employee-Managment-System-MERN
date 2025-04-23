import express from 'express';
import { addProduct,getAllProducts, updateProduct , deleteProduct} from '../controller/productController.mjs';
import { uploadImage } from '../Middleware/upload.mjs';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/add', uploadImage, addProduct);
router.put('/:id',uploadImage, updateProduct);
router.delete('/:id',deleteProduct);


export default router;