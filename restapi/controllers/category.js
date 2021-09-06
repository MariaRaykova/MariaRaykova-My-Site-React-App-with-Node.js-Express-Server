const models = require("../models");

module.exports = {
  get: (req, res, next) => {
    models.Category.find()
    .populate('product')
      .then((categories) => {
        return res.send(categories);
      })
      .catch(next);
  },
  getByName: (req, res, next) => {
    console.log("da vidq kakwo ima w category ot api name " +req.params.name)
    models.Category.findOne({name: req.params.name})
    .populate('product')
      .then((category) => {
        console.log("da vidq kakwo ima w category ot api " +category)
        return res.send(category.products);
      })
      .catch(next);
  },
  post: (req, res, next) => {
    const { name } = req.body;
    models.Category.create({ name })
      .then((createdCategory) => {
        res.send(createdCategory);
      })
      .catch(next);
  },
  put: (req, res, next) => {
    const id = req.params.id;
    const { name } = req.body;
    models.Category.updateOne({ _id: id }, { name })
      .then((updatedProduct) => res.send(updatedProduct))
      .catch(next);
  },

  delete: (req, res, next) => {
    const id = req.params.id;
    models.Category.deleteOne({ _id: id })
      .then((removedCategory) => res.send(removedCategory))
      .catch(next);
  }
};
