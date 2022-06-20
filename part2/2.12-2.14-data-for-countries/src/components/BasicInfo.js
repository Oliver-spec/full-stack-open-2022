export default function BasicInfo({ country }) {
  if (country.capital === undefined) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.name.common}</p>
        <p>area {country.area}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
      </div>
    );
  }
}
