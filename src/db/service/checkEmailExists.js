import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const checkEmailExists = async (email) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};