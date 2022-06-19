export default function PersonForm({
  addName,
  changeNewName,
  changeNewNumber,
  newName,
  newNumber,
}) {
  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={changeNewName} value={newName} />
        </div>
        <div>
          number: <input onChange={changeNewNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}
