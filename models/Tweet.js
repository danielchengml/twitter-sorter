const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  tweetType: {
    type: String
  },
  handle: {
    type: String
  }
});

module.exports = Tweet = mongoose.model("tweets", TweetSchema);
