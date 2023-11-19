const fs = require('fs'); //fs means file system

//One file save
const saveFile = async (req, res, next) => {
    if(req.files) {
    let file = req.files.file;
        let filename = new Date().valueOf() + '_' + file.name;
        file.mv(`./uploads/${filename}`);
        req.body.image = filename;
        next();
    } else { 
        next(new Error("There is no photo."))
    }
}

const saveManyFiles = async (req, res, next) => {
   let files = req.files.files;
   console.log(files)
   let fileImages = [];
   files.forEach((file) => {
    let filename = new Date().valueOf() + '_' + file.name;
    file.mv(`./uploads/${filename}`);
    fileImages.push(filename);
   });
   req.body.imageNames = fileImages;
   next();
}

const deleteFile = async (req, res, next) => {
    await fs.unlinkSync(`./uploads/${req.body.filename}`);
    res.status(200).json({
        msg: 'File deleted successfully'
    });
}

module.exports = { saveFile, saveManyFiles, deleteFile };