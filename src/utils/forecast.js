const request = require('request')

const forecast = (longitude, latitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=4896af2c99e904163af730d4bbb5ce5b&query=' + longitude + ',' + latitude + '&units=f'

  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect', undefined)
    } else if (body.error) {
      callback('Unable to fetch weather data!', undefined)
    } else {
      callback(undefined, 
        body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees.' + ' There is a ' + body.current.precip + ' chance of precipitation.'
      )
    }
  })
}

module.exports = forecast