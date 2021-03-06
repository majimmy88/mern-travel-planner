const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT||5500;

app.use(cors());

app.use(express.json());

const uri = process.env.ALTAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open', ()=> {
    console.log("MongoDB database connection established successfully");
})

const activitiesRouter = require('./routes/activities');
const usersRouter = require('./routes/users');

app.use('/activities', activitiesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Sever is running on port: ${port}`)
});