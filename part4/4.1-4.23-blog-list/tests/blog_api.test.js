const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogPromiseArray = helper.startingNotes.map((blog) =>
    new Blog(blog).save()
  );
  await Promise.all(blogPromiseArray);
});

describe("saving blogs", () => {
  test("the blog list application returns the correct amount of blog posts in the JSON format", async () => {
    const response = await api.get("/api/blogs");

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
    await api.post("/api/blogs").send(helper.newBlog);
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
    await api.post("/api/blogs").send(newBlog);
    const getResponse = await api.get("/api/blogs");
    expect(getResponse.body[getResponse.body.length - 1].likes).toBe(0);
  });

  test("if the title and url properties are missing from the request data, the backend responds to the request with the status code 400", async () => {
    const newBlog = helper.newBlog;
    delete newBlog.title;
    delete newBlog.url;
    const postResponse = await api.post("/api/blogs").send(newBlog);
    expect(postResponse.status).toBe(400);
  });
});

describe("deleting blogs", () => {
  test("length of blogs are reduced by one", async () => {
    const oldBlogs = await api.get("/api/blogs");
    await api.delete(`/api/blogs/${oldBlogs.body[1].id}`);
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
    });
  });
});

afterAll(() => mongoose.connection.close);
