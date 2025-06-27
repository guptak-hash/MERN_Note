const express=require('express');
const verifyToken = require('../utils/verifyUser');
const { addNote, editNote, getAllNotes, deleteNote, pinToggle, searchNote } = require('../controller/note.controller');

const router=express.Router();

// ad note
router.post('/note',verifyToken,addNote);

// edit note
router.put('/note/:noteId',verifyToken,editNote);

// pinned toggle
router.patch('/note/:noteId',verifyToken,pinToggle)

// get all notes
router.get('/note',verifyToken,getAllNotes);

// delete note
router.delete('/note/:noteId',verifyToken,deleteNote);

// search note
router.get('/search',verifyToken,searchNote)

module.exports=router;