const express           = require('express');
const path              = require('path');
const compress          = require('compression');

const bodyParser        = require('body-parser');

const webpack               = require('webpack');
const webpackDevMiddleware  = require("webpack-dev-middleware");
const webpackHotMiddleware  = require('webpack-hot-middleware');
const config                = require('./webpack.config');

const app               = express();
const server            = require('http').Server(app);

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  },
  hot: true,
  historyApiFallback: true
}));
app.use(webpackHotMiddleware(compiler));

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.use(compress());

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.post('/run', (req, res) => {
  console.log(req.body.code);
  res.send(req.body.code);
});

app.post('/submit', (req, res) => {
  res.send(req.body.code);
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
