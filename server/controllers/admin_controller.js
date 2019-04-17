const Product = require('../models/product');
const User = require('../models/user');
module.exports = {
    getAdminUsers(req, res) {
        User.find().exec((err, users) => {
            if (err) console.log('Find Admin Users Error---------------', err);
            res.status(200).json({users});
        })
    },
    createProduct(req, res) {
        // Destruct the values sent in from frontend from req.body;
        const { name, description, price, picture } = req.body;
        // Have a new Product model instance set to a variable to be save to database.
        let newProduct = new Product({
            name,
            description,
            price,
            picture
        });
        // Use the .save() to save model to database.
        newProduct.save();
        // Then send back the products.
        res.status(200).json({product: newProduct});
    },
    updateProduct(req, res) {
        // Get the id, since we need to update a specific product.
        // Destruct the id from the request params.
        const { id } = req.params;
        // Destruct the update data from the req.body,
        const { name, description, price, picture } = req.body;
        // Find the product, and update it's properties
        Product.findById(id).exec((err, product) => {
            if(err) {
                console.log(`Error while updating the product with id: ${id}`, err);
                return res.json({ success: false, msg: err.message });
            }
            product.name = name;
            product.description = description;
            product.price = price;
            product.picture = picture;          // Update the product picture.
            product.save();                     // Save the product with updated data.
            res.status(200).json({product});    // Then send back the data, just for testing purposes.
        })
    },
    // updateProduct(req, res) {
    //     // Get the ID, since we need to update a specific product.
    //     // Destruct the id from the request params.
    //     const {id} = req.params;
    //     console.log('id: ' + id);
    //     console.log('req.params.id: ' + req.params.id);
    //     // Destruct the update data from the req.body;
    //     const {name, description, price} = req.body;
    //
    //     //     Product.findById(req.params.id)
    //     //         .exec(function (err, product) {
    //     //             if (err) {
    //     //                 console.error('Error retrieving all product by id!');
    //     //             } else {
    //     //                 console.log('server product = ' + JSON.stringify(product));
    //     //                 res.json(product);
    //     //             }
    //     //         })
    //     // })
    //
    //
    //     // Find the product, and update it's properties
    //     Product.findById(id).exec((err, product) => {
    //         // console.log(Product.findById(id));
    //
    //         console.log('err: ' + err);
    //         if (err) {
    //             console.log('Updated Product-----------------', err);
    //             // console.error('Error retrieving all product by id!');
    //         } else {
    //             console.log('product: ' + product);
    //             console.log('err: ' + err);
    //             product.name = name;
    //             product.description = description;
    //             product.price = price;
    //             // Save the product with updated data.
    //             product.save();
    //             // Then send back the data, just for testing purposes.
    //             res.status(200).json({product});
    //         }
    //     })
    // },
    deleteProduct(req, res) {
// Destruct the ID from the request params, since you have to delete a specific product.
        const {id} = req.params;
// Use an object to delete the specified product.
        Product.deleteOne({_id: id}).exec((err, product) => {
            if (err) console.log('Delete One Error-----------------', err)
            res.status(200).json({product});
        });
    }
};