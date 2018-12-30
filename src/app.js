/* eslint-disable no-console */
const Koa = require('koa');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const Boom = require('boom');

const routes = require('./routes');
const durationLogger = require('./middlewares/durationLogger');
const responseFormatter = require('./middlewares/responseFormatter');
const errors = require('./constants/error');

const app = new Koa();

// error handler
onerror(app);

// third middleware list
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(cors());
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// custom middleware list
app.use(durationLogger());
app.use(responseFormatter());

// routes
for (const key in routes) {
  if (Object.prototype.hasOwnProperty.call(routes, key)) {
    routes[key].prefix('/api/' + key);
    app.use(routes[key].routes(), routes[key].allowedMethods());
  }
}

// error-handling
app.on('error', (err, ctx) => {
  const result = {};
  if (Boom.isBoom(err)) {
    result.code = err.output.statusCode;
    result.message = err.message;
  } else {
    result.code = errors.Codes.InternalServer;
    result.message = errors.Messages.InternalServer;
  }

  ctx.body = result;
});

module.exports = app;
