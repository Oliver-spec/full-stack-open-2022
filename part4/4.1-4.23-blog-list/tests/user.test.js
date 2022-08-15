const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

describe("adding users", () => {
  const userUrl = "/api/users";

  test("adding a repeated user", async () => {
    await api.post(userUrl).send(helper.repeatedUser);
    const res = await api.post(userUrl).send(helper.repeatedUser);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "username already used" });

    const users = await api.get(userUrl);
    expect(users.body).toHaveLength(1);
  });

  test("username too short", async () => {
    const res = await api.post(userUrl).send(helper.tooShortUsername);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "username or password shorter than 3 letters",
    });

    const users = await api.get(userUrl);
    expect(users.body).toHaveLength(0);
  });

  test("password too short", async () => {
    const res = await api.post(userUrl).send(helper.tooShortPassword);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "username or password shorter than 3 letters",
    });

    const users = await api.get(userUrl);
    expect(users.body).toHaveLength(0);
  });

  test("no username and password", async () => {
    const res = await api.post(userUrl).send(helper.noUsernameAndPassword);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "no username or password" });

    const users = await api.get(userUrl);
    expect(users.body).toHaveLength(0);
  });

  test("no username", async () => {
    const res = await api.post(userUrl).send(helper.noUsername);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "no username or password" });

    const users = await api.get(userUrl);
    expect(users.body).toHaveLength(0);
  });

  test("no password", async () => {
    const res = await api.post(userUrl).send(helper.noPassword);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "no username or password" });

    const users = await api.get(userUrl);
    expect(users.body).toHaveLength(0);
  });
});

afterAll(() => mongoose.connection.close);
