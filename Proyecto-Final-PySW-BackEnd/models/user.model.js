const mongoose    = require('mongoose');
const { Schema }  = mongoose;

const Student  = require('./student.model');
const Coach    = require('./coach.model');

const UserSchema = new Schema({
   type_user   : {type : String, required : true},
   user_name   : {type : String, required : true, unique : true},
   password    : {type : String, required : true},
   owner       : {student  : { type : Schema.Types.ObjectId, ref : Student, required : false, unique : true },
                  coach    : { type : Schema.Types.ObjectId, ref : Coach, required : false, unique : true }
                 }
}); 

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);