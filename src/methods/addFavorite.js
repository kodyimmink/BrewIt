const firebase = require("firebase");

const firestoreRef = firebase.firestore();
const breweriesColRef = firestoreRef.collection('users'); 


export function addFavoriteBrewery(){
        let promiseArray = [];
        for (let i = 0; i < breweries.length; i++){
            for (let j = 0; j < breweries[i].length; j++){
                promiseArray.push(
                    breweriesColRef.add({
                        id: breweries[i][j].id,
                        name: breweries[i][j].name,
                        brewery_type: breweries[i][j].brewery_type,
                        street: breweries[i][j].street,
                        city: breweries[i][j].city,
                        state: breweries[i][j].state,
                        postal_code: breweries[i][j].postal_code,
                        country: breweries[i][j].country,
                        longitude: breweries[i][j].longitude,
                        latitude: breweries[i][j].latitude,
                        phone: breweries[i][j].phone,
                        website_url: breweries[i][j].website_url,
                        api_updated_at: breweries[i][j].updated_at,
                        tag_list: breweries[i][j].tag_list
              })
              .then((res) => {
                console.log(`Document created at ${res.updateTime}`);
              })
              .catch((err) => {
                console.log(`Failed to create document: ${err}`);
              })
            )}
        }
    return await Promise.all(promiseArray);  
}
  