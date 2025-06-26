const NoteModel = require("../models/note.model");
const errorHandler = require("../utils/error");

const addNote = async (req, res, next) => {
    const { title, content, tags } = req.body;
    const { id } = req.user;
    if (!title) {
        return next(errorHandler(400, 'Title is required'))
    }
    if (!content) {
        return next(errorHandler(400, 'Content is required'))
    }
    try {
        const note = new NoteModel({
            title,
            content,
            tags: tags || [],
            userId: id
        })
        await note.save();
        res.status(201).json({
            success: true,
            message: 'Note added success',
            note
        })
    } catch (error) {
        next(error)
    }
}

module.exports={addNote}