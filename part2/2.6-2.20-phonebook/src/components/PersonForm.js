const PersonForm = ({addName, changeNewName, changeNewNumber, newName, newNumber}) => {
    return (
        <form onSubmit={addName}>
        <div>
          name: <input onChange={changeNewName} value={newName} />
        </div>
        <div>
          number: <input onChange={changeNewNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
        </form>
    )
}

export default PersonForm