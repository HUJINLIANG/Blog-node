/**
 * Created by lenovo on 2016/5/5.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new mongoose.Schema({
   name:{
       unique:true,
       type:String
   },
    password:String,
    poster:String,
    pages:[{type:ObjectId,ref:'Page'}],
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        lastOnline:{
            type:Date,
            default:Date.now()
        }
    }
    
});

UserSchema.statics = {
    fetch:function(cb){
        
    }
};

module.exports = UserSchema;