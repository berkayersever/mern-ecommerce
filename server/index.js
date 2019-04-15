// Enables the .env file, therefore add a env property to process object.
// Recommend to require it at the top of the file
require('dotenv').config();

// Middlewares

const bodyParser = require("body-parser");

//Require the session for saving user data and giving a user a unique experience.
const session = require('express-session');

//Use cors for enable cross origin requests
const cors = require('cors');