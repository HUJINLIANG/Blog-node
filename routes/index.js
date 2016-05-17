var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var fs = require('fs');
var path = require('path');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
// var User = mongoose.model('User');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { active: 'index' });
});


router.get('/blog', function(req, res, next) {
    res.render('blog-write', { active: 'blog' ,blogActive:'write'});
});



router.get('/blogWrite',function(req,res,next){
    res.render('blog-write')
});


router.post('/signup',multipartMiddleware, function(req, res, next) {
        var posterData = req.files.uploadPoster;
        var filePath = posterData.path;
        var originalFilename = posterData.originalFilename;
        console.log(filePath);
        if (originalFilename) {
            fs.readFile(filePath, function(err, data) {
                var timestamp = Date.now()
                var type = posterData.type.split('/')[1];
                var poster = timestamp + '.' + type
                var newPath = path.join(__dirname, '../', '/public/upload/' + poster);

                console.log(data);
                console.log(newPath);

                var out = fs.createWriteStream(newPath);
                out.write(data,function(err){
                    if(err){
                        throw new Error('error');
                    }
                    req.poster =  '/upload/'+poster;
                    next()
                });


                // fs.writeFile(newPath, data, function(err) {
                //
                //     if(err){
                //         throw new Error('error');
                //     }
                //     req.poster =  '/upload/'+poster;
                //     next()
                // })
            })
        }
        else {
            next()
        }
    }, function(req,res,next){


    var _user = req.body;
    
    if(req.poster){
        _user.poster = req.poster;
    }else{
        _user.poster = '/images/brand.jpg';
    }
    
    
    console.log(_user)
    User.findOne({name:_user.name},function(err,user){
        if(err){
            console.log(err);
        }

        if(user){
            res.redirect('/')
        }else{
            user = new User(_user);
            user.save(function(err,user){
                if(err){
                    console.log(err);
                }

                res.redirect('/');
            })
        }
    });



    // res.render('write', { active: 'blog' });
});

router.post('/signin',function(req,res){
    var _user = req.body;
    var name = _user.name;
    var password = _user.password;

    User.findOne({name:name,password:password},function(err,user){
        if(err){
            console.log(err);
        }

        if(!user){
            return res.redirect('/');
        }

        req.session.user = user;
        res.redirect('/blog');

    })
});

router.get('/logout',function(req,res){

    console.log('daoda')

    delete req.session.user;


    res.redirect('/');
});


module.exports = router;
