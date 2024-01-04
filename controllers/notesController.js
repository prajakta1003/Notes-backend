const Notes = require("../models/notesModel");

const addNotes = async(req,res) => {
    const {title, content, userId} = req.body;
    try{
        const notes = await Notes.create({ title, content, userId })
        res.status(200).json({ notes });
    }catch (error) {
        res.status(400).json({error: error});
    }
};

const deleteNotes = async (req, res) => {
    const {notesId } = req.params;
    try {
      const notes = await Notes.findById(notesId);
      if (!notes) {
        return res.status(404).json({ error: "Notes not found" });
      }
      await Notes.findByIdAndDelete(notesId);
      res.status(200).json({ message: "Notes deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message || "An error occurred" });
    }
  };


  const getAllNotes= async (req, res) => {
    try {
      const notes = await Notes.find();
      if (!notes) {
        res.status(400).json({ error: "Not Found" });
      }
      res.status(200).json({ notes });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  };


  const getNotesById= async(req,res) => {
    const {notesId} = req.params;
    try{
        const notes= await Notes.findById({_id:notesId})
        if(!notes){
            return res.status(400).json({ error: "Notes not found"})
        }res.status(200).json({notes})
    }catch(error){
        res.status(400).json({error:error})
    }
    
}

const updateNotes = async (req, res) => {
    const { notesId } = req.params;
    const { title, content } = req.body; // Assuming the request body contains the updated data

    try {
        const notes = await Notes.findByIdAndUpdate(
            { _id: notesId },
            { title, content },
            { new: true } // This option returns the updated document
        );

        if (!notes) {
            return res.status(404).json({ error: "Notes not found" });
        }

        res.status(200).json({ notes });
    } catch (error) {
        res.status(500).json({ error: error.message || "An error occurred" });
    }
};

const shareNote = async (req, res) => {
    const { notesId } = req.params;
    const { sharedUserId } = req.body;

    try {
        // Find the note by ID
        const note = await Notes.findById(notesId);

        // Check if the note exists
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Add the sharedUserId to the note's sharedUsers array
        if (!note.sharedUsers.includes(sharedUserId)) {
            note.sharedUsers.push(sharedUserId);
        }

        // Save the updated note
        const updatedNote = await note.save();

        res.status(200).json({ note: updatedNote });
    } catch (error) {
        res.status(500).json({ error: error.message || "An error occurred" });
    }
};



const searchNotes = async (req, res) => {
  const { q } = req.query;

  try {
    // Use a regular expression to perform a case-insensitive search on title and content
    const notes = await Notes.find({
      userId: req.user.id, // Assuming you have authentication middleware to get the user ID
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } }
      ]
    });

    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ error: error.message || "An error occurred" });
  }
};



module.exports= {addNotes, deleteNotes, getAllNotes, getNotesById, updateNotes, shareNote, searchNotes}