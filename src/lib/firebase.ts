import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzZv0qhVCCx06Z44tZNmzP7176oZcm5vI",
  authDomain: "buysphere-7689e.firebaseapp.com",
  projectId: "buysphere-7689e",
  storageBucket: "buysphere-7689e.firebasestorage.app",
  messagingSenderId: "696804206025",
  appId: "1:696804206025:web:00512b9e433f27607c3418"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);