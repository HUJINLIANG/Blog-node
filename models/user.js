/**
 * Created by lenovo on 2016/5/5.
 */
var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
var User = mongoose.model('User',UserSchema);

module.exports = User;