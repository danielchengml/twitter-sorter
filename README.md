# Tweet Sorter and Filter

This application will perform 2 main functions:

1.  Utilize the client's REST API endpoint to collect, sort and store all the tweets from 2016 and 2017 into a Database.
1.  Build a rest API that will provide sorted feed data to the front end.

## Technical approach for building the Application:

This app will be built using the MERN Stack. Data will be collected from the API Endpoint systematically using a Node.js Server and stored in a Mongo Database in JSON format. The Node/ Express server will also function to serve the the desired data (tweets) to the front end via RESTful API routing. The front end will be built in ReactJS and will render the data to the users in an interactive format.

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

This will be a one off process to obtain all the tweets between 2016 and 2017 from the client's database and sorting them before storing them into the application's database. In order to effectively collect and sort the data, a few problems need to be addressed:

* How do we ensure that all the tweets are processed and none are skipped over due to the API's constraints of 100 objects?
  The proposal is to start from 2016 with an arbitrary time period. If the response array returns 100 objects, the time period is adjusted down until the return length is less than 100 objects. The array is then sorted and stored into the database. After that, the time period is continues from where it left off. The code logic would be (in JavaScript):

  ```
   const startTime = 1st Jan 2016 00:00:00
   const getTweetForPeriod = (startTime) => {
     const endTime = startTime + 1 day
     if(endTime> 31st Dec 2017 23:59:59) {
       endTime = 31st Dec 2017 23:59
     }
     const getTweets = () => {
       axios.get("url+startTime+endTime", tweetsData)
        .then(res => {
          if(res.length() === 100) {
            endTime = endTime - 1 hour
            getTweets()
          }
          if(res.length() < 100) {
            // Check each entry against existing database
            // If entry is a duplicate, ignore it, if not, save it to db
            res.forEach(tweet => {
              if(!Tweet.FindOne({text: tweet.text})){
                tweet.save().then(tweet => res.json(tweet))
              }
            })
            if (endTime = 31st Dec 2017 23:59:59) {
              return res.status(200).json({ message: "All entries processed" })
            } else {
              startTime = endTime
              getTweetForPeriod(startTime)
            }
          }
      }).catch(err => res.status(400).json({ message: "error" }))
     }
   }
  ```

### Accessing sorted tweets and serving info as an API

Tweets can be asscessed and displayed in the following formats using the following routes:

1.  Route: /api/tweets/all
