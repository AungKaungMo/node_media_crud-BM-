const DB = require('../dbs/cat');
const Helper = require('../utils/helper');

const all = async(req, res, next) => {
    let cats = await DB.find();
    Helper.fMsg(res, "All Cats", cats);
}

const add = async(req, res, next) => {
    let dbCat = await DB.findOne({name: req.body.name});

    if(dbCat) {
        next(new Error("Category Name is already in use."))
        return;
    }
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "Add Successfully", result);
}

const get = async(req, res, next) => {
    let cat = await DB.findById(req.params.id);
    Helper.fMsg(res, "Get Single Category", cat);
}

const patch = async(req, res, next) => {
    const dbCat = await DB.findById(req.params.id);
    if(dbCat) {
        await DB.findByIdAndUpdate(dbCat._id, req.body);
        let newCat = await DB.findById(dbCat._id);
        Helper.fMsg(res, "Update Successfully", newCat);
    } else {
        next(new Error('There is no category with that id.'))
    }
}

const drop = async (req, res, next) => {
    await DB.findByIdAndDelete(req.params.id);
    Helper.fMsg(res, "Deleted Successfully")
}

module.exports = {
    all,
    add,
    get,
    patch,
    drop
}