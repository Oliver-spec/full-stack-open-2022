export default function Image({ country }) {
  return <img src={country.flags.png} alt={`flag of ${country.name.common}`} />;
}
