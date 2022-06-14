import {initializeApp} from'firebase/app';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyBHCFLjE8tUEDluFfh364plBOtSdvI0b9I",
    authDomain: "admin-panel-62a8a.firebaseapp.com",
    projectId: "admin-panel-62a8a",
    storageBucket: "admin-panel-62a8a.appspot.com",
    messagingSenderId: "61694938271",
    appId: "1:61694938271:web:84df2215e7b2b88b3e66aa",
    measurementId: "G-8S2JDM29XT"
  };
const App = initializeApp(firebaseConfig);
export const db = getFirestore(App);
export const storage = getStorage(App);

   