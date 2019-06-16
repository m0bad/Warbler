const db = require('../models');
const jwt = require('jsonwebtoken');


exports.signin = async function(){

}

exports.signup = async function(req, res, next) {
    try {
        //create a user
        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl} = user;
        //create a token
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY
    );
    return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
    });
    } catch (err) {
        // see what kind of error
        // if it's a certain error (validation fails)
        // respond with username/email already token
        if(err.code === 11000) {
            err.message = 'Sorry, that username and/or emil is already taken';
        }
        return next({
            status: 400,
            message: err.message
        })

        // otherwise just send back a generic 400
    }
}
