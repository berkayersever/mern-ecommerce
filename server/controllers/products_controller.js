// This will be used to perform full crud in the database.
// Make sure to import it outside of module.exports to have it accessible through out file.
const mongoose = require('mongoose').set('debug', true);   // Add ".set('debug', true)" for debugging
const Product  = require('../models/product');
module.exports = {
    readAllProducts(req, res) {
    // When using Mongoose can use a callback or a use a exec method to catch and respond to errors.
        Product.find({}).exec((err, products) => {
            if(err) console.log('Get Product Mongoose Error------------------', err);
            console.log('products-------------', products);
            res.status(200).send(products);
        });
    },
    readProduct(req, res) {
        // Destruct the id from the endpoint url, to retrieve  a specific product.
        // const id = req.params.id;
        const { id } = req.params;
        console.log('req.params: ' + req.params.id);
        console.log('id from readProduct: ' + id);
        // Copy and paste on of the product's id to the url when testing it.
        // Use the findById to get a specific product.
        // Product.findById(id).exec(function (err, product) {
        Product.findById(id).exec((err, product) => {
            if(err) {
                // console.log('Get Single Product Error---------------', err);
                return res.json({ success: false, msg: err.message });
            }
            if (!product) {
                // console.error(`NO DOC! product: ${id}`)
                return res.json({ success: false, msg: 'Some issue on sending email.Please contact the support.' });
            }
            console.log('product--------------', product);
            res.status(200).json({product});
        })
    }
};