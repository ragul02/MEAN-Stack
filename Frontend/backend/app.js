/**express App */
const express = require('express');
const bodyParser = require("body-parser");

//import mongoose to connect with cluster
const mongoose = require("mongoose");

//import route
const postRoutes = require("./routes/posts");

const path = require('path');

//mongodb+srv://user:password@cluster0-0tack.mongodb.net/databasename?retryWrites=true&w=majority'
const db =   mongoose.connect('mongodb+srv://ragul:Q494xuBmLDhqQrhN@cluster0-0tack.mongodb.net/node-angular?retryWrites=true&w=majority',
   {   useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    })
.then(() => {
    console.log('Database connected succesfuuly!');
}).catch( (error) => {
    console.log('Database connection Failed!', error);

});
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
          );
          res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, PUT, DELETE, OPTIONS"
          );        next();
    });
    app.use('/images', express.static(path.join("backend/images"))); //allow access to the images folder
app.use('/api/posts',postRoutes);
    module.exports = app;
