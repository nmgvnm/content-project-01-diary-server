const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

exports.register = async (req, res) => {
  const { username, password, name, contact, diaryName } = req.body;

  if (!username || !password || !diaryName) {
    return res.status(400).json({ msg: "Username, password, and diary name are required" });
  }

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      username,
      password: await bcrypt.hash(password, 10),
      name,
      contact,
      diaryName,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials (err id )" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials ( err password )" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};