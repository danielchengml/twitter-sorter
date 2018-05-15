import React, { Component } from "react";
import "./App.css";
import { tweets } from "./store";

import Landing from "./components/Landing";

class App extends Component {
  state = {
    tweets
  };

  handleSaveTweets = tweets => {
    this.setState({ tweets: tweets });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Twitter Sorter</h1>
        </header>
        <p className="App-intro">
          This application will get all unique tweets from 2016 & 2017.
        </p>
        <Landing
          tweets={this.state.tweets}
          saveTweets={this.handleSaveTweets}
        />
      </div>
    );
  }
}

export default App;
