const User = require("../models/User")

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if(!user){
      return res.status(404).json({msg : 'User not found'})
    }
    res.json(user)
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}