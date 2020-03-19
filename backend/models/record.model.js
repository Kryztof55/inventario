const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* const exerciseSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
}); */
const recordSchema = new Schema({
  recordname: { type: String, required: true },
  band: {type: String, required: true },
  genre:{type: String, required: true},
  description: { type: String, required: true },
  released: {type: Date, required: true },
  edition:{ type: String, required: true },
  price:{type: Number, require: true}

}, {
  timestamps: true,
});
const Record = mongoose.model('Record', recordSchema);

module.exports = Record;