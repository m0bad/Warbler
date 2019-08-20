const express = require('express');
const router = express.Router({mergeParams: true})
//merge params allows us to have access to the id inside this routes
const {
    createMessage,
    getMessage,
    deleteMessage
    } = require('../controllers/messages');

//prefix : /api/users/:id/messages
router.route('/').post(createMessage);

router.route('/:messageId')
    .get(getMessage)
    .delete(deleteMessage)

module.exports = router;
