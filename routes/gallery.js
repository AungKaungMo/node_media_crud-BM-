const router = require('express').Router();
const galleryUtils = require('../utils/gallery');

router.post('/', galleryUtils.saveFile, (req, res) => {
    res.status(200).json({msg: "File uploaded", filename: req.imageName});
});
router.post('/multi', galleryUtils.saveManyFiles, (req, res) => {
    res.status(200).json({msg: "File uploaded", filename: req.imageName});
});
router.post('/delete', galleryUtils.deleteFile);

module.exports = router;