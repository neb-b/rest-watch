### Watch

Watch is a dashboard for your Node.js express app


### How to use

```
# in app.js
const express = require('express')
const app = express()
const server = require('http').Server(app)

const watch = require('../watch')
const dashboardSocket = watch.init(server)

const options = {
  dashboardPath: '/dashboard'
}

app.use(watch.dashboard.bind(dashboardSocket, options))
```

Will give you a dashboard interface at `http://domain.com/dashboard`
