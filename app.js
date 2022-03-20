const express=require('express')
const mongoose=require('mongoose')
require('./config/logger.js')
const cors=require('cors')

const app=express();

// const cors=require("cors");
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }

// app.use(cors(corsOptions)) // Use this after the variable declaration


const dbUrl='mongodb+srv://abhishek:abhishek03@democluster.9m513.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(
    dbUrl,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    },(err)=>{
        if(!err){
            console.log("DB connected Successfully");
        }
        else{
            console.log("DB not connected");
        }
    }     
)

//cors level middleware
app.use(cors())

const productRoutes=require('./routes/product');

const userRoutes=require('./routes/users');
const req = require('express/lib/request');
//body parser middleware
app.use(express.urlencoded({extended:true}));

//json middleware
app.use(express.json());

//router level middleware
app.use('/products',productRoutes);

app.use('/users',userRoutes)

app.get('/error',(req,res)=>{
    res.status(500).send('something went wrong')
})

module.exports = app;