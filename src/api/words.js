import { collection, addDoc, getDocs, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from './firestore';

const wordCollection = collection(firestore, 'words');

export const words = {
  get() {
    return getDocs(wordCollection).then(resp => {
      const arr = [];
      resp.forEach((document) => {
        const { id } = document;
        const words = document.data();
        arr.push({ id, words });
      })
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
  }
}