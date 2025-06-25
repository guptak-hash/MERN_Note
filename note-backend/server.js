require('dotenv').config()
const express=require('express');

const app=express();

app.use('/test',(req,res)=>{
    res.status(200).json({msg: 'Test route'})
})

app.use((req,res)=>{
res.status(400).json({msg: 'Undefined route'})
})

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log('Server started at port ',PORT)
})