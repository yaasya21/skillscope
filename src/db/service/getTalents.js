import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getTalents = async () => {
  try {
    const q = query(collection(db, "users"), where("role", "==", "talent"));
    const querySnapshot = await getDocs(q);
    const fetchedTalentData = [];
    querySnapshot.forEach((doc) => {
      fetchedTalentData.push({ id: doc.id, ...doc.data() });
    });
    return fetchedTalentData;
  } catch (error) {
    console.error("Error fetching talent data:", error);
    return [];
  }
};