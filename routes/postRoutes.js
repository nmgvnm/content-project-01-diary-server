const express = require("express");
const { createPost, getPosts, saveDatas, dataList, updateTodo, deleteTodo } = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// TEST API
router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getPosts);

// 사용중
router.post("/save", authMiddleware, saveDatas); // 게시물 저장
router.get("/list", authMiddleware, dataList); // 전체 리스트
router.patch("/todo/update/:id", updateTodo); // todolist update
router.delete("/todo/delete", authMiddleware, deleteTodo); // todolist delete

module.exports = router;
