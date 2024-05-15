const express = require("express");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

app.use(express.json());
app.use(express.static("dist"));
app.use(cors());

let persons = [
  {
    id: 1,
    name: "Peter",
    number: "111111111",
  },
];

const getId = () => {
  let maxId =
    persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
  maxId++;
  return maxId;
};

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    //response.json(persons);
    response.send("paso por find");
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id.toString() === id);
  if (person) {
    response.json(person);
  } else {
    response.status(400).send(`error 404 - recurso ${id} not exist`).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id != id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  console.log("PASO");
  const body = request.body;
  if (!body.name) {
    response.status(400).json({ error: "content missing" });
  }
  const person = new Person({ name: body.name, number: body.number, });
  person.save().then(newPerson =>{
    persons =persons.concat(newPerson);
  });
});

const PORT = process.env.PORT || 3103;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static('dist'))
app.use(cors());

let persons = [
  {
    id: 1,
    name: "Peter",
    number: "111111111",
  },
];

const getId = ()=> {
    let maxId= persons.length > 0 ? Math.max(...persons.map(person => person.id)):0;
    maxId++;
    return maxId;
}

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id.toString() === id);
  if (person) {
    response.json(person);
  } else {
    response.status(400).send(`error 404 - recurso ${id} not exist`).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id != id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
    const body = request.body;
    if(!body.name){
        response.status(400).json({error:'content missing'});
    }
    const person = {
        id: getId(),
        name : body.name,
        number: body.number ||""
    }    
    persons = persons.concat(person);
    response.json(person);
});

const PORT = process.env.PORT || 3103
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
