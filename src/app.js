const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path forExpress config
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Ayushi'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name:'Ayushi'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Ayushi',
        msg: 'Click here to get help'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'An address must be provided'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude,longitude,(error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search string'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '4O4',
        name: 'Ayushi',
        errorMsg: 'Help article not found'
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title: '4O4',
        name: 'Ayushi',
        errorMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})