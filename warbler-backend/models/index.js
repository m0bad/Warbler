const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Propmise = Promise;
mongoose.connect('mongodb://localhost/warbler', {
    keepAlive: true,
    useNewUrlParser: true
});

module.exports.User = require('./user');
module.exports.Message = require('./message');
