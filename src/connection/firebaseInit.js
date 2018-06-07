// import firebaseConfig from './firebaseConfig'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// config
const firebaseConfig = {
  apiKey: "AIzaSyBzZfKe1bb1UU018QpY-UxlNZ2uZa78Il0",
  authDomain: "billingsupportvue.firebaseapp.com",
  databaseURL: "https://billingsupportvue.firebaseio.com",
  projectId: "billingsupportvue",
  storageBucket: "",
  messagingSenderId: "916374704978"
};
firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const auth = firebase.auth();
// const currentUser = auth.currentUser;
const settings = {
  timestampsInSnapshots: true
}; // your settings...
const firestore = firebase.firestore();
firestore.settings(settings);
// db.settings(settings);
// firebase collections
// const usersCollection = db.collection('users')
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')
// export {
//   db,
//   // auth,
//   // currentUser,
//   usersCollection,
//   postsCollection,
//   commentsCollection,
//   likesCollection
// }
export {
  firebase,
  firestore
}
