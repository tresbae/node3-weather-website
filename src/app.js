const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { createSecretKey } = require('crypto')

console.log(__dirname)
console.log(path.join(__dirname, '../public/index.html'))

const app = express()

// Define paths for Expres config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather', 
    name: 'Jen'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me', 
    name: 'Jen'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page', 
    message: 'This is a help message',
    name: 'Jen'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }

      res.send({
        forecast: forecastData,
        location, 
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jen',
    message: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jen',
    message: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})