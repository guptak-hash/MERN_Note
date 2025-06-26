const mongoose=require('mongoose');

const NoteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[]
    },
    isPinned:{
        type:Boolean,
        default:false
    },
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
},{
    timestamps:true
});

const NoteModel=mongoose.model('note',NoteSchema);

module.exports=NoteModel;