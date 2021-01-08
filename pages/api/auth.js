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
  const user = {
    token: data.idToken,
    expiry: new Date().toString(),
  };
  localStorage.setItem("user", JSON.stringify(user));
  return data;
}

export function getCurrentUser() {
  try {
    const userObj = JSON.parse(localStorage.getItem("user"));
    const { token } = userObj;
    const expired = userSessionExpired();
    if (!expired) {
      return jwtDecode(token);
    } else {
      return null;
    }
  } catch (ex) {
    return null;
  }
}

export function signOut() {
  localStorage.removeItem("user");
}

export function userSessionExpired() {
  const userObj = JSON.parse(localStorage.getItem("user"));
  const { token, expiry } = userObj;

  const currentDate = new Date();
  const tokenExpiryDate = new Date(expiry);

  const timeDifference = Math.floor(
    (Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    ) -
      Date.UTC(
        tokenExpiryDate.getFullYear(),
        tokenExpiryDate.getMonth(),
        tokenExpiryDate.getDate()
      )) /
      (1000 * 60 * 60 * 24)
  );
  debugger;
  // if the admin has not visited the site for 7 days then sign them out.
  if (timeDifference >= 7) {
    signOut();
    return true;
  } else {
    // reset the expiry time instead of automatically signing them out after 7 days logged in.
    const user = {
      token: token,
      expiry: new Date().toString(),
    };
    localStorage.setItem("user", JSON.stringify(user));
  }
  return false;
}
