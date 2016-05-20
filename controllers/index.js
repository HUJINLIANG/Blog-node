/**
 * Created by lenovo on 2016/5/18.
 */
var mongoose = require('mongoose');
// var Comment = mongoose.model('Comment');
var Category = mongoose.model('Category');
var Comment = require('../models/comment');
var Page = require('../models/Page');

exports.index = function(req, res, next) {

    var page = parseInt(req.query.page) || 0;
    var count = 5;
    var index = page*count;


    Page.find({})
        .populate({
            path:'author',
            select:'name poster'
        })
        .populate({
            path: 'category',
            select:'name'
        })
        .exec(function(err,pages){

            var results = pages.slice(index,index+count);


            res.render('index', {
                active: 'index',
                pages:results,
                categoryActive:'all',
                currentPage:(page+1),
                totalPage:Math.ceil(pages.length/count)
            });


        });




};

exports.show = function(req,res) {


    var cate = req.params.category;
    var page = parseInt(req.params.page);
    var count = 5;
    var index = page * count;

    if (cate !== 'all'){
        Category.findOne({name: cate}, function (err, category) {

            if (err) {
                console.log('database err!')
            }

            
            Page.find({category: category._id})
                .populate({
                    path: 'author',
                    select: 'name poster'
                })
                .populate({
                    path: 'category',
                    select: 'name'
                })
                .exec(function (err, pages) {

                    var results = pages.slice(index, index + count);


                    res.render('index', {
                        active: 'index',
                        pages: results,
                        categoryActive: cate,
                        currentPage: (page + 1),
                        totalPage: Math.ceil(pages.length / count)
                    });


                });


        });
    }else{
        Page.find({})
            .populate({
                path:'author',
                select:'name poster'
            })
            .populate({
                path: 'category',
                select:'name'
            })
            .exec(function(err,pages){

                var results = pages.slice(index,index+count);


                res.render('index', {
                    active: 'index',
                    pages:results,
                    categoryActive:'all',
                    currentPage:(page+1),
                    totalPage:Math.ceil(pages.length/count)
                });


            });
    }

};