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

export const getAllProducts = async (disponible=true) => {
  try {
    const q = query(productCollection, where("disponible", "==", disponible)); // Filter by disponible == true
    const productList = await getDocs(q); // Use the query
    const products = [];
    productList.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));

    return products;
  } catch (error) {
    throw new Error("Error", error.message);
  }
};

export const getProductByName = async (name) => {
  try {
    const q = query(productCollection, where("nombre", "==", name));
    const productList = await getDocs(q);
    if (!productList.empty) {
      const doc = productList.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Error searching product by name", error.message);
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
    throw new Error("Error", error.message);
  }
};
