const express = require('express');
const Datastore = require('nedb');
const cors = require('cors');
require('dotenv/config');

// SERVER

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening at ${port}...`)
});

// DATABASE

const database = new Datastore('.data/database.db');
database.loadDatabase();

// EXTERNAL MIDDLEWARES

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// BASE ROUTE

app.get('/', (request, response) => {
    response.send('go to /quotes');
});

// MY MIDDLEWARES

app.get('/quotes', (request, response) => {
    database.find({}, (error, docs) => {
        if(docs != null) 
            response.json(docs);
        else 
            response.json(error);
    });
});

// GET SPECIFIC AUTHOR'S QUOTES

app.get('/quotes/author/:sourceName', async (request, response) => {
    database.find({source: request.params.sourceName}, (error, docs) => {
        if(docs != null) 
            response.json(docs);
        else 
            response.json(error);
    });
});

// GET SPECIFIC PHILOSOPHY'S QUOTES

app.get('/quotes/philosophy/:philosophyName', async (request, response) => {
    database.find({philosophy: request.params.philosophyName}, (error, docs) => {
        if(docs != null) 
            response.json(docs);
        else 
            response.json(error);
    });
});

// POST NEW QUOTE

app.post('/quotes/submit/:passkey', async (request, response) => {
    if(request.params.passkey == process.env.API_PASSKEY) {
        const data = request.body;
        database.insert(data, (error, newDocs) => {
            if(newDocs != null) 
                response.json(newDocs);
            else 
                response.json(error);
        });
    } else {
        response.json({
            error: "authorization failed"
        })
    }
});