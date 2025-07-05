// services
import {
  getAllProducts,
  saveProduct,
  getProductById as getProductByIdFromModel,
  deleteProductById as deleteProductByIdFromModel,
} from "../models/product.model.js";
import { NotFoundError } from "../utils/errors.js";

const getAll = async () => {
  return await getAllProducts();
};

const createProduct = async (product) => {
  return await saveProduct(product);
};

const getById = async (id) => {
  const producto = await getProductByIdFromModel(id);
  if (!producto) {
    throw new NotFoundError(`Producto con id ${id} no encontrado.`);
  }
  return producto;
};

const deleteById = async (id) => {
  const result = await deleteProductByIdFromModel(id);
  if (!result) {
    throw new NotFoundError(`Producto con id ${id} no encontrado para eliminar.`);
  }
  return result;
};

export default { getAll, createProduct, getById, deleteById };
