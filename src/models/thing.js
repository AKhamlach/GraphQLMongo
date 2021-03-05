const mongoose = require('mongoose');

const Thing = mongoose.Schema({
  title: { type: String},
  description: { type: String },
  imageUrl: { type: String},
  userId: { type: String},
  price: { type: Number},
}
//{ typeKey: '$type' }
);



module.exports = mongoose.model('Thing', Thing);