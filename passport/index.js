const local = require('./localStrategy');
const { User } = require('../models');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.find({ where: { id }}).then(user => done(null, user))
    .catch(err => done(err));                 // id = {id: id}


    //   include: [{
    //     model: User,
    //     attributes: ['id', 'name'],
    //     as: 'Followers',
    //   }, {
    //     model: User,
    //     attributes: ['id', 'name'],
    //     as: 'Followings',
    //   }],
    // })
      
  });

  
  local(passport);
  // kakao(passport);
};
