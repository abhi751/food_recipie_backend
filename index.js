const express = require("express");
const mongoose= require("mongoose");
const app= express();
const cors=require("cors");

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb+srv://harshita:rIt9WBdrnji0poIL@cluster1.ysss9dt.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  },()=>{
    console.log("DB connected");
})

const userSchema= new mongoose.Schema({ 
    name:String,
    email:String,
    password:String
})

 const User= new mongoose.model("User",userSchema)

const productSchema= new mongoose.Schema({ 
    title:String,
    author:String,
    url:String,
    ingredients:String,
    directions:String
})

 const Product= new mongoose.model("Product",productSchema)



//Routes

app.post("/register",(req,res)=>{
    const {name,email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already registered"})
        }else{
            const user=new User({
                name,
                email,
                password   
            })
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"successfully submited, please login"})
                }
            })
        }
    })
})

app.post("/login",(req,res)=>{
    const {email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            if(password===user.password){
                res.send({message:"User successfully login",user:user})
            }else{
                res.send({message:"Incorrect password"})
            }
        }else{
            res.send({message:"User not registered"})
        }
    })
})

app.post("/product",(req,res)=>{
    const{title,author,url,ingredients,directions}=req.body
    const product=new Product({
        title,
        author,
        url,
        ingredients,
        directions,  
    })
    product.save(err=>{
        if(err){
            res.send(err)
        }else{
            res.send({message:"successfully created new product"})
        }
    })
})

app.get("/product/get", (req,res)=>{
    Product.find((err,data)=>{
       if(err){
            res.status(500).send(err)
       }else{
        res.status(200).send(data)  
       }
    })
})
app.listen(3002,()=>{
    console.log("BE STARTED at port 3002");  
    
})   

 