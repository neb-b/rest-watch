## Watch
This is a work in progress


Watch is a dashboard for your Node.js express app



### How to use

1. Start a redis server by running `redis-server`

2. Add the following to your main `app.js`

```
const express = require('express')
const app = express()
const server = require('http').Server(app)

const watchNode = require('./watch')
const dashboardConnection = watchNode.createConnection(server)
const options = {
  dashboardConnection,
  dashboardPath: '/dashboard'
}
app.use(watchNode.watch.bind(options))

...


server.listen(3000, () => console.log('server listening on port 3000'))
```

Then run `npm start`

&nbsp;

This will give you a dashboard interface at `http://localhost:3000/dashboard`

Open another tab and navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) and watch the requests total increase with each json request. It will be persistent too with data saved in Redis

### Example

Checkout a working example running as my Hacker News Server. Currently it is tallying the total number of requests and shows a beacon every time a user makes a request. The dashboard is [here](http://hacker-news-server.herokuapp.com/dashboard)
