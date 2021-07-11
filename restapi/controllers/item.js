const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        const length = req.query.length ? parseInt(req.query.length) : 20
    
        models.Item.find().sort('-created_at').limit(length)
            .populate('author')
            .then((items) => {
                console.log(items)
           return res.send(items)
        
        } )
            .catch(next);
    },

    post: (req, res, next) => {
        const { name, description, imageUrl, price, likes } = req.body;
     console.log(req.user)
        const { _id } = req.user;

        models.Item.create({ name, description, imageUrl, price, likes, author: _id })
            .then((createdItem) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { posts: createdItem } }),
                    models.Item.findOne({ _id: createdItem._id })
                ]);
            })
            .then(([modifiedObj, itemObj]) => {
                res.send(itemObj);
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { name, description, imageUrl, likes, price } = req.body;
        models.Item.updateOne({ _id: id }, { name, description, imageUrl, price,likes })
            .then((updatedItem) => res.send(updatedItem))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Item.deleteOne({ _id: id })
            .then((removedItem) => res.send(removedItem))
            .catch(next)
    }
};