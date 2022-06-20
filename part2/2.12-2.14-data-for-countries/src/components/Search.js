export default function Search({ filterCountries }) {
  return (
    <div>
      <p>
        find countries <input onChange={filterCountries} />
      </p>
    </div>
  );
}
