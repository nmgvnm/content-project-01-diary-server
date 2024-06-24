const express = require('express');
const { createPost, getPosts, saveDatas, dataList } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createPost);
router.get('/', authMiddleware, getPosts);
router.post('/data/save/test',authMiddleware, saveDatas)
router.get('/list', authMiddleware, dataList)
module.exports = router;