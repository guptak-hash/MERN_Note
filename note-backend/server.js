require('dotenv').config()
const express=require('express');
const noteRouter = require('./routes/note.routes');
const authRouter = require('./routes/auth.routes');
const connectDB = require('./config/db');


const cors=require('cors');

const cookieParser = require('cookie-parser');


connectDB()

const app=express();

app.use(cors({origin: [
    'http://localhost:5173', 
    'https://mern-note-frontend-fnpu.onrender.com'
  ],credentials:true}))

app.use(express.json());
app.use(cookieParser())

app.use('/api',authRouter);

app.use('/api',noteRouter)

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

// error handling

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    const message=err.message || 'Internal server error'

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})