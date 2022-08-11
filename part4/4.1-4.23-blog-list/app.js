const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogRouters");
const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const app = express();

logger.info(`connecting to ${config.MONGODB_URL}`);

mongoose
  .connect(config.MONGODB_URL)
  .then((result) => logger.info("connected to mongodb"))
  .catch((err) => logger.error(err.message));

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
