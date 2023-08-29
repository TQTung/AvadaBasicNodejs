//Get data from all users from API above. You will get a list of 10 users.
const fetchData = async (endpoint) => {
  try {
    const result = await fetch(
      `https://jsonplaceholder.typicode.com/${endpoint}`
    );
    return result.json();
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  const users = await fetchData("users");

  //2.Get data from all users from API above. You will get a list of 10 users.
  //   console.log(users);

  const [posts, comments] = await Promise.all([
    await fetchData("posts"),
    await fetchData("comments"),
  ]);

  const newUsers = users.map((user) => {
    const post = posts
      .filter((post) => post.userId === user.id)
      .map(({ userId, ...rest }) => rest);
    const comment = comments
      .filter((comment) => comment.email === user.email)
      .map(({ email, ...rest }) => rest);

    return {
      ...user,
      posts: post,
      comments: comment,
    };
  });
  //3.Get all the posts and comments from the API. Map the data with the users array
  //   console.log(newUsers);

  //4.Filter only users with more than 3 comments.
  const usersMore3Comments = newUsers.map((user) => {
    return user.comments.length > 3 && user.comments.length !== 0;
  });
  //   console.log(usersMore3Comments);

  //5. Reformat the data with the count of comments and posts
  const reFormatUsers = newUsers.map(({ comments, posts, ...rest }) => {
    return {
      ...rest,
      commentsCount: comments.length,
      postCount: posts.length,
    };
  });
  //   console.log(reFormatUsers);

  //6.Who is the user with the most comments/posts?
  const userSortComment = newUsers.sort((a, b) => {
    return b.comments.length - a.comments.length;
  });
  //   console.log(userSortComment[0]);
  const userSortPost = newUsers.sort((a, b) => {
    return b.posts.length - a.posts.length;
  });
  //   console.log(userSortPost[0]);

  //7. Sort the list of users by the postsCount value descending?
  const sortPostsCount = reFormatUsers.sort((a, b) => {
    return b.postsCount - a.postsCount;
  });
  //   console.log(sortPostsCount);

  //8. Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request
  const newComment = comments.filter((comment) => comment.id === 1);

  const newPost = posts.filter((post) => post.id === 1);

  const merge = {
    ...newPost,
    comments: newComment,
  };

  //   console.log(merge);
})();
