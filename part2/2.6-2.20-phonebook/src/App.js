import { useState } from 'react'
import Names from './components/Names'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  // states
  const [persons, setPersons] = useState([
    
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // event handlers
  const changeNewName = (event) => {
    setNewName(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()

    if (nameList.includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }
  const changeNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const filterNames = (event) => {
    const filteredNames = persons.filter((person) => person.name.toLowerCase().startsWith(event.target.value.toLowerCase()))
    console.log(filteredNames);
    setPersons(filteredNames)
  }
  
  // variables
  const nameList = persons.map((person) => person.name)

  return (
    <div>
      <h2>
        Phonebook
      </h2>
      <Filter filterNames={filterNames} />
      <h2>
        add a new
      </h2>
      <PersonForm 
        addName={addName} changeNewName={changeNewName} 
        changeNewNumber={changeNewNumber} newName={newName}
        newNumber={newNumber}
      />
      <h2>
        Numbers
      </h2>
      <Names persons={persons} />
    </div>
  )
}

export default App
