// Enables the .env file, therefore add a env property to process object.
// Recommend to require it at the top of the file
require('dotenv').config();

/* Middlewares */

const bodyParser = require("body-parser");

// Require the session for saving user data and giving a user a unique experience.
const session = require('express-session');

// Use cors for enable cross origin requests
const cors = require('cors');

/* Controllers */

// Set your admin functionality
const adminController = require('./controllers/admin_controller');
// Set your cloudinary functionality
const cloudinaryController = require('./controllers/cloudinary_controller');
// Set your user functionality.
const userController = require('./controllers/user_controller');
// Set your products functionality.
const productsController = require('./controllers/products_controller');

// Import your mongoose module to connect to your mongodb database instance using it's connection string.
const mongoose = require('mongoose');

// Import your express server
const express = require('express');

// Set instance of the express server to a variable
const app = express();

// Define the Port your will be running your server on.
// NOTE: Make sure the Port is the same as the proxy.
const PORT = 5000;

//Connect the mongoose to the database using it's connect method.
mongoose.connect(process.env.CONNECTION_STRING,
    { useNewUrlParser: true },
    (err) => {
        if(err) {
            console.log('Database Error----------------', err);
        }
        console.log('Connected to database');
    });

// Middleware
// For initializing the req.body. If the middleware is not used, the req.body is undefined.
app.use(bodyParser.json());

// For storing cookies for the user.
app.use(session({
// Create a secret for the cookie store it in .env file
// Secret can be anything.
    secret: process.env.SESSION_SECRET,
// this for resaving the cookie false, if true can cause a memory leak.
    resave: false,
// saveUnitialized best false, unless connect to a database.
    saveUninitialized: false,
    cookie: {
// The max age of the cookie
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}));