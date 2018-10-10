const mongoose=require('mongoose');

var eventSchema=mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
         },
    date:{
        type:String,
        required:true,
        trim:true
         },
    content:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Event',eventSchema);