const express = require("express"); // express import
const TodoList = require("../models/TodoList");
const router = express.Router(); // express의 Router 사용

router.put("/todo/new", async (req, res) => {
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

module.exports = router; //export
