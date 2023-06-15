const path = require('path')
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

const authRoutes = require("./routes/auth");
const blogRoutes = require('./routes/blog')

console.log('-------------server started------------------------')

app.use('/auth', authRoutes);
app.use('/blog', blogRoutes)

mongoose.connect('mongodb+srv://kuldeep:18330468@cluster0.qw8m0tp.mongodb.net/')
.then(result => {
    app.listen(3000)
})
.catch(err => {
    console.log(err)
})