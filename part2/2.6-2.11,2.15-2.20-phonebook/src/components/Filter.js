export default function Filter({ filterNames }) {
  return (
    <>
      <p>
        filter shown with <input onChange={filterNames} />
      </p>
    </>
  );
}
