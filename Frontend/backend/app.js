/**express App */
const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', "Origin, Content-Type, X-Requested-With, Accept");
        res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS")
    
        next();
    });

app.post('/api/posts', (req, res, next) => {
const post = req.body;
console.log('post', res);
res.status(201).json({
    message: 'Post added Succesfully!'
})
});

app.get('/api/posts', (req, res, next) => {
    const posts = [{
            id: '2adakmkjs34ds',
            title: 'First title',
            content: 'First content from server'
        },
        {
            id: '4djgimkjs57kkfd',
            title: 'Second title',
            content: 'First content from server'
        }
    ]
    res.status(200).json({
        message: 'Post recieved successfully!',
        posts: posts
    })
});

// app.use((req, res, next) => {
//     console.log('First middleware');
//     next();
// });

// app.use((req, res, next) => {
//     res.send('Hi, This is from express!');
// });

module.exports = app;