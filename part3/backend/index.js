require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Phone = require("./models/phone");
const handleError = require("./handle_error");

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

app.get("/api/persons", (request, response, next) => {
  Phone.find({})
    .then((phones) => {
      if (phones) {
        response.json(phones);
      } else {
        response.status(400).end;
      }
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Phone.findById(id)
    .then((phone) => {
      response.json(phone);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Phone.findByIdAndDelete(id)
    .then((result) => {
      persons = persons.filter((person) => person.id != id);
      response.status(204).end();
      console.log(result);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const { name, number } = request.body;
  Phone.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatePhone) => {
      response.json(updatePhone);
    })
    .catch((error) => {
      console.log("error en put")
      next(error);
    });
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  const phone = new Phone({
    name: body.name,
    number: body.number,
  });
  phone
    .save()
    .then((phone) => {
      response.json(phone);
    })
    .catch((error) => next(error));
});

app.use(handleError);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
