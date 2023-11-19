const jwt = require('jsonwebtoken');
const DB = require('../dbs/user');
module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = schema.validate(req.body);
            if(result.error) {
                next(new Error(result.error.details[0].message));
            } else {
                next();
            }
        }
    },

    validateparams: (schema, name) => {
        return (req, res, next) => {
            const obj = {};
            obj[`${name}`] = req.params[`${name}`] //we use dynamic name cuz it can be dynamic
            let result = schema.validate(obj);
            if(result.error) {
                next(new Error(result.error.details[0].message));
            } else {
                next();
            }
        }
    },

    validateToken: async (req, res, next) => {
        let token = req.headers.authorization;
        if(token) {
            let splitToken = token.split(' ')[1];
            let decoded = jwt.decode(splitToken, process.env.SECRET_KEY);
            if(decoded) {
                console.log('is reach')
                let checkingUser = await DB.findById(decoded._id);
                if(checkingUser) {
                    req.body.user = checkingUser;
                    next();
                }else {
                    next(new Error("There is no data with that token"))
                }
            }else {
                next(new Error("There is no data with that token"))
            }
           
        } else {
            next(new Error("Token invalid"))
        }
    }
}