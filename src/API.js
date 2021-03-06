import fire from './fire';
const firebase = require("firebase");

const firestoreRef = firebase.firestore();
const usersColRef = firestoreRef.collection('users');
const ratingsColRef = firestoreRef.collection('ratings');  
const reviewsColRef = firestoreRef.collection('reviews');  

export function getLocation() {

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, () => {      
        resolve(fetch('https://ipapi.co/json')
          .then(res => res.json())
          .then(location => {
            return {
              lat: location.latitude,
              lng: location.longitude
            };
          }));
      });
    }).then(data => {return data});
  }

export function getLocalBreweriesList(coords){
  function searchBreweries(searchTerm){
    return new Promise((resolve) => {    
      resolve(fetch('https://api.openbrewerydb.org/breweries/search?query='+searchTerm)
        .then(res => res.json())
        .then(data => {
          const cleanedData = data.filter(data => (data.latitude != null || data.longitute != null));
          return cleanedData.filter(cleanedData => (cleanedData.state === searchTerm ));
        }).catch(error => console.error(error))
        )
    });
  }

  function getReverseLocation(coords){
    const lat = coords.lat;
    const lng = coords.lng;
    return new Promise((resolve) => {    
      resolve(fetch("https://nominatim.openstreetmap.org/reverse.php?lat="+lat+"&lon="+lng+"&format=json")
        .then(res => res.json())
        .then(location => {
          return location.address.state;
        }).catch(error => console.error(error))
        )
    });
  }

return getReverseLocation(coords).then(stateLocation => searchBreweries(stateLocation));

}

export function getUserFavoritesFromDb(docId){
  const userDocRef = usersColRef.doc(docId);
  return new Promise((resolve) => { resolve(
    userDocRef.get().then(docSnap => {
      //console.log(docSnap.data().favorites);
      return docSnap.data().favorites;
    }).catch(error => console.error(error))
    )
  });
}

export function updateUserFavoritesInDb(docId, brewery){
  const userDocRef = usersColRef.doc(docId);
  return new Promise((resolve) => { resolve(
    userDocRef.update({
      favorites: firebase.firestore.FieldValue.arrayUnion(brewery)
    }).then(function(){
        return getUserFavoritesFromDb(docId);
    }).catch(error => console.error(error))
    )
  });
}

export function removeFavoriteBreweryInDb(docId, brewery){
  const userDocRef = usersColRef.doc(docId);
  return new Promise((resolve) => { resolve(
    userDocRef.update({
      favorites: firebase.firestore.FieldValue.arrayRemove(brewery)
    }).then(function(){
        return getUserFavoritesFromDb(docId);
    }).catch(error => console.error(error))
    )
  });
}

export function getUserDocumentId(uid){
  const query = usersColRef.where("uid", "==", uid);
  return new Promise(
    (resolve) => { resolve(
      query.get().then(querySnapshot => {
        return querySnapshot.docs[0].id
    }).catch(error => console.error(error))
    )
  });
}


//Ratings
//**********************************************************************//

export function addBreweryRatingToDb(breweryId, userRating, userId){
  const query = ratingsColRef.where("userId", "==", userId).where("breweryId", "==", breweryId);
  let ratingsDocRef;
  query.get().then(querySnapshot => {
    if (querySnapshot.empty)
    {
      ratingsColRef.add(
          {
            userId: userId,
            breweryId: breweryId,
            userRating: userRating,
          }
      )
    }
    else{
      ratingsDocRef = querySnapshot.docs[0].ref
      ratingsDocRef.update(
        {
          userId: userId,
          breweryId: breweryId,
          userRating: userRating,
        }
      )
    }
  }).catch(error => console.error(error))
}

export function getBreweryRating(breweryId, userId){
  const query = ratingsColRef.where("userId", "==", userId).where("breweryId", "==", breweryId);
  return new Promise(
    (resolve) => { resolve(
      query.get().then(querySnapshot => {
        if(querySnapshot.empty){
          return 0;
        }
        else{
          return querySnapshot.docs[0].data().userRating;
        }
    }).catch(error => console.error(error))
    )
  });
}


//Reviews
//**********************************************************************//

export function addBreweryReviewToDb(breweryId, userReview, userId){
  const query = reviewsColRef.where("userId", "==", userId).where("breweryId", "==", breweryId);
  let reviewsDocRef;
  query.get().then(querySnapshot => {
    if (querySnapshot.empty)
    {
      reviewsColRef.add(
          {
            userId: userId,
            breweryId: breweryId,
            userReview: userReview,
          }
      )
    }
    else{
      reviewsDocRef = querySnapshot.docs[0].ref
      reviewsDocRef.update(
        {
          userId: userId,
          breweryId: breweryId,
          userReview: userReview,
        }
      )
    }
  }).catch(error => console.error(error))
}

export function getBreweryReview(breweryId, userId){
  const query = reviewsColRef.where("userId", "==", userId).where("breweryId", "==", breweryId);
  return new Promise(
    (resolve) => { resolve(
      query.get().then(querySnapshot => {
        if(querySnapshot.empty){
          return null;
        }
        else{
          return querySnapshot.docs[0].data().userReview;
        }
    }).catch(error => console.error(error))
    )
  });
}