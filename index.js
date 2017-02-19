const Promise = require('bluebird')
const redis = require('redis')
const REDIS_PORT = process.env.REDIS_URL || 6379
const path = require('path')
const client = redis.createClient(REDIS_PORT)
const socketIO = require('socket.io')

client.on('connect', () => {
  console.log('connected to redis...')
})

exports.init = (server) => {
  console.log('\nSetting up dashboard... \n');
  const io = socketIO(server)

  io.on('connection', (socket) => {
    console.log('connected to browser...')
    client.hget('hackernews', 'requests', (err, value) => {
      io.emit('request', value)
    })
  })

  return io
}


exports.dashboard = function(options, req, res, next) {
  const io = this
  const dashboardPath = options.dashboardPath

  const newRequest = () => {
    return new Promise((resolve, reject) => {
      client.hget('hackernews', 'requests', (err, value) => {
        if (err) {
          console.log("error!", err)
          reject(err)
        }

        const newTotal = value ? parseInt(value) + 1 : 1

        client.hset('hackernews', 'requests', newTotal, (err, result) => {
          if (err) {
            console.log('error initializing redis', err)
            reject(err)
          }

          console.log('emitting new total', newTotal)
          io.emit('request', newTotal)
          resolve()
        })
      })
    })
  }

  if (req.path === dashboardPath) {
    res.sendFile(path.join(`${__dirname}/watch.html`))
  } else {
    newRequest()
      .then(next)
  }
}
