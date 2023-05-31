const dotenv = require("dotenv");

if(process.env.NODE_ENV === 'dev'){
  console.log('dev env');
  dotenv.config({ path: `./env/development.env` });
} else if(process.env.NODE_ENV === 'staging'){
  console.log('staging env');
  dotenv.config({ path: `./env/staging.env` })
} else if(process.env.NODE_ENV === 'prod'){
  console.log('prod env');
  dotenv.config({ path: `./env/production.env` })
}

require("./config/global");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
var swaggerJSDoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

require("./config/connection");

var indexRouter = require("./routes/index");
const e = require("express");

var app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Swagger demo api doc",
      version: "1.0.0",
      description: "Swagger demo api doc",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "Bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDefinition = {
  info: {
    title: "Swagger demo",
    version: "1.0.0",
    description: "Swagger demo",
  },
  host: "localhost:3000",
  basePath: "/api/admin",
  securityDefinitions: {},
};
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpecs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 3600 * 9000, // 9hr save cookie
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(helmet());
}

app.get("/health", (req, res) => {
  return res.status(200).json({ status: true });
});

app.use("/api/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
