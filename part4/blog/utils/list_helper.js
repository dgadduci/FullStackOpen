const loadash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  let winner = { likes: blogs[0].likes };
  blogs.forEach((blog) => {
    if (blog.likes > winner.likes) {
      winner = { title: blog.title, author: blog.author, likes: blog.likes };
    }
  });
  return winner;
};

const mostBlogs = (blogs) => {
  const b = [];
  loadash.forEach(loadash.countBy(blogs, "author"), function (value, key) {
    b.push({author:key,blogs:value})
  });
  const sorted = loadash.sortBy(b,"blogs");
  return sorted[sorted.length-1];
};

const mostLikes = (blogs) => {
    const b=[];
    loadash.forEach(loadash.groupBy(blogs,"author"), function(value,key){
        b.push({author:key,likes:loadash.sumBy(value,"likes")});
    });
    const sorted = loadash.sortBy(b,"likes");
    return sorted[sorted.length-1];
};
  
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
