const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    imageUrl: String,
    content: {
      type: String
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'laneUser',
      required: true
    },
    reaction: [{ type: String }],
    lane: {
        type: Schema.Types.ObjectId,
        ref: 'Lane',
        required: true
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);