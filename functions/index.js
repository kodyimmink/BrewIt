'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const firestoreRef = admin.firestore();
const usersDocRef = firestoreRef.collection('users').doc();

//create new user document in firestore
function writeUserData(userId, name, email) {
  usersDocRef.create({
    uid: userId,
    username: name,
    email: email,
    favorites: [],
    reviews: []
  }).then((res) => {
    console.log(`Document created at ${res.updateTime}`);
  }).catch((err) => {
    console.log(`Failed to create document: ${err}`);
  });
}

//add user to our firestore database when new user is authenticated
exports.addUsertoDb = functions.auth.user()
    .onCreate(function(user) {
      var uid = user.uid;
      var displayName = user.displayName;
      var email = user.email;
      return writeUserData(uid, displayName, email);
});