
const Product = require('../models/product');

const getList = (req, res) => {
    Product.find().select('title subtitle description rating reviews price image').then((products) => {
        return res.status(200).json({
            success: true,
            products: products
        });
    })
    .catch((err) => {
        return res.status(404).json({
            error: "404",
            message: "No hay resultados"
        });
    });
}

const addProduct = (req, res) => {
    const newProduct = new Product({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        rating: req.body.rating,
        reviews: req.body.reviews,
        price: req.body.price,
        image: req.body.image
    });

    newProduct.save()
        .then(product => {
            return res.status(201).json({
                success: true,
                message: 'Product successfully added',
                product: product
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: '500',
                message: err
            });
        });
}


module.exports = {
    getList,
    addProduct
};