const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const { response } = require("express");
const stripe = require('stripe')('sk_test_51IVBtzLEZylG4GoOI3Nx9BRWt4mOsdA6NElICos4SHl9rBASLzTu3GOUmOK4X6gzVmVuKeNF9DikgvUnwC6cqXux00308JJJ09')

//app config
const app = express();

//middlewares
app.use(cors({origin:'http://localhost:3000'}));
app.use(express.json());

//api routes
app.get('/', (req,res)=> {
    res.status(200).send('test')
})

app.post('/payments/create', async(req,res) => {
    const total = req.query.total;
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency:'usd',
    })

    res.status(201).send({clientSecret:paymentIntent.client_secret});
})

//listen command
exports.api = functions.https.onRequest(app);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
