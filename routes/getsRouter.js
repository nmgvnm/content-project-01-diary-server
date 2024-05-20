const express = require("express"); // express import
const Memo = require("../models/Memo");
const TodoList = require("../models/TodoList");
const router = express.Router(); // express의 Router 사용

router.get("/data/list", async (req, res) => {
  const { category } = req.query;
  try {
    let data;
    if (category === "memo") {
      data = await Memo.find().sort({ date: 1 });
    }
    res.json(data);
  } catch (error) {
    console.error("data error", error);
    res.status(500).json({ message: "서버에러", error });
  }
});

module.exports = router; //export
