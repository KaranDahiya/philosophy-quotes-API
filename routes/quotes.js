const express = require('express');
const Quote = require('../models/Quote');
require('dotenv/config');

const router = express.Router();

// GET ALL QUOTES

router.get('/', async (request, response) => {
    try {
        const gets = await Quote.find();
        response.json(gets);
    } catch (error) {
        response.json({
            message: error
        });
    }
});

// GET SPECIFIC AUTHOR'S QUOTES

router.get('/author/:sourceName', async (request, response) => {
    try {
        const gets = await Quote.find({source: request.params.sourceName});
        response.json(gets);
    } catch (error) {
        response.json({
            message: error
        });
    }
});

// GET SPECIFIC PHILOSOPHY'S QUOTES

router.get('/philosophy/:philosophyName', async (request, response) => {
    try {
        const gets = await Quote.find({philosophy: request.params.philosophyName});
        response.json(gets);
    } catch (error) {
        response.json({
            message: error
        });
    }
});

// POST NEW QUOTE

router.post('/submit/:passkey', async (request, response) => {
    if(request.params.passkey == process.env.API_PASSKEY) {
        const data = request.body;
        try{
            const savedPost = await Quote.insertMany(data);
            response.json(savedPost);
        } catch (error) {
            response.json({
                message: error
            });
        }
    } else {
        response.json({
            error: "authorization failed"
        })
    }
});

// DELETE

// router.delete('/:quoteId', async (request, response) => {
//     try {
//         const removedQuotes = await Quote.remove({_id: request.params.quoteId});
//         response.json(removedQuotes);
//     } catch (error) {
//         response.json({
//             message: error
//         });
//     }
// });

// UPDATE

// router.patch('/:quoteId', async (request, response) => {
//     try {
//         const updatedQuotes = await Quote.updateOne(
//             {_id: request.params.quoteId}, 
//             {$set: {quote: request.body.quote}});
//         response.json(updatedQuotes);
//     } catch (error) {
//         response.json({
//             message: error
//         });
//     }
// });

module.exports = router;