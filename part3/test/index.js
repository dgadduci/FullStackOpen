const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static('dist'))
app.use(cors());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const getId = ()=> {
    let maxId= notes.length > 0 ? Math.max(...notes.map(note => note.id)):0;
    maxId++;
    return maxId;
}

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  console.log(request.params);
  const id = request.params.id;
  const note = notes.find((note) => note.id.toString() === id);
  if (note) {
    response.json(note);
  } else {
    response.status(400).send(`error 404 - recurso ${id} not exist`).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id != id);
  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
    const body = request.body;
    if(!body.content){
        response.status(400).json({error:'content missing'});
    }
    const note = {
        id: getId(),
        content : body.content,
        important: Boolean(body.important) ||false
    }    
    console.log(note);
    notes = notes.concat(note);
    console.log(notes);
    response.json(note);
});

const PORT = process.env.PORT || 3103
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
