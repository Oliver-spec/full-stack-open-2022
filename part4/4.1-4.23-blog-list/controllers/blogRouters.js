const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (req, res, next) => {
  try {
    res.status(200).json(await Blog.find({}));
  } catch (err) {
    next(err);
  }
});

blogRouter.post("/", async (req, res, next) => {
  try {
    if (!req.body.likes) {
      req.body.likes = 0;
    }

    const { title, author, url, likes, userId } = req.body;

    const user = await User.findById(userId);

    const blog = new Blog({ title, author, url, likes, user: user._id });
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  } catch (err) {
    next(err);
  }
});

blogRouter.delete("/:id", async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

blogRouter.put("/:id", async (req, res, next) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
