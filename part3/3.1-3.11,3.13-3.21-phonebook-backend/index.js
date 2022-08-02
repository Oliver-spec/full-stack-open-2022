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
  const { name, number } = request.body;

  new Person({
    name,
    number,
  })
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((err) => next(err));
});

// put
app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: query }
  )
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

// delete
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => response.status(204).end())
    .catch((err) => next(err));
});

// error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    res.status(400).json({ error: "Cannot find the specified person!" });
  } else if (err.name === "ValidationError") {
    res.status(400).json({ error: err.message });
  } else {
    next(err);
  }
};
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`listening on ${process.env.PORT}`)
);
