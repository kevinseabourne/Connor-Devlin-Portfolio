import firebase from "firebase/app";
import "firebase/firestore";
import logger from "./logger";

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
        .orderBy("price", "desc")
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
          logger.log(error);
        });
      return packages;
    });
  return response;
}

export async function getAddOns() {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    )
    .then(async function () {
      const db = firebase.firestore();
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
          logger.log(error);
        });
      return addOns;
    });
  return response;
}

export async function updateAddOns(addOnObj) {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    )
    .then(async function () {
      const db = firebase.firestore();
      const addOns = await db
        .collection("pricing")
        .doc("addOns")
        .update({ addOns: addOnObj })
        .then(function (doc) {
          if (doc.exists) {
            return doc.data();
          }
        })
        .catch(function (error) {
          logger.log(error);
        });
      return addOns;
    });
  return response;
}

export async function addPricingPackage(pack) {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    )
    .then(async function () {
      const db = firebase.firestore();
      const pricingPackage = await db
        .collection("pricing")
        .doc("packages")
        .collection("packages")
        .add(pack)
        .catch(function (error) {
          logger.log(error);
        });
      return pricingPackage;
    });
  return response;
}

export async function updatePricingPackage(pricingPackage, id) {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    )
    .then(async function () {
      const db = firebase.firestore();
      const updatedPackage = await db
        .collection("pricing")
        .doc("packages")
        .collection("packages")
        .doc(id)
        .update(pricingPackage)
        .then(function () {
          return true;
        })
        .catch(function (error) {
          logger.log(error);
        });
      return updatedPackage;
    });
  return response;
}

export async function deletePricingPackage(id) {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    )
    .then(async function () {
      const db = firebase.firestore();
      const deletePackage = await db
        .collection("pricing")
        .doc("packages")
        .collection("packages")
        .doc(id)
        .delete()
        .then(function () {
          return true;
        })
        .catch(function (error) {
          logger.log(error);
        });
      return deletePackage;
    });
  return response;
}
