const express = require("express");
const {
  createPost,
  getPosts,
  saveDatas,
  dataList,
  updateTodo,
  deleteTodo,
  deletePost,
  updatePost,
} = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// TEST API
router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getPosts);

// 사용중
// GET
router.get("/list", authMiddleware, dataList); // 전체 리스트

// POST
router.post("/save", authMiddleware, saveDatas); // 게시물 저장

// PATCH
router.patch("/todo/update/:id", updateTodo); // todolist update

// DELETE
router.delete("/todo/delete", authMiddleware, deleteTodo); // todolist delete
router.delete("/delete", deletePost);

// PUT
router.put("/update", updatePost) // post update

module.exports = router;
