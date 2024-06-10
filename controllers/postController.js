const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = new Post({
      user: req.user.id,
      title,
      content,
    });

    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPosts = async (req, res) => {
  try {
      const posts = await Post.find({ user: req.user.id });
      res.json(posts);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
  }
};
