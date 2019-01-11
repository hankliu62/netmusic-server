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
const codes = require('./constants/code');

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
app.use(responseFormatter());
app.use(durationLogger());

// routes
for (const key in routes) {
  if (Object.prototype.hasOwnProperty.call(routes, key)) {
    const commonPrefix = '/api/v1/';
    const prefix = routes[key].withoutComplexSuffix ? `${commonPrefix}${key}` : `${commonPrefix}${key}s`;
    routes[key].prefix(prefix);
    app.use(routes[key].routes(), routes[key].allowedMethods());
  }
}

// handle 404 etc.
app.use(async(ctx, next) => {
  await next();
  if (ctx.status === 404) {
    throw Boom.notFound(errors.Messages.NotFound);
  }
});

// error-handling
app.on('error', (err, ctx) => {
  const result = {};
  if (Boom.isBoom(err)) {
    result.code = err.output.statusCode;
    result.message = err.message;
  } else {
    result.code = codes.InternalServer;
    result.message = errors.Messages.InternalServer;
  }

  ctx.body = result;
});

module.exports = app;
