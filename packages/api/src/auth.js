import { app } from './firestore.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

const authorisation = getAuth(app);

export const auth = {
  signUp(email, password) {
    return createUserWithEmailAndPassword(authorisation, email, password).then(
      (userCredential) => userCredential.user,
    );
  },

  signIn(email, password) {
    return signInWithEmailAndPassword(authorisation, email, password).then(
      (userCredential) => userCredential.user,
    );
  },

  reset(email) {
    return sendPasswordResetEmail(authorisation, email);
  },
};
