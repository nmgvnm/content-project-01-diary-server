const express = require("express"); // express import
const Memo = require("../models/Memo");
const router = express.Router(); // express의 Router 사용

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


module.exports = router; //export
