var express = require('express');
var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

module.exports = function(router){
    var Index = require('../controllers/index');
    var User = require('../controllers/user');
    var Page = require('../controllers/page');
    var Comment = require('../controllers/comment');
    var Category = require('../controllers/category');

// var User = mongoose.model('User');


    /* GET home page. */
    router.get('/', Index.index);

    router.post('/signup',multipartMiddleware, User.saveProf, User.signup);
    router.post('/signin',User.signin);
    router.get('/logout',User.logout);


    router.post('/admin/addpage', Page.new);
    router.get('/blog', Page.write);
    router.get('/blogWrite',Page.write);
    router.get('/page/:id',Page.detail);

    router.post('/user/comment',Comment.save)

};
