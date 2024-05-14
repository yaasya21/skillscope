import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../db/firebase";

export const deleteUser = async (id) => {
  try {
    const userDocRef = doc(db, "users", id);
    await deleteDoc(userDocRef);
    console.log("User deleted successfully!");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
