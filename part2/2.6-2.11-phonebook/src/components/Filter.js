export default function Filter({ filterNames }) {
  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filter shown with <input onChange={filterNames} />
      </p>
    </div>
  );
}
