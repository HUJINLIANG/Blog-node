/**
 * Created by lenovo on 2016/5/16.
 */
var mongoose = require('mongoose');
var Schema = mongoosek.Schema;
var ObjectId = Schema.Types.ObjectId;

var PageSchema = new mongoose.Schema({
    title:String,
    content:String,
    category:{
        type:ObjectId,
        ref:'Category'
    }

});

PageSchema.statics = {
    findByid:function(id,cb){
        return this.findOne({_id:id})
            .exec(cb)
    }
};

module.exports = PageSchema;