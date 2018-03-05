const express           = require('express');
const path              = require('path');
const compress          = require('compression');

const bodyParser        = require('body-parser');

const webpack               = require('webpack');
const webpackDevMiddleware  = require("webpack-dev-middleware");
const webpackHotMiddleware  = require('webpack-hot-middleware');
const config                = require('./webpack.config');
const api = require('./backend/routes');


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

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

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

app.use('/api', api);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
