const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Wrong username or password" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (passwordCorrect) {
      const toBeSigned = { username: user.username, id: user._id };
      const token = jwt.sign(toBeSigned, process.env.SECRET);

      res.status(200).json({ token, username: user.username, name: user.name });
    } else {
      res.status(401).json({ error: "Wrong username or password" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = loginRouter;
