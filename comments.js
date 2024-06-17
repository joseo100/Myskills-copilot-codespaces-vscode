// Create web server 
// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const comments = require('./comments.json');

app.use(bodyParser.json());

// Create a new comment
app.post('/comments', (req, res) => {
    // Get the comment from the request
    const comment = req.body;
    // Add the comment to the comments array
    comments.push(comment);
    // Write the updated comments array to the comments.json file
    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).send('An error occurred');
        } else {
            res.status(201).send('Comment added');
        }
    });
});

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});