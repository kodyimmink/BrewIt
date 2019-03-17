export function searchBreweries(searchTerm){
    return new Promise((resolve) => {    
        resolve(fetch('https://api.openbrewerydb.org/breweries/search?query='+searchTerm)
          .then(res => res.json())
          .then(data => {
            return data.filter(data => (data.latitude != null || data.longitute != null));
          }).catch(error => console.error(error))
          )
    });
}
