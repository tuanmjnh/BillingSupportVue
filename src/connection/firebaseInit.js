import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true }; // your settings...
firestore.settings(settings);
export default firestore;
