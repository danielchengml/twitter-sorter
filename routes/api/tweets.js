const express = require("express");
const axios = require("axios");
const moment = require("moment");
const router = express.Router();

const client = require("./client");

// @route   GET api/tweets/test
// @desc    Test Tweets Route
// @access  Public

const testTweets = (req, res) => {
  res.json({ success: "Tweet route works" });
};

router.get("/test", testTweets);

// @route   GET api/tweets/get-unique-tweets
// @desc    Function that returns a list of unique tweets to the user
// @access  Public

const getUniqueTweets = async (req, res) => {
  // Initiate an object to store tweets and tweets data
  const main = {
    created: {
      type: Date,
      default: Date.now
    },
    tweetCount: {
      type: Number
    },
    tweets: []
  };
  // Get the main client tweet object from client.js route
  const client = await axios.get(
    "http://localhost:5000/api/client/get-client-tweets"
  );

  const tweets = await client.data.uniqueTweets;

  // process unique tweets and serve it as tweet objects
  tweets.forEach(tweet => {
    // unpackage it into a tweet object
    // create a tweet object
    const newTweet = {
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
    };
    // If the first 2 characters are "RT" => tweetObj.retweet = true
    if (tweet.text[0] + tweet.text[1] === "RT") {
      newTweet.retweet = true;
    }
    // tweetObj.Date = tweet.stamp
    newTweet.date = tweet.stamp;
    // if a word starting with "@" is found after RT => tweetObj.handle = @...
    // if words starting with "#" are found, push them into the tweetObj.hashtags array
    // text of tweet object is tweet.text
    newTweet.text = tweet.text;
    // push newTweet to main array
    main.tweets.push(newTweet);
    main.tweetCount = main.tweets.length;
  });

  res.json(main);
};

router.get("/get-unique-tweets", getUniqueTweets);

module.exports = router;
