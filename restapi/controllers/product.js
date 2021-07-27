const models = require("../models");

module.exports = {
  get: (req, res, next) => {
    models.Product.find()
      .sort("-created_at")
      .then((products) => {
        return res.send(products);
      })
      .catch(next);
  },

  getByCategory: (req, res, next) => {
    models.Product.find({category: req.params.category})
    .populate('category')
      .then((products) => {
        return res.send(products);
      })
      .catch(next);
  },
  post: (req, res, next) => {
    const { userId, name, description, image, selectedCategoryId, price, quantity } = req.body;
    models.Product.create( {author: userId , name, description, imageUrl: image, price, quantity, category: selectedCategoryId })
      .then((createdProduct) => {
        res.send(createdProduct);
        models.User.updateOne({ _id: userId }, { $push: { products: createdProduct } });
        models.Category.updateOne( {_id: selectedCategoryId}, { $push: {products: createdProduct} });
      })
      .catch(next);
  },

  put: (req, res, next) => {
    const id = req.params.id;
    const { name, description, imageUrl, quantity, category, price } = req.body;
    models.Product.updateOne(
      { _id: id },
      { name, description, imageUrl, price, quantity, category }
    )
      .then((updatedProduct) => res.send(updatedProduct))
      .catch(next);
  },

  delete: (req, res, next) => {
    const id = req.params.id;
    models.Product.deleteOne({ _id: id })
      .then((removedProduct) => res.send(removedProduct))
      .catch(next);
  }
};
