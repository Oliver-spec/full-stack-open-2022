export default function Names({ persons }) {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map(function (person) {
        return (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        );
      })}
    </div>
  );
}
