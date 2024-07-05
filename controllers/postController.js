const Daily = require("../models/Daily");
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
  console.log("saveData:", saveData);
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
      case "daily":
        newItem = new Daily({
          user: req.user.id,
          title: saveData.title,
          content: saveData.content,
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
  let data;

  try {
    switch (category) {
      case "memo":
        data = await Memo.find({ user: req.user.id }).sort({ createdAt: -1 });
        break;
      case "todo":
        data = await TodoList.find({ user: req.user.id }).sort({ createdAt: -1 });
        break;
      case "daily":
        data = await Daily.find({ user: req.user.id }).sort({ createdAt: -1 });
        break;
      default:
        return res.status(400).json({ message: "Invalid category" });
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

exports.deletePost = async (req, res) => {
  const { category } = req.query;
  const { deleteItem } = req.body;

  try {
    if (category === "memo") {
      const deleteResult = await Promise.all(
        deleteItem.map(async (id) => {
          const result = await Memo.deleteOne({ _id: id });
          return result;
        })
      );
      console.log("item 삭제 : ", deleteResult);
      res.status(200).json({ message: "Deletion completed.", deleteResult });
    } else {
      res.status(400).json({ message: "Unsupported category." });
    }
  } catch (error) {
    console.error("Error during deletion:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updatePost = async (req, res) => {
  const { category } = req.query;
  const { updateData } = req.body;

  let updateitem;
  try {
    switch (category) {
      case "memo":
        updateitem = await Memo.findByIdAndUpdate(
          updateData._id,
          {
            text: updateData.text,
            createdAt: new Date(),
          },
          { new: true }
        );
        break;
      default:
        return res.status(400).json({ message: "Invalid category" });
    }
    res.json(updateitem);
  } catch (error) {
    console.error("메모 업데이트 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};
