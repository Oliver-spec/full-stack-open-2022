const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password> <name> <number>"
  );

  process.exit(1);
} else if (process.argv.length === 4 || process.argv.length > 5) {
  console.log(
    "Provide the name and number like this: node mongo.js <password> <name> <number>"
  );

  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://oliver:${password}@cluster0.bsl3dxi.mongodb.net/phonebook_database?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected!");

    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    });

    const Person = mongoose.model("Person", personSchema);

    if (process.argv.length === 3) {
      Person.find({})
        .then((result) => {
          console.log("phonebook:");
          result.forEach((person) => console.log(person.name, person.number));

          mongoose.connection.close();
        })
        .catch((err) => console.log(err));
    } else {
      const name = process.argv[3];
      const number = process.argv[4];

      const person = new Person({
        name: name,
        number: number,
      });

      person
        .save()
        .then((result) => {
          console.log(`added ${name} number ${number} to phonebook`);
          mongoose.connection.close();
        })
        .catch((err) => console.log(err));
    }
  })
  .catch((err) => console.log(err));
