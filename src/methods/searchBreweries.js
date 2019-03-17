export function searchBreweries(searchTerm){
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
