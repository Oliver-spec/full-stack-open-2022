import { useEffect, useState } from "react";
import talkToServer from "./services/talkToServer";
import Name from "./components/Name";
import Filter from "./components/Filter";
import AddName from "./components/AddName";
import AddNumber from "./components/AddNumber";
import SubmitButton from "./components/SubmitButton";

export default function App() {
  // states
  const [data, setData] = useState([]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  // effects
  useEffect(() => {
    talkToServer.getData().then((response) => {
      setData(response);
    });
  }, []);

  useEffect(() => setPersons(data), [data]);

  // event handlers
  function changeNewName(event) {
    setNewName(event.target.value);
  }

  function addName(data) {
    const repeatedName = data.find((person) => person.name === newName);

    if (
      repeatedName !== undefined &&
      window.confirm(
        `${repeatedName.name} is already added to the phonebook, replace the old number with a new one?`
      )
    ) {
      const updatedNumber = { ...repeatedName, number: newNumber };
      talkToServer
        .putData(repeatedName.id, updatedNumber)
        .then((response) =>
          setData(
            data.map((person) => (person.name === newName ? response : person))
          )
        );
      setNewName("");
      setNewNumber("");
      return;
    }

    const newPerson =
      data.length === 0
        ? {
            name: newName,
            number: newNumber,
            id: 0,
          }
        : { name: newName, number: newNumber, id: data.at(-1).id + 1 };

    talkToServer.postData(newPerson).then((response) => {
      setData(data.concat(response));
    });

    setNewName("");
    setNewNumber("");
  }

  function changeNewNumber(event) {
    setNewNumber(event.target.value);
  }

  function filterNames(event) {
    const filteredNames = data.filter((person) =>
      person.name.toLowerCase().startsWith(event.target.value.toLowerCase())
    );
    setPersons(filteredNames);
  }

  function deleteEntry(person) {
    if (window.confirm(`Delete ${person.name}?`)) {
      talkToServer.deleteData(person.id).then((response) => {
        setData(data.filter((currentPerson) => currentPerson.id !== person.id));
      });
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter filterNames={filterNames} />
      <h2>add a new</h2>
      <form>
        <AddName changeNewName={changeNewName} newName={newName} />
        <AddNumber changeNewNumber={changeNewNumber} newNumber={newNumber} />
      </form>
      <SubmitButton data={data} addName={addName} />
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Name key={person.id} person={person} deleteEntry={deleteEntry} />
      ))}
    </>
  );
}
