import admin from 'firebase-admin';
import { serviceAccountKeys } from './serviceAccountKey.js';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKeys),
  });
}

export default admin;
