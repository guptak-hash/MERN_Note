const NoteModel = require("../models/note.model");
const errorHandler = require("../utils/error");

const addNote = async (req, res, next) => {
    const { title, content, tags, isPinned } = req.body;
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
            userId: id,
            isPinned: isPinned
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

const editNote = async (req, res, next) => {
    const note = await NoteModel.findById(req.params.noteId);
    if (!note) {
        return next(errorHandler(404, 'Note not found'))
    }
    // console.log('req.user.id >> ',req.user.id)
    // console.log('note.userId >> ',note.userId)
    const objectId = note.userId;
    const idString = objectId.toString()
    if (req.user.id !== idString) {
        return next(errorHandler(401, 'You can only update your own note'))
    }
    const { title, content, tags, isPinned } = req.body;
    try {
        if (title) {
            note.title = title;
        };
        if (content) {
            note.content = content;
        }
        if (tags) {
            note.tags = tags
        }
        // note.isPinned = isPinned;
        await note.save();
        res.status(200).json({
            success: true,
            message: 'Note update success',
            note
        })
    } catch (error) {
        next(error)
    }
}

const pinToggle = async (req, res, next) => {
    const note = await NoteModel.findById(req.params.noteId);
    const objectId = note.userId;
    const idString = objectId.toString()
    if (req.user.id !== idString) {
        return next(errorHandler(401, 'You can only pin your own note'))
    }
    const { isPinned } = req.body;
    if (!note) {
        return next(errorHandler(404, 'Note not found'))
    }
    try {
        if (note.isPinned) {
            note.isPinned = false;
        } else {
            note.isPinned = true;
        }
        // note.isPinned = isPinned;
        await note.save();
        res.status(200).json({
            success: true,
            message: 'Note update success',
            note
        })
    } catch (error) {
        next(error)
    }
}

const getAllNotes = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const notes = await NoteModel.find({ userId: userId }).sort({ isPinned: -1 })
        res.status(200).json({
            success: true,
            message: 'All notes retrieved successfully',
            notes
        })
    } catch (error) {
        next(error);
    }
};

const deleteNote = async (req, res, next) => {
    const { noteId } = req.params;
    const note = await NoteModel.findOne({ _id: noteId, userId: req.user.id });
    if (!note) {
        return next(errorHandler(404, 'Note not found'))
    };
    try {
        await NoteModel.deleteOne({ _id: noteId, userId: req.user.id });
        res.status(200).json({
            success: true,
            message: 'Note deleted successfully',
        })
    } catch (error) {
        next(error)
    }
}

const searchNote = async (req, res, next) => {
    const { query } = req.query;
    if (!query) {
        return next(errorHandler(400, 'Search query is required'))
    }

    try {
        const matchingNotes = await NoteModel.find({
            userId: req.user.id,
            $or: [
                { title: { $regex: new RegExp(query, 'i') } },       // Search in title (case-insensitive)
                { content: { $regex: new RegExp(query, 'i') } },     // Search in content (case-insensitive)
                { tags: { $in: [new RegExp(query, 'i')] } }          // Search in tags array (case-insensitive)
            ]
        });

        res.status(200).json({
            success:true,
            message: 'Notes matching the search query',
            notes:matchingNotes
        })
    }catch (error) {
        next(error)
    }
}

module.exports = { addNote, editNote, getAllNotes, deleteNote, pinToggle, searchNote}