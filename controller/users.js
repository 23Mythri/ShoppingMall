const userModel=require('../models/users')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
SECRET_KEY='TECHNOELEVATE'

//Registartion logic
const register= async (req,res,next)=>{
   let {fname,lname,email,password,role}= req.body
   try{
    const emailExits= await userModel.findOne({email:email})

    if(emailExits){
        res.status(400).json({
            error:true,
            message:"email already exits",
            data:null
        })
    }
    else{
        const saltrounds=10
        //salt of the password
        const salt= await bcrypt.genSalt(saltrounds)

        //hash password
        const hashedPassword=await bcrypt.hash(password,salt)

        await userModel.insertMany([
            {
                fname,
                lname,
                email,
                role,
                password:hashedPassword
            }
        ])
        res.status(200).json({
            error:false,
            message:"registration sucessful",
            data:null
        })


    }

   }
   catch(err){
       next(err)
   }
}


//login Logic

const login=async (req,res,next)=>{
   let {email,password}=req.body

   try{
       const userData= await userModel.findOne({email}).lean()
       if(userData){
          let {fname,lname,role}=userData
          const isPasswordMatch=await bcrypt.compare(password,userData.password)

          if(isPasswordMatch){

            const payload={fname,lname,role}

            const token= await jwt.sign(payload,SECRET_KEY,{
                expiresIn:"5h"
            })
            res.status(200).json({
                error:false,
                message:"login Successful",
                data:{
                    fname,
                    role,
                    token
                }
            })

          }
          else{
              res.status(401).json({
                  error:true,
                  message:"Invalid Password",
                  data:null
              })
          }
       }
       else{
           res.status(400).json({
               error:true,
               message:"User not registered",
               data:null
           })
       }
       
   }
   catch(err){
       next(err)
   }
}

module.exports={
    register,
    login
}


