import {Users} from "../../models/users";
import {firestore} from '../../connection/firebaseInit.js';
// const db = require('../../connection/firebaseInit.js');
var user = new Users();
const data = [];
export default {
  select() {
    this.data = [];
    const query = firestore
      .collection("users")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          user = doc.data();
          user.id = doc.id;
          data.push(user);
        });
      });
    return data;
  },
  insert() {

  },
  update() {

  }
}
