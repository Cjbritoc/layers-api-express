//router
import { Router } from "express";
import productController from "../controllers/product.controller.js";
import { createProductValidator, getProductByIdValidator, updateProductValidator } from "../middlewares/validators/product.validator.js";

const router = Router();

router.get("/", productController.getProducts);
router.get("/unavailable", productController.getUnavailableProducts); // New route for unavailable products
router.post("/", createProductValidator, productController.createProduct);
router.put("/:id", updateProductValidator, productController.updateProduct); // New route for updating products
router.get("/:id", getProductByIdValidator, productController.getProductById);
router.delete("/:id", getProductByIdValidator, productController.deleteProduct);

export default router;
