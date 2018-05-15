import React, { Component, Fragment } from "react";
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
        <div style={{ margin: 30, minHeight: 100 }}>
          {tweets.map((tweet, i) => (
            <Card>
              <CardContent>{tweet.text}</CardContent>
            </Card>
          ))}
        </div>
      </Fragment>
    );
  }
}
export default Landing;
