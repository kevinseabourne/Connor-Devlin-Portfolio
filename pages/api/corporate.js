import firebase from "firebase/app";
import "firebase/firestore";

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

export async function getAllCorporate() {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    )
    .then(async function () {
      const db = firebase.firestore();
      const weddings = await db
        .collection("corporate")
        .get()
        .then(function (querySnapshot) {
          let data = [];
          querySnapshot.forEach(function (doc) {
            let item = doc.data();
            item.jobDate = item.jobDate.toDate().toLocaleDateString();
            item.id = doc.id;
            data.push(item);
          });
          return data;
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
      return weddings;
    });
  return response;
}