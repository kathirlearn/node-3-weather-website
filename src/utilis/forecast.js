const request = require('postman-request');
const forecast = (longtitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e53b499efa948ebdb35b8116b14a05e4&query=${latitude},${longtitude}&unit=f`;
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined);
        } else if(body.error){
            callback('Unable to find location', undefined);
        } else {
            const data = body;
            if(data){
                callback(undefined, `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degress out. It feels like ${data.current.feelslike} degress out. The humidity is ${data.current.humidity}%`);
                // callback(undefined, {
                //     feelslike : data.current.feelslike,
                //     weather_descriptions: data.current.weather_descriptions[0],
                //     temperature : data.current.temperature
                // });
            }
        }
    });

};

module.exports = forecast;