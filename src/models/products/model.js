'use strict';

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  inventory: { type: Number, required: true },
});

const productsModel = mongoose.model('products', productSchema);

module.exports = productsModel;
