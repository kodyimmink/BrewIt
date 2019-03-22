const firebase = require("firebase");

const firestoreRef = firebase.firestore();
const breweriesColRef = firestoreRef.collection('breweries'); 


export function addBreweriesToDb(){

    async function getAllBreweries(maxPage) {
      let promiseArray = [];
      for (let i = 1; i <= maxPage; i++) {
        let breweriesUrl = "https://api.openbrewerydb.org/breweries?page="+i+"&per_page=50";
        promiseArray.push(fetch(breweriesUrl)
        .then(response => response.json())
        .catch(error => console.log(error)));
      }
      
      console.log(promiseArray);
      return await Promise.all(promiseArray);
    }
  
    async function writeBreweryData(breweries) {
        //console.log(breweries);
        let promiseArray = [];
        for (let i = 0; i <= breweries.length; i++){
            promiseArray.push(
                breweriesColRef.add({
                    id: breweries[i].id,
                    name: breweries[i].name,
                    brewery_type: breweries[i].brewery_type,
                    street: breweries[i].street,
                    city: breweries[i].city,
                    state: breweries[i].state,
                    postal_code: breweries[i].postal_code,
                    country: breweries[i].country,
                    longitude: breweries[i].longitude,
                    latitude: breweries[i].latitude,
                    phone: breweries[i].phone,
                    website_url: breweries[i].website_url,
                    api_updated_at: breweries[i].updated_at,
                    tag_list: breweries[i].tag_list
          })
          .then((res) => {
            console.log(`Document created at ${res.updateTime}`);
          })
          .catch((err) => {
            console.log(`Failed to create document: ${err}`);
          })
        )
        }
    return await Promise.all(promiseArray);  
    }
    
     getAllBreweries(161)
      .then(data => {
         writeBreweryData(data)
      })
      .then(console.log("breweries written to firestore"))
      .catch(error => console.log(error));
  
    }
  