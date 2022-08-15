const startingNotes = [
  {
    title: "test1",
    author: "oliver",
    url: "abc.com",
    likes: 12,
  },
  {
    title: "test2",
    author: "terry",
    url: "123.com",
    likes: 0,
  },
];

const newBlog = {
  title: "new",
  author: "newbie",
  url: "new.com",
  likes: 0,
};

const repeatedUser = {
  name: "repeated",
  username: "I am repeated",
  password: "valid",
};

const tooShortUsername = {
  name: "Mr too short username",
  username: "aa",
  password: "12345",
};

const tooShortPassword = {
  name: "Mr too short password",
  username: "too short password",
  password: "12",
};

const noUsernameAndPassword = {
  name: "Nameless",
  username: "",
  password: "",
};

const noUsername = {
  name: "Nameless",
  username: "",
  password: "12345",
};

const noPassword = {
  name: "Nameless",
  username: "username",
  password: "",
};

module.exports = {
  startingNotes,
  newBlog,
  repeatedUser,
  tooShortPassword,
  tooShortUsername,
  noUsernameAndPassword,
  noUsername,
  noPassword,
};
