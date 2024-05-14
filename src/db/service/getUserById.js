import { doc, getDoc } from "firebase/firestore";
import { db } from "../../db/firebase";

export const getUserById = async (id) => {
  try {
    const userDocRef = doc(db, "users", id);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return userData;
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};
