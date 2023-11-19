const DB = require('../dbs/tag');
const Helper = require('../utils/helper');

const all = async (req, res, next) => {
    let result = await DB.find();
    Helper.fMsg(res, "Success", result);
}

const get = async (req, res, next) => {
    Helper.fMsg(res, "success");
}

const add = async (req, res, next) => {
    let haveData = await DB.findOne({ name: req.body.name });
    if(haveData) {
        next(new Error("Name is already in use."));
        return;
    }
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "successfully added", result)
}

const patch = async (req, res, next) => {
    let tag = await DB.findById(req.params.id);
    if(tag) {
        await DB.findByIdAndUpdate(tag._id, req.body);
        console.log(req.body)
        let result = await DB.findById(tag._id);
        Helper.fMsg(res, "successfully patched", result);
    } else {
        next(new Error("There is no data."))
    }
}

const drop = async (req, res, next) => {
    Helper.fMsg(res, "success");
}

module.exports = {
    all,
    add,
    patch,
    get,
    drop
};