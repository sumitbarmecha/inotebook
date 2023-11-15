const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1: get all the notes using:get "/api/notes/getuser"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes)

  } catch (error) {       
    console.log(error.message);
    res.status(500).send("some error ocured")
  }
})

// ROUTE 2: add a new note  using:POST  "/api/notes/addnote"
router.post('/addnote', fetchuser, [
  body('title', 'enter a valid title').isLength({ min: 3 }),
  body('description', 'enter a valid description').isLength({ min: 5 })], async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //if there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = await new Note({
        title, description, tag, user: req.user.id
      })
      const savedNote = await note.save()
      res.json(savedNote)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error ocured")
    }
  })

// ROUTE 3: updating an existing note  using:put  "/api/notes/updatenote" . login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  // creat a newNote object
  try {


    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // find the note to be updated and update it

    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error ocured")
  }
})

// ROUTE 4: deleting an existing note  using:delete  "/api/notes/deletenote" . login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  // creat a newNote object
  try {

    // find the note to be deleted and delete it

    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }
    // allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ "success": "notes has been deleted", note: note })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error ocured")
  }
})

module.exports = router