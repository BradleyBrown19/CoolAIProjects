const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Comment = require('./models/comment');

const app = express();
mongoose.connect("mongodb+srv://Brad:dQG5umBqyypMSrvp@cluster0-k54ab.gcp.mongodb.net/CoolAiProjects?retryWrites=true")
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post('/api/comments', (req, res, next) => {
    const comment = new Comment({
        title: req.body.title,
        content: req.body.content
    });

    comment.save().then(result => {
        res.status(201).json({
            message: 'Post added successfully',
            commentId: result._id
        });
    });
});

app.get('/api/comments', (req, res, next) => {
    Comment.find().then(documents => {
            res.status(200).json({
                message: "Comments fetched successfully",
                comments: documents
            });
        });
});

app.delete('/api/comments/:id', (req, res, next) => {
    console.log(req.params.id);
    Comment.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: 'post deleted'});
    });
});

module.exports = app;