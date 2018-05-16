# Tweet Sorter and Filter

This application will perform 2 main functions:

1.  Utilize the client's REST API endpoint to collect, sort and store all the tweets from 2016 and 2017 into a Database.
1.  Build a rest API that will provide sorted feed data to the front end.

## Installation:

In order to run the application, your machine must have node.js installed.

The instructions are as below:

```
$ mkdir twitter-sorter
$ git clone https://github.com/danielchengml/twitter-sorter
$ cd twitter-sorter
$ npm run client-install    //installs the front end packages
$ npm i                     //installs server side packages
$ npm run dev               //runs both front end and backend server
```

A browser window should pop up and run on `localhost:3000`. To obtain tweets, simply click the "Get Client's Tweets" Button to get client's tweets

## Technical approach for building the Application:

This app is built using the Node and ReactJS. Data will be collected from the API Endpoint systematically using a Node.js Server and stored in memory. The Node/ Express server will also function to serve the the desired data (tweets) to the front end via API calls. The front end will be built in ReactJS and will render the data to the users.

### Client's REST API Setup

The behaviour of the Client's REST API is demonstrated as below:

Request URL:
`https://badapi.iqvia.io/api/v1/Tweets?startDate=2018-03-20T04%3A07%3A56.271Z&endDate=2018-03-20T09%3A07%3A56.271Z`

Response Body:

```
[
  {
    "id": "976933379462529024",
    "stamp": "2018-03-20T05:01:05.146224+00:00",
    "text": "RT @itaintcarlos: marvel: \"guerra infinita é o maior crossover da história\"\n\neu: https://t.co/cRugJVKSuU"
  },
  {
    "id": "976945074692132864",
    "stamp": "2018-03-20T06:44:30.438941+00:00",
    "text": "Qual a sua serie fav da marvel? — The Punisher https://t.co/LWWn45SKZx"
  },
  {
    "id": "976940260948144128",
    "stamp": "2018-03-20T06:59:09.5029722+00:00",
    "text": "RT @Marvel: Marvel teams up with @TheWeeknd for an original story in “The Weeknd Presents: Starboy” on June 13. Learn more: https://t.co/BM…"
  },
  {
    "id": "976930400768528386",
    "stamp": "2018-03-20T07:47:59.8339708+00:00",
    "text": "RT @ivannieblas: MARVEL: 'Infinity War is the most ambitious crossover event in history'\n\nME: https://t.co/fqhmPwAASu"
  }
]
```

A period of between `04:07:56am` to `09:07:56am` returned 4 tweets. There were no duplicates\*. In other searches with a longer time frame, the maximum number of tweets displayed is 100 items which might spot some duplicates.

\*_Note: Duplicates are tweets that have identical text but might have been saved at different timestamps._

### Collecting, Processing and Storing Data from Client's REST API Endpoint.

This will be a process to obtain all the tweets between 2016 and 2017 from the client's database and removing duplicates. The output will be displayed in the form of a JSON Object of the following structure:

```
{
    "url": "https://badapi.iqvia.io/api/v1/Tweets",
    "startDate": "2016-01-01T00:00:00.000Z",
    "endDate": "2017-12-31T23:59:59.000Z",
    "allTweetCount": 11843,
    "allTweets": [...array of all tweet objects],
    "uniqueTweetCount": 3516,
    "uniqueTweets": [...array of unique tweet objects],
    "__v": 0
}
```

#### Instructions:

It is possible to obtain the data above in json directly via a http request. After the server is running, you can simply use the following url:
`http://localhost:5000/api/client/get-client-tweets`

### Accessing sorted tweets and serving info as an API

Tweets can be accessed and displayed in the following formats using the following route:

`http://localhost:5000/api/tweets/get-unique-tweets`

The response should look like this:

```
{
   "created": {},
   "tweetCount": 3516,
   "tweets": [
       {
           "text": "RT @offclbrian: Marvel: \"Infinity War is the most ambitious crossover event in history.\" \n\nMe: https://t.co/CbFd97Movj",
           "hashtags": [
               {}
           ],
           "retweet": true,
           "handle": {},
           "date": "2016-01-01T00:35:43.9997208+00:00",
           "url": {}
       },
       ...
```

## Built With

* ReactJS - The Front End Framework Used
* NPM - Dependency Management
* Node.js - The Server Framework Used

## Versioning

1.0.0

## Authors

* Daniel C Lean - [github.com/danielchengml](github.com/danielchengml)

## Licence

This project is licensed under the MIT License
