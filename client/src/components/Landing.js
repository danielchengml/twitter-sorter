import React, { Component, Fragment } from "react";
import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import axios from "axios";

class Landing extends Component {
  state = {
    loading: false
  };

  getClientTweets = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const tweets = await axios.get("/api/tweets/get-unique-tweets");
    // Save tweets to props
    this.props.saveTweets(tweets.data.tweets);
    this.setState({ loading: false });
  };

  render() {
    const { tweets } = this.props;
    const { loading } = this.state;
    return (
      <Fragment>
        {loading && (
          <Fragment>
            <Typography variant="title" color="secondary">
              Getting Client's Data...
            </Typography>
            <Typography variant="caption" color="default">
              (This process might take up to a minute)
            </Typography>
          </Fragment>
        )}
        {!loading && (
          <Button
            onClick={e => this.getClientTweets(e)}
            variant="raised"
            style={{ width: 450 }}
          >
            Get Client's Tweets
          </Button>
        )}
        <Paper style={{ margin: 30, padding: 20, minHeight: 100 }}>
          <Typography variant="title">
            Number of unique tweets from 2016 to 2017: {tweets.length}
          </Typography>
          {tweets.map((tweet, i) => (
            <Card
              style={{ backgroundColor: "#00aced", color: "white", margin: 10 }}
              key={`tweet_${i}`}
            >
              <CardContent>
                <Typography
                  style={{ margin: 10, color: "white" }}
                  variant="title"
                >
                  {tweet.text}
                </Typography>
                <Moment style={{ margin: 10, color: "grey" }}>
                  {tweet.date}
                </Moment>
              </CardContent>
            </Card>
          ))}
        </Paper>
      </Fragment>
    );
  }
}
export default Landing;
