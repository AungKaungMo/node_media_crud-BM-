const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fMsg = async(res, msg="Success", result=[]) => {
    res.status(200).json({
        con: true,
        msg, 
        result
    })
}

module.exports = { 
    fMsg,
    encode: password => bcrypt.hashSync(password, 10),
    comparePass: (plain, hash) => bcrypt.compareSync(plain, hash),
    generateToken: data => jwt.sign(data, process.env.SECRET_KEY, {expiresIn: "1hr"})
 };