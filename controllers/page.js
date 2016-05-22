/**
 * Created by lenovo on 2016/5/18.
 */
var Page = require('../models/page');
var Category = require('../models/category');
var Comment = require('../models/comment');
var User = require('../models/user');

//new page
exports.new = function(req,res,next){
    var page = req.body;

    var des = page.content.length>20?page.content.slice(0,20):page.content.slice();
    page.des = des;
    var _page = new Page(page);

    var categoryId = page.category;
    var author = page.author;
    _page.authorName = req.session.user.name;
    _page.save(function(err,page){
        Category.findOne({_id:categoryId},function(err,category){
            category.pages.push(page._id);

            category.save(function(err,category){

                User.findOne({_id:author},function(err,user){

                    user.pages.push(page._id);

                    user.save(function(err,user){
                        res.redirect('/page/'+page._id)
                    })


                });


            })
        })
    })

};
//handle new post
exports.write = function(req,res,next){

    Category.find({},function(err,categories){

        console.log(categories)

        res.render('blog-write',{
            active:'blog',
            blogActive:'write',
            categories:categories
        })
    });

};

//detail page
exports.detail = function(req,res){
    var id = req.params.id;

    Page.update({_id:id},{$inc:{pv:1}},function(err,page){
        if(err){
            console.log(err);
        }
    });



    Page.findOne({_id:id})
        .populate({
            path:'author',
            select:'name poster'
        })
        .populate({
            path:'category',
            select:'name'
        })
        .exec(function(err,page){
            Comment.find({page:id})
                .populate('from','name poster')
                .populate('reply.from reply.to','name poster')
                .exec(function(err,comments){
                    res.render('detail',{
                        active:'blog',
                        page:page,
                        comments:comments
                    })
                })


        })

};

