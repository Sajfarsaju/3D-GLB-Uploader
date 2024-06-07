const mongoose = require('mongoose')

const GLBModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
    unique: true,
  }
});
const GLBModel = mongoose.model('GLBModel', GLBModelSchema);
module.exports = GLBModel