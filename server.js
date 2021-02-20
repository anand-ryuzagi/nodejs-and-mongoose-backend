const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const port = process.env.PORT||5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log('Mongoose dtabase connection started successfully')
  });

const exerciseRouter = require('./Routers/exercises')
const userRouter = require('./Routers/user')

app.use('/exercises', exerciseRouter);
app.use('/users',userRouter);

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`)
})