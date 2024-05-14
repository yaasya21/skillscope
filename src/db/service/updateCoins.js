import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../db/firebase";

export const updateCoins = async (userId, updatedCoins) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, { coins: updatedCoins });
  } catch (error) {
    console.error("Error updating user coins:", error);
  }
};

