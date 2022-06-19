export default function Names({ displayedCountries, setDisplayedCountries }) {
  return (
    <div>
      {displayedCountries.map((country) => (
        <div key={country.name.common}>
          <p>{country.name.common}</p>
          <button onClick={() => setDisplayedCountries([country])}>show</button>
        </div>
      ))}
    </div>
  );
}
