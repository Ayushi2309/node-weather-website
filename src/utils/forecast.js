const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/6cc60dc5d813090ab4be3cfe5d445bb2/' + latitude + ',' + longitude + '?units=si'

    request({url,json: true}, (error,{ body }) => {
        if(error) {
            callback('Unable to connect to weather service',undefined)
        }
        else if(body.error) {
            callback('Unable to find location',undefined)
        }
        else {
            console.log(body.daily.data[0])
            callback(undefined,body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + 
            ' degrees out.The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of '
             +  body.daily.data[0].temperatureLow +'. There is ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast