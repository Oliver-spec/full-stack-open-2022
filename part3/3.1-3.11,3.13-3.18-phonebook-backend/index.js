const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/Person");

const app = express();

// middlewares before req
app.use(express.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("data", (request) => JSON.stringify(request.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

// get all
app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((people) => response.json(people))
    .catch((err) => next(err));
});

// get by id
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => response.json(person))
    .catch((err) => next(err));
});

// get info
app.get("/info", (request, response, next) => {
  Person.find({})
    .then((people) =>
      response.send(
        `<h1>Phonebook has info for ${
          people.length
        } people</h1><h3>${new Date()}</h3>`
      )
    )
    .catch((err) => next(err));
});

// post
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  new Person({
    name: body.name,
    number: body.number,
  })
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((err) => next(err));
});

// put
app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  const newPerson = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(id, newPerson, { new: true })
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

// delete
app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => response.status(204).end())
    .catch((err) => next(err));
});

app.listen(process.env.PORT, () =>
  console.log(`listening on ${process.env.PORT}`)
);
