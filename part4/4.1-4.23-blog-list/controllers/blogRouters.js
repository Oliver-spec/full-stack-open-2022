const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (req, res, next) => {
  try {
    res.status(200).json(await Blog.find({}));
  } catch (err) {
    next(err);
  }
});

blogRouter.post("/", async (req, res, next) => {
  if (!req.body.likes) {
    req.body.likes = 0;
  }
  const { title, author, url, likes } = req.body;
  try {
    const newBlog = await new Blog({ title, author, url, likes }).save();
    res.status(201).json(newBlog);
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
