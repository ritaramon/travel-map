import { auth, categoriesCollection } from "../config/firebaseConfig";
import { Category } from "../types";
import firebase from "firebase/app";

export const addCategory = async (
  categoryData: Category
): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> => {
  return await categoriesCollection.add({
    userId: auth.currentUser?.uid,
    ...categoryData,
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
