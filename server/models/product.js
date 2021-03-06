const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Need an ID, name, description, price,
// ID is created by default in MongoDB
const product = new Schema({
    // id: String,
    name: String,
    description: String,
    price: Number,
    picture: String     // Added picture to product model
});

// To create a model, use the name of the model, and the schema with the properties of the model
// that  wil be inserted to the  database.
module.exports = mongoose.model('Product', product);