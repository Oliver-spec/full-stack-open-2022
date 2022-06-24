export default function Name({ person, deleteEntry }) {
  return (
    <>
      <p>
        {person.name} {person.number}
      </p>
      <p>
        <button onClick={() => deleteEntry(person)}>delete</button>
      </p>
    </>
  );
}
