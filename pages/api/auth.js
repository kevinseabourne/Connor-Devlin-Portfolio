import * as firebase from "firebase/app";
import "firebase/auth";
import http from "./httpService";
import jwtDecode from "jwt-decode";

const config_ = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config_);
}

export async function signIn(formData) {
  const { data } = await http.post(
    process.env.NEXT_PUBLIC_FIREBASE_SIGNIN_ENDPOINT +
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    {
      email: formData.username,
      password: formData.password,
      returnSecureToken: true,
    }
  );
  localStorage.setItem("tokenKey", data.idToken);
  return data;
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("tokenKey");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function signOut() {
  localStorage.removeItem("tokenKey");
}
