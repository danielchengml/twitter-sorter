# Take-home interview question

## Why?

We would like to give you a chance to briefly demonstrate your problem solving and other job skills in a lower stress environment.

## Your Choice

If you feel this would be a burden in any way, please let us know and we can include aspects of the take home test in an in-person interview. This typically means more emphasis on whiteboard code.

## Problem

### A Bad REST API

A Client needs us to pull 2 years of ultra-cool curated tweets they have collected and stored themselves.

We need to make sure that we get all tweets tweeted in 2016 and 2017.

The only way to get this data is to use the client's [REST API](https://badapi.iqvia.io/swagger/). But it's not a well-designed API...

### Complications

* The API only lets you search for tweets with timestamps falling in a window specified by `startDate` and `endDate`.

* The API can only return 100 results in a single response, even if there are more than 100 tweets in the specified window.

* There is no indication that there are more results and there are no pagination parameters returned.

* There can be no duplicate entries in the results you return.

### Requirements

* Your application should be written in C# or Javascript

* Submit your app via a public github repository (make sure we can access it!)

* We must be able to build and run your app

* The final results should contain all records with no duplicates

* The results should be output in a way that allows us to validate your records

* The operation should complete in a reasonable amount of time

* Your application should make actual calls to [our live REST API](https://badapi.iqvia.io/swagger/) to get the tweets.

### Criteria

* Does the app meet all of the requirements?

* Is the program designed well (is the code easy to read and test)?

* Is there any documentation and is it clear?

* Does the author follow good source control practices?

### Bonus

The following are **not** required, but may help you stand out as a candidate.

* Comes with a `Dockerfile` and instructions on how to build and run the service in Docker

* Repository has basic [CI](https://en.wikipedia.org/wiki/Continuous_integration) functionality

* Testing (unit or otherwise)

* UI to display results

* Any other features you may find unique/useful
