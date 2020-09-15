import firebase from "firebase/app";
import "firebase/firestore";

// async function getToken() {
//   const { data } = await http.post(
//     process.env.NEXT_PUBLIC_FIREBASE_SIGNIN_ENDPOINT +
//       process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     {
//       email: "admin@admin.com",
//       password: "xzsawq21",
//       returnSecureToken: true,
//     }
//   );
//   return data.refreshToken;
// }

// export async function getAllWeddings() {
//   const token = await getToken();
//   console.log(token);
//   const response = await http.get(process.env.NEXT_PUBLIC_FIREBASE_ENDPOINT, {
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
//       "Access-Control-Allow-Headers":
//         "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
//     },
//     Authorization: `Bearer ${token}`,
//   });
//   return response;
// }

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

export async function getAllWeddings() {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    )
    .then(async function () {
      const db = firebase.firestore();
      const weddings = await db
        .collection("weddings")
        .get()
        .then(function (querySnapshot) {
          let data = [];
          querySnapshot.forEach(function (doc) {
            let item = doc.data();
            item.weddingDate = item.weddingDate.toDate().toLocaleDateString();
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

  // const db = firebase.firestore();
  // const weddings = await db
  //   .collection("weddings")
  //   .doc("64Fvb899DN4tT399fcAU")
  //   .get()
  //   .then((doc) => {
  //     if (doc.exists) {
  //       return doc.data();
  //     }
  //   });
  // console.log(weddings);
  // return weddings;

  //   const db = firebase.firestore();
  // const weddings = await db
  //   .collection("weddings")
  //   .get()
  //   .then(function (querySnapshot) {
  //     let data = [];
  //     querySnapshot.forEach(function (doc) {
  //       let item = doc.data();
  //       item.weddingDate = item.weddingDate.toDate().toLocaleDateString();
  //       data.push(item);
  //     });
  //     return data;
  //   })
  //   .catch(function (error) {
  //     console.log("Error getting document:", error);
  //   });
  // return weddings;
}
