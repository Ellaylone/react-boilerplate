let webpack = require('webpack')
let webpackDevMiddleware = require('webpack-dev-middleware')
let webpackHotMiddleware = require('webpack-hot-middleware')
let path = require('path')
let config = require('./webpack.config')
let app = new (require('express'))()

app.set('port', (process.env.PORT || 5000))

let compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(app.get('port'), error => {
  if (error) {
    console.error(error)
  } else {
    console.info('Listening on port %s.', app.get('port'))
  }
})
