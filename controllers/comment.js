/**
 * Created by lenovo on 2016/5/18.
 */

var Comment = require('../models/comment');


exports.save = function(req, res, next) {
    var _comment = req.body;
    console.log(_comment);
    var pageId = _comment.page;

    if(_comment.cid){

        Comment.findOne({_id:_comment.cid},function(err,comment){

            var reply = {
                from:_comment.from,
                to:_comment.tid,
                content:_comment.content
            };

            comment.reply.push(reply);

            comment.save(function(err,comment){
                res.redirect('/page/'+pageId);
                // res.json({success:1})
            })

        })

    }else{
        var comment = new Comment(_comment);
        comment.save(function(err,comment){
            res.redirect('/page/'+pageId);
            // res.json({success:1})
        })
    }

};