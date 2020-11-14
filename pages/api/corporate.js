import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";
import { getVimeoData } from "./vimeo";
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

export async function getAllCorporate() {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    )
    .then(async function () {
      const db = firebase.firestore();
      const corporate = await db
        .collection("corporate")
        .get()
        .then(function (querySnapshot) {
          let data = [];
          querySnapshot.forEach(function (doc) {
            let item = doc.data();
            const dateString = item.date.toDate();
            item.date = moment(dateString).format("DD/MM/YYYY");
            item.id = doc.id;
            data.push(item);
          });
          return data;
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
      return corporate;
    });
  return response;
}

export async function addCorporate(data) {
  const updatedData = await getVimeoData(data);
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    )
    .then(async function () {
      const db = firebase.firestore();
      const corporate = await db
        .collection("corporate")
        .add({
          company: updatedData.company,
          coverPhoto: updatedData.coverPhoto,
          description: updatedData.description,
          date: moment(updatedData.date, "DD-MM-YYYY").toDate(),
          testimonial: updatedData.corporateTestimonial,
          video: `https://player.vimeo.com/video/${updatedData.videoId}?autoplay=1`,
          duration: updatedData.duration,
          videoId: updatedData.corporateVideoId,
        })
        .catch(function (error) {
          toast.error("An error has occurred", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
      return corporate;
    });
  return response;
}

export async function editCorporate(data) {
  const updatedData = await getVimeoData(data);
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    )
    .then(async function () {
      const db = firebase.firestore();
      const corporate = await db
        .collection("corporate")
        .doc(updatedData.id)
        .update({
          company: updatedData.company,
          coverPhoto: updatedData.coverPhoto,
          description: updatedData.description,
          date: moment(updatedData.date, "DD-MM-YYYY").toDate(),
          testimonial: updatedData.corporateTestimonial,
          video: `https://player.vimeo.com/video/${updatedData.videoId}?autoplay=1`,
          duration: updatedData.duration,
          videoId: updatedData.corporateVideoId,
        })
        .catch(function (error) {
          toast.error("An error has occurred", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
      return corporate;
    });
  return response;
}

export async function deleteCorporate(data) {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    )
    .then(async function () {
      const db = firebase.firestore();
      const corporate = await db
        .collection("corporate")
        .doc(data.id)
        .delete()
        .catch(function (error) {
          toast.error("An error has occurred", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
      return corporate;
    });
  return response;
}
