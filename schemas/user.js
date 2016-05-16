/**
 * Created by lenovo on 2016/5/5.
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
   name:{
       unique:true,
       type:String
   },
    password:String,
    poster:String
    
});

UserSchema.statics = {
    fetch:function(cb){
        
    }
};

module.exports = UserSchema;