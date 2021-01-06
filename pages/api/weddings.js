import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";
import { getVimeoData } from "./vimeo";
import { toast } from "react-toastify";
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
        .orderBy("date", "desc")
        .limit(20)
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
          toast.error("An unexpected error has occurred", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          logger.log(error);
        });
      return weddings;
    });
  return response;
}

export async function getNextWeddings(lastIndex) {
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
        .orderBy("date", "desc")
        .startAfter(lastIndex.date)
        .limit(20)
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
          toast.error("An unexpected error has occurred", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          logger.log(error);
        });
      return weddings;
    });
  return response;
}

export async function addWedding(data) {
  const updatedData = await getVimeoData(data);
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
        .add({
          coverPhoto: updatedData.coverPhoto,
          location: {
            state: updatedData.stateTerritory.value,
            suburb: updatedData.suburb,
          },
          date: moment(updatedData.date, "DD-MM-YYYY").toDate(),
          partners: updatedData.partners,
          description: updatedData.description,
          video: `https://player.vimeo.com/video/${updatedData.videoId}?autoplay=1`,
          duration: updatedData.duration,
          testimonial: updatedData.testimonial,
          videoId: updatedData.weddingVideoId,
        })
        .catch(function (error) {
          toast.error("An unexpected error has occurred", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          logger.log(error);
        });
      return weddings;
    });
  return response;
}

export async function editWedding(data) {
  const updatedData = await getVimeoData(data);
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
        .doc(updatedData.id)
        .update({
          coverPhoto: updatedData.coverPhoto,
          location: {
            state: updatedData.stateTerritory.value,
            suburb: updatedData.suburb,
          },
          date: moment(updatedData.date, "DD-MM-YYYY").toDate(),
          partners: updatedData.partners,
          description: updatedData.description,
          video: `https://player.vimeo.com/video/${updatedData.videoId}?autoplay=1`,
          duration: updatedData.duration,
          testimonial: updatedData.testimonial,
          videoId: updatedData.weddingVideoId,
        })
        .catch(function (error) {
          toast.error("An unexpected error has occurred", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          logger.log(error);
        });
      return weddings;
    });
  return response;
}

export async function deleteWedding(data) {
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
        .doc(data.id)
        .delete()
        .catch(function (error) {
          toast.error("An unexpected error has occurred", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          logger.log(error);
        });
      return weddings;
    });
  return response;
}
