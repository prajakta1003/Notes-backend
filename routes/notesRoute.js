const express = require("express");
const { addNotes, deleteNotes, getAllNotes, getNotesById, updateNotes, shareNote, searchNotes } = require("../controllers/notesController");

const router = express.Router();

router.post("/addnotes", addNotes)
router.delete("/:notesId", deleteNotes);
router.get("/allnotes", getAllNotes);
router.get("/getNotes/:notesId", getNotesById )
router.put("/update/:notesId", updateNotes)
router.post("/:id/share", shareNote); 
router.get("/search", searchNotes);



module.exports = router





