import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2_xjmGn94gcudgAgb0Y9axgcNBJHu1bk",
  authDomain: "causal-guide-299607.firebaseapp.com",
  projectId: "causal-guide-299607",
  storageBucket: "causal-guide-299607.appspot.com",
  messagingSenderId: "938214341085",
  appId: "1:938214341085:web:38378d71584a628bfc1e34",
  measurementId: "G-DEFERFHX1V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        bookmarks: []
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message.replace('Firebase: ', ''));
  }
};

const facebookProvider = new FacebookAuthProvider();
const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "facebook",
        email: user.email,
        bookmarks: []
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message.replace('Firebase: ', ''));
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};
const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    name,
    authProvider: "local",
    email,
    bookmarks: []
  });
};
const sendPasswordReset = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
  alert("Password reset link sent!");
};
const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithFacebook,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout
};
