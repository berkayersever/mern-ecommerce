const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define your User Collection Objects Structure
// With data types
// We'll be using Auth0 for authentication in the future.
const user = new Schema({
// This is where the user will login
// For now we will be inserting test data
    name: String,
    email: String,
    username: String,
    auth0_id: String,
    profile_picture: String
});

// Export the model on the Mongoose.
// So this model will be inserted to the database.
module.exports = mongoose.model('User', user);