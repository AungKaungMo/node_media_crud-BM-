const DB = require('../dbs/user');
const Helper = require('../utils/helper');

const login = async (req, res, next) => {
  let user = await DB.findOne({ phone: req.body.phone }).select('-__v');
  if(user) {
    let result = Helper.comparePass(req.body.password, user.password);
    if(result) {
      //user is mongo object so we need to change javascript object
      let userObj = user.toObject();
      delete userObj.password; //cuz don't want to show password
      userObj.token = Helper.generateToken(userObj);
      Helper.fMsg(res, 'Login Successfully', userObj);
    }else {
      next(new Error('Login Failed'));
    }
  }else {
    next(new Error('There is no user with that phone number,'))
  }
  
}

const register = async (req, res, next) => {
  let haveUser = await DB.findOne({ email: req.body.email });
  let havePhone = await DB.findOne({ phone: req.body.phone });

  if(havePhone) {
    next(new Error('User already registered'));
    return;
  }
  if(haveUser) {
    next(new Error('User already registered'));
    return;
  }
  req.body.password = Helper.encode(req.body.password);
  let user = await DB(req.body).save();
  Helper.fMsg(res, 'Register Successfully', user);
}

module.exports = {
  login, register
}