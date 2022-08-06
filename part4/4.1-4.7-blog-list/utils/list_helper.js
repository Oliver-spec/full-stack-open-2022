const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  }
  const likesList = blogs.map((blog) => blog.likes);
  return likesList.reduce((accum, curr) => accum + curr);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      likes: blogs[0].likes,
      title: blogs[0].title,
    };
  }
  return blogs.reduce((accum, curr) => {
    if (curr.likes > accum.likes) {
      return { author: curr.author, likes: curr.likes, title: curr.title };
    } else {
      return { author: accum.author, likes: accum.likes, title: accum.title };
    }
  });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else if (blogs.length === 1) {
    return { author: blogs[0].author, blogs: 1 };
  }

  const counter = {};
  blogs.forEach((blog) => {
    blog.author in counter
      ? (counter[blog.author] += 1)
      : (counter[blog.author] = 1);
  });
  const author = Object.keys(counter).reduce((prev, curr) =>
    counter[curr] > counter[prev] ? curr : prev
  );
  return { author, blogs: counter[author] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
