import { Note } from "../../../db/models/note.model.js";


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
    res.status(200).json({ 
        success: true,
        message: "Notes fetched successfully",
        notes 
    });
}

export{
    addNote,
    getNotes
}