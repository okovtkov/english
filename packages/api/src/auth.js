import { app } from './firestore.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';

const authorisation = getAuth(app);

export const auth = {
  signUp(email, password) {
    return createUserWithEmailAndPassword(authorisation, email, password).then(
      (userCredential) => userCredential.user
    );
  },

  signIn(email, password) {
    return signInWithEmailAndPassword(authorisation, email, password).then((userCredential) => {
      const refreshToken = userCredential.user.refreshToken;
      document.cookie = `refreshToken=${refreshToken}; path=/; Max-Age=31536000000; http-only`;

      return userCredential.user.getIdToken().then((token) => {
        document.cookie = `token=${token}; path=/; Max-Age=31536000000`;
        return userCredential.user;
      });
    });
  },

  signOut() {
    signOut(authorisation);
    indexedDB.databases().then((dbs) => {
      dbs.forEach((db) => indexedDB.deleteDatabase(db.name));
    });
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  },

  reset(email) {
    return sendPasswordResetEmail(authorisation, email);
  },
};
