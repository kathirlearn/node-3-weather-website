const path = require('path'); 
const express =  require('express');
const hbs = require('hbs');
const geoCode = require('./utilis/geocode');
const forecast = require('./utilis/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Its your weather app',
        name: 'Kaththi_R'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About title',
        name: 'Kaththi_R'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help title',
        name: 'Kaththi_R'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    geoCode(req.query.address,(error, {longtitude, latitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            });
          }
          forecast(longtitude, latitude, (error, forecastData) => {
            if (error) {
               return res.send({
                    error
                });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
          });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!!'
        });
    }
    res.send({
       products:[]
    });
});

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found!!',
        name: 'Kaththi_R'
    });
});

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'page not found!!',
        name: 'Kaththi_R'
    })
});

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});



// REF

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

// its wont run, because we are using express static to load static file on empty route(default route)
// app.get('', (req, res) => {
//     res.send('<h1>Hello express!!</h1>');
// });

// app.get('/help', (req, res) => {
//     res.sendFile(path.join(publicDirectoryPath,'/help.html'));
// });

// app.get('/about', (req, res) => {
//     res.sendFile(path.join(publicDirectoryPath+'/about.html'));
// });