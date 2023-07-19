const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({

  fid: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  total:{
    type:Number,
    required:true
  }
});

const carts = mongoose.model("carts", cartSchema);
module.exports = carts;
