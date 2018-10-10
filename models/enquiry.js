const mongoose=require('mongoose');

const enquirySchema=mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
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
    },
    status:{
        type:String,
        required:true
    }
}); 

module.exports=mongoose.model('Enquiry',enquirySchema);