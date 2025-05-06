import { Platform } from 'react-native';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBGxbhPW-aYgMx0C0jV-rhfkVQbqjYMd_8",
  authDomain: "job-trace-1e25f.firebaseapp.com",
  databaseURL: "https://job-trace-1e25f-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "job-trace-1e25f",
  storageBucket: "job-trace-1e25f.firebasestorage.app",
  messagingSenderId: "487603508242",
  appId: "1:487603508242:web:16914ce497f86b70ea34cb",
  measurementId: "G-NNSLRWXNR3"
};

export const initializeFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return firebase;
};

export const getDatabase = () => {
  return database();
};