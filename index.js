// let express = require('express');
import express from 'express'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node';

let app = express();

const defaultData = { secretTrackerData:[] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData)

app.use(express.json());

let secretTracker = [];

// app.get('/', (request, response)=>{
//     response.send('this is the main page')
// })

// add a route on the server that listens for post request
app.post('/secrets', (request, response)=>{
    console.log(request.body);
    let currentDate = Date();
    let object = {
        date: currentDate,
        secret: request.body
    }
    // secretTracker.push(object)
    // console.log(secretTracker);
     db.data.secretTrackerData.push(object);
     db.write()
     .then(() => {
        response.json({ task: "successful" });
    });

    // response.json({task: "success"});
})

app.use('/', express.static('public'))
app.listen(3000, ()=>{
    console.log('app is listening at localhost:3000');
})


app.get('/getsecrets', (request, response)=>{
    // let object = {data: secretTracker};

    db.read()
    .then(()=>{
        let object = {data: db.data.secretTrackerData}
        response.json(object);
    })
})