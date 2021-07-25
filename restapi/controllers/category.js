const models = require("../models");

module.exports = {
  get: (req, res, next) => {
   
    models.Category.find()
      .then((categories) => {
        return res.send(categories);
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
