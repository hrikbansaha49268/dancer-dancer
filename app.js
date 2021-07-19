const express = require("express");
const { request } = require("http");
const path = require("path");
const bodypasrser = require("body-parser");
const mongoose = require('mongoose');
const port = 8000;



// Mongoose and mongodb
mongoose.connect('mongodb://localhost:27017/contactDA', { useNewUrlParser: true, useUnifiedTopology: true });
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});
const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
const app = express()
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
// Home
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
// Contact us
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.status(200).render('contact.pug');
    }).catch(() => {
        res.status(404).send("Item was not saved to the database");
    });
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port localhost:${port}`);
});
