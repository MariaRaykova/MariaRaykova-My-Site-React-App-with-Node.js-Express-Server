const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId } = Schema.Types;

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    userId: {
      type: String
    },
    items: [
      {
        type: ObjectId,
        ref: "Product"
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at"
    }
  }
);

module.exports = new Model("Order", orderSchema);
