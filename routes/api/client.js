const express = require("express");
const axios = require("axios");
const moment = require("moment");
const router = express.Router();

const Tweet = require("../../models/Tweet");
const TestTweet = require("../../models/TestTweet");

// @route   GET api/client/test
// @desc    Test Client Route
// @access  Public
const test = (req, res) => {
  res.json({ message: "Client Route Works" });
};

router.get("/test", test);

// @route   GET api/client/get-client-tweets
// @desc    Get & Save Tweets from Client's Database
// @access  Public

const getClientTweets = async (req, res) => {
  const main = {
    startDate: new Date("01 January 2016 00:00 UTC"),
    endDate: new Date("31 December 2017 23:59:59 UTC"),
    allTweetCount: 0,
    allTweets: [],
    uniqueTweetCount: 0,
    uniqueTweets: []
  };

  // Save into date object
  const tempDate = {
    start: new Date(),
    end: new Date()
  };

  // Set initial increment as 2 days
  const incr_ = 4;
  // Client's REST API Base url
  const url = "https://badapi.iqvia.io/api/v1/Tweets";

  // Function to get the client's tweets via client's REST API
  const getPeriodTweets = async () => {
    // create query params url
    const queryParams =
      url +
      "?startDate=" +
      tempDate.start.toISOString() +
      "&endDate=" +
      tempDate.end.toISOString();
    // use axios to get client's tweet
    const tweets = await axios.get(queryParams);
    console.log(queryParams);
    return tweets.data;
  };

  // Function to Set Date.
  const setDates = () => {
    // will set the tempEnd Date based on increment
    tempDate.end = new Date(tempDate.start.getTime());
    tempDate.end.setTime(tempDate.end.getTime() + 1000 * 60 * 60 * 24 * incr_);
  };

  const checkEndDate = startDate => {
    const checkEnd = new Date();
    return checkEnd.setTime(startDate.getTime() + 1000 * 60 * 60 * 24 * incr_);
  };

  const getLastTweets = async () => {
    // create query params url
    const queryParams =
      url +
      "?startDate=" +
      tempDate.start.toISOString() +
      "&endDate=" +
      main.endDate.toISOString();
    // use axios to get client's tweet
    const tweets = await axios.get(queryParams);
    return tweets.data;
  };

  // Get all client's tweets from 2016 & 2017
  // Set initial start date as 1.1.2017 00:00:00
  tempDate.start = main.startDate;

  do {
    //  setDates with current increment
    setDates();
    //  getPeriodTweets with setDate Results
    const tweets = await getPeriodTweets();
    //  if result is 100
    if (tweets.length >= 100) {
      //    reduce increment
      incr_ = incr_ - 1;
    }
    console.log(tweets.length);
    //  if results < 100
    if (tweets.length < 100) {
      //    push tweets to the main array
      main.allTweets = main.allTweets.concat(...tweets);
      main.allTweetCount = main.allTweets.length;
      //  update tempDate by setting new startDate as previous endDate
      tempDate.start = tempDate.end;
      const checkEnd = checkEndDate(tempDate.start);
      //  if new endDate is past 31st Dec 2017
      if (checkEnd > main.endDate) {
        //    getPeriodTweets with startDate and endDate as 31st Dec 2017
        const lastTweets = await getLastTweets();
        //    push tweets to the main array
        main.allTweets = main.allTweets.concat(...tweets);
        main.allTweetCount = main.allTweets.length;
      }
    }
  } while (
    // while endDate is before 1st Jan 2018, run the following:
    tempDate.end < main.endDate
  );

  // Remove duplicates from client Tweet Array

  // Save final Tweet Array to database
  res.json(main);
};

router.get("/get-client-tweets", getClientTweets);

module.exports = router;
