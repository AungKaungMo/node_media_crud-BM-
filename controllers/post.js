const DB = require("../dbs/post");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let posts = await DB.find()
    .populate("user", "-password -__v")
    .populate("cat");
  Helper.fMsg(res, "All Posts", posts);
};

const add = async (req, res, next) => {
  const userId = req.body.user._id;
  delete req.body.user;
  req.body.user = userId;
  const post = new DB(req.body).save();
  Helper.fMsg(res, "Added Post", post);
};

const get = async (req, res, next) => {
  let post = await DB.findById(req.params.id).populate("user");
  if (post) {
    Helper.fMsg(res, "Get Post", post);
  } else {
    next(new Error("No post found"));
  }
};

const patch = async (req, res, next) => {
  let post = await DB.findById(req.params.id);
  if (post) {
    await DB.findByIdAndUpdate(post._id, req.body);
    let result = await DB.findById(post._id);
    Helper.fMsg(res, "Patch Post", result);
  } else {
    next(new Error("Error, there is no post with that id."));
  }
};

const postByCat = async (req, res, next) => {
  let posts = await DB.find({ cat: req.params.id });
  if (posts) {
    Helper.fMsg(res, "Get category post successfully.", posts);
  } else {
    next(new Error("There is no data."));
  }
};

const postByUser = async (req, res, next) => {
  console.log(req.params.id)
  let posts = await DB.find({ user: req.params.id }).populate('user');
  if(posts) {
    Helper.fMsg(res, "Get user post successfully.", posts);
  } else { 
    next(new Error("There is no data."));
  }
};

const drop = async (req, res, next) => {
  await DB.findByIdAndDelete(req.params.id);
  Helper.fMsg(res, "Deleted User Successfully");
};


const paginate = async (req, res, next) => {
  const page = req.params.page == 1 ? 0 : req.params.page - 1;
  const limit = Number(process.env.POST_COUNT);
  const skipCount = page * limit;
  console.log(skipCount, page)
  let posts = await DB.find().skip(skipCount).limit(limit);
  Helper.fMsg(res, "success", posts)
}

module.exports = { all, add, get, patch, drop, postByCat, postByUser, paginate };
