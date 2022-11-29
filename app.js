const express = require('express');
require('dotenv').config();
const routes = require('./routes/main.js');

const app = express();
const port = process.env.PORT | 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use('/', routes);
app.use(express.static('public'));

app.listen(port, function() {
    console.log("Server Started On Port " + port);
});