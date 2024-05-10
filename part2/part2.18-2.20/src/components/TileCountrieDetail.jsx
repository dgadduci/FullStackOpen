import { useState, useEffect } from "react";
import weatherService from "../services/weatherService"

const TileCountrieDetail = ({ countrie }) => {
  const [weather, setWeather] = useState([]);
  const languages =[];
  for(let key in countrie.languages){
    languages.push(countrie.languages[key]);
  }

  useEffect(()=>{
    const latlng = {
      lat: countrie.capitalInfo.latlng[0],
      lng:countrie.capitalInfo.latlng[1]
    };
    weatherService.getWeather(latlng.lat,latlng.lng).then(response => {
      setWeather(response);
    });
  },[countrie.capitalInfo.latlng])


  const flagStyle ={
    fontSize:"150px",
  }

  function getImageUrl(pict) {
    return new URL(pict, import.meta.url).href
  }

  return (
    <div>
      <p className="countriename">{countrie.name.official}</p>
      <p>capital {countrie.capital.join(' - ')}</p>
      <p>area {countrie.area}</p>
      <p className="languages">Languages:</p>
      <ul>
        {languages.map((lang)=><li key={lang}>{lang}</li>)}
      </ul>
      <div style={flagStyle}>{countrie.flag}</div>
      <p className="weathertitle">Weather in {countrie.capital}</p>
      <p>Temperature: {weather.temperature} Celsius</p>
      <p>Max Temperature: {weather.temperatureMax} Celsius</p>
      <img style={{width:60}} src ={getImageUrl(weather.pict)} alt="icon weather"/>
      <p>Wind {weather.wind} m/s</p>
      <p>Precipitation {weather.precipitation} mm</p>
    </div>
  );
};

export default TileCountrieDetail;
