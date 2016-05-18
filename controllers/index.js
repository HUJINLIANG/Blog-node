/**
 * Created by lenovo on 2016/5/18.
 */
var mongoose = require('mongoose');
// var Comment = mongoose.model('Comment');
var Category = mongoose.model('Category');
var Comment = require('../models/comment');
var Page = require('../models/Page');

exports.index = function(req, res, next) {
    res.render('index', { active: 'index' });
};