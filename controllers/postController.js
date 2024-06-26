const Memo = require("../models/Memo");
const Post = require("../models/Post");
const TodoList = require("../models/TodoList");

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

  try {
    let newItem;

    switch (category) {
      case "memo":
        newItem = new Memo({
          user: req.user.id,
          text: saveData.text,
          createdAt: new Date(),
        });
        break;
      case "todo":
        newItem = new TodoList({
          user: req.user.id,
          taskTitle: saveData,
          isCompleted: false,
          createdAt: new Date(),
        });
        break;
      default:
        return res.status(400).json({ error: "Invalid category" });
    }

    const post = await newItem.save();
    res.status(201).json(post);
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
    } else if (category === "todo") {
      data = await TodoList.find({ user: req.user.id }).sort({ createdAt: -1 });
    }
    res.json(data);
  } catch (error) {
    console.error("data error", error);
    res.status(500).json({ message: "서버에러", error });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  try {
    // id에 해당하는 TodoList 항목을 찾고 업데이트
    const updatedTodo = await TodoList.findByIdAndUpdate(id, { isCompleted }, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    console.log("updatedTodo : ", updatedTodo);
    res.json(updatedTodo);
  } catch (error) {
    console.error("Todo 업데이트 오류:", error);
    res.status(500).json({ error: "서버 오류" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const deleteResult = await TodoList.deleteMany({ user: userId, isCompleted: true });
    console.log("Deleted items:", deleteResult);

    res.status(200).send("완료건 삭제 완료");
  } catch (error) {
    console.error("Error during deletion:", error);
    res.status(500).send("Error during deletion process.");
  }
};

exports.deletPost = async (req, res) => {
  const {category} = req.query
  try {
    
  } catch (error) {
    
  }
}
