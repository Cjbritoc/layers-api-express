import productService from "../services/product.service.js";
import response from "../utils/response.js";
import asyncHandler from "../utils/asyncHandler.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAll();
  response.success(res, products);
});

const createProduct = asyncHandler(async (req, res) => {
  const nuevoProducto = res.locals.data;
  await productService.createProduct(nuevoProducto);
  response.success(res, nuevoProducto, 201);
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = res.locals.data;
  const producto = await productService.getById(id);
  response.success(res, producto);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = res.locals.data;
  await productService.deleteById(id);
  response.success(res, { id });
});

export default { getProducts, createProduct, getProductById, deleteProduct };
