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
} from "firebase/firestore";

const productCollection = collection(db, "productos");

export const getAllProducts = async () => {
  try {
    const productList = await getDocs(productCollection);
    const products = [];
    productList.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));

    return products;
  } catch (error) {
    throw new Error("Error", error.message);
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
