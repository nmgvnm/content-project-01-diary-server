const Memo = require("../models/Memo");
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
    res.status(500).json({ error: "Server error" });
  }
};

exports.saveDatas = async (req, res) => {
  const { category } = req.query;
  const { saveData } = req.body;
  console.log("saveData:", saveData);
  try {
    if (category === "memo") {
      const newItem = new Memo({
        user: req.user.id,
        text: saveData.text,
        createdAt: new Date(),
      });
      const post = await newItem.save();
      res.status(201).json(post);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.dataList = async (req, res) => {
  const { category } = req.query;
  try {
    let data;
    if (category === "memo") {
      data = await Memo.find({ user: req.user.id }).sort({ createdAt: -1 });
    }
    res.json(data);
  } catch (error) {
    console.error("data error", error);
    res.status(500).json({ message: "서버에러", error });
  }
};
