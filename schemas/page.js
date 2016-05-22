/**
 * Created by lenovo on 2016/5/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var PageSchema = new mongoose.Schema({
    title:String,
    content:String,
    des:String,
    authorName:String,
    author:{
        type:ObjectId,
        ref:'User'
    },
    category:{
        type:ObjectId,
        ref:'Category'
    },
    pv: {
        type: Number,
        default: 0
    },
    meta:{
        create:{
            type:Date,
            default:Date.now()
        }
    }

});

PageSchema.statics = {
    findByid:function(id,cb){
        return this.findOne({_id:id})
            .exec(cb)
    }
};

module.exports = PageSchema;