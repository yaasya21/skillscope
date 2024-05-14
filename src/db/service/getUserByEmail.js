import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

export const getUserByEmail = async (email) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty ? null : querySnapshot.docs[0].data();
};
