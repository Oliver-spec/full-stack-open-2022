import { useEffect, useState } from "react";
import axios from "axios";
import Names from "./components/Names";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

export default function App() {
  // states
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  // effects
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  // event handlers
  function changeNewName(event) {
    setNewName(event.target.value);
  }
  function addName(event) {
    event.preventDefault();
    if (nameList.includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  }
  function changeNewNumber(event) {
    setNewNumber(event.target.value);
  }
  function filterNames(event) {
    const filteredNames = persons.filter((person) =>
      person.name.toLowerCase().startsWith(event.target.value.toLowerCase())
    );
    console.log(filteredNames);
    setPersons(filteredNames);
  }

  // variables
  const nameList = persons.map((person) => person.name);

  return (
    <div>
      <Filter filterNames={filterNames} />
      <PersonForm
        addName={addName}
        changeNewName={changeNewName}
        changeNewNumber={changeNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <Names persons={persons} />
    </div>
  );
}
