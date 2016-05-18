/**
 * Created by lenovo on 2016/5/18.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CommentSchema = new mongoose.Schema({
    page:{
        type:ObjectId,
        ref:'Page'
    },
    from:{
        type:ObjectId,
        ref:'User'
    },
    content:String,
    reply:[{
       from:{type:ObjectId,ref:'User'},
        to:{type:ObjectId,ref:'User'},
        content:String
    }],
    meta:{
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }

});

CommentSchema.statics = {
    fetch:function(cb){

    }
};

module.exports = CommentSchema;