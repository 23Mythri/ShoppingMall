const mongoose=require('mongoose')
const Schema= mongoose.Schema

const userSchema=new Schema({
    fname:{
        type:String,
        required:true,
        minlenght:3,
        maxlenght:15
    },
    lname:{
        type:String,
        required:true,
        minlenght:3,
        maxlenght:10
    },
    email:{
        type:String,
        required:true,
        minlenght:5,
        maxlenght:20
    },
    password:{
        type:String,
        required:true,
        minlenght:8,
        maxlenght:20
    },
    role:{
        type:String,
        required:true,
        minlenght:3,
        maxlenght:10
    }
})
module.exports=mongoose.model('users',userSchema)