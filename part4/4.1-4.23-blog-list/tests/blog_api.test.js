const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

beforeAll(async () => {
  // clear user collection
  await User.deleteMany({});

  // create a new user
  const password = "123456";
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({ username: "test", name: "mr test", passwordHash });
  await user.save();

  // create a token from new user
  // const toBeSigned = { username: savedUser.username, id: savedUser._id };
  // const token = jwt.sign(toBeSigned, process.env.SECRET, {
  //   expiresIn: 60 * 60,
  // });
});

beforeEach(async () => {
  // delete all existing blogs in collection
  await Blog.deleteMany({});

  // get the user id
  const savedUser = await User.findOne({ username: "test" });

  // create a user property for blog and save the user id as its value
  const blogArray = helper.startingNotes.map((blog) => {
    blog.user = savedUser._id;
    return blog;
  });
  await Blog.insertMany(blogArray);

  // await Promise.all(blogPromiseArray);
});

describe("saving blogs", () => {
  test("the blog list application returns the correct amount of blog posts in the JSON format", async () => {
    // save the blogs
    // await Blog.insertMany(helper.startingNotes);

    // get the blogs
    const response = await api.get("/api/blogs");
    // console.log(response.body);

    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.body).toHaveLength(helper.startingNotes.length);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test("HTTP POST request to the /api/blogs url successfully creates a new blog post", async () => {
    // get a token
    const savedUser = await User.findOne({ username: "test" });
    const toBeSigned = { username: savedUser.username, id: savedUser._id };
    const token = jwt.sign(toBeSigned, process.env.SECRET, {
      expiresIn: 60 * 60,
    });

    // creating the new blog
    const res = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(helper.newBlog);

    const newBlogWithId = helper.newBlog;
    newBlogWithId.id = expect.any(String);
    const getResponse = await api.get("/api/blogs");
    helper.startingNotes
      .map((blog) => (blog.id = expect.any(String)))
      .concat(newBlogWithId);
    expect(getResponse.body).toHaveLength(helper.startingNotes.length + 1);
  });

  test("if the likes property is missing from the request, it will default to the value 0", async () => {
    const newBlog = helper.newBlog;
    delete newBlog.likes;
    // get a token
    const savedUser = await User.findOne({ username: "test" });
    const toBeSigned = { username: savedUser.username, id: savedUser._id };
    const token = jwt.sign(toBeSigned, process.env.SECRET, {
      expiresIn: 60 * 60,
    });

    // creating the new blog
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog);

    const getResponse = await api.get("/api/blogs");
    expect(getResponse.body[getResponse.body.length - 1].likes).toBe(0);
  });

  test("if the title and url properties are missing from the request data, the backend responds to the request with the status code 400", async () => {
    const newBlog = helper.newBlog;
    delete newBlog.title;
    delete newBlog.url;
    // const postResponse = await api.post("/api/blogs").send(newBlog);
    // get a token
    const savedUser = await User.findOne({ username: "test" });
    const toBeSigned = { username: savedUser.username, id: savedUser._id };
    const token = jwt.sign(toBeSigned, process.env.SECRET, {
      expiresIn: 60 * 60,
    });

    // creating the new blog
    const res = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog);

    expect(res.status).toBe(400);
  });

  test("adding a blog fails with the proper status code 401 Unauthorized if a token is not provided", async () => {
    const res = await api.post("/api/blogs").send(helper.newBlog);
    expect(res.status).toBe(401);
  });
});

describe("deleting blogs", () => {
  test("length of blogs are reduced by one", async () => {
    const oldBlogs = await api.get("/api/blogs");

    // get a token
    const savedUser = await User.findOne({ username: "test" });
    const toBeSigned = { username: savedUser.username, id: savedUser._id };
    const token = jwt.sign(toBeSigned, process.env.SECRET, {
      expiresIn: 60 * 60,
    });

    // delete the blog
    await api
      .delete(`/api/blogs/${oldBlogs.body[1].id}`)
      .set("Authorization", `bearer ${token}`);

    const blogs = await api.get("/api/blogs");
    expect(blogs.body).toHaveLength(helper.startingNotes.length - 1);
  });
});

describe("updating blogs", () => {
  test("blog is updated correctly", async () => {
    const blogs = await api.get("/api/blogs");
    await api.put(`/api/blogs/${blogs.body[0].id}`).send({
      title: "updated",
      author: "updated",
      url: "updated.com",
      likes: 100,
    });
    const newBlogs = await api.get("/api/blogs");
    expect(newBlogs.body).toContainEqual({
      title: "updated",
      author: "updated",
      url: "updated.com",
      likes: 100,
      id: expect.any(String),
      user: expect.any(Object),
    });
  });
});

afterAll(() => mongoose.connection.close);
