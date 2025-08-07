import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { createProduct, getAllProducts, uploadImages } from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post("/uploadImages", auth, upload.array('images'), uploadImages);
productRouter.post("/create", auth, createProduct);
productRouter.get("/getAllProducts", getAllProducts);
export default productRouter;

