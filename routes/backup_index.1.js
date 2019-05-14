const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./loginCheck');
// const { Post, User } = require('../models');

const uuidv4 = require('uuid/v4');
const { User, Domain } = require('../models');


const router = express.Router();

//profile page
router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: 'Your info', user: req.user }); // user는 어디서 오는가?
  //이건 그냥 req 되서 오는 거다. 
  console.log('this is user:', req.user);
});

//sign up page
router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: 'Sign Up Page',
    user: req.user,
    joinError: req.flash('joinError'),
  });
});

//main page
//log in 이후 여기로 온다. 내용 수정하자. pug로 렌더링하도록
router.get('/', isLoggedIn, (req, res, next) => {
console.log('you are really logged in');
// console.log(req, res);

}
);

module.exports = router;
