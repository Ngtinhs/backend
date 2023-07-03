const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config()
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    return res.send('Xin chào');
})


mongoose.connect(`mongodb+srv://tinh:${process.env.MONGO_DB_PASS}@cluster0.oxcjy73.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Connected db successfully")
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log("Server listening on port " + port)
});