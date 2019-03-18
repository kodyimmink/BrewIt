export function firestoreTesting(){

    const firebase = require("firebase");
    // Required for side-effects
    require("firebase/firestore");

    var db = firebase.firestore();

    db.collection("testing").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
