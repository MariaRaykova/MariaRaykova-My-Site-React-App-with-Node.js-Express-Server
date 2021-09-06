const models = require("../models");

module.exports = {
  get: (req, res, next) => {
    models.Product.find()
      // .populate('imageList')
      .populate('category')
      .sort("-created_at")
      .then((products) => {
        return res.send(products);
      })
      .catch(next);
  },
  getOne: (req, res, next) => {
    const id = req.params.id;
    models.Product.find({ _id: id })
      // .populate('imageList')
      .populate('category')
      .then((product) => {
        return res.send(product);
      })
      .catch(next);
  },
  getByCategory: (req, res, next) => {
    models.Product.find({ category: req.params.category })
      .populate('category')
      .then((products) => {
        return res.send(products);
      })
      .catch(next);
  },

  //   exports.listRelated = (req, res) => {
  //     let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  //     Product.find({ _id: { $ne: req.product }, category: req.product.category })
  //         .limit(limit)
  //         .populate('category', '_id name')
  //         .exec((err, products) => {
  //             if (err) {
  //                 return res.status(400).json({
  //                     error: 'Products not found'
  //                 });
  //             }
  //             res.json(products);
  //         });
  // };
  post: (req, res, next) => {
    const { name, description, imageUrl, selectedCategoryId, price, quantity } = req.body;
    models.Product.create({ name, description, images: imageUrl, price, quantity, category: selectedCategoryId })
      .then((createdProduct) => {
        res.send(createdProduct);
        models.Category.updateOne({ _id: selectedCategoryId }, { $push: { products: createdProduct } })
      }).catch(next);
  },
  postImage: (req, res, next) => {
   const {imageList, productId } = req.body;
    models.Product.updateOne({ _id: productId }, { $push: { images: { $each: imageList}}} )
    .then((updatedProduct) => res.send(updatedProduct))
    .catch(next)
  },

  put: (req, res, next) => {
    const id = req.params.id;
    const { name, description, image, quantity, category, price } = req.body;
    models.Product.updateOne(
      { _id: id },
      { name, description, images: image, price, quantity, category }
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
