// services
import {
  getAllProducts,
  saveProduct,
  getProductById as getProductByIdFromModel,
  deleteProductById as deleteProductByIdFromModel,
  updateProduct as updateProductModel, // Import updateProduct from model
  getProductByName, // Import getProductByName
} from "../models/product.model.js";
import { NotFoundError } from "../utils/errors.js";

const getAll = async () => {
  return await getAllProducts();
};

const getUnavailable = async () => {
  return await getAllProducts(false);
};

const createProduct = async (product) => {
  const existingProduct = await getProductByName(product.nombre);

  if (existingProduct) {
    const newCantidad = existingProduct.cantidad + product.cantidad;
    const updatedProduct = await updateProductModel(existingProduct.id, { cantidad: newCantidad });
    return updatedProduct;
  } else {
    return await saveProduct(product);
  }
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

const updateProduct = async (id, newData) => {
  const updatedProduct = await updateProductModel(id, newData);
  if (!updatedProduct) {
    throw new NotFoundError(`Producto con id ${id} no encontrado para actualizar.`);
  }
  return updatedProduct;
};

export default { getAll, createProduct, getById, deleteById, getUnavailable, updateProduct };
