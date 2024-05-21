require("dotenv").config();
const express = require("express");

const Note = require("./models/note");

//Express
const app = express();
app.use(express.json()); //body

app.get("/api/notes/", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (body.content === undefined) {
    response.status(400).json({ error: "content missing" });
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.get('/api/notes/:id',(request, response)=>{
  Note.findById(request.params.id).then(note=>{
    console.log(note);
    response.json(note);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("init server");
});
