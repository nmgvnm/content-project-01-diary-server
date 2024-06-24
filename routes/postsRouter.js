const express = require("express"); // express import
const TodoList = require("../models/TodoList");
const Memo = require("../models/Memo");
const router = express.Router(); // express의 Router 사용

router.post("/todo/new", async (req, res) => {
  const { task } = req.query;
  try {
    const newItem = new TodoList({
      taskTitle: task,
      isCompleted: false,
      date: new Date(),
    });

    await newItem.save();
    console.log("newItem : ", newItem);
    res.json(newItem);
  } catch (error) {
    console.error("Todo 항목 추가 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

router.post("/data/save", async (req, res) => {
  const { category, saveData } = req.body;
  console.log(req.body);
  try {
    if (category === "memo") {
      const newItem = new Memo({
        text: saveData.text,
        createdAt: new Date(), // 'createdAt'으로 변경
      });

      await newItem.save();
      console.log("newItem :", newItem);
      res.json(newItem);
    } else {
      res.status(400).json({ message: "유효하지 않은 카테고리입니다." });
    }
  } catch (error) {
    console.error("save data error:", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

router.post("/data/save/test", async (req, res) => {
  const { category } = req.query;
  const { saveData } = req.body;

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
});

module.exports = router; //export
