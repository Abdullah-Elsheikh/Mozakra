import { Note } from "../../../db/models/note.model.js";
import { AppError } from "../../../utils/appError.js";


//add Note
const addNote = async(req,res,next)=>{
    const { description } = req.body;
    const note = await Note.create({ description });
    const userId = req.authUser._id;
    note.userId = userId;
    await note.save();
    res.status(201).json({ 
        success: true,
        message : "Note added successfully",
         note
     });
}

//get Notes
const getNotes = async(req,res,next)=>{
    const notes = await Note.find();
    if(!notes || notes.length === 0) {
        return next(new AppError("No notes found", 404));
    }
    res.status(200).json({ 
        success: true,
        message: "Notes fetched successfully",
        notes 
    });
}

//update Note
const updateNote = async(req,res,next)=>{
    const { noteId } = req.params;
    const { description } = req.body;
    const note = await Note.findByIdAndUpdate(noteId, { description }, { new: true });
    if(!note) {
        return next(new AppError("Note not found", 404));
    }
    res.status(200).json({ 
        success: true,
        message: "Note updated successfully",
        note
    });
}

//delete Note
const deleteNote = async(req,res,next)=>{
    const { noteId } = req.params;
    const note = await Note.findByIdAndDelete(noteId);
    if(!note) {
        return next(new AppError("Note not found", 404));
    }
    res.status(200).json({ 
        success: true,
        message: "Note deleted successfully",
    });
}

export { addNote, getNotes, updateNote, deleteNote };