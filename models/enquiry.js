const mongoose=require('mongoose');

var enquirySchema=mongoose.Schema({
    id:mongoose.Schema.Types.OjectId,
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
    ,
    query:{
        type:String,
        required:true
    }
}); 

module.exports=mongoose.model('Enquiry',enquirySchema);