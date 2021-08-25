const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId } = Schema.Types;

const imageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,

    },
    type: {
        type: String,
        required: true,
      },
    product: [{
      type: ObjectId,
      ref: "Product"
  }],

  },
  {
    timestamps: {
      createdAt: "created_at"
    }
  }
);

module.exports = new Model("Image", imageSchema);
