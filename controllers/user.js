/**
 * Created by lenovo on 2016/5/18.
 */
var express = require('express');


var User = require('../models/user');
var Page = require('../models/page');
var fs = require('fs');
var path = require('path');




exports.saveProf = function(req, res, next) {
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
            
        })
    }
    else {
        next()
    }
};


exports.signup = function(req,res,next){


    var _user = req.body;

    if(req.poster){
        _user.poster = req.poster;
    }else{
        _user.poster = '/images/brand.jpg';
    }

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


};

exports.signin = function(req,res){
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
};

exports.logout = function(req,res){

 

    delete req.session.user;


    res.redirect('/');
};

exports.show = function(req,res){
    
    var userId = req.params.id;
    console.log(userId);
    
    User.findOne({_id:userId},function(err,user){
        
        Page.find({author:userId})
            .populate({
                path:'author',
                select:'name poster'
            })
            .populate({
                path: 'category',
                select:'name'
            })
            .exec(function(err,pages){


            console.log(user);
            console.log('------------');
            console.log(pages)
            
            res.render('userpage',{
                user:user,
                pages:pages
            })
            
        })
        
    })
        
    
    
    
}