import {
    collection,
    query,
    where,
    getDocs,
  } from "firebase/firestore";
  import { db } from "../../db/firebase";
  
  export const getPosts = async (creatorId) => {
    try {
      const q = query(
        collection(db, "posts"),
        where("creatorId", "==", creatorId)
      );
      const querySnapshot = await getDocs(q);
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() });
      });
      fetchedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      return fetchedPosts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };
  
  