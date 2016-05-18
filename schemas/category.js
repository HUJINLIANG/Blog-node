/**
 * Created by lenovo on 2016/5/16.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CategorySchema = new Schema({
    name: {
        type:String,
        unique:true
    },
    pages: [{type: ObjectId, ref: 'Page'}]
});


CategorySchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

module.exports = CategorySchema