const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

// 현재 사용자 프로필 정보 가져오기
router.get('/', auth, async (req, res) => {
  console.log("req.user:", req.user); // 요청된 사용자가 있는지 확인
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
    console.log(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
