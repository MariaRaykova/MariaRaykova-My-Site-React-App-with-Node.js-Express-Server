const models = require("../models");

module.exports = {
  get: (req, res, next) => {
    models.ImageList.find()
      .then((images) => {
        return res.send(images);
      })
      .catch(next);
  },
  getByProduct: (req, res, next) => {
    const id = req.params.id;
    models.ImageList.find({ _id: id })
      .then((image) => {
        return res.send(image);
      })
      .catch(next);
  },
  post: (req, res, next) => {
    const { url, type, productId } = req.body;
      models.ImageList.find({ productId: productId }).then((res) => {
        if (res.length) {
          models.ImageList.findOneAndUpdate({ productId: productId },{$push: {url: url}},{
            new: true
          } )
        }
        else {
          models.ImageList.create({ url, type, productId }).then((createdImage) => {
            res.send(createdImage);
          }).catch(next);
        }
      })
        .catch(err => {
          console.log("error" + err)
        });
  },
  put: (req, res, next) => {
    const id = req.params.id;
    const { url, type, } = req.body;
    models.ImageList.updateOne({ _id: id }, { url, type, })
      .then((updatedImage) => res.send(updatedImage))
      .catch(next);
  },

  delete: (req, res, next) => {
    const id = req.params.id;
    models.ImageList.deleteOne({ _id: id })
      .then((removedImage) => res.send(removedImage))
      .catch(next);
  }
};
