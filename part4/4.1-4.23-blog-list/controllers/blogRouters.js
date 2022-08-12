const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (req, res) => {
  res.status(200).json(await Blog.find({}));
});

blogRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;
  const newBlog = await new Blog({ title, author, url, likes }).save();
  res.status(201).json(newBlog);
});

module.exports = blogRouter;
