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
  getOne: (req, res, next) => {
    const id = req.params.id;
    models.Product.find({ _id: id })
      .then((product) => {
        return res.send(product);
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
    const { name, description, image, selectedCategoryId, price, quantity } = req.body;
    console.log("selected cat ot api " + selectedCategoryId)
    models.Product.create( { name, description, imageUrl: image, price, quantity, category: selectedCategoryId })
      .then((createdProduct) => {
        res.send(createdProduct);
        console.log("from restapi " +createdProduct._id )
        // models.User.updateOne({ _id: userId }, { $push: { products: createdProduct } });
        models.Category.updateOne( {_id: selectedCategoryId}, { $push: {products: createdProduct} });
        models.Image.create({ url: imageUrl, type: "main", product: createdProduct._id})
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
