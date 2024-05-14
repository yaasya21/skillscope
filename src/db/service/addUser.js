import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const addUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, "users"), userData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    throw new Error("Error adding user to Firestore");
  }
};
