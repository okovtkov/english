import { app } from "./firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

export const authorisation = {
  signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => userCredential.user)
  },

  signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => userCredential.user);
  }
}