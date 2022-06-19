import BasicInfo from "./BasicInfo";
import Languages from "./Languages";
import Image from "./Image";

export default function Detail({ country }) {
  return (
    <div>
      <BasicInfo country={country} />
      <Languages country={country} />
      <Image country={country} />
    </div>
  );
}
