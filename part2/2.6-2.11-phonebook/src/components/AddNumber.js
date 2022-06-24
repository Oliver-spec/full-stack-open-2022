export default function AddNumber({ changeNewNumber, newNumber }) {
  return (
    <p>
      number: <input onChange={changeNewNumber} value={newNumber} />
    </p>
  );
}
