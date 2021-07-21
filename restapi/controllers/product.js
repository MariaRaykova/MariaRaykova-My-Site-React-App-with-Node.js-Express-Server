const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        const length = req.query.length ? parseInt(req.query.length) : 20
    
        models.Product.find().sort('-created_at').limit(length)
            .populate('author')
            .then((products) => {
                console.log(products)
           return res.send(products)
        
        } )
            .catch(next);
    },

    post: (req, res, next) => {
        const { _id, name, description, imageUrl, price, likes } = req.body;
     console.log(_id)
        models.Product.create({ name, description, imageUrl, price, likes, author: _id })
        
            .then((createdProduct) => {
                console.log(createdProduct)
                res.send(createdProduct);
                models.User.updateOne({ _id }, { $push: { posts: createdProduct } })
                // return Promise.all([
                //     models.User.updateOne({ _id }, { $push: { posts: createdProduct } }),
                //     models.Product.findOne({ _id: createdProduct._id })
                // ]);
            })
            // .then(([modifiedObj, productObj]) => {
            //     res.send(productObj);
            // })
            .catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { name, description, imageUrl, likes, price } = req.body;
        models.Product.updateOne({ _id: id }, { name, description, imageUrl, price,likes })
            .then((updatedProduct) => res.send(updatedProduct))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Product.deleteOne({ _id: id })
            .then((removedProduct) => res.send(removedProduct))
            .catch(next)
    }
};