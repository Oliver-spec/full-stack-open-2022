export default function Languages({ country }) {
  return (
    <div>
      <h3>languages:</h3>
      <ul>
        {Object.entries(country.languages).map((language) => (
          <li key={language[1]}>{language[1]}</li>
        ))}
      </ul>
    </div>
  );
}
