import { doc, updateDoc, getDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

export const addCoin = async (userId, postId, sponsorId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const postDocRef = doc(db, "posts", postId);
    const sponsorDocRef = doc(db, "users", sponsorId);

    const sponsorDocSnapshot = await getDoc(sponsorDocRef);
    const sponsorCoins = sponsorDocSnapshot.data().coins;

    if (sponsorCoins >= 1) {
      await Promise.all([
        updateDoc(userDocRef, { coins: increment(1) }),
        updateDoc(postDocRef, { coins: increment(1) }),
        updateDoc(sponsorDocRef, { coins: increment(-1) }),
      ]);
    } else {
      alert("Insufficient coins!");
    }
  } catch (error) {
    console.error("Error adding coin:", error);
  }
};
