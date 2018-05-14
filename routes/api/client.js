const express = require("express");
const axios = require("axios");
const moment = require("moment");
const router = express.Router();

const Tweet = require("../../models/Tweet");
const TestTweet = require("../../models/TestTweet");

// @route GET api/client/test
// @desc Test Client Route
// @access Public
router.get("/test", (req, res) => res.json({ message: "Client Route Works" }));

// @route GET api/client/save-sample-tweets
// @desc Testing Client's REST API's Route
// @access Public
router.get("/save-sample-tweets", (req, res) => {
  axios
    .get(
      "https://badapi.iqvia.io/api/v1/Tweets?startDate=2018-03-20T04%3A07%3A56.271Z&endDate=2018-03-20T09%3A07%3A56.271Z"
    )
    .then(res => {
      const tweets = res.data;
      tweets.forEach(tweet => {
        const newTweet = new Tweet({
          text: tweet.text
        });
        newTweet
          .save()
          .then(tweet => tweet => console.log("Saved", tweet.text))
          .catch(err => console.log(err));
      });
    });
});

// @route GET api/client/sample-tweets
// @desc Testing Client's REST API's Route
// @access Public
router.get("/sample-tweets", async (req, res) => {
  axios
    .get(
      "https://badapi.iqvia.io/api/v1/Tweets?startDate=2018-03-20T04%3A07%3A56.271Z&endDate=2018-03-20T16%3A07%3A56.271Z"
    )
    .then(res => {
      const tweets = res.data;
      // removing duplicates from array
      const tweetsArr = [];
      tweets.forEach(tweetObj => {
        if (
          tweetsArr.filter(tweet => tweet.text.toString() === tweetObj.text)
            .length === 0
        ) {
          tweetsArr.push(tweetObj);
        }
      });
      // Check array against db and only save new Tweets to db
      tweetsArr.forEach(async tweet => {
        const tweetFound = await Tweet.find({ text: tweet.text });
        if (tweetFound.length === 0) {
          const newTweet = new Tweet({
            text: tweet.text
          });
          newTweet.save().then(saved => {
            return console.log("Tweet Saved: ", saved);
          });
        } else {
          {
            return console.log("Duplicate tweet for: ", tweet);
          }
        }
      });
    })
    .catch(err => {
      return console.log(err);
    });
  res.json({ success: true });
});

// @route   GET api/client/test-date
// @desc    Testing logic for start and end date
//          (if period returns 100 items, readjust end date until period returns under 100 items )
// @access  Public
router.get("/test-date", (req, res) => {
  const startDate = new Date("01 January 2016 00:00:00 UTC");
  const endDate = new Date(startDate.getTime());
  endDate.setTime(endDate.getTime() + 1000 * 60 * 60 * 12);

  console.log(endDate);
});

// @route   GET api/client/get-unique-tweets
// @desc    Getting all Tweets from 1st Jan 2016 to 31st Dec 2017 with duplicates removal
//          (if period returns 100 items, readjust end date until period returns under 100 items )
// @access  Public
router.get("/get-unique-tweets", async (req, res) => {
  const END_TIME = new Date("6 January 2016 23:59:59 UTC");
  let increment = 4;
  const counter = 0;

  let startDate = new Date("01 January 2016 00:00:00 UTC");
  const url = "https://badapi.iqvia.io/api/v1/Tweets";
  let tweetsArr = [];

  const addTweetsToDb = tweets => {
    // removing duplicates from array
    tweets.forEach(tweetObj => {
      if (
        tweetsArr.filter(tweet => tweet.text.toString() === tweetObj.text)
          .length === 0
      ) {
        tweetsArr.push(tweetObj);
        console.log("tweetsArray: ", tweetsArr.length);
      }
    });
    // Check array against db and only save new Tweets to db
    tweetsArr.forEach(async tweet => {
      const tweetFound = await Tweet.find({ text: tweet.text });
      if (tweetFound.length === 0) {
        const newTweet = new Tweet({
          text: tweet.text
        });
        newTweet.save().then(saved => {
          return console.log("Tweet Saved: ", saved);
        });
      } else {
        {
          return console.log("Duplicate tweet for: ", tweet);
        }
      }
    });
  };

  const getTweetsForPeriod = increment => {
    let endDate = new Date(startDate.getTime());
    endDate.setTime(endDate.getTime() + 1000 * 60 * 60 * 24 * increment);
    if (endDate > END_TIME) {
      endDate = END_TIME;
      getTweetsForPeriod(0);
    }
    queryParams =
      url +
      "?startDate=" +
      startDate.toISOString() +
      "&endDate=" +
      endDate.toISOString();
    axios.get(queryParams).then(res => {
      if (res.data.length >= 100) {
        getTweetsForPeriod(increment / 2);
      }
      if (res.data.length < 100 && endDate < END_TIME) {
        tweets = res.data;
        addTweetsToDb(tweets);

        if (endDate < END_TIME) {
          startDate = endDate;
          getTweetsForPeriod(increment);
        }
      } else {
        return;
      }
    });
  };
  if (counter === 0) {
    getTweetsForPeriod(increment);
    counter++;
  }
  return res.json({
    message:
      "Getting Tweets from Client's API, removing duplicates and saving tweets in DB"
  });
});

// @route   GET api/client/get-all-tweets-duplicate
// @desc    GEtting all tweets including duplicates
//          (if period returns 100 items, readjust end date until period returns under 100 items )
// @access  Public
router.get("/get-all-tweets-duplicates", async (req, res) => {
  const END_TIME = new Date("31 December 2017 23:59:59 UTC");
  const increment = 10;
  let startDate = new Date("01 January 2016 00:00 UTC");
  const url = "https://badapi.iqvia.io/api/v1/Tweets";

  const addTweetsToDb = tweets => {
    // Check array against db and only save new Tweets to db
    tweets.forEach(tweet => {
      const newTweet = new TestTweet({
        text: tweet.text
      });
      newTweet.save().then(saved => console.log("saved:", saved));
    });
  };

  const getTweetsForPeriod = increment => {
    let endDate = new Date(startDate.getTime());
    endDate.setTime(endDate.getTime() + 1000 * 60 * 60 * 24 * increment);
    if (endDate > END_TIME) {
      endDate = END_TIME;
      getTweetsForPeriod(0);
    }
    queryParams =
      url +
      "?startDate=" +
      startDate.toISOString() +
      "&endDate=" +
      endDate.toISOString();
    axios.get(queryParams).then(res => {
      if (res.data.length >= 100) {
        getTweetsForPeriod(increment / 2);
      }
      if (res.data.length < 100) {
        tweets = res.data;
        addTweetsToDb(tweets);
        console.log("endDate:", endDate);
        if (endDate !== END_TIME) {
          startDate = endDate;
          getTweetsForPeriod(increment);
        }
      }
    });
  };
  getTweetsForPeriod(increment);

  return res.json({
    message: "Getting Tweets from Client's API and saving tweets in DB"
  });
});

// @route   GET api/client/sort-duplicate-tweets
// @desc    Sorting tweets in TestTweets by removing duplicates
// @access  Public
router.get("/sort-duplicate-tweets", async (req, res) => {
  // For each object, find other similar objects and delete them
  const allTweets = await TestTweet.find();
  const tweetsArr = [];
  allTweets.forEach((tweetObj, index) => {
    if (
      tweetsArr.filter(tweet => tweet.text.toString() === tweetObj.text)
        .length === 0
    ) {
      tweetsArr.push(tweetObj);
    }
    console.log("pushTweet", index);
  });
  return console.log(tweetsArr.length);
});

// @route   GET api/client/sort-tweets
// @desc    Sorting tweets in TestTweets by removing duplicates
// @access  Public
router.get("/sort-tweets", async (req, res) => {
  // For each object, find other similar objects and delete them
  const allTweets = await Tweet.find();
  const tweetsArr = [];
  allTweets.forEach((tweetObj, index) => {
    if (
      tweetsArr.filter(tweet => tweet.text.toString() === tweetObj.text)
        .length === 0
    ) {
      tweetsArr.push(tweetObj);
      console.log("pushTweet", index);
    }
  });
  console.log(tweetsArr.length);
  console.log(allTweets.filter(tweet => tweet.text === allTweets[50].text));
});

// @route   GET api/client/find-duplicates
// @desc    FInding duplicates from Db
// @access  Public
router.get("/find-duplicates", async (req, res) => {
  const allTweets = await Tweet.find();
  console.log(allTweets.length);
  const count = allTweets =>
    allTweets.reduce((a, b) => Object.assign(a, { [b]: (a[b] || 0) + 1 }), {});

  const duplicates = dict => Object.keys(dict).filter(a => dict[a] > 1);

  console.log(count(allTweets));
});

module.exports = router;
