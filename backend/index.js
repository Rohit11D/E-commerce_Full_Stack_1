
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const dotenv = require("dotenv");
const Api_URL = "https://e-commerce-full-stack-1.onrender.com"
 require('dotenv').config({ path: './config.env' });
const Bport = process.env.BPORT;
const DB_URL = process.env.DB_URL;
app.use(express.json());
app.use(cors());
 app.use(express.static(path.join(__dirname,'./frontend/build')))
// Db connection 
mongoose.connect(DB_URL);


// console.log(`${Bport} ${DB_URL}`);

// mongoose.connect(mongodbURL);
// API creation
// app.use('*',function(req,res){
//     res.sendFile(path.join(__dirname,'./frontend/build/index.html'));
// })
app.get("/",(req,res)=>{
res.send("Express app is running");
})


// image Storage Engine
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
 return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage:storage});
// creating end point for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
res.json({
    success:true,
    image_url:Api_URL+`/images/${req.file.filename}`
})
})
// Schema for Creating products
const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now()
    },
    available:{
        type:Boolean,
        default:true,
    }
})
app.post('/addproduct',async(req,res)=>{
   let products = await Product.find({});
let id=1;
if(products.length>0){
   let last_product_array = products.slice(-1);
   let last_product = last_product_array[0];
   id = last_product.id+1;
}
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    });
    //console.log(product);
    await product.save();
    //console.log("saved");
    res.json({
        success:true,
        name:req.body.name
    })
})
// delete product
app.post('/removeproduct',async(req,res)=>{

 await Product.findOneAndDelete({id:req.body.id});

//console.log("Removed");
res.json({
    success:true,
    name:req.body.name
})
});
// get all products
app.get('/allproducts',async(req,res)=>{
    const product = await Product.find();
//  if(!product){
//    return ( //console.log("No product found")
// );
//  }
//  res.json({
//     success:true,
//     product
// })
res.send(product);
});

// Schema for user model
const Users = mongoose.model('Users',{
    name:{
        type:String,

    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now(),
    }
})
// Creating end point for registerin the user
app.post('/signup',async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"Email Already Exist"});
    }
    let cart={};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();

    const data ={
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token});
})
//login user
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }else{
            res.json({success:false,errors:"wrong password"});
        }
    }else{
        res.json({success:false,errors:"Email does not Exist"});

    }
})
// endpoint for new collection data
app.get('/newcollections',async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    //console.log("NewCollection Fetched");
    res.send(newcollection);
})
// endpoint for new popular in women section
app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popularinwomen = products.slice(0,4);
    //console.log("popular in women Fetched");
    res.send(popularinwomen);
})
// creating middleware to fetch user
const fetchUser = async(req,res,next)=>{
const token = req.header('auth-token');
if(!token){
    res.status(401).send({
        errors:"Please authenticate using valid token"
    })
}else{
    try{
        const data = jwt.verify(token,'secret_ecom');
        req.user = data.user;
        next();
    }catch(error){
res.status(401).send({errors:"please authenticate using valid token"})
    }
}
}
// endpoint for add to cart 
app.post('/addtocart',fetchUser,async(req,res)=>{
    //console.log("Added",req.body.itemId);

let userData = await Users.findOne({_id:req.user.id});
userData.cartData[req.body.itemId]+=1;
await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
res.send("Added");
})

// endpoint for remove from cart
app.post('/removefromcart',fetchUser,async(req,res)=>{
    //console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(    userData.cartData[req.body.itemId]>0){
    userData.cartData[req.body.itemId]-=1;
     }
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed");
    })
// creating endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    //console.log("Get cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})
app.listen(Bport,(error)=>{
    if(!error){
        //console.log("server running on port:"+Bport);
    }else{
        //console.log("Error:"+error);
    }
});