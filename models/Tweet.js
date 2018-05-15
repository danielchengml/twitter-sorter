const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  hashtags: [
    {
      type: String
    }
  ],
  retweet: {
    type: Boolean,
    default: false
  },
  handle: {
    type: String
  },
  date: {
    type: Date
  },
  url: {
    type: String
  }
});

module.exports = Tweet = mongoose.model("tweets", TweetSchema);
