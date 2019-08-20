const db = require('../models');

// /api/users/:id/messages
exports.createMessage = async function(req, res, next){
    try {
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message.id);
        await foundUser.save();
        let foundMessage = await db.Message.findById(message._id).populate('user', {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
}

// GET /api/users/:id/messages/:messageId
exports.getMessage = async function(req, res, next){
    try {
        let message = await db.Message.findById(req.params.messageId);
        return res.status(200).json(message);
    } catch (err) {
        return next(err);
    }
};


// DELETE /api/users/:id/messages/:messageId
exports.deleteMessage = async function(req, res, next){
    try {
        //findbyidand remove won't work with pre in message model
        let foundMessage = await db.Message.findById(req.params.messageId);
        await foundMessage.remove();
        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
}
