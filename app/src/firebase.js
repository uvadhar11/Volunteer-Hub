// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxxj17SlXivIeQczKJrDspmtjy0ZP_49k",
  authDomain: "volunteer-1856e.firebaseapp.com",
  projectId: "volunteer-1856e",
  storageBucket: "volunteer-1856e.appspot.com",
  messagingSenderId: "949286570426",
  appId: "1:949286570426:web:fd9fdda5b2e04e28d33583",
  measurementId: "G-ES0M0P2DY7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getAuth(app);

// firebase stuff
const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:3000");

const loginEmailPassword = async (auth, loginEmail, loginPassword) => {
  // const loginEmail =
  // const loginPassword =

  const userCredential = await signInWithEmailAndPassword(
    auth,
    loginEmail,
    loginPassword
  );

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
    // showLogInError(error);
    console.log("Wrong pass.");
  }
};

const createAccount = async (auth, loginEmail, loginPassword) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    loginEmail,
    loginPassword
  );

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
    // showLogInError(error);
    console.log("Wrong pass.");
  }
};

// Detect Authentication State
// onAuthStateChanged(auth, (user) => {
//   if (user != null) {
//     console.log("Logged In!");
//   } else {
//     console.log("No User!");
//   }
// });

// async function getCities(firestore) {
//   const citiesCol = collection(firestore, "cities");
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   return cityList;
// }

const monitorAuthState = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      // tell user is logged in and stuff (go to home)
    } else {
      console.log("Not logged in");
    }
  });
};

const logout = async () => {
  await signOut(auth);
};

export default app;
