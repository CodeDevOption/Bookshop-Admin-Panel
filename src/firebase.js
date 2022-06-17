import {initializeApp} from'firebase/app';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
      apiKey: "AIzaSyASEggbrYSbZd_9XOmqsTERN1pdbqg0Gmo",
      authDomain: "storyflix-ee0fc.firebaseapp.com",
      projectId: "storyflix-ee0fc",
      storageBucket: "storyflix-ee0fc.appspot.com",
      messagingSenderId: "567125425735",
      appId: "1:567125425735:web:a8cddcc208e3ed22233b62",
      measurementId: "G-382VPV1R8N"
  };
const App = initializeApp(firebaseConfig);
export const db = getFirestore(App);
export const storage = getStorage(App);

   