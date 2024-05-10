import "./styles/tileCountry.css";
import "./styles/app.css";

import { useState } from "react";
import Filter from "./components/Filter";
import ListCountries from "./components/ListCountries";
import { useEffect } from "react";
import countriesServices from "./services/countries";

const App = () => {
  const [filterInput, setFilterInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesShow, setCountriesShow] = useState([]);

  useEffect(() => {
    /*
    Because the API 'https://studies.cs.helsinki.fi/restcountries/api/name/' only accepts full 
    country names and does not return results if only part of the country name are 
    entered, I have had to resort to the API 'https://studies.cs.helsinki.fi/restcountries/api/all'
    that returns the entire list of countries at init, in order to then work on filtering that total 
    list of countries.
    */
    countriesServices.getAllCountries().then((response) => {
      console.log("cargo paises desde API");
      //assign id for every countrie item
      let id = 0;
      response.map((countrie) => {
        countrie.id = id;
        id++;
      });
      setCountries(response);
    });
  }, []);

  const handleFilter = (event) => {
    const value = event.target.value;
    setFilterInput(value);
    if (value.length > 0) {
      const list = countries.filter((countrie) =>
        countrie.name.common.toLowerCase().includes(value.toLowerCase())
      );
      setCountriesShow(list);
    } else {
      setCountriesShow([]);
    }
  };

  return countries.length != 0 ? (
    <div>
      find countries:
      <Filter value={filterInput} handle={handleFilter} />
      <ListCountries countries={countriesShow} />
    </div>
  ) : (
    <div className="divcenter">
      <div className="screencenter">cargando...</div>
    </div>
  );
};

export default App;
