const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await new Blog({
    title: "test1",
    author: "oliver",
    url: "abc.com",
    likes: 12,
  }).save();
  await new Blog({
    title: "test2",
    author: "terry",
    url: "123.com",
    likes: 0,
  }).save();
});

test("all blogs are properly returned", async () => {
  const result = await api.get("/api/blogs");
  expect(result.status).toBe(200);
  expect(result.headers["content-type"]).toBe(
    "application/json; charset=utf-8"
  );
  expect(result.body.length).toBe(2);
  expect(result.body[0].id).toBeDefined();
  expect(result.body[1].id).toBeDefined();
});

test("blogs are properly created", async () => {
  const newBlog = await api.post("/api/blogs").send({
    title: "post a blog",
    author: "someone",
    url: "zzz.com",
    likes: 10000,
  });
  const allBlogs = await api.get("/api/blogs");
  expect(allBlogs.body.length).toBe(3);
  expect(allBlogs.body).toEqual([
    {
      title: "test1",
      author: "oliver",
      url: "abc.com",
      likes: 12,
      id: expect.any(String),
    },
    {
      title: "test2",
      author: "terry",
      url: "123.com",
      likes: 0,
      id: expect.any(String),
    },
    {
      title: "post a blog",
      author: "someone",
      url: "zzz.com",
      likes: 10000,
      id: expect.any(String),
    },
  ]);
  expect(newBlog.body).toEqual({
    title: "post a blog",
    author: "someone",
    url: "zzz.com",
    likes: 10000,
    id: expect.any(String),
  });
});

afterAll(() => mongoose.connection.close);
