const {User} = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.checkToken = async(req, res, next) => {
    try{
        if(req.headers["x-access-token"]){
            const accessToken = req.headers["x-access-token"];
            const {_id} = jwt.verify(accessToken, process.env.DB_SECRET);
            res.locals.userData = await User.findById(_id);
            next()
        } else{
            next();
        }
    } catch(errors){
        return res.status(401).json({error:"Bad token", errors})
    }
}

exports.checkLoggedIn = (req,res,next) => {
    const user = res.locals.userData;
    if(!user) return res.status(401).json({error:"No user.Please log in"})

    req.user = user;
    next();
}