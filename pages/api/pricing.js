import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";
import { toast } from "react-toastify";

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

export async function getAllPricingPackages() {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    )
    .then(async function () {
      const db = firebase.firestore();
      const packages = await db
        .collection("pricing")
        .doc("packages")
        .collection("packages")
        .get()
        .then(function (querySnapshot) {
          let data = [];
          querySnapshot.forEach(function (doc) {
            let item = doc.data();
            item.id = doc.id;
            data.push(item);
          });
          return data;
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });

      const addOns = await db
        .collection("pricing")
        .doc("addOns")
        .get()
        .then(function (doc) {
          if (doc.exists) {
            return doc.data();
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
      const response = [packages, addOns];
      console.log(response);
      return response;
    });
  return response;
}

export async function updatePricingPackage(pricingPackage) {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    )
    .then(async function () {
      const db = firebase.firestore();
      const aboutMe = await db
        .collection("pricing")
        .doc(pricingPackage.id)
        .update(pricingPackage)
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
      return aboutMe;
    });
  return response;
}

export async function deletePricingPackage(pricingPackage) {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    )
    .then(async function () {
      const db = firebase.firestore();
      const aboutMe = await db
        .collection("pricing")
        .doc(pricingPackage.id)
        .delete()
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
      return aboutMe;
    });
  return response;
}