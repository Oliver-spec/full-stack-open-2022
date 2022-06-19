import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Names from "./components/Names";
import TooMany from "./components/TooMany";
import Detail from "./components/Detail";
import Weather from "./components/Weather";

export default function App() {
  // states
  const [countries, setCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);

  // effects
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  // event handlers
  function filterCountries(event) {
    const filtered = countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setDisplayedCountries(filtered);
  }

  if (displayedCountries.length > 10) {
    return (
      <div>
        <Search filterCountries={filterCountries} />
        <TooMany />
      </div>
    );
  } else if (displayedCountries.length === 1) {
    return (
      <div>
        <Search filterCountries={filterCountries} />
        <Detail country={displayedCountries[0]} />
        <Weather country={displayedCountries[0]} />
      </div>
    );
  } else {
    return (
      <div>
        <Search filterCountries={filterCountries} />
        <Names
          displayedCountries={displayedCountries}
          setDisplayedCountries={setDisplayedCountries}
        />
      </div>
    );
  }
}
