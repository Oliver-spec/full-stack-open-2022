const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.post("/", async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "no username or password" });
    } else if (username.length < 3 || password.length < 3) {
      return res
        .status(400)
        .json({ error: "username or password shorter than 3 letters" });
    } else if (await User.findOne({ username })) {
      return res.status(400).json({ error: "username already used" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, name, passwordHash });
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).populate("blogs");
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
