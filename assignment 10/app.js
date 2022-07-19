const express = require('express');
const fs = require('fs');
const app = express();
const { dbConn } = require('./config/db.js');
const{Product} = require("./model/Product");

const port = 1111;

app.use(express.json())


app.get('/', async(req, res) => {
    try{
        Product.find().then((result)=>{
            return res.status(200).json({
                messsage : "Showing Products in the cart",
                result
            })
        }).catch((err)=>{
            return res.status(500).json({
                messsage : "Something went wrong",
                error: err.message
            })
        })
    }
catch(err){
        return res.status(500).json({
            message:"Something went wrong",
            error:err.message
        })
    }
    
})

app.post("/add",async(req,res)=>{
    try{
        error = '';
        const {product_name,product_price,product_description,product_image} = req.body
        if(product_name=='' && error == ''){
            error = "Missing Product Name"
            res.status(400).json({
                message: error
            })
        }
        if(product_price=='' && error == ''){
            error = "Missing Product Price"
            res.status(400).json({
                message: error
            })
        }
        
        const ProductObj = {
            product_name,
            product_price,
            product_description,
            product_image,
        }

        const product = new Product(ProductObj);
        product.save().then((result) => {
            return res.status(200).json({
                message : "Data saved successfully",
                result
            })
        })
        .catch((err) => {
            return res.status(500).json({
                message : "Something went wrong",
                error : err.message
            })
        })
    }catch(err){
        res.status(500).json({
            message : "Something went wrong2",
            error : err.message
        })
    }
})

app.put("/update/:id",async (req, res)=>{
    try{
        const id = req.params.id;
        const {product_name, product_price,product_description, product_image} = req.body;
        if(product_name=='' || product_name  == undefined){
            error = "Missing Product Name"
            return res.status(400).json({
                message: error
            })
        }
        if(product_price=='' || product_price  == undefined){
            error = "Missing Product Price"
            return res.status(400).json({
                message: error
            })
        }
        await Product.findByIdAndUpdate(id,{product_name, product_price,product_description, product_image})
        return res.status(200).json({
            message: 'Product updated successfully',
        })
    }catch(err){
        return res.status(500).json({
            message: 'Something went wrong',
            error: err.message
    })}
    
})

app.delete('/del/:id',async(req, res) => {
    try{
        await Product.findByIdAndDelete (req.params.id)
        return res.status(200).json({
        message: 'Product deleted successfully',
    })
    }catch(err){
        return res.status(500).json({
            message: 'Something went wrong',
            error: err.message
    })}
})


dbConn();
app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})