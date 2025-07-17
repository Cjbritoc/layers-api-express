//router
import { Router } from "express";
import productController from "../controllers/product.controller.js";
import { createProductValidator, getProductByIdValidator, updateProductValidator } from "../middlewares/validators/product.validator.js";
import { authentication } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", productController.getProducts);
router.get("/unavailable", productController.getUnavailableProducts); // New route for unavailable products
router.post("/",authentication, createProductValidator, productController.createProduct);
router.put("/:id",authentication, updateProductValidator, productController.updateProduct); // New route for updating products
router.get("/:id", getProductByIdValidator, productController.getProductById);
router.delete("/:id", authentication,getProductByIdValidator, productController.deleteProduct);

export default router;
