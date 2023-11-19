const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config()
app.use(express.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload());

const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const galleryRoute = require('./routes/gallery');
const catRoute = require('./routes/cat');
const tagRoute = require('./routes/tag');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
//if i didn't do like this user will not see photo when i go http://localhost:3000/uploads/1699792764929_Screenshot%20from%202023-11-11%2016-08-36.png like this

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

app.use("/cats", catRoute);
app.use("/posts",postRoute);
app.use("/users", userRoute);
app.use("/gallery", galleryRoute);
app.use("/tags", tagRoute);

app.use((err, req, res, next) => {
    err.status = err.status || 200;
    res.status(err.status).json({
        cons: false,
        msg: err.message
    })
})

app.listen(3000, console.log("Server is running at port 3000"));

