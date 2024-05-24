const express = require("express"); // express import
const TodoList = require("../models/TodoList");
const Memo = require("../models/Memo");
const router = express.Router(); // express의 Router 사용

router.put("/data/update", async (req, res) => {
  const { category, updateData } = req.body;
  console.log("req.body:", req.body);
  try {
    if (category === "memo") {
      const updatedMemo = await Memo.findByIdAndUpdate(
        updateData._id,
        { 
          text: updateData.text, 
          createdAt: new Date() 
        },
        { new: true }
      );
      res.json(updatedMemo);
    } else {
      res.status(400).json({ message: "유효하지 않은 카테고리입니다." });
    }
  } catch (error) {
    console.error("메모 업데이트 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router; //export
