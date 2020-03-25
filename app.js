const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

// SERVER

const app = express();

app.listen(3000, () => {
    console.log('listening at 3000...')
});

// EXTERNAL MIDDLEWARES

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// MY MIDDLEWARES

const quotesRoutes = require('./routes/quotes');

app.use('/quotes', quotesRoutes);

// BASE ROUTE

app.get('/', (request, response) => {
    response.send('go to /quotes');
});

// DATABASE

mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true }, 
    () => {
        console.log(mongoose.connection.readyState)
    }
);

