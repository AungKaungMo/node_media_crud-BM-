const mongoose = require('mongoose');
const { Schema } = mongoose;

const CatShema = new Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    created: { type: Date, default: Date.now()}
})

const cat = mongoose.model('cat', CatShema);
module.exports = cat;