const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const organization = require('./Organization')

const laneSchema = new mongoose.Schema({
  
    name: {
        type: String,
        required: [true, 'Please enter your lane name'],
        unique: true,
    },
    chat: [{ userName: String, message: String }],
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'organization'
    },
    logo: String,
}, {timestamps: true});

laneSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Lane = mongoose.model('lane', laneSchema);

module.exports = Lane;