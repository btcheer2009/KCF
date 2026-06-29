import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANDQEM9EXbuo8a7Czdl-Gz2GxxBBmA_Qk",
  authDomain: "celtic-yolk-qhh41.firebaseapp.com",
  projectId: "celtic-yolk-qhh41",
  storageBucket: "celtic-yolk-qhh41.firebasestorage.app",
  messagingSenderId: "461233567067",
  appId: "1:461233567067:web:7805debbeee0113b0bd67e"
};

const app = initializeApp(firebaseConfig);

const databaseId = "ai-studio-remixkcf-355d8b7b-488b-4f9b-a75d-ef367cd76c9c";

export const db = getFirestore(app, databaseId);
