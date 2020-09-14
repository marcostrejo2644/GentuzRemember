const router = require("express").Router();
const note = require("../models/note");

router.get("/", async (req, res) => {
  const notes = await note.find().sort({ priority: 1 }).lean();
  res.render("home", { notes });
});

router.get("/notes/add-note", (req, res) => {
  res.render("notes/add-note");
});

router.post("/notes/add-note", async (req, res) => {
  const { typeNote, priority, title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Insert a Title" });
  }
  if (!description) {
    errors.push({ text: "Insert a Description" });
  }
  if (errors.length > 0) {
    res.render("notes/add-note", {
      errors,
      typeNote,
      priority,
      title,
      description,
    });
  } else {
    const newNote = new note({
      typeNote,
      priority,
      title,
      description,
    });
    await newNote.save();
    res.redirect("/");
  }
});

router.get("/notes/edit-note/:id", async (req, res) => {
  const noteEdit = await note.findById(req.params.id).lean();
  console.log(noteEdit);
  res.render("notes/edit-note", { noteEdit });
});

router.put("/notes/edit-note/:id", async (req, res) => {
  const { typeNote, priority, title, description } = req.body;
  await note.findByIdAndUpdate(req.params.id, {
    typeNote,
    priority,
    title,
    description,
  });
  res.redirect("/");
});

router.delete("/notes/delete-note/:id", async (req, res) => {
  await note.findByIdAndRemove(req.params.id);
  res.redirect("/");
});

module.exports = router;
