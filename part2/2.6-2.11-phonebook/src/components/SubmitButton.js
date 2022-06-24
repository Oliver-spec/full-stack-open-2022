export default function SubmitButton({ data, addName }) {
  return (
    <p>
      <button onClick={() => addName(data)}>add</button>
    </p>
  );
}
