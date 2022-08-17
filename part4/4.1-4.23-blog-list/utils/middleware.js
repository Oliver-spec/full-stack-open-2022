const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:", req.path);
  logger.info("Body:", req.body);
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorizationHeader = req.get("authorization");

  if (
    authorizationHeader &&
    authorizationHeader.toLowerCase().startsWith("bearer ")
  ) {
    req.token = authorizationHeader.substring(7);
  } else {
    return res.status(401).json({ error: "invalid authorization header" });
  }

  next();
};

const userExtractor = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    req.user = await User.findById(decodedToken.id);
  } catch (err) {
    return next(err);
  }

  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err);
  res
    .status(400)
    .json({ error: `<error handler> ${err.name}: ${err.message}` });
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
  tokenExtractor,
};
