export default function AddName({ changeNewName, newName }) {
  return (
    <p>
      name: <input onChange={changeNewName} value={newName} />
    </p>
  );
}
