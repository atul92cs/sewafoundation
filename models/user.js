const mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var userSchema=mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

var User=module.exports=mongoose.model('User',userSchema);

module.exports.hashPassword=(user,callback)=>{
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
            user.password=hash;
            user.save(callback);
        });
    });
}

module.exports.getUserbyEmail=(email,callback)=>{
     var query={email:email};
     User.findOne(query,callback);
}
module.exports.getUserbyId=(id,callback)=>{
    User.findById(id,callback);
    
}
module.exports.comparePassword=(userPassword,hash,callback)=>{
    bcrypt.compare(userPassword,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch);
    });
}