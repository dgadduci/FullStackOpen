import TileManyCountries from "./TileManyCountries";
import TileCountrieDetail from "./TileCountrieDetail";
import TileCountrie from "./TileCountrie";

const ListCountries = ({ countries }) => {
  if (countries.length === 1) {
    return <TileCountrieDetail countrie={countries[0]} />
  } else if (countries.length > 10) {
    return <TileManyCountries />;
  } else {
    return countries.map((countrie) => (
      <TileCountrie key ={countrie.id} countrie={countrie}/>
    ));
  }
};

export default ListCountries;
