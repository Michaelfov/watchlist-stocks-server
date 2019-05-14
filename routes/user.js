const express = require('express');

const { isLoggedIn } = require('./loginCheck');
const { User } = require('../models');

const router = express.Router();
//user profile, related info to be logged

router.get('/info', isLoggedIn, async (req, res, next) => { //follow를 클릭하면, 
  try {
    const user = await User.find({ where: { id: req.user.id } }); //user 찾아서
    console.log('this is user :', user);
    //나중에 수정할 것. 
    res.json({
      sqlId: user.id,
      loginId: user.userId,
      userName: user.name
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
   