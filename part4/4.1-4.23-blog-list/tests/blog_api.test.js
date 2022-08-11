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
  expect(result.body[0]).toEqual({
    __v: 0,
    _id: expect.any(String),
    title: "test1",
    author: "oliver",
    url: "abc.com",
    likes: 12,
  });
  expect(result.body[1]).toEqual({
    __v: 0,
    _id: expect.any(String),
    title: "test2",
    author: "terry",
    url: "123.com",
    likes: 0,
  });
});

afterAll(() => mongoose.connection.close);
