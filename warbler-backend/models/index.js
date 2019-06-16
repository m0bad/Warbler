const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Propmise = Promise;
mongoose.connect('mongodb://localhost/warbler', {
    keepAlive: true,
    useMongoClient: true
});

module.exports.User = require('./user');
