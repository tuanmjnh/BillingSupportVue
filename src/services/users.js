import db from "../connection/firebaseInit";
import {
  Users
} from "../models/users";
var user = new Users();
const data = [];
export default {
  select() {
    const query = db
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
  }
}
