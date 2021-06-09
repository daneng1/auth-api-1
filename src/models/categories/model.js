'use strict';

const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  displayName: { type: String, required: false },
  description: { type: String, required: true },
});

const categoryModel = mongoose.model('categories', categorySchema);

module.exports = categoryModel;
