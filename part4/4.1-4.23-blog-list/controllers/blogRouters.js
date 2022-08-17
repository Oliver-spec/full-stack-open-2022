const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor, tokenExtractor } = require("../utils/middleware");

blogRouter.get("/", async (req, res, next) => {
  try {
    res.status(200).json(await Blog.find({}).populate("user"));
  } catch (err) {
    next(err);
  }
});

blogRouter.post("/", tokenExtractor, userExtractor, async (req, res, next) => {
  try {
    if (!req.body.likes) {
      req.body.likes = 0;
    }
    const { title, author, url, likes } = req.body;
    const user = req.user;

    const blog = new Blog({ title, author, url, likes, user: user._id });
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  } catch (err) {
    next(err);
  }
});

blogRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (req, res, next) => {
    try {
      const blogToDelete = await Blog.findById(req.params.id);
      if (req.user._id.toString() === blogToDelete.user.toString()) {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).end();
      } else {
        res
          .status(401)
          .json({ error: "you are not authorized to delete this blog" });
      }
    } catch (err) {
      next(err);
    }
  }
);

blogRouter.put("/:id", async (req, res, next) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
