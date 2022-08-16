const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogRouters");
const userRouter = require("./controllers/userRouter");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const app = express();

logger.info(`connecting to ${config.MONGODB_URL}`);

(async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    logger.info("connected to mongodb");
  } catch (exception) {
    logger.error(exception);
  }
})();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use(
  "/api/blogs",
  middleware.tokenExtractor,
  middleware.userExtractor,
  blogRouter
);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
