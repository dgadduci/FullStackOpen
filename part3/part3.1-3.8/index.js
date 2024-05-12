const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(
  morgan("custom", {
    skip: function (req, res) {
      console.log(req.body);
      return req.headers["content-type"];
    },
  })
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  return parseInt(Math.random() * 9999999999 + 1);
};

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.filter((person) => person.id === id);
  person.length != 0
    ? response.json(person)
    : response.status(404).json({ error: `Recurse id ${id} not exist` });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id != id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const id = generateId();
  if (!request.body.name || !request.body.number) {
    response.status(400).json({ error: "missing name or number" });
  } else if (
    persons.find(
      (person) => person.name.toLowerCase() === request.body.name.toLowerCase()
    )
  ) {
    response
      .status(400)
      .json({ error: `${request.body.name} is already exist` });
  } else {
    const person = {
      id: id,
      name: request.body.name,
      number: request.body.number,
    };
    persons = persons.concat(person);
    response.status(200).json({ person: person });
  }
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} peoples</p><p>${Date()}</p>`
  );
});

const PORT = 3101;
app.listen(PORT, () => {
  console.log(`Running port ${PORT}`);
});
