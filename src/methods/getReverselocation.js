//possibly expand the data that this function returns
//for example it could return the entire response
//we then select specific properties


export function getReverseLocation(lat, long){
    return new Promise((resolve) => {    
        resolve(fetch("https://nominatim.openstreetmap.org/reverse.php?lat="+lat+"&lon="+long+"&format=json")
          .then(res => res.json())
          .then(location => {
            return location.address.postcode;
          }).catch(error => console.error(error))
          )
    });
}