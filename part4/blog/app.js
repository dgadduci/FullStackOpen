const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const logger = require("./utils/logger");

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGOURI).then(()=>{
    console.log("connect to mongoDB");
}).catch(error=>{
    logger.error("error on connect to mongoDB");
});


app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app;