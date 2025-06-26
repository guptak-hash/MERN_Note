const express=require('express');
const verifyToken = require('../utils/verifyUser');
const { addNote } = require('../controller/note.controller');

const router=express.Router();

router.post('/note',verifyToken,addNote)

module.exports=router;