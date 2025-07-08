import productService from "../services/product.service.js";
import response from "../utils/response.js";
import asyncHandler from "../utils/asyncHandler.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAll(true); // Now getAll will return all products
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

const getUnavailableProducts = asyncHandler(async (req, res) => {
  const products = await productService.getUnavailable();
  response.success(res, products);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id, ...newData } = res.locals.data;
  const updatedProduct = await productService.updateProduct(id, newData);
  response.success(res, updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = res.locals.data;
  await productService.deleteById(id);
  response.success(res, { id });
});

export default { getProducts, createProduct, getProductById, deleteProduct, getUnavailableProducts, updateProduct };
