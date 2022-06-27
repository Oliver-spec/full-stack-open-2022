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
    const repeatedPerson = data.find((person) => person.name === newName);

    if (
      repeatedPerson !== undefined &&
      window.confirm(
        `${repeatedPerson.name} is already added to the phonebook, replace the old number with a new one?`
      )
    ) {
      const updatedNumber = { ...repeatedPerson, number: newNumber };

      talkToServer
        .putData(repeatedPerson.id, updatedNumber)
        .then((response) =>
          setData(
            data.map((person) => (person.name === newName ? response : person))
          )
        )
        .then((response) => {
          setNotificationState(
            `changed number of ${repeatedPerson.name} from ${repeatedPerson.number} to ${newNumber}`
          );
          setTimeout(() => {
            setNotificationState(null);
          }, 5000);
        })
        .catch((error) => {
          setNotificationState(
            `information of ${repeatedPerson.name} has already been removed from the server`
          );
          setTimeout(() => {
            setNotificationState(null);
          }, 5000);
          talkToServer.getData().then((response) => setData(response));
        });

      setNewName("");
      setNewNumber("");
      return null;
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

    setNotificationState(`added ${newName}`);
    setTimeout(() => {
      setNotificationState(null);
    }, 5000);
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
        <Name key={person.id} person={person} deleteEntry={deleteEntry} />
      ))}
    </>
  );
}
