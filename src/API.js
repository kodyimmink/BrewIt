import fire from './fire';
const firebase = require("firebase");

const firestoreRef = firebase.firestore();
const usersColRef = firestoreRef.collection('users'); 

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
    });
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

export async function getUserFavoritesFromDb(uid){
  const query = usersColRef.where("uid", "==", uid);
  let resolvedVal;
  return new Promise((resolve) => { resolve(
     query.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        resolvedVal = doc.data().favorites;
        console.log(resolvedVal);
        return resolvedVal;
      })
      })

  )
  })
  }

export function getUserDocumentId(uid){
  const query = usersColRef.where("uid", "==", uid);
  return new Promise(
    (resolve) => {
      resolve(
        query.get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            return doc.id;
          })
          })
        );
      })  
}

  


