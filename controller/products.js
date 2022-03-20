const express=require('express');
const product=require('../models/product')

//Reading Product detail
const getAllproducts= async (req,res,next)=>{
    try{
       const products= await product.find().lean();
       res.json({
           error:false,
           message:"",
           data:products
       })
    }catch(err){
        next(err)
    }
}
//adding a product
const addProduct= async (req,res,next)=>{
    try{
        let{pName,pDesc,pPrice}=req.body
        await product.insertMany([{
            pName,
            pDesc,
            pPrice
        }])
        res.json({
            error:false,
            message:"product has been added successfully",
            data:null
        })
    }catch(err){
        next(err)
    }
}

//edit a product

const editProduct= async (req,res,next)=>{
    try{
        let {_id,pName,pDesc,pPrice}=req.body;
        await product.updateOne(
            {_id},{
                $set:{
                    pName,
                    pDesc,
                    pPrice
                }
            }
        )
        res.json(
            {
                error:false,
                message:"product has been updated successfully",
                data:null
            }
        )
    }catch(err){
        next(err)
    }
}

const deleteProduct= async (req,res,next)=>{
    let {_id}=req.body
    try{
        await product.deleteOne(
            {_id:_id}
        )
        res.json(
            {
                error:false,
                message:"product has been deleted",
                data:null
            }
        )
    }catch(err){
        next(err);
    }
}

module.exports={
    getAllproducts,
    addProduct,
    editProduct,
    deleteProduct
}
