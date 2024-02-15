import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  setDoc,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from './firestore';

const wordCollection = collection(firestore, 'words');

export const words = {
  get(id) {
    const q = query(wordCollection, where('owner', '==', id));
    return getDocs(q).then((resp) => {
      const arr = [];
      resp.forEach((document) => {
        const { id } = document;
        const words = document.data();
        arr.push({ id, words });
      });
      return arr;
    });
  },

  getById(wordsId) {
    const ref = doc(wordCollection, wordsId);
    return getDoc(ref).then((document) => {
      const { id } = document;
      const words = document.data();
      return { id, words };
    });
  },

  deleteDoc(wordsId) {
    deleteDoc(doc(wordCollection, wordsId));
  },

  add(obj) {
    return addDoc(wordCollection, obj).then((resp) => resp);
  },

  update(obj, id) {
    const ref = doc(wordCollection, id);
    return setDoc(ref, obj).then((resp) => resp);
  },
};
