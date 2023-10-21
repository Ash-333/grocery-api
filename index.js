const express=require('express')
const app=express()
const dotenv=require('dotenv').config()
const mongoose=require('mongoose')
const categoryRoutes=require('./routes/Category')
const productRoutes=require('./routes/Products')
const userRoutes=require('./routes/Users')
const cors=require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/uploads', express.static('uploads'));
app.use(cors())


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then (
    console.log("connected to db")
).catch((err)=>console.log(err))



app.get('/',(req,res)=>{
    res.send("hello world!")
})

app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',userRoutes)

app.listen(3000,()=>{
    console.log("server is running at http://localhost:3000")
})