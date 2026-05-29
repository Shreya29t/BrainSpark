import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey:
    "AIzaSyDbj-m_7SF3AwNeWjVveBmCVaEXjKnyhDo",

  authDomain:
    "brainspark-79e5b.firebaseapp.com",

  projectId:
    "brainspark-79e5b",

  storageBucket:
    "brainspark-79e5b.firebasestorage.app",

  messagingSenderId:
    "493655194976",

  appId:
    "1:493655194976:web:e8fce45fb5f4bedfc63205",
};

const app =
  initializeApp(
    firebaseConfig
  );

export const auth =
  getAuth(app);

export const provider =
  new GoogleAuthProvider();