import axios from "axios";
//"How https://openweathermap.org requires the use of a credit card, I used https://openweathermap.org."
//https://docs.meteoblue.com/en/weather-apis/introduction/overview

//Note: I included the API key, as the service is free to use and does not generate charges for me even 
// in case of excessive usage.
const APIKey = "ouGN04cmnydZCKr3";

const getWeather = (lat, lng) => {
  const request = axios.get(
    `http://my.meteoblue.com/packages/basic-1h_basic-day?lat=${lat}&lon=${lng}&apikey=${APIKey}`
  );
  return request
    .then((response) => {
      const data = {
        temperature: response.data.data_day.temperature_instant[0],
        precipitation: response.data.data_day.precipitation[0],
        temperatureMax: response.data.data_day.temperature_max[0],
        wind:response.data.data_day.windspeed_mean[0],
        pict: `../assets/${("0"+response.data.data_day.pictocode[0]).slice(-2)}_day.png`
      };
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default { getWeather };
