import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const addPost = async (data, formattedDate, id) => {
  try {
    await addDoc(collection(db, "posts"), {
      creatorId: id,
      header: data.header,
      description: data.description,
      date: formattedDate,
      coins: 0,
    });
    console.log("Data added to Firestore successfully!");
  } catch (error) {
    console.error("Error adding data to Firestore: ", error);
  }
};
