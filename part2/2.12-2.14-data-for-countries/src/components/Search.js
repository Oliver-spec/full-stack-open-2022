export default function Search({ filterCountries }) {
  return (
    <p>
      find countries <input onChange={filterCountries} />
    </p>
  );
}
