import * as firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export async function SignIn(data) {
  try {
    const response = firebase
      .auth()
      .signInWithEmailAndPassword(data.username, data.password);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function SignOut() {
  try {
    const response = firebase.auth().signOut();
    return response;
  } catch (error) {
    return error;
  }
}
