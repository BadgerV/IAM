import * as firebaseAdmin from "firebase-admin";
import fs from "fs";
import path from "path";
import { FirebaseConfig, firebaseProps } from "../../config/config";

const initFirebase = () => {
  if (firebaseAdmin.apps.length === 0) {
    const firebaseServiceAccount = JSON.parse(firebaseProps.firebase);

    // Initialize Firebase Admin SDK
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
      storageBucket: FirebaseConfig.FIREBASE_STORAGE_BUCKET,
    });
  }
};

export default initFirebase;
