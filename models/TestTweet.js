const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestTweetSchema = new Schema({
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

module.exports = TestTweet = mongoose.model("testtweets", TestTweetSchema);
