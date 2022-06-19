export default function Names({ displayedCountries }) {
  return (
    <div>
      {displayedCountries.map((country) => (
        <p key={country.name.common}>{country.name.common}</p>
      ))}
    </div>
  );
}
