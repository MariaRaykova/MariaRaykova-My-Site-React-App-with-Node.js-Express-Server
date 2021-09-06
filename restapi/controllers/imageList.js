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
        console.log("api res" + res)
        console.log("api res length" + res.length)
        // api res{
        //   url: [
        //     'https://res.cloudinary.com/dszjcx6ai/image/upload/v1630316420/deiotvzlljavnuspgilg.jpg'
        //   ],
        //   _id: 612ca7877ef1b624b8cebc76,
        //   type: 'product',
        //   productId: '612ca4b89becd8163c79228e',
        //   created_at: 2021-08-30T09:40:23.903Z,
        //   updatedAt: 2021-08-30T09:40:23.903Z,
        //   __v: 0
        // }
        // api res length1
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

    // models.ImageList.findOneAndUpdate({ productId },
    //   { $push: { url } }
    //   //   );
    // }
    // else {
    //   models.ImageList.create({ url, type, productId })
    //   console.log("w if else pyrva snimka e   ")
    //     .then((createdImage) => {
    //       res.send(createdImage)
    //     })
    //     .catch(next);
    // }
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
