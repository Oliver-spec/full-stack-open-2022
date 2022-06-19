export default function BasicInfo({ country }) {
  if (country.name.common === "Macau") {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital N/A</p>
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
