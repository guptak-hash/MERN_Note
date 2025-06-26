const express=require('express');
const verifyToken = require('../utils/verifyUser');
const { addNote, editNote, getAllNotes } = require('../controller/note.controller');

const router=express.Router();

// ad note
router.post('/note',verifyToken,addNote);

// edit note
router.put('/note/:noteId',verifyToken,editNote);

// get all notes
router.get('/note',verifyToken,getAllNotes)

module.exports=router;