// model
import { db } from "../config/db.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query, // Import query
  where, // Import where
} from "firebase/firestore";

const productCollection = collection(db, "productos");

// Helper function to map Firestore documents to product objects
const mapProductDocs = (querySnapshot) => {
  const products = [];
  querySnapshot.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));
  return products;
};

export const getAllProducts = async () => {
  try {
    const productList = await getDocs(productCollection); // Get all products without filter
    return mapProductDocs(productList);
  } catch (error) {
    throw new Error(`Error getting all products: ${error.message}`);
  }
};

export const getProductsByAvailability = async (disponible) => {
  try {
    const q = query(productCollection, where("disponible", "==", disponible));
    const productList = await getDocs(q);
    return mapProductDocs(productList);
  } catch (error) {
    throw new Error(`Error getting products by availability: ${error.message}`);
  }
};

export const getProductByName = async (name) => {
  try {
    const q = query(productCollection, where("nombre", "==", name));
    const productList = await getDocs(q);
    if (!productList.empty) {
      // Since getProductByName expects a single product or null,
      // we return the first one found, mapped using the helper.
      return mapProductDocs(productList)[0];
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(`Error searching product by name: ${error.message}`);
  }
};

export const saveProduct = async (product) => {
  try {
    console.log("Saving product:", product);
    const newProduct = await addDoc(productCollection, product);
    return newProduct;
  } catch (error) {
    throw new Error("Error", error.message);
  }
};

export const getProductById = async (id) => {
  try {
    const productDoc = doc(db, "productos", id);
    const productSnapshot = await getDoc(productDoc);
    if (productSnapshot.exists()) {
      return { id: productSnapshot.id, ...productSnapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Error", error.message);
  }
};

export const updateProduct = async (id, newData) => {
  try {
    const productRef = doc(db, "productos", id);
    const productSnapshot = await getDoc(productRef);
    if (!productSnapshot.exists()) {
      return null; // Product not found
    }
    await updateDoc(productRef, newData);
    return { id, ...newData };
  } catch (error) {
    throw new Error("Error updating product", error.message);
  }
};

export const deleteProductById = async (id) => {
  try {
    const productDoc = doc(db, "productos", id);
    // We check if it exists first, to be able to throw a specific error from the service
    const productSnapshot = await getDoc(productDoc);
    if (!productSnapshot.exists()) {
      return null;
    }
    await deleteDoc(productDoc);
    return { id };
  } catch (error) {
    throw new Error(`Error deleting product by id: ${error.message}`);
  }
};
