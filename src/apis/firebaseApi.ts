import { auth, categoriesCollection } from "../config/firebaseConfig";
import { Category } from "../globalTypes";
import firebase from "firebase/app";

export const addCategory = async (
  data: Category
): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> => {
  // const snapshot = await categoriesCollection.get();
  // console.log(snapshot.docs.map((doc) => doc.id + " " + doc.data()));
  return await categoriesCollection.add({
    userId: auth.currentUser?.uid,
    name: data.name,
    color: data.color,
  });
};

export const getCategories = async (): Promise<
  firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
> => {
  return await categoriesCollection
    .where("userId", "==", auth.currentUser?.uid)
    .get();
};

export const deleteCategory = async (id: string): Promise<void> => {
  return await categoriesCollection.doc(id).delete();
};
