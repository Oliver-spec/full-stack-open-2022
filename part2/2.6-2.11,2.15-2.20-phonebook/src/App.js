import { useEffect, useState } from "react";
import talkToServer from "./services/talkToServer";
import Name from "./components/Name";
import Filter from "./components/Filter";
import AddName from "./components/AddName";
import AddNumber from "./components/AddNumber";
import SubmitButton from "./components/SubmitButton";
import Notification from "./components/Notification";

export default function App() {
  // states
  const [data, setData] = useState([]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notificationState, setNotificationState] = useState(null);

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
    if (!newName || !newNumber) {
      setNotificationState("Please enter a valid name or number!");
      setTimeout(() => {
        setNotificationState(null);
      }, 5000);

      return;
    } else if (data.find((person) => person.name === newName)) {
      const repeatedPerson = data.find((person) => person.name === newName);
      const id = repeatedPerson._id;
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      talkToServer
        .putData(id, newPerson)
        .then((res) => talkToServer.getData().then((res) => setData(res)));
    } else {
      talkToServer
        .postData({ name: newName, number: newNumber })
        .then((response) => {
          setData(data.concat(response));
        });

      setNotificationState(`added ${newName}`);
      setTimeout(() => {
        setNotificationState(null);
      }, 5000);

      setNewName("");
      setNewNumber("");
    }
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
      talkToServer.deleteData(person._id).then((response) => {
        setData(
          data.filter((currentPerson) => currentPerson._id !== person._id)
        );
      });
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification
        notificationState={notificationState}
        newName={newName}
        newNumber={newNumber}
      />
      <Filter filterNames={filterNames} />
      <h2>add a new</h2>
      <form>
        <AddName changeNewName={changeNewName} newName={newName} />
        <AddNumber changeNewNumber={changeNewNumber} newNumber={newNumber} />
      </form>
      <SubmitButton data={data} addName={addName} />
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Name key={person._id} person={person} deleteEntry={deleteEntry} />
      ))}
    </>
  );
}
