require('dotenv').config()
const mongoose=require('mongoose');

const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('MongoAtlas connection success')
    }).catch((err)=>{
        console.log(err.message);
    })
}

module.exports=connectDB;