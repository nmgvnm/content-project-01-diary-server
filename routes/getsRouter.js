const express = require("express"); // express import
const Memo = require("../models/Memo");
const TodoList = require("../models/TodoList");
const User = require("../models/User");
const router = express.Router(); // express의 Router 사용

router.get("/data/list", async (req, res) => {
  const { category } = req.query;
  try {
    let data;
    if (category === "memo") {
      data = await Memo.find().sort({ createdAt: -1 });
    }
    res.json(data);
  } catch (error) {
    console.error("data error", error);
    res.status(500).json({ message: "서버에러", error });
  }
});
router.get("/memo/:memoId", async (req, res) => {
  const { memoId } = req.params;
  console.log(typeof memoId);
  try {
    const memo = await Memo.findOne({ _id: memoId });
    if (!memo) {
      res.status(404).json({ message: "메모를 찾을 수 없습니다." });
      console.log("메모 없음");
      return;
    }
    res.json(memo);
    console.log("memo:", memo);
  } catch (error) {
    console.error("post error", error);
    res.status(500).json({ message: "서버에러", error });
  }
});

router.get("/api/profile", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
    console.log(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router; //export
