const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Event = require('./Models/event.model')
require("dotenv").config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'OPTION, GET, POST, PUT, PATCH, DELETE ');
    next();
});

app.get('/events',(req, res, next) => {
    const { Date } = req.query;
        
    Event.find({Date}).then(events => {
        return res.status(200).json(events);
    }).catch(error => {
        error = new Error('Error fetching events');
        next(error);
    })
})

app.post('/add-event',(req, res) => {
    const { Start, End, Text, Color, Date } = req.body;

    const event = new Event({
        Start,
        End,
        Text,
        Color,
        Date
    })
    event.save();
    return res.status(200).json(event);
})

app.delete('/delete/:id', (req, res, next) => {
    const { id } = req.params;
  Event.findById(id)
    .then((event) => {
      if (!event) {
        const error = new Error("Could Not Find This Reservation.");
        error.statusCode = 404;
        throw error;
      }
      Event.findByIdAndRemove(id).then((result) => {
        return res.json(result);
      });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

// error handling route
app.use((error, req, res, next) => {
    const erros = error.data;
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message: message, erros: erros})
});

mongoose
    .connect(`mongodb+srv://yassinbagane2:${process.env.CLUSTER_PWD}@cluster0.qollkp9.mongodb.net/Calendar`).then(() =>{
        app.listen(process.env.PORT);
        console.log('connected');
    }).catch(err => {
        console.log(err);
    })