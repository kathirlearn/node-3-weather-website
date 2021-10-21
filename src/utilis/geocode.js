const request = require('postman-request');
const chalk = require('chalk');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia2F0aHRoaXIiLCJhIjoiY2t1b3lmMHljMGpicDJwbWRrZDZxdjMzOSJ9.EQJrMLvPzf249pSSIvs-PA&limit=1`;
    request({ url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to Geocode service', undefined);
        } else if(!body.features || body.features.length === 0){
            callback('Unable to find location, try another search', undefined);
        } else {
            const data = body;
            if(data){
                callback(undefined, {
                    latitude : data.features[0].center[1],
                    longtitude : data.features[0].center[0],
                    location: data.features[0].place_name
                });
            }
        }
    });
};

module.exports = geoCode;

