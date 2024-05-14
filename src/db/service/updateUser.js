import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../db/firebase";

export const updateUser = async (id, formData) => {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, formData);
    console.log("User information updated successfully!");
  } catch (error) {
    console.error("Error updating user information:", error);
  }
};