<script>
import db from "../../connection/firebaseInit";
const data = [];
export default {
  data() {
    return {
      data
    };
  },
  methods: {
    getData() {
      const query = db
        .collection("users")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            var tmp = doc.data();
            tmp.id = doc.id;
            data.push(tmp);
          });
        });
    }
  }
};
</script>
